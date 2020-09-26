
const editReviewSchema =  {
	schema: {
	  description: 'This API is to edit the existing review from customer',
	  tags: ['For Client'],
	  body: {
		type: 'object',
		properties: {
		  id: { 
            type: 'string',
            description: 'review id'
          },
		  rating: { 
            type: 'number',
            description: 'rating should be number between 1 to 5, will be thrown Bad_request for invalid data'
		  },
		  title: { 
				type: 'string',
				description: 'title is mandatory and max 160 characters'
		  },
		  description: { 
            type: 'string',
            description: 'description is mandatory'
          },
		  images: {
            type: 'array',
            items: { type: "string" },
			description: 'max five images are allowed'
		  }
		}
	  },
	  response: {
		200: {
			description: 'Successful response',
			type: 'object',
			properties: {
			  reviewId: { type: 'string' },
			  author: { type: 'string' },
			  entityId: { type: 'string' },
			  title: { type: 'string' },
			  description: { type: 'string' },
			  rating: { type: 'string' },
			  reviewStatus: { type: 'string' },
			  verifiedPurchase: { type: 'string' },
			  review_score: { type: 'string' },
			  imageLink: { type: 'string' }
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

module.exports = editReviewSchema