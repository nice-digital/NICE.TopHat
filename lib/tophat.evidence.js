var utils = require('./tophat.utils');
var evidenceLinks = require('./tophat.evidence.links');
var tophatEvidence = require('./tophat.evidence.html');
var tophatEvidenceService = require('./tophat.evidence.service.html');
var tophatEvidenceLinks = require('./tophat.evidence.links.html');

function generateEvidenceElement( tophatElement, serviceElement, config ) {
    if (config.internal) return;

    utils.appendElement( utils.create( tophatEvidenceService ), utils.find( serviceElement, 'menu' )[0] );

    var linklist = generateLinkList( evidenceLinks, config.environment === 'beta' );

    var el = utils.create( tophatEvidence.replace( '{{menu}}', linklist ) );

    if ( config.evidence ) {
        var active = utils.find( el, 'evidence-' + config.evidence )[0];
        active.className = active.className + ' active';
    }

    return el;
}

function generateLinkList( links, isBeta ) {
    var output = [];
    for ( var id in links ) {
        var link = links[ id ];

        output.push( generateLink( id, link, isBeta ) );
    }

    return output.join( '' );
}

function generateLink( id, link, isBeta ) {
    var output = tophatEvidenceLinks
          .replace( /{{id}}/ig, id )
          .replace( /{{label}}/ig, link.label )
          .replace( /{{title}}/ig, link.title )
          .replace( /{{href}}/ig, ( isBeta ? link.beta : undefined ) || link.href );

    return output;
}

module.exports = generateEvidenceElement;
