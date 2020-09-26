const getHelpfulScore = (count, isVerifiedPurchase) => {
	return isVerifiedPurchase ? (count / 100) * 5 : (count / 100) * 1;
};
const getWordScore = (count, isVerifiedPurchase) => {
	return isVerifiedPurchase ? (count / 100) * 2 : (count / 100) * 0.5;
};
const getRatingConfidenceScore = (rating, sentimentScore) => {
	if (sentimentScore != undefined && sentimentScore > 0)
		return Math.abs(rating - sentimentScore) < 2 ? rating / 10 : 0;
};

const getOverallRating = ({ count, verifiedPurchase, rating, sentimentScore }) => {
	console.log({ count, verifiedPurchase, rating, sentimentScore });
	return (
		(getHelpfulScore(count, verifiedPurchase) +
			getWordScore(verifiedPurchase, count) +
			getRatingConfidenceScore(rating, sentimentScore)) /
		3
	);
};

module.exports = getOverallRating;
