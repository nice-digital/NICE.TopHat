module.exports = function( config ) {

    return {
        options: {
            removeComments: true,
            collapseWhitespace: true
        },

        templates: {
            files: [
                {
                    expand: true,     // Enable dynamic expansion.
                    cwd: 'lib/',      // Src matches are relative to this path.
                    src: ['**/*.html'], // Actual pattern(s) to match.
                    dest: 'temp/',   // Destination path prefix.
                }
            ]
        }
    };

};
