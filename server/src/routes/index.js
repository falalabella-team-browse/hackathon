const authRoutes = require('./auth');
const analyserRoutes = require('./analyser');
const ratingsAndReviews = require("../domains/ratingsAndReviews");

const routes = async (fastify, opt, next) => {
  fastify.get("/", (_, res) => {
    res.send({
      success: true,
      message: "Server is ip...",
    });
  });

  fastify.register(authRoutes, { prefix: '/auth' });
	fastify.register(analyserRoutes, { prefix: '/analyse' });
	fastify.register(ratingsAndReviews);

	next();
};

module.exports = routes;
