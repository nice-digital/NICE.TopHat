var utils = require('./tophat.utils');
var xhr = require('./tophat.xhr');
var tophatProfile = require('./tophat.profile.html');
var tophatProfileService = require('./tophat.profile.service.html');
var tophatProfileLinks = require('./tophat.profile.links.html');

function generateProfileElement( tophatElement, serviceElement, config ) {
    if (config.profile === 'none') return;

    utils.appendElement( utils.create( tophatProfileService ), utils.find( serviceElement, 'menu' )[0] );

    xhr.get( config.accountsUrl, function( data ) {
        if (!data) {
          disableProfile( tophatElement );
          return;
        }

        onGetProfileResult( tophatElement, data );
    });
}

function onGetProfileResult( el, profile ) {
    if (profile.display_name) {
        generateProfile( el, profile );
        return;
    }

    generateAnonymous( el, profile );
}

function generateProfile( el, profile ) {
    var profilenav = utils.find( el, 'menu-profile' )[0];
    var profileLink = profilenav.getElementsByTagName('a')[0];

    profileLink.setAttribute( 'title', profile.display_name );
    if (profile.thumbnail && profile.thumbnail.length) {
        profileLink.innerHTML = '<img src="'+ profile.thumbnail +'" class="profile-avatar" alt="Your profile image" />';
    }

    var linklist = generateLinkList( profile.links );
    var menu = utils.create( tophatProfile.replace( '{{menu}}', linklist ) );

    utils.insertBeforeElement( menu, el.lastChild );
}

function disableProfile( el ) {
    var profilenav = utils.find( el, 'menu-profile' )[0];
    utils.remove( profilenav );
}

function generateAnonymous( el, profile ) {
    var menu = utils.find( el, 'menu-profile' )[0];
    var profileLink = menu.getElementsByTagName('a')[0];

    menu.className = 'menu-anonymous';
    profileLink.href = profile.links[ 'Sign in' ];
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

module.exports = generateProfileElement;
