module.exports = function() {
	return {
		teamcity: {
			options: {
				reporter: "mocha-teamcity-reporter",
			},
			src: ["test/unitTests/**/*.js"]
		},
		test : {
			options: {
				reporter: "spec",
			},
			src: ["test/unitTests/**/*.js"]
		}
	};
};
