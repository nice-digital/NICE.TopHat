var cssify = require('cssify')
  , partialify = require('partialify/custom')
  , minifyify = require('minifyify');

module.exports = function( config ) {
    return {
        options: {
            transform: [ cssify, partialify.onlyAllow(['html']) ]
        },

        dist: {
            files: {
                'dist/tophat.dev.js': [ './temp/tophat.js' ]
            }
        }
    };
};
