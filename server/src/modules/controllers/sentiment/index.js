const Sentiment = require('./sentiment');

const sentiment = fastify => ({
	analyse(body) {
		return Sentiment.analyse(body);
	},
});

module.exports = sentiment;
