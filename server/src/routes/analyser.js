const { analyserSchema } = require('./schema/sentimentAnalyser');

const analyserRoutes = (fastify, opt, next) => {
	fastify.post('/sentiment', analyserSchema , async req => {
		return fastify.module.sentiment.analyse(req.body);
	});
	next();
};

module.exports = analyserRoutes;
