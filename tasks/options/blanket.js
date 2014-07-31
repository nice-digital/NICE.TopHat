module.exports = function( config ) {

    return {

        coverage: {
            src: ['lib/'],
            dest: 'coverage/lib/'
        }

      , features: {
            src: ['test/lib/'],
            dest: 'coverage/test/lib/'
        }

    };

};
