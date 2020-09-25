const fp = require('fastify-plugin');
const { sentimentController } = require('./controllers');

const analyserModule = fp(async (fastify, opt, next) => {
	fastify.decorate('module', {
		sentiment: sentimentController(fastify),
	});
	next();
});

module.exports = { analyserModule };
