const constants = require('../../configs/constants');
const get = require('lodash/get');
const moduleController = require('../../modules/controllers');
const verifiedPurchase = require('../../configs/verifiedPurchase.json');
const getOverallRating = require('../utils');
var tokenize = require('../../modules/controllers/sentiment/tokenize');

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
	const { entityId, rating = 0, title = '', description = '', author = '', images = [] } = req.body;

	if (rating < 1 || rating > 5) {
		badRequest(400, reply, 'Invalid Rating');
	}

	if (images.length > 5) {
		badRequest(400, reply, 'Only 5 images are allowed');
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

	// sentiment analysis
	const rawComment = title + description;

	const sentimentData = moduleController.sentiment().analyse({ phrase: rawComment, languageCode: 'en' });
	const sentiment = constants.SENTIMENT_FACTOR[sentimentData.sentimentFactor];
	const isverifiedPurchase = [...(verifiedPurchase[author] || [])].includes(entityId);
	const reviewStatus = sentimentData.hasAbusiveContent ? 'Abusive' : 'Published';
	const ids = images.map(img => fastify.storage.saveImage(img));

	const review_score = getOverallRating({
		count: sentimentData.noOfWords,
		verifiedPurchase: isverifiedPurchase,
		rating,
		sentimentScore: sentiment,
		helpful_count: 0,
	});
	const reqBody = {
		entityId,
		rating,
		title,
		description,
		author,
		created_date: new Date(),
		modified_date: new Date(),
		verifiedPurchase: isverifiedPurchase,
		helpful_count: 0,
		imageLink: ids,
		sentiment,
		reviewStatus,
		review_score,
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
		reviewStatus,
		verifiedPurchase: isverifiedPurchase,
		review_score,
		imageLink: ids,
	};

	return reply.code(200).send({
		...schema,
	});
};

const editHandler = fastify => async (req, reply) => {
	const { id, rating = 0, title = '', description = '', images = [] } = req.body;

	if (rating < 1 || rating > 5) {
		badRequest(400, reply);
	}

	if (title.length > 120) {
		badRequest(400, reply, 'Invalid Title');
	}

	if (images.length > 5) {
		badRequest(400, reply, 'Only 5 images are allowed');
	}

	const headers = {
		Authorization: 'Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o=',
	};
	const rawComment = title + description;

	const sentimentData = moduleController.sentiment().analyse({ phrase: rawComment, languageCode: 'en' });

	const reviewStatus = sentimentData.hasAbusiveContent ? 'Abusive' : 'Published';

	const ids = images.map(img => fastify.storage.saveImage(img));
	console.log('ids', ids);

	const reqBody = {
		doc: {
			rating,
			title,
			description,
			modified_date: new Date(),
			reviewStatus,
			imageLink: ids,
		},
	};

	const url = constants.UPDATE_REVIEW_URL + `/${id}`;
	await fastify.restClient.post(url, reqBody, headers);

	reply.code(200).send(reqBody.doc);
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
		id: _id,
		..._source,
	};

	return reply.code(200).send({
		...schema,
	});
};

const updateStatus = fastify => async (req, reply) => {
	const { reviewId, status } = req.body;

	const reviewStatus = ['Abusive', 'Published', 'Removed'];

	if (!reviewStatus.find(item => item === status)) {
		badRequest(400, reply, 'Invalid Status');
	}

	const headers = {
		Authorization: 'Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o=',
	};

	const reqBody = {
		doc: {
			reviewStatus: status,
		},
	};

	const url = constants.UPDATE_REVIEW_URL + `/${reviewId}`;

	const response = await fastify.restClient.post(url, reqBody, headers);

	handleResponse(response, reply);
};

const markHelpFul = fastify => async (req, reply) => {
	const { id, helpful_count, verifiedPurchase, rating, sentiment, title, description } = req.body;
	var { noOfWords } = tokenize(title + description);
	const review_score = getOverallRating({
		count: noOfWords,
		verifiedPurchase,
		rating,
		sentimentScore: sentiment,
		helpful_count,
	});
	const headers = {
		Authorization: 'Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o=',
	};

	const reqBody = {
		doc: {
			helpful_count,
			review_score,
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
		_source: false,
		size: 0,
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
					{
						term: {
							reviewStatus: {
								value: 'Published',
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
							to: 1.01,
						},
						{
							from: 1.0,
							to: 2.01,
						},
						{
							from: 2.0,
							to: 3.01,
						},
						{
							from: 3.0,
							to: 4.01,
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
		'0.0-1.01': '1',
		'1.0-2.01': '2',
		'2.0-3.01': '3',
		'3.0-4.01': '4',
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
	const {
		sort = 'rating_desc',
		verifiedPurchase = false,
		pageNo = 0,
		entityId = '',
		reviewStatus = 'Published',
	} = req.query;
	const headers = {
		Authorization: 'Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o=',
	};
	const url = constants.SEARCH_URL;
	const filters = {
		verifiedPurchase,
		entityId,
		reviewStatus,
	};
	const mustMatch = Object.keys(filters)
		.filter(key => filters[key])
		.map(dt => {
			return { term: { [dt]: { value: filters[dt] } } };
		});
	const sortSplit = sort.split(':');
	const sortBy = {
		[sortSplit[0]]: sortSplit[1],
	};
	const reqBody = {
		from: pageNo * constants.PAGE_SIZE,
		size: constants.PAGE_SIZE,
		query: {
			bool: {
				must: mustMatch,
			},
		},
		sort: [sortBy],
	};
	const response = await fastify.restClient.post(url, reqBody, headers);

	if (response && response.error) {
		reply.code(response.status || 500).send({
			error: response.error,
		});
		return;
	}

	if (!(response.hits && response.hits.hits)) {
		return handleResponse({}, reply);
	}

	const sanitisedData = response.hits.hits.map(data => {
		return {
			id: data._id,
			...data._source,
		};
	});

	const results = {
		data: sanitisedData,
		meta: {
			total: response.hits.total.value,
		},
	};
	handleResponse(results, reply);
};

module.exports = async fastify => {
	fastify.get('/ratingsAndReviews', searchRatings(fastify));
	fastify.post('/ratingsAndReviews', postHandler(fastify));
	fastify.post('/ratingsAndReviews/flag', markHelpFul(fastify));
	fastify.post('/ratingsAndReviews/edit', editHandler(fastify));
	fastify.get('/ratingsAndReviews/:id', getHandler(fastify));
	fastify.post('/ratingsAndReviews/updateStatus', updateStatus(fastify));
	fastify.get('/averageRatings/:id', averageRatings(fastify));
};
