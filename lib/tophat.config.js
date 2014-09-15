var attributes = [ 'service', 'evidence', 'environment', 'timestamp', 'search', 'typeaheadtype', 'typeaheadsource', 'internal', 'home' ];

var accountsDomains = {
    "local": "http://nice.sts.local"
};

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

    var accountsDomain = accountsDomains[config.environment] || 'https://' + ( config.environment ? config.environment + '-' : '' ) + 'accounts.nice.org.uk';
    config.accountsUrl = accountsDomain + '/tophat';

    config.legacy = isLegacy();

    return config;
}

function getTophatScriptTag() {
    var tag = document.currentScript;
    if (tag) return tag;

    var i, len;
    var tags = document.getElementsByTagName( 'script' );
    len = tags.length;

    for (i = 0; i < len; i++) {
        var src = tags[i].src.toLowerCase();

        if ( !!~src.indexOf('/tophat.js') || !!~src.indexOf('/tophat.dev.js') ) {
            return tags[i];
        }
    }
}

function isLegacy()
{
    // legacy mode is for IE7 icon content
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
        if ( re.exec(ua) !== null ) {
            return parseFloat( RegExp.$1 ) === 7;
        }
    }

    return false;
}

module.exports = getTophatConfig;
