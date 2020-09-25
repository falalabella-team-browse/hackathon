const negators = require('./negators.json');
const positors = require('./positors.json');
const abusors = require('./abusors.json');
const exclamators = require('./exclamators.json');
const invertors = require('./invertors.json');
// const data = require('./data.json');
// const fs = require('fs');

// const ntext = fs
// 	.readFileSync(
// 		'/Users/veereshnete/Veer/hackathon/hackathon/server/src/modules/controllers/sentiment/language/en/data1.txt'
// 	)
// 	.toString();

// const ptext = fs
// 	.readFileSync(
// 		'/Users/veereshnete/Veer/hackathon/hackathon/server/src/modules/controllers/sentiment/language/en/data2.txt'
// 	)
// 	.toString();

// const nArray = ntext.split('\n');

// const nObj = {};
// const pObj = {};
// nArray.forEach(dt => {
// 	nObj[dt] = -1;
// });

// const pArray = ptext.split('\n');
// pArray.forEach(dt => {
// 	pObj[dt] = 1;
// });

// const positive = {};
// const negative = {};
// for (let key in data) {
// 	if (data[key] > 0) positive[key] = data[key];
// 	else negative[key] = data[key];
// }

// const nwords = { ...nObj, ...negative };
// const pwords = { ...pObj, ...positive };

// console.log('data ---> ', JSON.stringify(pwords));

module.exports = {
	negators,
	positors,
	abusors,
	exclamators,
	invertors,
	scoringStrategy: require('./scoring-strategy'),
};
