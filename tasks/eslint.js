module.exports = function() {
	return {
		configFiles: [ "Gruntfile.js", "tasks/**/*.js", "wdio.conf.js", "wdio.conf.browserstack.js" ],
		test: [ "test/**/*.js" ],
		src: [ "lib/**/*.js", "test/**/*.js", "!lib/vendor/**/*.js" ]
	};
};
