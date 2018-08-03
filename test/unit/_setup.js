/* eslint no-global-assign: 0 */
const fs = require("fs");


// Override require for ignoring css
const Module = require("module");
const originalRequire = Module.prototype.require;
Module.prototype.require = function(modulePath) {
	if(modulePath.endsWith(".css")) {
		return null;
	}
	return originalRequire.apply(this, arguments);
};

// Load html modules as strings
require.extensions[".html"] = function (module, filename) {
	module.exports = fs.readFileSync(filename, "utf8");
};


// Fake a DOM with jsdom
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM("<!doctype html><html><head><title>Test</title></head><body><div id=\"main\"></div></body></html>");

// Set globals for use in tests
window = dom.window;
window.dataLayer = [];
document = dom.window.document;
HTMLElement = window.HTMLElement;
navigator = dom.window.navigator;
matchMedia = function() { return {}; };
