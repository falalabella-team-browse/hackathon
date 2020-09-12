const authRoutes = (fastify, opt, next) => {
  fastify.post("/register", async (req) => {
    return fastify.db.user.register(req.body);
  });

  fastify.post("/login", async (req) => {
    return fastify.db.user.login(req.body);
  });

  fastify.get("/validate", async (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader.indexOf(" ") === -1) {
      return {
        status: false,
        message: "Not Authorized",
        data: null,
      };
    }

    return fastify.db.user.validate(authHeader.split(" ")[1]);
  });

  next();
};

module.exports = authRoutes;
