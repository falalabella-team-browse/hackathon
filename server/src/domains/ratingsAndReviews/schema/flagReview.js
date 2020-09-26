
const flagReviewSchema =  {
	schema: {
	  description: 'This API is to mark the review as helpful',
	  tags: ['For Client'],
	  body: {
		type: 'object',
		properties: {
          id: { 
            type: 'string',
            description: 'review id'
          },
          helpful_count: {
              type: 'number'
          },
          verifiedPurchase: {
            type: 'boolean'
          },
          rating: {
            type: 'number'
          },
          sentiment: {
            type: 'number'
          },
		  title: { 
			type: 'string',
		  },
		  description: { 
			type: 'string',
		  }
		}
	  },
	  response: {
		200: {
			description: 'Successful response',
			type: 'object',
			properties: {
			  success: { type: 'string' },
			  msg: { type: 'string' }
			}
		  },
		  400: {
			  description: "Bad Request",
			  type: 'object',
			  properties: {
				error: {
					type: 'object',
					properties: {
					  reason: { type: 'string' },
					}
				},
			  }
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

module.exports = flagReviewSchema