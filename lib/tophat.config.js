var attributes = [ 'service', 'evidence', 'environment', 'timestamp', 'search', 'typeaheadtype', 'typeaheadsource' ];

var accountsDomains = {
    "local": "http://nice.sts.local"
};

function getTophatConfig() {
    var config = { search: '' };

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

    var accountsDomain = accountsDomains[config.environment] || 'https://' + ( config.environment ? config.environment + '-' : '' ) + 'accounts.nice.org.uk';
    config.accountsUrl = accountsDomain + '/tophat';

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
