var cssify = require('cssify');

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
                    cssify
                ]
            }

          , files: {
                'dist/tophat.js': [ './lib/delegate.js' ]
            }
        }
    };
};
