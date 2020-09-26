const negators = require('./negators.json');
const positors = require('./positors.json');
const abusors = require('./abusors.json');
const exclamators = require('./exclamators.json');
const invertors = require('./invertors.json');

module.exports = {
	negators,
	positors,
	abusors,
	exclamators,
	invertors,
	scoringStrategy: require('./scoring-strategy'),
};
