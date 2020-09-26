const language = require('./language');

const tokenize = (input, languageCode = 'en') => {
	const { positors, negators, abusors, exclamators, invertors } = language[languageCode];

	const tokenArray = input
		.toLowerCase()
		.replace(/\n/g, ' ')
		.replace(/[.,\/#!?$%\^&\*;:{}=_`\"~()]/g, ' ')
		.replace(/\s\s+/g, ' ')
		.trim()
		.split(' ');

	const noOfWords = tokenArray.length;
	const tokens = tokenArray.filter(token => {
		const sanitizedToken = token.replace(/['’'']+/g, '');
		return (
			positors[sanitizedToken] ||
			negators[sanitizedToken] ||
			abusors[sanitizedToken] ||
			exclamators[sanitizedToken] ||
			invertors[sanitizedToken]
		);
	});
	return { noOfWords, tokens };
};

module.exports = tokenize;
