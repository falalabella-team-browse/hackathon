
const rangeBuckets = [
    {
        from: 0.0,
        to: 1.0,
    },
    {
        from: 1.0,
        to: 2.0,
    },
    {
        from: 2.0,
        to: 3.0,
    },
    {
        from: 3.0,
        to: 4.0,
    },
    {
        from: 4.0,
        to: 5.01,
    },
]

const generateQuery = (key, value) => {
	const queryterm = {}
	queryterm[`${key}`] = {
			value,
	}
	return (
		{
			term: queryterm,
		}
	)
}

const aggregator_Average = {
    avg_rating: {
        avg: {
            field: 'rating',
        },
    },
    rating_buckets: {
        range: {
            field: 'rating',
            ranges: rangeBuckets,
        },
    },
}

const aggregator_Analytics = {
    review_status:{
        terms:{
            field:"reviewStatus"
        }
    },
    avg_rating: {
        avg: {
            field: 'rating',
        },
    },
    rating_buckets: {
        range: {
            field: 'rating',
            ranges: rangeBuckets,
        },
    },
    sentiment_buckets: {
        range: {
            field: 'sentiment',
            ranges: rangeBuckets,
        },
    }
}

const aggEnums = {
    '0.0-1.0': '1',
    '1.0-2.0': '2',
    '2.0-3.0': '3',
    '3.0-4.0': '4',
    '4.0-5.01': '5',
};

module.exports = { rangeBuckets, generateQuery, aggregator_Average, aggregator_Analytics, aggEnums }