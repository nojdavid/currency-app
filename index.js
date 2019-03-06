var express = require('express');
var http = require('http');
var fs = require('fs');
var app = express();

app.use(express.static('client'));

app.get('/bananas', function(req, res) {
	console.log('hit banana')
	const { date, range } = req.query;

	const dateRegex = /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/;
	const rangeRegex = /^\d+$/;

	if (!dateRegex.test(date) || !rangeRegex.test(range)) {
		res.status(300).json({error: "input invalid"});
		res.end();
		return;
	}

	const dateSplit = date.split('/');
	let currentDate = new Date(dateSplit[2], dateSplit[0] - 1, dateSplit[1]);

	let total = 0;
	const basePrice = .05;

	for (let i = 0; i < range; ++i) {
		const today = currentDate.getDay();

		if (today !== 0 && today !== 6) {
			console.log('getDate', Math.floor((currentDate.getDate() - 1) / 7))
			switch (Math.floor((currentDate.getDate() - 1) / 7)) {
				case 0:
					total += basePrice;
					break;
				case 1: 
					total += (basePrice * 2);
					break;
				case 2: 
					total += (basePrice * 3);
					break;
				case 3: 
					total += (basePrice * 4);
					break;
				default:
					total += (basePrice * 5);
					break;
			}
		}

		currentDate.setDate(currentDate.getDate() + 1);
	}

	res.status(200).json({bananaCost: total});
	res.end();
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on port ${server.address().port}`);
});