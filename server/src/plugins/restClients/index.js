const fastifyPlugin = require("fastify-plugin");
const AbortController = require("abort-controller");
const fetch = require('node-fetch');

const getDefaultTimeout = (url, config) => {
  const isCoreURL = new RegExp(".falabella.services/");
  const match = url.match(isCoreURL) || [];
  return match.length ? config.CORE_APIS_TIMEOUT : config.DEFAULT_TIMEOUT;
};

function restClient(fastify, options, next) {
  const restClient = {
    get: async (url, headers) => {
      let response = {};

      try {
        const res = await fetch(url, {
          method: "GET",
          headers: headers
        });
        if (!res.ok) {
          console.log("Failed", res)
          response = {};
        } else {
          response = await res.json();
        }
      } catch (e) {
        console.log("Failed: - Catch", e)
      }
      return response;
    },

    post: async (url, data, headers) => {
      const reqHeaders = {
        ...headers,
        "Content-Type": "application/json"
      };
      let response = {};
      const body = JSON.stringify(data);

      try {
        const res = await fetch(url, { method: 'POST', headers: reqHeaders, body});
        response = res.ok ? await res.json() : {};
      } catch (e) {
        console.log("Failed: - Catch", e)
      }
  
      return response;
    }
  };
  fastify.decorate("restClient", restClient);
  next();
}

module.exports = fastifyPlugin(restClient);
