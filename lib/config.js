var attributes = [
	"service",
	"evidence",
	"environment",
	"timestamp",
	"search",
	"search-placeholder",
	"typeaheadtype",
	"typeaheadsource",
	"internal",
	"home",
	"wtrealm",
	"cookie",
	"cookie-message",
	"cookie-url",
	"skip-link-id"];

var accountsDomains = {
	"local": "http://nice.sts.local"
};

// Camel cases an attribute. E.g. search-placeholder becomes searchPlaceholder
// See http://stackoverflow.com/a/32604073/486434
function camelCaseAttribute(str) {
	// Lower cases the string
	return str.toLowerCase()
	// Replaces any - or _ characters with a space
		.replace( /[-_]+/g, " ")
	// Removes any non alphanumeric characters
		.replace( /[^\w\s]/g, "")
	// Uppercases the first character in each group immediately following a space
	// (delimited by spaces)
		.replace( / (.)/g, function($1) { return $1.toUpperCase(); })
	// Removes spaces
		.replace( / /g, "" );
}

function getTophatConfig() {
	var config = {};

	var tag = getTophatScriptTag();
	if (tag) {
		for( var i = 0, len = attributes.length; i < len; i++ ) {
			var key = attributes[i];
			var value = tag.getAttribute( "data-" + key );

			if ( value && value !== "" ) {
				config[ camelCaseAttribute(key) ] = value;
			}
		}
	}

	if (config.evidence) config.service = "evidence";

	config.accountsUrl = generateAccountsUrl( config );
	config.legacy = isLegacy();

	return config;
}

function getTophatScriptTag() {
	var tag = document.currentScript;
	if (tag) return tag;

	var tags = document.getElementsByTagName( "script" );

	for ( var i = 0, len = tags.length; i < len; i++ ) {
		var src = tags[i].src.toLowerCase();

		if ( /tophat(.*)?\.js/i.test(src) ) {
			return tags[i];
		}
	}
}

function generateAccountsUrl( config ) {
	var env = (config.environment || "live").toLowerCase();
	var accountsDomain = accountsDomains[env] || "https://" + ( env !== "live" ? env + "-" : "" ) + "accounts.nice.org.uk";

	return accountsDomain;
}

function isLegacy()
{
	// legacy mode is for IE7 icon content
	if ( navigator.appName == "Microsoft Internet Explorer" ) {
		var ua = navigator.userAgent;
		var re  = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
		if ( re.exec(ua) !== null ) {
			return parseFloat( RegExp.$1 ) === 7;
		}
	}

	return false;
}

var generatedConfig = getTophatConfig();

module.exports = generatedConfig;
