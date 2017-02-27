var utils = require('../utils/dom');
var StateControl = require('./states');
var tophatClassname = 'nice-tophat';

function tophatEvents( document, tophatElement, serviceElement, config ) {
    if (config.internal) {
        tophatClassname += ' nice-internal';
    }

    StateControl.forElement( tophatElement );

    attachTophatEvents( document, tophatElement );
}

function attachTophatEvents( document, tophatElement ) {
    utils.attachDomEvent( tophatElement, 'click', utils.proxy( tophatElement, clickhandler ) );
    utils.attachDomEvent( document, 'click', utils.proxy( tophatElement, cancelhandler ) );
    utils.attachDomEvent( tophatElement, 'click', utils.proxy( tophatElement, trackingHandler ) );
    utils.attachDomEvent( tophatElement, 'submit', utils.proxy( tophatElement, searchHandler ) );

    // Throttle window resize event to 15fps
    var fps = 15,
        wait = Math.round(1000 / 15);
    utils.attachDomEvent( window, 'resize', utils.throttle(utils.proxy( tophatElement, resizeHandler), wait) );
}




// handlers
// 

// Hande the window resizing
function resizeHandler(e) {
    console.log("window resize handler");
    utils.setAriaStates();
}

function trackingHandler( ev ) {
    var target = ev.target || ev.srcElement;

    while ( !validateTrackedElement( target ) ) {

        if ( ~target.className.indexOf( 'nice-tophat' ) ) {
            target = undefined;
            break;
        }

        target = target.parentNode;
    }

    var href = target && ( target.href || target.getElementsByTagName('a')[0].href );

    if (!target || !href) return;

    var category = 'tophat';
    var labelEl = ( utils.find( target, 'menu-label' )[0] || target);
    var action = labelEl.textContent || labelEl.innerText || labelEl.innerHTML;
    var label = window.location.href;

    switch ( cleanClass( target.className ) ) {
        case 'menu-profile':
            action = 'Your Profile' + (~this.className.indexOf( target.className + '-open' ) ? ' expanded' : ' collapased');
            href = false;
            break;

        case 'menu-evidence':
        case 'menu-search':
            action += (~this.className.indexOf( target.className + '-open' ) ? ' expanded' : ' collapased');
            href = false;
            break;
    }

    ev.preventDefault();

    sendTrackedEvent( category, action, label, function() {
        if (href) window.location.href = href;
    });
}

function validateTrackedElement( target ) {
    var isTrackedElement = target &&
            target.nodeName.toLowerCase() === 'li' &&
            ( ~target.className.indexOf( 'menu-' ) || ~target.className.indexOf( 'evidence-' )  );

    return !!isTrackedElement;
}




function clickhandler( ev ) {
    var target = ev.target || ev.srcElement;

    while ( validateTarget( target ) ) {

        if ( ~target.className.indexOf( 'nice-tophat' ) ) {
            target = undefined;
            break;
        }

        target = target.parentNode;
    }

    var mustIgnoreEvent = !( target && !~target.className.indexOf( 'nice-tophat' ) );
    if (mustIgnoreEvent) return;

    ev.preventDefault();

    (ev.target || ev.srcElement).blur();

    switch ( cleanClass( target.className ) ) {
        case 'menu-evidence':
            this.state.toggleEvidence();
            break;

        case 'menu-profile':
            this.state.toggleProfile();
            break;

        case 'menu-mobile':
            this.state.toggleMobileMenu();
            break;
    }
}

function validateTarget( target ) {
    var isValid = target &&
            !~target.className.indexOf( 'menu-evidence' ) &&
            !~target.className.indexOf( 'menu-mobile' ) &&
            !~target.className.indexOf( 'menu-profile' );

    return !!isValid;
}




function cancelhandler( ev ) {
    var target = ev.target || ev.srcElement;

    if ( isTophatElement( target ) ) return;

    this.state.unfocus();
}

function isTophatElement( el ) {
    var tophatEvent = false;
    var target = el;

    while ( target ) {
        if ( target.className && ~target.className.indexOf( 'nice-tophat' ) ) {
            tophatEvent = true;
            break;
        }

        target = target.parentNode;
    }

    return tophatEvent;
}




function searchHandler( ev ) {
    var target = ev.target || ev.srcElement;

    if ( target.className && ~target.className.indexOf( 'nice-search' ) &&
            ~target.action.search( /%(25)?term/ig ) && target.q ) {

        var placeholder = target.q.getAttribute('placeholder');
        var q = target.q.value;
        var term = ( q !== placeholder ) ? escape( q.replace(/\s/g, '+') ) : '';
        var location = target.action.replace(/%(25)?term/ig, term);

        sendTrackedEvent( 'Search', term, location, function() {
            window.location.href = location;
        });

        ev.preventDefault();
    }
}




// Tracking helpers

function sendTrackedEvent( category, action, label, cb ) {
    if (cb) {
        window.setTimeout( cb, 50 );
    }

    if ( window.dataLayer && typeof window.dataLayer.push === 'function' ) {
      return sendDataLayerEvent( category, action, label );
    }

    if ( window._gaq && typeof window._gaq.push === 'function' ) {
      return sendGAEvent( category, action, label );
    }

    if ( typeof window.ga === 'function' ) {
        return sendUAEvent( category, action, label );
    }

    logEventToConsole( category, action, label );
}

function sendDataLayerEvent( category, action, label ) {
  var data = {
    event: 'GAevent',
    eventCategory: category,
    eventAction: action,
    eventLabel: label
  };

  window.dataLayer.push( data );
}

function sendGAEvent( category, action, label ) {
    var data = [ '_trackEvent', category, action, label ];

    window._gaq.push( data );
}

function sendUAEvent( category, action, label ) {
    var data = {
        category: category,
        action: action,
        label: label
    };

    window.ga( 'send', 'event', data );
}

function logEventToConsole( category, action, label ) {
    var console = window.console;

    if ( console && console.log ) {
        console.log( 'track', category, action, label );
    }
}




// utils

function cleanClass( className ) {
    return className.replace(' active', '');
}

function fireDomEvent( document, el, event, data ) {
    var evt;

    if ( document.createEventObject ) {
        // dispatch for IE
        evt = document.createEventObject();

        if (data) {
            for ( var pram in data ) {
                evt[param] = data[param];
            }
        }

        return el.fireEvent( 'on' + event, evt );
    }

    // dispatch for firefox + others
    evt = document.createEvent( "HTMLEvents" );
    evt.initEvent( event, true, true, data );

    el.dispatchEvent( evt );
}

module.exports = tophatEvents;
