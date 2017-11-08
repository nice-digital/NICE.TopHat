/* eslint-env mocha */
/* global browser */
var chai = require("chai");
chai.should();

const widths = [1920, 450];

function assertDiff(results) {
	results.forEach((result) => result.isExactSameImage.should.be.true);
}
const products = [
	{
		name: "niceorg",
		url: "/example.niceorg.html"
	},
	{
		name: "guidance",
		url: "/example.guidance.html"
	},
	{
		name: "pathways",
		url: "/example.pathways.html"
	},
	{
		name: "standards",
		url: "/example.standards.html"
	},
	{
		name: "evidence",
		url: "/example.evidence.html"
	},
	{
		name: "evidence-search",
		url: "/example.evidence-search.html"
	},
	// BNF, BNFc and cks are geo restricted therefore the images and css files can't be accessed from the AWS build machine
	// {
	//   name: 'BNF',
	//   url: '/example.bnf.html'
	// },
	// {
	//   name: 'BNFc',
	//   url: '/example.bnfc.html'
	// },
	// {
	//   name: 'cks',
	//   url: '/example.cks.html'
	// },
	{
		name: "ROI",
		url: "/example.roi.html"
	},
	{
		name: "Appraisals",
		url: "/example.appraisals.html"
	},
	{
		name: "InDev",
		url: "/example.indev.html"
	}
];

products.map(product => {
	describe("Visually regress TopHat", function(){
		it(product.name, async function() {

			await browser.url(product.url); // for base url see wdio.conf.js
			await browser.pause(2000);

			var report = await browser.checkDocument({
				widths: widths
			});
			assertDiff(report);
		});
	});
});
