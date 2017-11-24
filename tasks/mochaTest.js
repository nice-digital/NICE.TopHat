module.exports = function() {
	return {
		teamcity: {
			options: {
				reporter: "mocha-teamcity-reporter",
			},
			src: ["test/unitTests/**/*.js"]
		},
		unit : {
			options: {
				reporter: "spec",
			},
			src: ["test/unitTests/**/*.js"]
		}
	};
};
