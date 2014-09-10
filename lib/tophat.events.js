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

    fireDomEvent( document, tophatElement, 'generated' );
}

function attachTophatEvents( document, tophatElement ) {
    attachDomEvent( tophatElement, 'click', proxy( tophatElement, clickhandler ) );
    attachDomEvent( document, 'click', proxy( tophatElement, cancelhandler ) );

    attachDomEvent( tophatElement, 'click', proxy( tophatElement, trackingHandler ) );
}

function trackingHandler( ev ) {
    var target = ev.target || ev.srcElement;

    var category = 'tophat'
      , action = utils.find( target, 'menu-label' )[0].innerHTML
      , label = window.location.href;

    if (~target.className.indexOf( 'menu-evidence' )) {
        action = action += !~this.className.indexOf( 'menu-evidence-open' ) ? ' expanded' : ' collapsed';
    }

    fireAnalyticsEvent( category, action, label );
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
        if ( target.className && ~target.className.indexOf( 'nice-tophat' ) ) {
            tophatEvent = true;
            break;
        }

        target = target.parentNode;
    }

    if ( tophatEvent ) return;

    this.className = tophatClassname;
    activeElement = undefined;
}

function fireAnalyticsEvent( tophatElement, c, a, l ) {
    fireDomEvent( document, tophatElement, 'track', {
        category: determineActualCategory( this, c )
      , action: this.options.action || a || (this.$trackingElement.is('form') ? 'submitted' : this.$element.attr('rel') || 'clicked')
      , label: this.options.label || l || determineAppropriateLabel( this )
    });
}

function attachDomEvent( el, ev, fn ) {
    el[add](prefix + ev, fn, true);
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

// event tracking methods

function determineActualCategory( tracker, c ) {
    var category = c || tracker.options.track
      , alternative = tracker.options[ category ];

    return alternative ? alternative : category;
}

function determineAppropriateLabel( tracker ) {
    var page = window.location.href
      , rel = tracker.$element.attr('rel')
      , title = tracker.$element.attr('title')
      , attr = tracker.$element.is('form') ? 'action' : 'href'
      , href = tracker.$element.attr( attr );

    if ( rel ) {
        return rel;
    }
    if ( title ) {
        return title;
    }
    if ( href ) {
        return href;
    }

    return page;
}

module.exports = tophatEvents;
