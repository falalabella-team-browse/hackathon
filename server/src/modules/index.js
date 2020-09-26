const fp = require('fastify-plugin');
const { sentiment } = require('./controllers');

const analyserModule = fp((fastify, opt, next) => {
	fastify.decorate('module', {
		sentiment: sentiment(fastify),
	});
	next();
});

module.exports = { analyserModule };
