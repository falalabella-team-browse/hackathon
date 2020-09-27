var tokenize = require('./tokenize');
const languageData = require('./language');
const utils = require('./utils');

const analyse = ({
	phrase,
	opts = {},
	languageCode = 'en',
	callback,
	verifiedPurchase = false,
	rating = 1,
	helpful_count = 0,
	imageCount = 0,
}) => {
	if (typeof phrase === 'undefined') phrase = '';

	var { negators, invertors, positors } = languageData[languageCode];
	var labels = { ...negators, ...positors, invertors };
	if (typeof opts.extras === 'object') {
		labels = Object.assign(labels, opts.extras);
	}

	var { tokens, noOfWords } = tokenize(phrase),
		score = 0,
		scanned = [],
		positive = [],
		negative = [];
	const hasAbusiveContent = utils.hasAbusivesContent(tokens);

	var i = tokens.length;

	while (i--) {
		var word = tokens[i];
		if (!labels.hasOwnProperty(word)) continue;
		scanned.push(word);

		var tokenScore = labels[word];
		tokenScore = utils.applyScoringStrategy(languageCode, tokens, i, tokenScore);
		if (tokenScore > 0) positive.push(word);
		if (tokenScore < 0) negative.push(word);

		score = score + tokenScore;
	}

	const review_score = utils.getOverallRating({
		count: noOfWords,
		verifiedPurchase,
		rating,
		sentimentScore: score,
		helpful_count,
		imageCount,
	});

	var result = {
		sentimentScore: score,
		sentimentFactor: utils.getSentimentFactor(score),
		words: {
			tokens,
			totalScanned: scanned.length,
			positive,
			negative,
		},
		hasAbusiveContent,
		review_score,
	};

	if (typeof callback === 'function') {
		process.nextTick(function() {
			callback(null, result);
		});
	} else {
		return result;
	}
};

module.exports = { analyse };
