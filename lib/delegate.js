(function ( context, document ) {
    var add    = document.addEventListener ? 'addEventListener' : 'attachEvent'
      , prefix = document.addEventListener ? '' : 'on';

    function _listenOnEvent( ev, selector, handler ) {
        var _this = this
          , _handler = handler;

        handler = function ( event ) {
            // adapted from Zepto
            var target = event.target || event.srcElement,
                nodes = _find( _this.root, selector );

            while (target && !_isInElementList( target, nodes ) ) {
                target = target.parentNode;
            }

            if (target && target !== this && target !== document) {
                _handler.call(target, _enhance( event ), target);
            }
        };

        _this.root[add](prefix + ev, handler, true);

        return _this;
    }

    function delegate( root ) {
        return {
            root: root
          , on: _listenOnEvent
        };
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = delegate;
    } else {
        context.delegate = delegate;
    }

    // helpers

    var _find = function( root, search ){
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

    var _isInElementList = function( item, array ) {
        for (var i = 0, l = array.length; i < l; i++) {
            if (array[i] === item) return true;
        }

        return false;
    };

})( this, document );
