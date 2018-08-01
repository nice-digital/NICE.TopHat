const path = require("path"),
	VisualRegressionCompare = require("wdio-visual-regression-service/compare");

const config = require("./wdio.conf").config;

/**
 * Gets the full, absolute path of a screenshot folder
 * @param {string} folder The name of the sub folder in which to save screenshots
 */
const getScreenshotPath = (folder) => {
	return (context) => {
		const basePath = path.join(__dirname, "screenshots", folder),
			browserWidth = context.meta.viewport.width,
			browserHeight = context.meta.viewport.height,
			browserVersion = parseInt(/\d+/.exec(context.browser.version)[0]),
			browserNameVersion = `${ context.browser.name }_v${browserVersion}`;

		const fileName = [
			context.test.title,
			browserNameVersion,
			`${browserWidth}x${browserHeight}`
		].join("_") + ".png";

		return path.join(basePath, browserNameVersion, `${browserWidth}x${browserHeight}`, fileName);
	};
};

const configOverrides = {
	specs: [
		"./test/functional/**/*.js",
		"./test/visual/**/*.js"
	],
	capabilities: [
		{
			maxInstances: 5,
			browserName: "chrome",
			resolution: "1360x1020",
			chromeOptions: {
				args: ["--headless", "--window-size=1360,1020"]
			}
		},
		{
			maxInstances: 5,
			browserName: "firefox",
			resolution: "1360x1020"
		}
	],
	plugins: { "wdio-screenshot":{}},
	services: ["visual-regression"],
	visualRegression: {
		compare: new VisualRegressionCompare.LocalCompare({
			referenceName: getScreenshotPath("reference"),
			screenshotName: getScreenshotPath("taken"),
			diffName: getScreenshotPath("diff"),
			misMatchTolerance: 0.01,
		})
	}
};

exports.config = Object.assign({}, config, configOverrides);
