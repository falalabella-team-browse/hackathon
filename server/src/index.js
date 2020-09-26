const fastify = require("fastify");
const routes = require("./routes");
const { storage } = require("./services");
const { analyserModule } = require("./modules");
const config = require("./plugins/config");
const restClient = require("./plugins/restClients");
const publicHandler = require("./routes/public");
const fastifySwagger = require("fastify-swagger");
const swagger = require('./swagger');

const server = fastify({
  logger: true,
  pluginTimeout: 50000,
  bodyLimit: 15485760,
});

server.register(require("fastify-env"), config);
server.register(restClient);
server.register(require("fastify-cors"), {
  origin: true,
});
server.register(require('fastify-swagger'), swagger.options);
server.register(storage);
server.register(analyserModule);
server.register(routes, { prefix: "/api/v1" });
// should be always at end
server.register(publicHandler);

const start = async () => {
  try {
    await server.listen(3000, '0.0.0.0');
    server.log.info(`server listening on ${server.server.address().port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
