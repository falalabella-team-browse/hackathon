const constants = require('../../configs/constants');
const get = require('lodash/get');
const moduleController = require('../../modules/controllers');
const verifiedPurchase = require('../../configs/verifiedPurchase.json');
const getOverallRating = require('../utils');
const { generateQuery, aggregator_Average, aggregator_Analytics, aggEnums, aggregator_Histogram } = require('./helper');
var tokenize = require('../../modules/controllers/sentiment/tokenize');
const apiSchemas = require('./schema');

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

	if (!description) {
		badRequest(400, reply, 'Description is mandatory');
	}

	if (!title) {
		badRequest(400, reply, 'Title is mandatory');
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

	const ids = images.map(img => fastify.storage.saveImage(img));

	const verifiedPurchase = [...(verifiedPurchase[author] || [])].includes(entityId);
	const sentimentData = moduleController.sentiment().analyse({
		phrase: rawComment,
		languageCode: 'en',
		verifiedPurchase,
		rating,
		helpful_count: 0,
		imageCount: ids.length,
	});

	const sentiment = constants.SENTIMENT_FACTOR[sentimentData.sentimentFactor];

	const reviewStatus = sentimentData.hasAbusiveContent ? 'Abusive' : 'Published';

	const reqBody = {
		entityId,
		rating,
		title,
		description,
		author,
		created_date: new Date(),
		modified_date: new Date(),
		verifiedPurchase,
		helpful_count: 0,
		imageLink: ids,
		sentiment,
		reviewStatus,
		review_score: sentimentData.review_score,
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
	const { id, rating = 0, title = '', description = '', images = [], author = '' } = req.body;

	if (rating < 1 || rating > 5) {
		badRequest(400, reply);
	}

	if (title.length > 120) {
		badRequest(400, reply, 'Invalid Title');
	}

	if (images.length > 5) {
		badRequest(400, reply, 'Only 5 images are allowed');
	}

	const verifiedPurchase = [...(verifiedPurchase[author] || [])].includes(id);

	const headers = {
		Authorization: 'Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o=',
	};
	const rawComment = title + description;

	const sentimentData = moduleController.sentiment().analyse({
		phrase: rawComment,
		languageCode: 'en',
		verifiedPurchase,
		rating,
		helpful_count: 0,
		imageCount: images.length,
	});

	const reviewStatus = sentimentData.hasAbusiveContent ? 'Abusive' : 'Published';

	const ids = images.map(img => fastify.storage.saveImage(img));

	const reqBody = {
		doc: {
			rating,
			title,
			description,
			modified_date: new Date(),
			reviewStatus,
			helpful_count: 0,
			imageLink: ids,
			review_score: sentimentData.review_score,
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

	if (response && response.error) {
		reply.code(response.status || 500).send({
			error: response.error,
		});
		return;
	}

	return reply.code(200).send({
		success: true,
		msg: 'updated successfully',
	});
};

const markHelpFul = fastify => async (req, reply) => {
	const { id, helpful_count, verifiedPurchase, rating, sentiment, title, description, imageLink = [] } = req.body;

	const sentimentData = moduleController.sentiment().analyse({
		phrase: title + description,
		languageCode: 'en',
		verifiedPurchase,
		rating,
		helpful_count,
		imageCount: imageLink.length,
	});

	const headers = {
		Authorization: 'Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o=',
	};

	const reqBody = {
		doc: {
			helpful_count,
			review_score: sentimentData.review_score,
		},
	};

	const url = constants.UPDATE_REVIEW_URL + `/${id}`;

	const response = await fastify.restClient.post(url, reqBody, headers);

	if (response && response.error) {
		reply.code(response.status || 500).send({
			error: response.error,
		});
		return;
	}

	return reply.code(200).send({
		success: true,
		msg: 'updated successfully',
	});
};

const averageRatings = (fastify, method = 'average') => async (req, reply) => {
	const { id } = req.params;

	const headers = {
		Authorization: 'Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o=',
	};

	const { entityType = 'sku' } = req.query;

	const queryLabel = entityType === 'author' ? 'author' : 'entityId';

	const queryForAverage = {
		must: [generateQuery('entityId', id), generateQuery('reviewStatus', 'Published')],
	};

	const queryForAnalytics = {
		must: [generateQuery(queryLabel, id)],
	};

	const aggregator = method === 'analytics' ? aggregator_Analytics : aggregator_Average;

	const reqBody = {
		size: 0,
		_source: false,
		size: 0,
		query: {
			bool: method === 'analytics' ? queryForAnalytics : queryForAverage,
		},
		aggs: aggregator,
	};

	const response = await fastify.restClient.post(constants.SEARCH_URL, reqBody, headers);

	if (response && response.error) {
		reply.code(response.status || 500).send({
			error: response.error,
		});
		return;
	}

	const totalNumberOfReviews = get(response, 'hits.total.value', 0);
	const averageRating = get(response, 'aggregations.avg_rating.value', 0);
	const buckets = get(response, 'aggregations.rating_buckets.buckets', []);
	const sentiments = get(response, 'aggregations.sentiment_buckets.buckets', []);
	const review = get(response, 'aggregations.review_status.buckets', []);

	const review_status = review.map(bkt => {
		return {
			key: bkt.key,
			value: bkt.doc_count,
		};
	});

	const sentiment_buckets = sentiments.map(bkt => {
		return {
			key: aggEnums[`${bkt.key}`],
			value: bkt.doc_count,
		};
	});

	const rating_buckets = buckets.map(bkt => {
		return {
			key: aggEnums[`${bkt.key}`],
			value: bkt.doc_count,
		};
	});

	const schema = {
		totalNumberOfReviews,
		averageRating,
		rating_buckets,
	};

	if (method === 'analytics') {
		schema['sentiment_buckets'] = sentiment_buckets;
		schema['review_status'] = review_status;
	}

	return reply.code(200).send({
		...schema,
	});
};

const histogram = fastify => async (req, reply) => {
	const { id } = req.params;

	const headers = {
		Authorization: 'Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o=',
	};

	const reqBody = {
		size: 0,
		_source: false,
		size: 0,
		query: {
			bool: {
				must: [generateQuery('entityId', id)],
			},
		},
		aggs: aggregator_Histogram,
	};

	const response = await fastify.restClient.post(constants.SEARCH_URL, reqBody, headers);

	if (response && response.error) {
		reply.code(response.status || 500).send({
			error: response.error,
		});
		return;
	}

	const totalNumberOfReviews = get(response, 'hits.total.value', 0);
	const ratings = get(response, 'aggregations.rating_per_hour.buckets', []);

	const rating_per_hour = ratings.map(item => {
		return {
			date: item.key_as_string,
			timestamp: item.key,
			value: item.doc_count,
			average: item.rating_average.value,
		};
	});

	const schema = {
		totalNumberOfReviews,
		rating_per_hour,
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
		author = '',
	} = req.query;

	const headers = {
		Authorization: 'Basic ZWxhc3RpYzptRG9HTFA1VmNuU3poNEVWeU4wek1FV0o=',
	};

	const url = constants.SEARCH_URL;
	const filters = {
		verifiedPurchase,
		entityId,
		reviewStatus,
		author,
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
	fastify.post('/ratingsAndReviews', apiSchemas.createReviewSchema, postHandler(fastify));
	fastify.post('/ratingsAndReviews/flag', apiSchemas.flagReviewSchema, markHelpFul(fastify));
	fastify.post('/ratingsAndReviews/edit', apiSchemas.editReviewSchema, editHandler(fastify));
	fastify.post('/ratingsAndReviews/updateStatus', apiSchemas.updateReviewSchema, updateStatus(fastify));
	fastify.get('/ratingsAndReviews', apiSchemas.getReviews, searchRatings(fastify));
	fastify.get('/myReviews', apiSchemas.getMyReviews, searchRatings(fastify));
	fastify.get('/ratingsAndReviews/:id', apiSchemas.getReviewById, getHandler(fastify));
	fastify.get('/averageRatings/:id', apiSchemas.aggregation, averageRatings(fastify, 'average'));
	fastify.get('/analytics/:id', apiSchemas.analytics, averageRatings(fastify, 'analytics'));
	fastify.get('/histogram/:id', apiSchemas.histogram, histogram(fastify));
};
