var attributes = [ 'service', 'evidence', 'environment', 'timestamp', 'search' ];

function getTophatConfig() {
    var config = {};

    var tag = getTophatScriptTag();
    if (tag) {
        len = attributes.length;

        for( i = 0; i < len; i++ ) {
            var key = attributes[i];
            var value = tag.getAttribute( 'data-' + key );

            if ( value && value !== '' ) {
                config[ key ] = value;
            }
        }
    }

    if (config.evidence) config.service = 'evidence';

    config.accountsUrl = 'https://' + ( config.environment ? config.environment + '-' : '' ) + 'accounts.nice.org.uk/tophat';

    return config;
}

function getTophatScriptTag() {
    var tag = document.currentScript;
    if (tag) return tag;

    var i, len;
    var tags = document.getElementsByTagName( 'script' );
    len = tags.length;

    for (i = 0; i < len; i++) {
        if ( tags[i].src.indexOf('/tophat.js') || tags[i].src.indexOf('/tophat.dev.js') ) {
            return tags[i];
        }
    }
}

module.exports = getTophatConfig;
