var literalify = require('literalify');

module.exports = function( config ) {
    return {

        test: {
            files: {
                'browser/test.js': [ 'test/**/*.js' ]
            }
        },

        src: {
            options: {
                transform: [
                    literalify.configure({
                        'jquery': 'window.$'
                    })
                ]
            }

          , files: {
                'dist/tophat.js': [ './lib/delegate.js' ]
            }
        }
    };
};
