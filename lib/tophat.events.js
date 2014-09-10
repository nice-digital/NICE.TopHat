var utils = require('./tophat.utils');
var activeElement;
var tophatClassname = 'nice-tophat';
var add, prefix;

function tophatEvents( document, tophatElement, serviceElement, config ) {
    add = document.addEventListener ? 'addEventListener' : 'attachEvent';
    prefix = document.addEventListener ? '' : 'on';

    if (config.internal) {
        tophatClassname += ' nice-internal';
    }

    attachTophatEvents( document, tophatElement );

    fireDomEvent( document, tophatElement, 'load' );
}

function attachTophatEvents( document, tophatElement ) {
    attachDomEvent( tophatElement, 'click', proxy( tophatElement, clickhandler ) );
    attachDomEvent( document, 'click', proxy( tophatElement, cancelhandler ) );
    attachDomEvent( tophatElement, 'click', proxy( tophatElement, trackingHandler ) );
}

function trackingHandler( ev ) {
    var target = ev.target || ev.srcElement;

    while ( !validateTrackedElement( target ) ) {

        if ( !!~target.className.indexOf( 'nice-tophat' ) ) {
            target = undefined;
            break;
        }

        target = target.parentNode;
    }

    if (!target) return;

    var event = enhance( ev ).preventDefault();
    var href = target.href || target.getElementsByTagName('a')[0].href;

    var category = 'tophat';
    var labelEl = ( utils.find( target, 'menu-label' )[0] || target);
    var action = labelEl.textContent || labelEl.innerText || labelEl.innerHTML;
    var label = window.location.href;

    switch (target.className) {
        case 'menu-evidence':
            action += (~this.className.indexOf('menu-evidence-open') ? ' expanded' : ' collapased');
            break;

        case 'menu-profile':
            action = 'Your Profile' + (~this.className.indexOf('menu-profile-open') ? ' expanded' : ' collapased');
            break;
    }

    sendTrackedEvent( category, action, label, function() {
        window.location.href = href;
    });
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

    var event = enhance( ev ).preventDefault();

    this.activeElement = updateStates( this, target, this.activeElement );
}

function cancelhandler( ev ) {
    var target = ev.target || ev.srcElement
      , tophatEvent = false;

    while ( target ) {
        if ( target.className && !!~target.className.indexOf( 'nice-tophat' ) ) {
            tophatEvent = true;
            break;
        }

        target = target.parentNode;
    }

    if ( tophatEvent ) return;

    this.className = tophatClassname;
    activeElement = undefined;
}

function sendTrackedEvent( category, action, label, cb ) {
    if ( window._gaq && typeof window._gaq.push === 'function' ) {
        return sendGAEvent( category, action, label, cb );
    }

    if ( typeof window.ga === 'function' ) {
        return sendUAEvent( category, action, label, cb );
    }

    if (console && console.log) {
        console.log( 'track', category, action, label );
        if (cb) cb();
    }
}

function sendGAEvent( category, action, label, cb ) {
    var data = [ '_trackEvent', category, action, label ];

    window._gaq.push( data );

    if (cb) window.setTimeout( cb, 50 );
}

function sendUAEvent( category, action, label, cb ) {
    var data = {
        category: category,
        action: action,
        label: label
    };

    if (cb) data.hitCallback = cb;

    window.ga( 'send', 'event', data );
}

function attachDomEvent( el, ev, fn ) {
    el[add]( prefix + ev, fn, true );
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

function proxy( context, fn ) {
    return function( ev ) {
        fn.call( context, ev );
    };
}

function validateTrackedElement( target ) {
    var isTrackedElement = target &&
            target.nodeName.toLowerCase() === 'li' &&
            !!~target.className.indexOf( 'menu-' );

    return isTrackedElement;
}

function validateTarget( target ) {
    var isValid = target &&
            !~target.className.indexOf( 'menu-evidence' ) &&
            !~target.className.indexOf( 'menu-search' ) &&
            !~target.className.indexOf( 'menu-profile' );

    return isValid;
}

function updateStates( tophatElement, target, activeElement ) {
    tophatElement.className = tophatClassname + ' ' + target.className.replace(' active', '') + '-open';

    return target;
}

function enhance( event ) {
    var _stopPropagation = event.stopPropagation
      , _preventDefault = event.preventDefault;

    event.stopPropagation = function() {
        if (_stopPropagation) {
            _stopPropagation.call( event );
        } else {
            event.cancelBubble = true;
        }

        return event;
    };

    event.preventDefault = function() {
        if (_preventDefault) {
            _preventDefault.call( event );
        } else {
            event.returnValue = false;
        }

        return event;
    };

    return event;
}

module.exports = tophatEvents;
