var invertors = require('./invertors.json');
var exclamatory = require('./exclamators.json');

module.exports = {
	apply: function(tokens, cursor, tokenScore) {
		if (cursor > 0) {
			var prevtoken = tokens[cursor - 1];
			var nextToken = tokens[cursor + 1];
			if (nextToken > tokens[cursor]) {
				tokenScore = ++tokenScore;
			}

			if (invertors[prevtoken]) {
				tokenScore = --tokenScore;
			}
			if (exclamatory[prevtoken]) {
				tokenScore = tokenScore + Math.sign(tokenScore) * 1;
			}
		}
		return tokenScore;
	},
};
