
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
			type: 'object',
			properties:{
					"id":{
						"type":"string"
					},
					"entityId":{
						"type":"string"
					},
					"rating":{
						"type":"integer",
						"format":"int32"
					},
					"title":{
						"type":"string"
					},
					"description":{
						"type":"string"
					},
					"author":{
						"type":"string"
					},
					"created_date":{
						"type":"string"
					},
					"modified_date":{
						"type":"string"
					},
					"verifiedPurchase":{
						"type":"boolean"
					},
					"helpful_count":{
						"type":"integer",
						"format":"int32"
					},
					"imageLink":{
						"type":"array",
						"items":{
								
						}
					},
					"sentiment":{
						"type":"integer",
						"format":"int32"
					},
					"reviewStatus":{
						"type":"string"
					},
					"review_score":{
						"type":"number"
					}
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
			type: 'object',
			properties: {
					"data":{
						"type":"object",
						"properties":{
								"data":{
									"type":"array",
									"items":{
											"type":"object",
											"properties":{
												"id":{
														"type":"string"
												},
												"entityId":{
														"type":"string"
												},
												"rating":{
														"type":"integer",
														"format":"int32"
												},
												"title":{
														"type":"string"
												},
												"description":{
														"type":"string"
												},
												"author":{
														"type":"string"
												},
												"created_date":{
														"type":"string"
												},
												"modified_date":{
														"type":"string"
												},
												"verifiedPurchase":{
														"type":"boolean"
												},
												"helpful_count":{
														"type":"integer",
														"format":"int32"
												},
												"imageLink":{
														"type":"array",
														"items":{
															
														}
												},
												"sentiment":{
														"type":"integer",
														"format":"int32"
												},
												"reviewStatus":{
														"type":"string"
												},
												"review_score":{
														"type":"number"
												}
											}
									}
								},
								"meta":{
									"type":"object",
									"properties":{
											"total":{
												"type":"integer",
												"format":"int32"
											}
									}
								}
						}
					}
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

module.exports = { getReviewById , getReviews }