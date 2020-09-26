const constants = require('../configs/constants');

const getHelpfulScore = (helpful_count, isVerifiedPurchase) => {
	return isVerifiedPurchase
		? (helpful_count / 100) * constants.RNR_SCORE['HFS_V']
		: (helpful_count / 100) * constants.RNR_SCORE['HFS_NV'];
};
const getWordScore = (count, isVerifiedPurchase) => {
	return isVerifiedPurchase
		? (count / 100) * constants.RNR_SCORE['WS_V']
		: (count / 100) * constants.RNR_SCORE['WS_NV'];
};
const getRatingConfidenceScore = (rating, sentimentScore) => {
	if (sentimentScore != undefined && sentimentScore > 0)
		return Math.abs(rating - sentimentScore) < 2 ? rating / 10 : 0;
};

const getOverallRating = ({ count, verifiedPurchase, rating, sentimentScore, helpful_count }) => {
	return (
		(getHelpfulScore(helpful_count, verifiedPurchase) +
			getWordScore(count, verifiedPurchase) +
			getRatingConfidenceScore(rating, sentimentScore)) /
		3
	);
};

module.exports = getOverallRating;
