const constants = {
	CREAT_NEW_REVIEW_URL: 'https://3f6c946c272c4aba9e7ca147ba2fbb97.us-central1.gcp.cloud.es.io:9243/review_finals/_doc',
	UPDATE_REVIEW_URL: 'https://3f6c946c272c4aba9e7ca147ba2fbb97.us-central1.gcp.cloud.es.io:9243/review_finals/_update',
	GET_REVIEW_BYID_URL: 'https://3f6c946c272c4aba9e7ca147ba2fbb97.us-central1.gcp.cloud.es.io:9243/review_finals/_doc',
	SEARCH_URL: 'https://3f6c946c272c4aba9e7ca147ba2fbb97.us-central1.gcp.cloud.es.io:9243/review_finals/_search',
	SENTIMENT_FACTOR: {
		NEUTRAL: 3,
		SAD: 2,
		SUPER_SAD: 1,
		HAPPY: 4,
		SUPER_HAPPY: 5,
	},
	PAGE_SIZE: 10,
	RNR_SCORE: {
		HFS_V: 5,
		HFS_NV: 1,
		WS_V: 2,
		WS_NV: 0.5,
	},
};

module.exports = constants;
