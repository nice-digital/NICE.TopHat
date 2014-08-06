var utils = require('./tophat.utils');
var evidenceLinks = require('./tophat.evidence.links');
var tophatEvidence = require('./tophat.evidence.html');
var tophatEvidenceLinks = require('./tophat.evidence.links.html');

function generateEvidenceElement( tophatElement ) {
    var linklist = generateLinkList( evidenceLinks );

    return utils.create( tophatEvidence.replace( '{{menu}}', linklist ) );
}

function generateLinkList( links ) {
    var output = [];
    for ( var label in links ) {
        var link = links[label];

        output.push( generateLink( label, link ) );
    }

    return output.join( '' );
}

function generateLink( label, link ) {
    var output = tophatEvidenceLinks
          .replace( /{{label}}/ig, label )
          .replace( /{{title}}/ig, link.title )
          .replace( /{{href}}/ig, link.href );

    return output;
}

module.exports = generateEvidenceElement;
