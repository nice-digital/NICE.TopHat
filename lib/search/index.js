var utils = require("../utils/dom");
var tophatSearch = require("../templates/search/form.html");

function generateSearchElement( globalElement, serviceElement, config ) {
	if (!config.search) return;

	var params = parseQueryStringWithRegExp( window.location.search );

	var view = tophatSearch
		.replace("{{method}}", "get")
		.replace("{{action}}", config.search.replace( /"/g, "&quot;" ))
		.replace("{{typeaheadtype}}", config.typeaheadtype || "")
		.replace("{{typeaheadsource}}", config.typeaheadsource || "")
		.replace("{{placeholder}}", config.searchPlaceholder || "Search...")
		.replace("{{q}}", utils.htmlEncode(params.q || ""));

	alert(view);

	var searchElement = utils.create( view );

	addSearchToGlobal( globalElement, searchElement );

	return searchElement;
}

function addSearchToGlobal( el, searchForm ) {
	var menu = utils.find( el, "menu" )[0];

	if (menu) {
		return utils.insertBeforeElement( searchForm, menu );
	}

	utils.appendElement( searchForm, el.firstChild );
}


function decodeURIComponentExtended ( s ) {
	return decodeURIComponent( (s || "").replace( /\+/g, " " ) );
}

function extendParam( obj, name, val ) {
	var key = decodeURIComponentExtended( name );
	var value = decodeURIComponentExtended( val );
	var existing = obj[key];

	if ( typeof existing === "undefined" ) {
		obj[key] = value;
		return;
	}

	if ( typeof existing !== "object" || !existing.length ) {
		obj[key] = [ existing ];
	}

	obj[key].push( value );
}


function parseQueryStringWithRegExp( query ) {
	var match;
	var search = /([^&=]+)=?([^&]*)/g;

	var params = query.substring(1);
	var obj = {};

	while ( (match = search.exec( params )) ) {
		extendParam( obj, match[1], match[2] );
	}

	return obj;

}

module.exports = generateSearchElement;
