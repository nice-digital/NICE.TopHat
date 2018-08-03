/* global browser */
// Basic wdio config that runs functional tests against the standalone service

exports.config = {
	// Use selenium standalone server so we don't have spawn a separate server
	services: ["selenium-standalone"],

	specs: [
		"./test/functional/**/*.js"
	],

	// Assume user has Chrome and Firefox installed.
	capabilities: [
		{
			maxInstances: 5,
			browserName: "chrome",
			resolution: "1360x1020"
		}
		// In theory you could add FireFox but at time of writing
		// this bug is stopping you: https://github.com/webdriverio/webdriverio/issues/2675
		// But we can do inside Docker - see wdio.docker.conf.js
	],

	// Logging
	seleniumLogs: "./logs",
	logLevel: process.env.TEAMCITY_VERSION ? "result" : "silent",
	coloredLogs: true,
	screenshotPath: "./errorShots/",

	baseUrl: "http://" + (process.env.SITE || "localhost") + ":8000",
	reporters: process.env.TEAMCITY_VERSION ? ["spec", "teamcity"] : ["spec"],

	// Moch with ES6 via Babel
	framework: "mocha",
	mochaOpts: {
		ui: "bdd",
		timeout: 600000,
		compilers: [
			"js:babel-register"
		]
	},

	before: function() {
		browser.addCommand("isActive", selector => {
			return browser.execute(selector => {
				let focused = document.activeElement;

				if (!focused || focused == document.body) {
					return false;
				}
				else if (document.querySelector) {
					return document.querySelector(selector) === focused;
				}

				return false;
			}, selector).value;
		});
	}
};
