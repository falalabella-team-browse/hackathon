const analyserRoutes = (fastify, opt, next) => {
	fastify.post('/sentiment', async req => {
		return fastify.module.sentiment.analyse(req.body);
	});
	next();
};

module.exports = analyserRoutes;
