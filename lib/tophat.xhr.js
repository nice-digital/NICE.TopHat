var utils = require('./tophat.utils');
var xhr = {};

xhr.get = function( url, resolve ) {
    var body = document.body;
    var script = document.createElement("script");
    script.src = url + ( ~url.indexOf('?') ? '&' : '?' ) + Math.floor(Math.random() * 10000000000);

    // Handle Script loading
    var done = false;

    // Attach handlers for all browsers
    script.onload = script.onreadystatechange = function() {
        if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
            done = true;
            resolve( window._na );

            // Handle memory leak in IE
            script.onload = script.onreadystatechange = null;
            if ( body && script.parentNode ) {
                body.removeChild( script );
            }
        }
    };

    utils.prependElement( script, body );
};

module.exports = xhr;
