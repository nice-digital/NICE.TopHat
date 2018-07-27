module.exports = function() {
	return {
		test: {
			files: "test/unit/**/*.js",
			tasks: [ "test" ]
		},
		src: {
			files: "lib/**/*.*",
			tasks: [ "build" ]
		}
	};
};
