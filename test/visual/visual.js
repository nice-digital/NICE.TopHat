/* eslint-env mocha */
/* global browser */
var expect = require("chai").expect;

const viewports = [
	{ width: 1360, height: 1020 },
	{ width: 375, height: 812 } // iPhoneX
];

const products = [
	{
		name: "niceorg",
		url: "/niceorg.html"
	},
	{
		name: "guidance",
		url: "/guidance.html"
	},
	{
		name: "pathways",
		url: "/pathways.html"
	},
	{
		name: "standards",
		url: "/standards.html"
	},
	{
		name: "evidence",
		url: "/evidence.html"
	},
	{
		name: "evidence-search",
		url: "/evidence-search.html"
	},
	// BNF, BNFc and cks are geo restricted therefore the images and css files can't be accessed from the AWS build machine
	// {
	//   name: 'BNF',
	//   url: '/bnf.html'
	// },
	// {
	//   name: 'BNFc',
	//   url: '/bnfc.html'
	// },
	// {
	//   name: 'cks',
	//   url: '/cks.html'
	// },
	{
		name: "ROI",
		url: "/roi.html"
	},
	{
		name: "Appraisals",
		url: "/appraisals.html"
	},
	{
		name: "InDev",
		url: "/indev.html"
	}
];

products.map(product => {
	describe("Visually regress TopHat", function(){
		it(product.name, async function() {

			browser.deleteCookie("seen_cookie_message");

			await browser.url(product.url); // for base url see wdio.conf.js
			await browser.waitForExist(".nice-tophat .logo");

			var report = await browser.checkViewport({
				viewports: viewports
			});

			report.forEach((result, i) => {
				var viewport = viewports[i];
				var errorMessage = `Image for ${ product.name } didn't match at ${ viewport.width }x${ viewport.height }. Look at the screenshots/diff folder.`;

				expect(result.isExactSameImage, errorMessage).to.be.true;
			});
		});
	});
});
