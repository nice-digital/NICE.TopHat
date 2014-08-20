module.exports = function( config ) {

    return {

        options: {
            jshintrc  : '.jshintrc'
        }

      , gruntfile   : [ 'Gruntfile.js', 'tasks/**/*.js' ]

      , test        : [ 'test/*.js' ]

      , src         : [ 'lib/**/*.js' ]

    };

};
