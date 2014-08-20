module.exports = function( config ) {

    return {

        dev: {
            options: {
                useAvailablePort: true,
                keepalive: true,
                base: [ './dist', './test' ],
                open: '/visual.html'
            }

        }

    };

};
