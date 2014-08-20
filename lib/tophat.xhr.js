var xhr = {};

xhr.get = function( url, resolve, reject ) {
    var x = getXHR();

    x.open( 'GET', url, true );

    x.onreadystatechange = function() {
        if ( x.readyState == 4 ) {
            if ( x.status == 200 && resolve ) {
                return resolve( x.responseText, x );
            }

            if (reject) {
                reject( x.responseText, x );
            }
        }
    };

    x.send(false);

    // return x;
};

var getXHR = function() {
    var http;

    try {
        http = new XMLHttpRequest();

        getXHR = function() {
             return new XMLHttpRequest();
        };
    }
    catch(e) {
        var msxml = [ 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP' ];

        for (var i=0, len = msxml.length; i < len; ++i) {
            try {
                http = new ActiveXObject(msxml[i]);

                getXHR = getActiveXHRFactory( msxml[i] );

                break;
            }
            catch(err) {}
        }
    }

    return http;
};

function getActiveXHRFactory( namespace ) {
    return function() {
        return new ActiveXObject( namespace );
    };
}

module.exports = xhr;
