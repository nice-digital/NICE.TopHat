module.exports = function() {
	return {
		teamcity: {
			options: {
				reporter: require("mocha-teamcity-reporter"),
				recursive: true,
				require: ["./test/unitTests/_setup.js"]
			},
			src: ["test/unitTests/**/*.test.js"]
		},
		unit : {
			options: {
				reporter: "spec",
				recursive: true,
				require: ["./test/unitTests/_setup.js"]
			},
			src: ["test/unitTests/**/*.test.js"]
		}
	};
};
