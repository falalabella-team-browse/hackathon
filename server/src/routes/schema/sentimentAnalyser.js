const analyserSchema = {
	schema: {
		description: 'This API is to get sentiment analysis of the description posted by the user',
		tags: ['In House Algorithm'],
		body: {
			type: 'object',
			properties: {
				phrase: {
					type: 'string',
					description: 'rawText data to be analysed',
				},
				languageCode: {
					type: 'string',
					description: 'language of the text',
				},
			},
		},
		response: {
			200: {
				description: 'Successful response',
				type: 'object',
				properties: {
					sentimentScore: {
						type: 'number',
						description: 'Number value of the sentiment',
					},
					sentimentFactor: {
						type: 'string',
						description: 'Related sentiment Analysed',
					},
					hasAbusiveContent: {
						type: 'boolean',
						description: 'Indicated if it has wore than 2 abusive words',
					},
					review_score: {
						type: 'number',
						description: 'Calculated review score',
					},
					words: {
						type: 'object',
						description: '',
						properties: {
							tokens: {
								type: 'array',
								description: 'Array of all the words scanned considered for sentiment analysis',
							},
							positive: {
								type: 'array',
								description: 'Array of all positive words scanned',
							},
							negative: {
								type: 'array',
								description: 'Array of all negative words scanned',
							},
							totalScanned: {
								type: 'number',
								description: 'Number of words scanned',
							},
						},
					},
				},
			},
			500: {
				description: 'Internal Server Error',
				type: 'object',
				properties: {
					error: {
						type: 'object',
					},
				},
			},
		},
	},
};

module.exports = {
	analyserSchema,
};
