module.exports = function( config ) {

    return {

        test: {
            files: 'test/**/*.visual.js',
            tasks: [ 'test' ]
        },

        src: {
            files: 'lib/**/*.*',
            tasks: [ 'build' ]
        }

    };

};
