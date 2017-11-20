var fs = require('fs');


// Override require for ignoring css
var Module = require('module');
var originalRequire = Module.prototype.require;
Module.prototype.require = function(modulePath) {
	if(modulePath.endsWith(".css")) {
		return null;
	}
	return originalRequire.apply(this, arguments);
};

// Load html modules as strings
require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};


// Fake a DOM with jsdom
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM("<!doctype html><html><head><title>Test</title></head><body><div id='main'></div></body></html>");
window = dom.window;
document = dom.window.document;
navigator = dom.window.navigator;
// Fake matchMedia API
matchMedia = function() { return {}; };

/*window = {};
document = {
	createElement: function() {
		return {};
	},
	getElementsByTagName: function() {
		return [];
	},
	getElementsByClassName: null,
	querySelectorAll: function() {
		return [];
	},
	head: {
		appendChild: function() {
			return null;
		},
	}
};
navigator = {};
*/
