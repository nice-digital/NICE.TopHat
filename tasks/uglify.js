module.exports = function( config ) {

    return {
        dist: {
            options: {
                mangle: true,
                preserveComments: /^!/,
                sourceMap: true,
                sourceMapName: 'dist/tophat.map',
                compress: {
                  sequences: true,
                  dead_code: true,
                  conditionals: true,
                  booleans: true,
                  unused: true,
                  if_return: true,
                  join_vars: true,
                  drop_console: true
                }
            },

            files: {
                "dist/tophat.min.js": "dist/tophat.dev.js"
            }
        }
    };

};
