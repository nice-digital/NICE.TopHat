// stylesheet to be auto inserted
require('./tophat.css');

require('./vendor/matchMedia');

// import scripts
var utils = require('./utils/dom');
var body = document.body;

var config = require('./config');

// find or create the tophat element
var tophatElement = getTophatElement( 'nice-tophat', config );

// create the service elements
var serviceElement = require('./services')( tophatElement, config );

// create the evidence elements
var evidenceElement = require('./evidence')( tophatElement, serviceElement, config );

// create the profile elements
require('./profile')( tophatElement, serviceElement, config );

// find or create the global element
var globalElement = require('./global')( tophatElement );

// create the search form and prepend it to the global element
var searchElement = require('./search')( globalElement, serviceElement, config );



composeTophat( tophatElement, serviceElement, evidenceElement, globalElement, config );

// attach all the events to the tophat
require('./events')( document, tophatElement, serviceElement, config );

// notify scripts that tophat has loaded
if (document.onTophatReady) {
    document.onTophatReady();
}



// helper functions

function getTophatElement( classname, config ) {
  var el = utils.find( body, classname )[0];
  if (!el) {
      el = utils.create('<div role="banner" class="'+ classname +'"></div>');
  }

  el.className = classname +
      ( config.internal ? ' nice-internal' : '' ) +
      ( config.legacy ? ' tophat-legacy' : '' );

  return el;
}

function composeTophat( el, services, evidenceResources, globalMenu, config ) {
    utils.appendElement( services, el );
    if (evidenceResources) utils.appendElement( evidenceResources, el );
    if (globalMenu) utils.appendElement( globalMenu, el );

    if ( config.service ) {
        var className = 'menu-' + config.service;
        var active = utils.find( el, className )[0];
        active.className += ' active';
        el.className += ' ' + className + '-active';
    }

    // attach the tophat to the top of the body
    utils.prependElement( tophatElement, body );
}
