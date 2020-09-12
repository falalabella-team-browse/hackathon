const fp = require("fastify-plugin");
const mongoose = require("mongoose");
const { userController } = require("./controllers");
const { UserSchema } = require("./schema");

const getConnection = async ({
  DB_HOST,
  DB_PORT,
  DB_NAME,
  AUTH_DB,
  DB_USERNAME,
  DB_PASSWORD,
}) => {
  const connectionStr = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

  return mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: DB_USERNAME,
    pass: DB_PASSWORD,
    authSource: AUTH_DB,
  });
};

const database = fp(async (fastify, opt, next) => {
  await getConnection(fastify.config);

  const User = mongoose.model("user", UserSchema);

  fastify.decorate("db", {
    user: userController(fastify, User),
  });
  next();
});

module.exports = database;
