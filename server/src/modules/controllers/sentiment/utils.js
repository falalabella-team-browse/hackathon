const abusiveWords = require('./language/en/abusors.json');
const language = require('./language');
const constants = require('../../../configs/constants');

const hasAbusivesContent = (tokens = []) => {
	return tokens.filter(token => abusiveWords[token]).length > 2 ? true : false;
};

const getSentimentFactor = score => {
	if (score > 2) {
		return score < 5 ? 'HAPPY' : 'SUPER_HAPPY';
	} else if (score < -1) {
		return score > -5 ? 'SAD' : 'SUPER_SAD';
	}
	return 'NEUTRAL';
};

var defaultScoringStrategy = {
	apply: function(tokens, cursor, tokenScore) {
		return tokenScore;
	},
};

const applyScoringStrategy = (languageCode, tokens, cursor, tokenScore) => {
	var { scoringStrategy } = language[languageCode];
	var scoringStrategy = scoringStrategy || defaultScoringStrategy;
	return scoringStrategy.apply(tokens, cursor, tokenScore);
};

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

function getImageScore(imageCount, isVerifiedPurchase) {
	return isVerifiedPurchase ? imageCount * 1 : imageCount * 0.75;
}

const getOverallRating = ({ count, verifiedPurchase, rating, sentimentScore, helpful_count, imageCount }) => {
	return (
		getRatingConfidenceScore(rating, sentimentScore) +
		getImageScore(imageCount, verifiedPurchase) +
		(getHelpfulScore(helpful_count, verifiedPurchase) + getWordScore(count, verifiedPurchase)) / 2
	);
};

module.exports = { hasAbusivesContent, getSentimentFactor, applyScoringStrategy, getOverallRating };
