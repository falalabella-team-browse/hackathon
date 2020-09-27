
const getReviewById =  {
	schema: {
	  description: 'This API is to get the review and ratings with reviewId ',
	  tags: ['For Admin and Analytics'],
	  params: {
		type: 'object',
		properties: {
			    reviewId: { 
            type: 'string',
          }
		}
	  },
	  response: {
		  200: {
			description: 'Successful response',
			type: 'object',
			properties:{
					"reviewId":{
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
	  description: 'This API is to get all reviews and ratings for the product, all abusive reviews, all removed reviews, all published reviews with sortby and pagination feature',
	  tags: ['For Client', 'For Admin and Analytics'],
	  params: {
		type: 'object',
		properties: {
          sort : {
						type: 'string',
						default: 'review_score:desc',
						description:'Relevant -> review_score:desc ,  Recent -> created_date:desc, High to low -> rating:desc, Low to high -> rating:asc, Most Helpful -> helpful_count:desc'
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
								"totalNumberOfReviews":{
									"type":"integer",
								},
								"averageRating":{
									"type":"string",
								},
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

const getMyReviews =  {
	schema: {
	  description: 'This API is to get all reviews and ratings by the author. All abusive reviews, all removed reviews, all published reviews with sortby and pagination feature',
	  tags: ['For Client'],
	  params: {
		type: 'object',
		properties: {
          sort : { 
						type: 'string',
						default: 'review_score:desc',
						description:'Relevant -> review_score:desc ,  Recent-> created_date:desc, High to low -> rating:desc, Low to high -> rating:asc, Most Helpful -> helpful_count:desc'
          },
          pageNo : { 
            type: 'number',
          },
          author : { 
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
					"totalNumberOfReviews":{
						"type":"integer",
					},
					"averageRating":{
						"type":"string",
					},
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

module.exports = { getReviewById , getReviews, getMyReviews }