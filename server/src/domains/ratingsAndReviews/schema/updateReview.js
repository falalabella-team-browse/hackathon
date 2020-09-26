
const updateReviewSchema =  {
	schema: {
	  description: 'This API is to update the status of review',
	  tags: ['For Client', 'For Admin and Analytics'],
	  body: {
		type: 'object',
		properties: {
          reviewId: { 
            type: 'string',
            description: 'review id'
          },
		  status: { 
			type: 'string',
			description: "Value should be one among 'Abusive', 'Published', 'Removed'"
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

module.exports = updateReviewSchema