var literalify = require('literalify');

module.exports = function( config ) {
    return {

        test: {
            files: {
                'browser/test.js': [ 'test/**/browser.js' ]
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
                'dist/app.js': [ './lib/index.js' ]
            }
        }
    };
};
