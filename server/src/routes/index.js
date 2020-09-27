const analyserRoutes = require("./analyser");
const ratingsAndReviews = require("../domains/ratingsAndReviews");
const { createReadStream } = require("fs");

const routes = async (fastify, opt, next) => {
  fastify.get("/live", { schema : { hide: true }}, (_, res) => {
    res.send({
      success: true,
      message: "Server is ip...",
    });
  });

  fastify.get("/image", { schema : { hide: true }} , (req, res) => {
    const { id } = req.query;
    const path = fastify.storage.getImage(id);

    if (path) {
      res.send(createReadStream(path));
      return;
    }

    res.code(404).send({
      status: "Not Found",
    });
  });

  fastify.register(analyserRoutes, { prefix: "/analyse" });
  fastify.register(ratingsAndReviews);

  next();
};

module.exports = routes;
