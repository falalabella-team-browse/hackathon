const Sentiment = require('./sentiment');

const sentimentController = fastify => ({
	async analyse(body) {
		const sentimentFactor = Sentiment.analyse(body);
		return {
			result: sentimentFactor,
		};
	},
});

module.exports = sentimentController;
