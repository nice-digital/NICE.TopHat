var utils = require('./tophat.utils');
var xhr = require('./tophat.xhr');
var tophatProfile = require('./tophat.profile.html');
var tophatProfileLinks = require('./tophat.profile.links.html');

function generateProfileElement( tophatElement, config ) {
    xhr.get( config.accountsUrl, function( responseText, xhr ) {
        /*jslint evil: true */
        var data = new Function( 'return ' + responseText + ';' )();

        onGetProfileResult( tophatElement, data );
    }, function( responseError, xhr ) {
        /*jslint evil: true */
        var error = new Function( 'return ' + responseError + ';' )();

        onGetProfileResult( tophatElement, error );
    });
}

function onGetProfileResult( el, profile ) {
    if (profile.display_name) {
        return generateProfile( el, profile );
    }

    generateAnonymous( el, profile );
}

function generateProfile( el, profile ) {
    var profilenav = utils.find( el, 'menu-profile' )[0];
    var profileLink = profilenav.getElementsByTagName('a')[0];

    profileLink.setAttribute( 'title', profile.display_name );
    appendElement( utils.create('<span class="caret"/>'), profileLink );

    var linklist = generateLinkList( profile.links );
    var menu = utils.create( tophatProfile.replace( '{{menu}}', linklist ) );

    insertBeforeElement( menu, el.lastChild );
}

function generateAnonymous( el, profile ) {
    var menu = utils.find( el, 'menu-profile' )[0];
    var profileLink = menu.getElementsByTagName('a')[0];

    menu.className = 'menu-anonymous';
    profileLink.href = profile.links[ 'Sign in' ] + '/signin';
    profileLink.innerHTML = 'Sign in';
}

function generateLinkList( links ) {
    var output = [];
    for ( var label in links ) {
        var href = links[ label ];

        output.push( generateLink( label, href ) );
    }

    return output.join( '' );
}

function generateLink( label, href ) {
    var output = tophatProfileLinks
        .replace( /{{label}}/ig, label )
        .replace( /{{href}}/ig, href );

    return output;
}

function appendElement( element, parent ) {
    parent.appendChild( element );
}

function insertBeforeElement( element, sibling ) {
    var parent = sibling.parentNode;

    parent.insertBefore( element, sibling );
}

module.exports = generateProfileElement;
