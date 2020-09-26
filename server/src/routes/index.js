const analyserRoutes = require("./analyser");
const ratingsAndReviews = require("../domains/ratingsAndReviews");
const { createReadStream } = require("fs");
const { imageSchema } = require('./schema/sentimentAnalyser');

const routes = async (fastify, opt, next) => {
  fastify.get("/", (_, res) => {
    res.send({
      success: true,
      message: "Server is ip...",
    });
  });

  fastify.get("/image", imageSchema, (req, res) => {
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
