module.exports = function( config ) {

    return {

        src: {
            files: 'lib/**/*',
            tasks: [ 'test', 'build' ]
        }

      , test: {
            files: 'test/**/*.js',
            tasks: [ 'test' ]
        }
    };

};
