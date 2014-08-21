var utils = require('./tophat.utils');
var serviceLinks = require('./tophat.services.links');
var tophatServices = require('./tophat.services.html');
var tophatServicesLinks = require('./tophat.services.links.html');

function generateServiceElement( tophatElement, config ) {
    cleanUp( tophatElement );

    var linklist = generateLinkList( serviceLinks, config.environment === 'beta' );

    var el = utils.create( tophatServices.replace( '{{menu}}', linklist ) );

    if ( config.service ) {
        var active = utils.find( el, 'menu-' + config.service )[0];
        active.className = active.className + ' active';
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
