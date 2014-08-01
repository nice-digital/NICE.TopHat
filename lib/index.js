(function( context, document ) {

    delegate( document )
        .on( 'click', 'menu-evidence', toggleMenu)
        .on( 'click', 'menu-search', toggleMenu);

    function toggleMenu( ev, target ) {
        ev.preventDefault();
        ev.stopPropagation();

        if (~target.getAttribute('class').indexOf('active')) return;

        toggleCollapsible( target );
        toggleState( target, 'open' );
    }

    function toggleCollapsible( target ) {
        var menu = document.getElementById( target.childNodes[1].getAttribute('href').replace('#', '') );

        toggleState( menu, 'in' );
    }

    function toggleState( target, className ) {
        var classNames = target.getAttribute('class')
          , append = ' ' + className;

        if (!~classNames.indexOf(append)) {
            classNames += append;
        } else {
            classNames = classNames.replace(append, '');
        }

        target.setAttribute( 'class', classNames );
    }

})( this, document );
