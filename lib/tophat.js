// stylesheet to be auto inserted
require('./tophat.css');

// import scripts
var utils = require('./tophat.utils');
var body = document.body;

// find or create the tophat element
var tophatElement = getTophatElement( 'tophat' );

// create the service and evidence elements
var serviceElement = require('./tophat.services')( tophatElement );
var evidenceElement = require('./tophat.evidence')( tophatElement );

// find or create the global element
var globalElement = utils.find( tophatElement, 'nice-global' )[0];
if (!globalElement) {
    var globalElement = require('./tophat.global')( tophatElement );
}

// create the search form and prepend it to the global element
var searchElement = require('./tophat.search')();
addSearchToGlobal( globalElement, searchElement );

// append all the parts to the tophat
constructTophat( tophatElement, serviceElement, evidenceElement, globalElement );

// attach the tophat to the top of the body
prependElement( tophatElement, body );

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

function constructTophat( el, services, evidenceResources, globalMenu ) {
    appendElement( services, el );
    appendElement( evidenceResources, el );
    appendElement( globalMenu, el );
}

function addSearchToGlobal( el, searchForm ) {
    var menu = utils.find( el, 'menu' )[0];

    if (menu) {
        return insertBeforeElement( searchForm, menu );
    }

    appendElement( searchForm, el.firstChild );
}

function prependElement( element, parent ) {
    parent.insertBefore( element, parent.firstChild );
}

function insertBeforeElement( element, sibling ) {
    var parent = sibling.parentNode;

    parent.insertBefore( element, sibling );
}

function appendElement( element, parent ) {
    parent.appendChild( element );
}
