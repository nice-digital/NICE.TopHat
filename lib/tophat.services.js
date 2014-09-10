var utils = require('./tophat.utils');
var serviceLinks = require('./tophat.services.links');
var tophatServices = require('./tophat.services.html');
var tophatServicesLinks = require('./tophat.services.links.html');

function generateServiceElement( tophatElement, config ) {
    cleanUp( tophatElement );

    var menu = '';
    if (!config.internal) {
        menu = generateLinkList( serviceLinks, config.environment === 'beta' );
    }

    return generateServiceBar( menu, config );
}

function generateServiceBar( menu, config ) {
    var services = tophatServices
            .replace( '{{menu}}', menu )
            .replace( '{{homelink}}', config.home || 'http://www.nice.org.uk');

    var el = utils.create( services );

    if (config.internal) {
        utils.find( el, 'logo')[0].getElementsByTagName( 'small' )[0].innerHTML = config.internal;
    }

    return el;
}

function generateLinkList( links, isBeta ) {
    var output = [];
    for ( var id in links ) {
        var link = links[id];

        output.push( generateLink( id, link, isBeta ) );
    }

    return output.join( '' );
}

function generateLink( id, link, isBeta ) {
    var output = tophatServicesLinks
          .replace( /{{id}}/ig, id )
          .replace( /{{label}}/ig, link.label )
          .replace( /{{title}}/ig, link.title )
          .replace( /{{href}}/ig, ( isBeta ? link.beta : undefined ) || link.href );

    return output;
}

function cleanUp( tophatElement ) {
    var oldElement = utils.find( tophatElement, 'nice-services' )[0];

    if (oldElement) {
        oldElement.parentNode.removeChild( oldElement );
    }
}

module.exports = generateServiceElement;
