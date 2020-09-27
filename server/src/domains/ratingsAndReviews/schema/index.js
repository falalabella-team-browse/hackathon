const updateReviewSchema = require('./updateReview');
const createReviewSchema = require('./createReview');
const editReviewSchema = require('./editReview');
const flagReviewSchema = require('./flagReview');
const { getReviewById , getReviews, getMyReviews } = require('./getReview');
const { aggregation, analytics, histogram } = require('./aggregation')

module.exports = {
    updateReviewSchema,
    createReviewSchema,
    editReviewSchema,
    flagReviewSchema,
    getReviewById,
    getReviews,
    aggregation,
    analytics,
    histogram,
    getMyReviews
}