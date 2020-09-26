const constants = require('../../configs/constants');
const get = require('lodash/get');
const moduleController = require('../../modules/controllers');

const handleResponse = (response, reply) => {
	if (response && response.error) {
		reply.code(response.status || 500).send({
			error: response.error,
		});
		return;
	}

	return reply.code(200).send({
		data: response,
	});
};

const badRequest = (code = 400, reply, msg = 'Bad Request') => {
	return reply.code(code).send({
		error: {
			reason: msg,
		},
	});
};

const postHandler = fastify => async (req, reply) => {
	const { entityId, rating = 0, title = '', description = '', author = '' } = req.body;

	// sentiment analysis to go here

	if (rating < 1 || rating > 5) {
		badRequest(400, reply, 'Invalid Rating');
	}

	if (title.length > 160) {
		badRequest(400, reply, 'Invalid Title');
	}

	const headers = {
		Authorization: 'Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o=',
	};

	if (!entityId || !entityId.trim()) {
		badRequest(400, reply, 'Mandatory : entityId ');
	}

	const rawComment = title + description;

	const sentimentData = moduleController.sentiment().analyse({ phrase: rawComment, languageCode: 'en' });

	const reqBody = {
		entityId,
		rating,
		title,
		description,
		author,
		created_date: new Date(),
		modified_date: new Date(),
		verifiedPurchase: true,
		helpful_count: 0,
		imageLink: [''],
		sentiment: constants.SENTIMENT_FACTOR[sentimentData.sentimentFactor],
		sentiment_factor: sentimentData.sentimentScore,
		reviewStatus: sentimentData.hasAbusiveContent ? 'Abusive' : 'Published',
	};

	const response = await fastify.restClient.post(constants.CREAT_NEW_REVIEW_URL, reqBody, headers);

	if (response && response.error) {
		reply.code(response.status || 500).send({
			error: response.error,
		});
		return;
	}

	const schema = {
		reviewId: response._id,
		author: author,
		entityId: entityId,
		title: title,
		description: description,
		rating: rating,
		reviewStatus: 'Published',
	};

	return reply.code(200).send({
		...schema,
	});
};

const editHandler = fastify => async (req, reply) => {
	const { id, rating = 0, title = '', description = '' } = req.body;

	if (rating < 1 || rating > 5) {
		badRequest(400, reply);
	}

	if (title.length > 120) {
		badRequest(400, reply, 'Invalid Title');
	}

	const headers = {
		Authorization: 'Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o=',
	};

	const reqBody = {
		doc: {
			rating,
			title,
			description,
			modified_date: new Date(),
			imageLink: [''],
			sentiment_factor: 3,
			reviewStatus: 'Published',
		},
	};

	const url = constants.UPDATE_REVIEW_URL + `/${id}`;

	const response = await fastify.restClient.post(url, reqBody, headers);

	handleResponse(response, reply);
};

const getHandler = fastify => async (req, reply) => {
	const { id } = req.params;

	const headers = {
		Authorization: 'Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o=',
	};

	const url = constants.GET_REVIEW_BYID_URL + `/${id}`;

	const response = await fastify.restClient.get(url, headers);

	if (response && response.error) {
		reply.code(response.status || 500).send({
			error: response.error,
		});
		return;
	}

	const { _source, _id } = response;

	const schema = {
		reviewId: _id,
		author: _source.author,
		entityId: _source.entityId,
		title: _source.title,
		description: _source.description,
		rating: _source.rating,
		reviewStatus: _source.reviewStatus,
	};

	return reply.code(200).send({
		...schema,
	});
};

const deleteHandler = fastify => async (req, reply) => {
	const { id } = req.params;

	const headers = {
		Authorization: 'Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o=',
	};

	const reqBody = {
		doc: {
			reviewStatus: 'removed',
		},
	};

	const url = constants.UPDATE_REVIEW_URL + `/${id}`;

	const response = await fastify.restClient.post(url, reqBody, headers);

	handleResponse(response, reply);
};

const markHelpFul = fastify => async (req, reply) => {
	const { id, helpful_count } = req.body;

	const headers = {
		Authorization: 'Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o=',
	};

	const reqBody = {
		doc: {
			helpful_count,
		},
	};

	const url = constants.UPDATE_REVIEW_URL + `/${id}`;

	const response = await fastify.restClient.post(url, reqBody, headers);

	handleResponse(response, reply);
};

const averageRatings = fastify => async (req, reply) => {
	const { id } = req.params;
	const headers = {
		Authorization: 'Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o=',
	};
	const reqBody = {
		query: {
			bool: {
				must: [
					{
						term: {
							entityId: {
								value: id,
							},
						},
					},
				],
				must_not: [
					{
						term: {
							reviewStatus: {
								value: 'Abusive',
							},
						},
					},
				],
			},
		},
		aggs: {
			avg_rating: {
				avg: {
					field: 'rating',
				},
			},
			rating_buckets: {
				range: {
					field: 'rating',
					ranges: [
						{
							from: 0.0,
							to: 1.0,
						},
						{
							from: 1.0,
							to: 2.0,
						},
						{
							from: 2.0,
							to: 3.0,
						},
						{
							from: 3.0,
							to: 4.0,
						},
						{
							from: 4.0,
							to: 5.01,
						},
					],
				},
			},
		},
	};

	const response = await fastify.restClient.post(constants.SEARCH_URL, reqBody, headers);

	if (response && response.error) {
		reply.code(response.status || 500).send({
			error: response.error,
		});
		return;
	}

	const enums = {
		'0.0-1.0': '1',
		'1.0-2.0': '2',
		'2.0-3.0': '3',
		'3.0-4.0': '4',
		'4.0-5.01': '5',
	};

	const totalNumberOfReviews = get(response, 'hits.total.value', 0);
	const averageRating = get(response, 'aggregations.avg_rating.value', 0);
	const buckets = get(response, 'aggregations.rating_buckets.buckets', []);
	const rating_buckets = buckets.map(bkt => {
		return {
			key: enums[`${bkt.key}`],
			value: bkt.doc_count,
		};
	});

	const schema = {
		totalNumberOfReviews,
		averageRating,
		rating_buckets,
	};

	return reply.code(200).send({
		...schema,
	});
};

const searchRatings = fastify => async (req, reply) => {
	const { pageNo = 0 } = req.body;
	const headers = {
		Authorization: 'Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o=',
	};
	const url = constants.SEARCH_URL;

	const reqBody = {
		from: pageNo * constants.PAGE_SIZE,
		size: constants.PAGE_SIZE,
	};

	const response = await fastify.restClient.post(url, reqBody, headers);

	if (response && response.error) {
		reply.code(response.status || 500).send({
			error: response.error,
		});
		return;
	}

	if (response.hits && response.hits.hits) {
		handleResponse(response.hits.hits, reply);
	}
	return handleResponse({}, reply);
};

module.exports = async fastify => {
	fastify.post('/ratingsAndReviews', searchRatings(fastify));
	fastify.post('/ratingsAndReviews/create', postHandler(fastify));
	fastify.post('/ratingsAndReviews/flag', markHelpFul(fastify));
	fastify.post('/ratingsAndReviews/edit', editHandler(fastify));
	fastify.get('/ratingsAndReviews/:id', getHandler(fastify));
	fastify.delete('/ratingsAndReviews/:id', deleteHandler(fastify));
	fastify.get('/averageRatings/:id', averageRatings(fastify));
};
