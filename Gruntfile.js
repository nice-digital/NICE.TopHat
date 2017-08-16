module.exports = function( grunt )
{
    "use strict";

    // helper function to load task configs

    function loadConfig( path, config ) {
        var glob = require( 'glob' )
          , object = {}
          , key;

        glob.sync('*', { cwd: path })
            .forEach(function( option ) {
                key = option.replace( /\.js$/, '' );
                object[key] = require( path + option )( config );
            });

        return object;
    }

    var config = {
        pkg: grunt.file.readJSON('package.json'), 
        env: process.env,
    };

    grunt.util._.extend(config, loadConfig( './tasks/options/', config ));

    grunt.initConfig(config);

    // load grunt tasks
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-mocha-test');

    // local tasks
    grunt.loadTasks('tasks');

    // clean
    // grunt.registerTask('clean'     , [ 'clean' ]);

    // test
    grunt.registerTask(
          'webserver'
        , 'Starts a dev web server on the first available port starting from 8000 with the test and dist folders as the root.'
        , [ 'connect:dev' ]);
    grunt.registerTask(
          'test'
        , 'runs jshint against the script and test files then runs the phantomcss html screenshot tests to check for cahnages to the designs'
        , [ 'jshint:test', 'mochaTest' ]);

    // build
    grunt.registerTask(
          'build'
        , 'builds the distributable scripts form the source files'
        , [ 'jshint:src', 'htmlmin:templates', 'less:dist', 'copy:temp', 'browserify:dist', 'uglify:dist', 'clean:temp' ]);

    // auto build
    grunt.registerTask('default'   , [ 'build', 'watch' ]);

};
