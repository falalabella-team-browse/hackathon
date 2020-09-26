
const options = {
    routePrefix: '/documentation',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Lords of Code: Reviews and Ratings',
        description: 'REST API with Node.js, which handles the raw data from elastic search and provides the required schema to the consumers',
        version: '1.0.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    }
}

module.exports = { options }