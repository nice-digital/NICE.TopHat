const path = require("path");

module.exports = function( grunt )
{
    "use strict";

    //load tasks
    require("load-grunt-config")(grunt, {
      configPath: path.join(process.cwd(), "tasks"),
      pkg: grunt.file.readJSON("package.json")
    });

    // package tasks
    grunt.loadNpmTasks('grunt-mocha-test');

    // local tasks
    grunt.loadTasks('tasks');

    // test
    grunt.registerTask(
          'test'
        , 'runs jshint against the script and test files then runs the phantomcss html screenshot tests to check for changes to the designs'
        , [ 'jshint:test', 'mochaTest:test' ]);

    grunt.registerTask(
          'testTeamcity'
        , 'runs the test with the team city reporter'
        , [ 'mochaTest:teamcity' ]);


    // build
    grunt.registerTask(
          'build'
        , 'builds the distributable scripts form the source files'
        , [ 'jshint:src', 'htmlmin:templates', 'less:dist', 'copy:temp', 'browserify:dist', 'uglify:dist', 'clean:temp' ]);

    // auto build
    grunt.registerTask('default', [ 'build', 'watch' ]);

};
