var utils = require('./tophat.utils');
var xhr = require('./tophat.xhr');
var tophatProfile = require('./tophat.profile.html');
var tophatProfileService = require('./tophat.profile.service.html');
var tophatProfileAnon = require('./tophat.profile.anon.html');
var tophatProfileLinks = require('./tophat.profile.links.html');
var tophatProfileEndpoint = '/tophat';

function generateProfileElement( tophatElement, serviceElement, config ) {
    if (config.profile === 'none') return;

    utils.appendElement( utils.create( tophatProfileAnon.replace('{{root}}', config.accountsUrl) ), utils.find( serviceElement, 'menu' )[0] );

    xhr.get( config.accountsUrl + tophatProfileEndpoint + ( config.wtrealm ? '?wtrealm=' + config.wtrealm : '' ), function( data ) {
        if (!data) {
          disableProfile( tophatElement );
          return;
        }

        if (data.display_name) {
            generateProfile( tophatElement, data );
            return;
        }

        generateAnonProfile( tophatElement, data );
    });
}

function generateProfile( el, profile ) {
  var anonitem = utils.find( el, 'menu-anonymous' )[0];
  var profilenav = utils.create( tophatProfileService );
  var profileLink = profilenav.getElementsByTagName('a')[0];

  profileLink.setAttribute( 'title', profile.display_name );
  if (profile.thumbnail && profile.thumbnail.length) {
    profileLink.innerHTML = '<img src="'+ profile.thumbnail +'" class="profile-avatar" alt="Your profile image" />';
  }

  var linklist = generateLinkList( profile.links );
  var menu = utils.create( tophatProfile.replace( '{{menu}}', linklist ) );

  utils.insertBeforeElement( profilenav, anonitem );
  utils.remove( anonitem );
  utils.insertBeforeElement( menu, el.lastChild );
}

function generateAnonProfile( el, profile ) {
  var anonitem = utils.find( el, 'menu-anonymous' )[0];
  var profileLink = anonitem.getElementsByTagName('a')[0];

  if (profile.links && profile.links["Sign in"]) {
    profileLink.setAttribute( 'href', profile.links["Sign in"] );
  }
}

function disableProfile( el ) {
    var profilenav = utils.find( el, 'menu-profile' )[0];
    utils.remove( profilenav );
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
