// stylesheet to be auto inserted
require('./tophat.css');

// import scripts
var utils = require('./tophat.utils');
var body = document.body;

var config = require('./tophat.config.js')();

// find or create the tophat element
var tophatElement = getTophatElement( 'nice-tophat' );
require('./tophat.profile')( tophatElement, config );

// create the service and evidence elements
var serviceElement = require('./tophat.services')( tophatElement, config );
var evidenceElement = require('./tophat.evidence')( tophatElement, config );

// find or create the global element
var globalElement = utils.find( tophatElement, 'nice-global' )[0];
if (!globalElement) {
    var globalElement = require('./tophat.global')( tophatElement );
}

// create the search form and prepend it to the global element
var searchElement = require('./tophat.search')( globalElement, config );







composeTophat( tophatElement, serviceElement, evidenceElement, globalElement, config );

// attach all the events to the tophat
require('./tophat.events')( document, tophatElement, serviceElement );







// helper functions

function getTophatElement( classname ) {
  var el = utils.find( body, classname )[0];
  if (!el) {
      el = utils.create('<div class="'+ classname +'"/>');
  }

  return el;
}

function composeTophat( el, services, evidenceResources, globalMenu, config ) {
    utils.appendElement( services, el );
    utils.appendElement( evidenceResources, el );
    utils.appendElement( globalMenu, el );

    // attach the tophat to the top of the body
    utils.prependElement( tophatElement, body );
}
