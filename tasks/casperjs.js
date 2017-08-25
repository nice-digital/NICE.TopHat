module.exports = function( config ) {

    return {
        options: {
            async: {
                parallel: true
            }
        },

        desktop: [ './test/**/*.visual.js' ]
    };

};
