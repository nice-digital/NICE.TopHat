var files = [
	"Gruntfile.js",
	"tasks/**/*.js",
	"wdio.conf.js",
	"wdio.conf.browserstack.js",
	"test/**/*.js",
	"lib/**/*.js",
	"!lib/vendor/**/*.js"
];

module.exports = function() {
	return {
		default: {
			src: files
		},
		teamcity: {
			options: {
				format: "./node_modules/eslint-teamcity/index.js"
			},
			src: files
		}
	};
};
