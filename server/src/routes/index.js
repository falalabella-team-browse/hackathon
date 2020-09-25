const authRoutes = require('./auth');
const analyserRoutes = require('./analyser');

const routes = async (fastify, opt, next) => {
	fastify.get('/', (_, res) => {
		res.send({
			success: true,
			message: 'Server is ip...',
		});
	});

  fastify.register(authRoutes, { prefix: '/auth' });
  fastify.register(analyserRoutes, { prefix: '/analyse' });

	next();
	//   fastify.register();
};

module.exports = routes;
