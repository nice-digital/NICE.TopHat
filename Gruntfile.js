const path = require("path");

module.exports = function( grunt )
{
	"use strict";

	//load tasks
	require("load-grunt-config")(grunt, {
		configPath: path.join(process.cwd(), "grunt-tasks"),
		data : {
			pkg: grunt.file.readJSON("package.json")
		}
	});

	grunt.registerTask(
		"webserver"
		, "Starts a dev web server on the first available port starting from 8000 with the test and dist folders as the root."
		, [ "connect:dev" ]);

	// tests
	grunt.registerTask(
		"test"
		, "runs eslint against the script and test files then runs the phantomcss html screenshot tests to check for changes to the designs"
		, [ "eslint", "mochaTest:test" ]);

	grunt.registerTask(
		"testTeamcity"
		, "runs the test with the team city reporter"
		, [ "mochaTest:teamcity" ]);


	// build
	grunt.registerTask(
		"build"
		, "builds the distributable scripts form the source files"
		, [ "eslint:default", "htmlmin:templates", "less:dist", "postcss:dist", "copy:temp", "browserify:dist", "uglify:dist", "clean:temp" ]);

	// auto build
	grunt.registerTask("default", [ "build", "watch" ]);
};
