
const getReviewById =  {
	schema: {
	  description: 'This API is to create the new review and ratings for a product ',
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


const getReviews =  {
	schema: {
	  description: 'This API is to create the new review and ratings for a product ',
	  tags: ['For Client', 'For Admin and Analytics'],
	  params: {
		type: 'object',
		properties: {
          sort : { 
            type: 'string',
          },
          verifiedPurchase : { 
            type: 'boolean',
          },
          pageNo : { 
            type: 'number',
          },
          entityId : { 
            type: 'string',
          },
          reviewStatus : { 
            type: 'string',
          },
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

module.exports = { getReviewById , getReviews }