module.exports = function( config ) {

    return {

        options: {
            paths       : [ 'lib/c' ]
          , compress : true
          , cleancss : true
          , ieCompat : false
        }

      , src: {
            files: {
                'lib/c/tophat.css': 'lib/c/tophat.less'
            }
        }

      , dev: {
            options: {
                compress: false
              , cleancss: false
            }

          , files: {
                'lib/c/tophat.dev.css': 'lib/c/tophat.less'
            }
        }

    };

};
