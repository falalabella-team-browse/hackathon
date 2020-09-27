
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
			type: 'object',
			type: 'object',
			properties: {
					"totalNumberOfReviews":{
						"type":"integer",
					},
					"averageRating":{
						"type":"string",
					},
					"averageSentiment":{
						"type":"string",
					},
					"rating_buckets":{
						"type":"array",
						"items":{
								"type":"object",
								"properties":{
									"key":{
											"type":"string"
									},
									"value":{
											"type":"integer",
											"format":"int32"
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
			type: 'object',
			properties: {
				"totalNumberOfReviews":{
						"type":"integer",
						"format":"int32"
					},
					"averageRating":{
						"type":"number"
					},
					"rating_buckets":{
						"type":"array",
						"items":{
								"type":"object",
								"properties":{
									"key":{
											"type":"string"
									},
									"value":{
											"type":"integer",
											"format":"int32"
									}
								}
						}
					},
					"sentiment_buckets":{
						"type":"array",
						"items":{
								"type":"object",
								"properties":{
									"key":{
											"type":"string"
									},
									"value":{
											"type":"integer",
											"format":"int32"
									}
								}
						}
					},
					"review_status":{
						"type":"array",
						"items":{
								"type":"object",
								"properties":{
									"key":{
											"type":"string"
									},
									"value":{
											"type":"integer",
											"format":"int32"
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

const histogram =  {
	schema: {
	  description: 'This API is to get hourly analytical data on reviews and ratings of a product',
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
			properties: {
				"totalNumberOfReviews":{
					 "type":"integer",
					 "format":"int32"
				},
				"rating_per_hour":{
					 "type":"array",
					 "items":{
							"type":"object",
							"properties":{
								 "date":{
										"type":"string"
								 },
								 "label":{
									  "type":"string"
								 },
								 "timestamp":{
										"type":"integer",
										"format":"int64"
								 },
								 "value":{
										"type":"integer",
										"format":"int32"
								 },
								 "average":{
										"type":"number"
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

module.exports = { aggregation, analytics, histogram }