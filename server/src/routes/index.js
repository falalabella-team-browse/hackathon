const authRoutes = require("./auth");

const routes = async (fastify, opt, next) => {
  fastify.get("/", (_, res) => {
    res.send({
      success: true,
      message: "Server is ip...",
    });
  });

  fastify.register(authRoutes, { prefix: "/auth" });

  next();
  //   fastify.register();
};

module.exports = routes;
