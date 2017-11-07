var pkg = require("./package.json");

exports.config = {
	user: process.env.browserStackUser,
	key: process.env.browserStackKey,
	specs: [
		"./test/specs/functional/**/*.js"
	],
	maxInstances: 10,
	capabilities: [
		// Use https://www.browserstack.com/automate/webdriverio#configure-capabilities
		{
			// We use Edge as it's free, but also run the functional tests in headless Chrome in Docker
			project: "TopHat",
			name: "Functional tests - Edge",
			build: "TopHat " + pkg.version,
			browser: "Edge",
			os: "Windows",
			os_version: "10",
			browser_version: "16.0",
			resolution: "1024x768",
			"browserstack.debug": true
		}
	],
	sync: true,
	logLevel: "silent",
	coloredLogs: true,
	bail: 0,
	baseUrl: process.env.BASE_URL || "http://dev-tophat.nice.org.uk/",
	waitforTimeout: 10000,
	connectionRetryTimeout: 90000,
	connectionRetryCount: 3,
	services: ["browserstack"],
	framework: "mocha",
	reporters: ["spec", "teamcity"],
	mochaOpts: {
		ui: "bdd",
		timeout: 600000,
		compilers: [
			"js:babel-register"
		]
	}
};
