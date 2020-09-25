const fastify = require('fastify');
const { analyserModule } = require('./modules');
const routes = require("./routes");
const { database } = require("./services");
const config = require("./plugins/config");
const restClient = require("./plugins/restClients");

const server = fastify({
	logger: true,
	pluginTimeout: 50000,
});

server.register(require('fastify-jwt'), {
	secret: process.env.JWT_SECRET,
});
server.register(require("fastify-env"), config);
server.register(restClient);
server.register(require("fastify-cors"), {
  origin: true,
});
server.register(database);
server.register(analyserModule);
server.register(routes, { prefix: '/api/v1' });

const start = async () => {
	try {
		await server.listen(3000);
		server.log.info(`server listening on ${server.server.address().port}`);
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

start();
