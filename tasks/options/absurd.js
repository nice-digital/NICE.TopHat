module.exports = function( config ) {

    return {
        options: {
            minify: true
        },

        dist:{
            files: {
                "temp/tophat.absurd.css": "lib/tophat.styles.js"
            }
        }
    };

};
