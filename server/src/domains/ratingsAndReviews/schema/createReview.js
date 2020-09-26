
const createReviewSchema =  {
	schema: {
	  description: 'This API is to create the new review and ratings for a product ',
	  tags: ['For Client'],
	  body: {
		type: 'object',
		properties: {
		  entityId: { 
            type: 'string',
            description: 'entityId is the product skuid and it is mandatory'
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
		  author: { 
			type: 'string',
			description: 'user id'
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

module.exports = createReviewSchema