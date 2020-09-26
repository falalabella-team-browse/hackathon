
const aggregation =  {
	schema: {
	  description: 'This API is to get the all average details of ratings and reviews of published products',
	  tags: ['For Client'],
	  params: {
		type: 'object',
		properties: {
          id: { 
            type: 'string',
          }
		}
	  },
	  response: {
		  200: {
			description: 'Successful response',
			type: 'object'
		  },
		  500: {
			  description: "Internal Server Error",
			  type: 'object',
			  properties: {
				error: {
					type: 'object',
				},
			  }
		  }
	  }
	}
}

const analytics =  {
	schema: {
	  description: 'This API is to get the average details of all ratings and reviews ',
	  tags: ['For Admin and Analytics'],
	  params: {
		type: 'object',
		properties: {
          id: { 
            type: 'string',
          }
		}
	  },
	  response: {
		  200: {
			description: 'Successful response',
			type: 'object'
		  },
		  500: {
			  description: "Internal Server Error",
			  type: 'object',
			  properties: {
				error: {
					type: 'object',
				},
			  }
		  }
	  }
	}
}

const histogram =  {
	schema: {
	  description: 'This API is to get analytical data on reviews and ratings of a product',
	  tags: ['For Admin and Analytics'],
	  params: {
		type: 'object',
		properties: {
          id: { 
            type: 'string',
          }
		}
	  },
	  response: {
		  200: {
			description: 'Successful response',
			type: 'object'
		  },
		  500: {
			  description: "Internal Server Error",
			  type: 'object',
			  properties: {
				error: {
					type: 'object',
				},
			  }
		  }
	  }
	}
}

module.exports = { aggregation, analytics, histogram }