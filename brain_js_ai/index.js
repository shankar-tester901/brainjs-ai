var app = require('express');
var brain = require('brain.js');
const catalyst = require("zcatalyst-sdk-node");

const network = new brain.NeuralNetwork();

//signed up from organic, signed up from adwords, no. of mails, no. of calls
//paid_customer =1 if more than USD10K as total revenue from the customer else freecustomer

//The AI is only as useful as the data being provided. So handle the data with care


function normalize(item) {
	return {
		input: normalizeInput(item.input),
		output: item.output
	}
}

function normalizeInput(input) {
	return {
		mails: input.mails / 40,
		calls: input.calls / 50
	};
}


app.get('/details', (req, res) => {
    console.log('Details invoked ');
	network.train([
		{ input: { org: 1, mail: 11, calls: 20 }, output: { paid_customer: 1 } },
		{ input: { adwords: 1, mails: 20, calls: 30 }, output: { free_prospect: 1 } },
		{ input: { org: 1, mails: 23, calls: 20 }, output: { free_prospect: 1 } },
		{ input: { adwords: 1, mails: 14, calls: 10 }, output: { paid_customer: 1 } },
		{ input: { org: 1, mails: 15, calls: 10 }, output: { free_prospect: 1 } },
		{ input: { adwords: 1, mails: 5, calls: 12 }, output: { paid_customer: 1 } },
		{ input: { org: 1, mails: 16, calls: 6 }, output: { paid_customer: 1 } },
		{ input: { adwords: 1, mails: 27, calls: 20 }, output: { paid_customer: 1 } },
		{ input: { adwords: 1, mails: 5, calls: 2 }, output: { paid_customer: 1 } },
	].map(normalize), { log: true })


	const test_free_prospect = network.run(normalizeInput({ adwords: 1, mails: 20, calls: 20 }))
	console.log('a free_prospect', test_free_prospect)
	//	const test_paid_customer = network.run(normalizeInput({ org: 1, mails: 5, calls: 10 }))
	//	console.log('a paid_customer', test_paid_customer)


	res.send(test_free_prospect);
})

module.exports = app;
