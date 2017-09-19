module.exports = function( config ) {

    return {
        options: {
            compress: true,
            cleancss: true,
            ieCompat: true
        },

        dist: {
            files: {
                "temp/tophat.css": "lib/styles/tophat.less"
            }
        }
    };

};
