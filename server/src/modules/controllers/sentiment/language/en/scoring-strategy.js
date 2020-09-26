var invertors = require('./invertors.json');
var exclamatory = require('./exclamators.json');

module.exports = {
	apply: function(tokens, cursor, tokenScore) {
		if (cursor > 0) {
			var prevtoken = tokens[cursor - 1];

			if (invertors[prevtoken]) {
				tokenScore = -1 * tokenScore;
			}

			if (exclamatory[prevtoken]) {
				tokenScore = tokenScore + Math.sign(tokenScore) * 1;
			}
		}
		return tokenScore;
	},
};
