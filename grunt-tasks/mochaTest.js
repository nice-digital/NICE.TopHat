module.exports = function() {
	return {
		teamcity: {
			options: {
				reporter: require("mocha-teamcity-reporter"),
				recursive: true,
				require: ["./test/unit/_setup.js"]
			},
			src: ["test/unit/**/*.test.js"]
		},
		unit : {
			options: {
				reporter: "spec",
				recursive: true,
				require: ["./test/unit/_setup.js"]
			},
			src: ["test/unit/**/*.test.js"]
		}
	};
};
