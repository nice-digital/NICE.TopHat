var path = require("path");
var VisualRegressionCompare = require("wdio-visual-regression-service/compare");

function getScreenshotName(basePath) {
	return function(context) {
		var testName = context.test.title;
		var resolution = context.meta.width || context.meta.orientation || "unknown";
		var browserVersion = parseInt(/\d+/.exec(context.browser.version)[0]);
		var browserName = context.browser.name;

		return path.join(basePath, `${testName}_${browserName}_v${browserVersion}_${resolution}.png`);
	};
}

exports.config = {

	specs: [
		"./test/specs/**/*.js"
	],
	// Patterns to exclude.
	exclude: [
		// 'path/to/excluded/files'
	],
	maxInstances: 10,
	capabilities: [{
		maxInstances: 5,
		browserName: "chrome",
		resolution: "1920x1200"
	}],
	sync: true,
	logLevel: "silent",
	coloredLogs: true,
	bail: 0,
	screenshotPath: "./errorShots/",
	//baseUrl: 'http://website:8000',
	baseUrl: "http://" + process.env.SITE + ":8000",
	waitforTimeout: 10000,
	connectionRetryTimeout: 90000,
	connectionRetryCount: 3,
	plugins: { "wdio-screenshot":{}},
	services: ["visual-regression"],
	visualRegression: {
		compare: new VisualRegressionCompare.LocalCompare({
			referenceName: getScreenshotName(path.join(process.cwd(), "screenshots/reference")),
			screenshotName: getScreenshotName(path.join(process.cwd(), "screenshots/taken")),
			diffName: getScreenshotName(path.join(process.cwd(), "screenshots/diff")),
			misMatchTolerance: 0.01,
		})
	},
	framework: "mocha",
	reporters: ["spec","teamcity"],
	mochaOpts: {
		ui: "bdd",
		timeout: 600000,
		compilers: [
			"js:babel-register"
		]
	}
};
