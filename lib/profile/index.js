var utils = require("../utils/dom");
var xhr = require("../utils/xhr");
var tophatProfile = require("../templates/profile/menu.html");
var tophatProfileService = require("../templates/profile/service.html");
var tophatProfileAnon = require("../templates/profile/anon.html");
var tophatProfileLinks = require("../templates/profile/links.html");
var tophatProfileEndpoint = "/tophat";

function generateProfileElement( tophatElement, serviceElement, config ) {
	if (config.profile === "none") return;

	utils.insertBeforeElement( utils.create( tophatProfileAnon.replace("{{root}}", config.accountsUrl) ), utils.find( serviceElement, "menu" )[0] );

	xhr.get( config.accountsUrl + tophatProfileEndpoint + ( config.wtrealm ? "?wtrealm=" + config.wtrealm : "" ), function( data ) {
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
	var anonitem = utils.find( el, "menu-anonymous" )[0];
	var profileLink = utils.create( tophatProfileService );

	profileLink.setAttribute( "title", profile.display_name );
	profileLink.setAttribute( "aria-label", "User menu for " + profile.display_name );
	if (profile.thumbnail && profile.thumbnail.length) {
		profileLink.innerHTML = "<img src=\""+ profile.thumbnail +"\" class=\"profile-avatar\" alt=\"Your profile image\" />";
	}

	var linklist = generateLinkList( profile.links );
	var menu = utils.create( tophatProfile.replace( "{{menu}}", linklist ) );

	utils.insertBeforeElement( profileLink, anonitem );
	utils.remove( anonitem );
	utils.insertBeforeElement( menu, el.lastChild );
}

function generateAnonProfile( el, profile ) {
	var profileLink = utils.find( el, "menu-anonymous" )[0];

	if (profile.links && profile.links["Sign in"]) {
		profileLink.setAttribute( "href", profile.links["Sign in"] );
	}
}

function disableProfile( el ) {
	var profilenav = utils.find( el, "menu-profile" )[0];
	utils.remove( profilenav );
}

function generateLinkList( links ) {
	var output = [];
	for ( var label in links ) {
		var href = links[ label ];

		output.push( generateLink( label, href ) );
	}

	return output.join( "" );
}

function generateLink( label, href ) {
	var output = tophatProfileLinks
		.replace( /{{label}}/ig, label )
		.replace( /{{href}}/ig, href );

	return output;
}

module.exports = generateProfileElement;
