module.exports = function( config ) {

    return {

        options: {
            paths       : [ 'lib/c' ]
          , compress : false
          , cleancss : true
          , ieCompat : false
        }

      , src: {
            files: {
                'lib/c/tophat.css': 'lib/c/tophat.less'
            }
        }

    };

};
