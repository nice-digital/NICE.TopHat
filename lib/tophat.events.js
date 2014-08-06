var utils = require('./tophat.utils');

function attachTophatEvents( document, tophatElement, serviceElement ) {
    var add    = document.addEventListener ? 'addEventListener' : 'attachEvent'
      , prefix = document.addEventListener ? '' : 'on';

    this.activeElement = utils.find( serviceElement, 'active' )[0];
    this.tophatElement = tophatElement;

    tophatElement[add](prefix + 'click', proxy( this, clickhandler ), true);

    document[add](prefix + 'click', proxy( this, cancelhandler ), true);
}

function clickhandler( ev ) {
    var target = ev.target || ev.srcElement;

    while ( validateTarget( target ) ) {

        if ( ~target.className.indexOf( 'tophat' ) ) {
            target = undefined;
            break;
        }

        target = target.parentNode;
    }

    var mustIgnoreEvent = !( target && !~target.className.indexOf( 'tophat' ) );
    if (mustIgnoreEvent) return;

    var event = enhance( ev ).preventDefault();

    var elementAlreadyActive = (target === activeElement);
    if (elementAlreadyActive) return;

    this.activeElement = updateStates( this.tophatElement, target, this.activeElement );
}

function cancelhandler( ev ) {
    var target = ev.target || ev.srcElement
      , tophatEvent = false;

    while ( target ) {
        if ( target.className && ~target.className.indexOf( 'tophat' ) ) {
            tophatEvent = true;
            break;
        }

        target = target.parentNode;
    }

    if ( tophatEvent || ~tophatElement.className.indexOf('-active') ) return;

    if (activeElement) activeElement.className = activeElement.className.replace( ' open', '' );
    tophatElement.className = 'tophat';
    activeElement = undefined;
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
    tophatElement.className = 'tophat ' + target.className.replace( ' active', '' ) + '-open';

    if (activeElement) {
        activeElement.className = activeElement.className.replace( ' active', '' ).replace( ' open', '' );
    }

    target.className += ' open';

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

module.exports = attachTophatEvents;
