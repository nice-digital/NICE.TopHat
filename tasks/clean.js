module.exports = function( config ) {

    return {
        coverage: {
            src: [ 'dist/', 'reports/', 'coverage/' ]
        },

        temp: {
            src: [ 'temp/' ]
        }
    };

};
