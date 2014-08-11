var utils = require('./tophat.utils');
var serviceLinks = require('./tophat.services.links');
var tophatServices = require('./tophat.services.html');
var tophatServicesLinks = require('./tophat.services.links.html');

function generateServiceElement( tophatElement, config ) {
    cleanUp( tophatElement );

    var linklist = generateLinkList( serviceLinks );

    var el = utils.create( tophatServices.replace( '{{menu}}', linklist ) );

    if ( config.service ) {
        var active = utils.find( el, 'menu-' + config.service )[0];
        active.className = active.className + ' active';
    }

    return el;
}

function generateLinkList( links ) {
    var output = [];
    for ( var id in links ) {
        var link = links[id];

        output.push( generateLink( id, link ) );
    }

    return output.join( '' );
}

function generateLink( id, link ) {
    var output = tophatServicesLinks
          .replace( /{{id}}/ig, id )
          .replace( /{{label}}/ig, link.label )
          .replace( /{{href}}/ig, link.href );

    return output;
}

function cleanUp( tophatElement ) {
    var oldElement = utils.find( tophatElement, 'nice-services' )[0];

    if (oldElement) {
        oldElement.parentNode.removeChild( oldElement );
    }
}

module.exports = generateServiceElement;
