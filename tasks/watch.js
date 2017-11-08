module.exports = function() {
	return {
		test: {
			files: "test/**/*.visual.js",
			tasks: [ "test" ]
		},
		src: {
			files: "lib/**/*.*",
			tasks: [ "build" ]
		}
	};
};
