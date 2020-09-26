const rangeBuckets = [
	{
		from: 0.0,
		to: 1.01,
	},
	{
		from: 1.01,
		to: 2.01,
	},
	{
		from: 2.01,
		to: 3.01,
	},
	{
		from: 3.01,
		to: 4.01,
	},
	{
		from: 4.01,
		to: 5.01,
	},
];

const generateQuery = (key, value) => {
	const queryterm = {};
	queryterm[`${key}`] = {
		value,
	};
	return {
		term: queryterm,
	};
};

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
};

const aggregator_Analytics = {
	review_status: {
		terms: {
			field: 'reviewStatus',
		},
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
	},
};

const aggregator_Histogram = {
	"rating_per_hour":{
	   "date_histogram":{
		  "field":"modified_date",
		  "calendar_interval":"hour"
	   },
	   "aggs":{
		  "rating_average":{
			 "avg":{
				"field":"rating"
			 }
		  }
	   }
	}
}

const aggEnums = {
	'0.0-1.01': '1',
	'1.01-2.01': '2',
	'2.01-3.01': '3',
	'3.01-4.01': '4',
	'4.01-5.01': '5',
};

module.exports = { rangeBuckets, generateQuery, aggregator_Average, aggregator_Analytics, aggEnums, aggregator_Histogram };
