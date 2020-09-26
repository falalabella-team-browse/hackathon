const abusiveWords = require('./language/en/abusors.json');
const language = require('./language');

const hasAbusivesContent = (tokens = []) => {
	return tokens.filter(token => abusiveWords[token]).length ? true : false;
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

module.exports = { hasAbusivesContent, getSentimentFactor, applyScoringStrategy };
