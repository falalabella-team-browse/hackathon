const neutrals = require('./language/en/neutrals.json');
const abusiveWords = require('./language/en/abusors.json');
const language = require('./language');

const removeNeutrals = (tokens = []) => {
	return tokens.filter(token => !neutrals[token]);
};

const hasAbusivesContent = (tokens = []) => {
	return tokens.filter(token => abusiveWords[token]).length ? true : false;
};

const getSentimentFactor = score => {
	if (score > 1) {
		return score < 5 ? 'Happy' : 'Super';
	} else if (score < -1) {
		return score < -5 ? 'Sad' : 'Super Sad';
	}
	return 'Neutral';
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

module.exports = { removeNeutrals, hasAbusivesContent, getSentimentFactor, applyScoringStrategy };
