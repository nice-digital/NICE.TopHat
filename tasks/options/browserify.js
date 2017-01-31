var cssify = require('cssify')
  , partialify = require('partialify/custom')
  , minifyify = require('minifyify');

module.exports = function( config ) {
    return {
        options: {
            transform: [ cssify, partialify.onlyAllow(['html']) ],
            banner: '/*!\n@name <%= pkg.name %>\n@version <%= pkg.version %> | <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n'
        },

        dist: {
            files: {
                'dist/tophat.dev.js': [ './temp/tophat.js' ]
            }
        }
    };
};
