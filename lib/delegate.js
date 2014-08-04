require('../lib/c/tophat.css');

(function ( context, document ) {
    var add    = document.addEventListener ? 'addEventListener' : 'attachEvent'
      , prefix = document.addEventListener ? '' : 'on'
      , _find = function( root, search ){
        var find = document.getElementsByClassName ? nativeGetElementsByClassName : polyfilGetElementsByClassName;
        _find = find;

        return find( root, search );

        function nativeGetElementsByClassName( root, search ) {
            return root.getElementsByClassName(search);
        }

        function polyfilGetElementsByClassName( root, search ) {
            var d = root, elements, pattern, i, results = [];

            if (root.querySelectorAll) { // IE8
                return root.querySelectorAll("." + search);
            }

            if (root.evaluate) { // IE6, IE7
                pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
                elements = root.evaluate(pattern, d, null, 0, null);

                while ((i = elements.iterateNext())) {
                    results.push(i);
                }
            } else {
                elements = root.getElementsByTagName("*");
                pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");

                for (i = 0; i < elements.length; i++) {
                    if ( pattern.test(elements[i].className) ) {
                        results.push(elements[i]);
                    }
                }
            }

            return results;
        }
    };

    // find the tophat
    var tophatElement = _find( document.body, 'tophat' )[0]
      , serviceMenuElement = _find( tophatElement, 'nice-services' )[0]
      , activeElement = _find( serviceMenuElement, 'active' )[0];

    // build tophat from template


    // attach a click listener
    tophatElement[add](prefix + 'click', _clickhandler, true);
    document.body[add](prefix + 'click', _cancelhandler, true);

    function _clickhandler( ev ) {
        var target = ev.target || ev.srcElement;

        while ( target &&
                !~target.className.indexOf( 'menu-evidence' ) &&
                !~target.className.indexOf( 'menu-search' ) &&
                !~target.className.indexOf( 'menu-profile' ) ) {

            if ( ~target.className.indexOf( 'tophat' ) ) {
                target = undefined;
                break;
            }

            target = target.parentNode;
        }

        if (!target || ~target.className.indexOf( 'tophat' )) return;

        var event = _enhance( ev );
        event.preventDefault();

        if (target === activeElement) return;

        tophatElement.className = 'tophat ' + target.className.replace( ' active', '' ) + '-open';

        if (activeElement) activeElement.className = activeElement.className.replace( ' active', '' ).replace( ' open', '' );
        target.className += ' open';
        activeElement = target;
    }

    function _cancelhandler( ev ) {
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

    function _enhance( event ) {
        var _stopPropagation = event.stopPropagation
          , _preventDefault = event.preventDefault;

        event.stopPropagation = function() {
            if (_stopPropagation) {
                _stopPropagation.call( event );
            } else {
                event.cancelBubble = true;
            }
        };

        event.preventDefault = function() {
            if (_preventDefault) {
                _preventDefault.call( event );
            } else {
                event.returnValue = false;
            }
        };

        return event;
    }

})( this, document );
