var domUtils = require("../utils/dom");

function trackingHandler( ev ) {
	var target = ev.target || ev.srcElement;

	while ( !validateTrackedElement( target ) ) {

		if ( ~target.className.indexOf( "nice-tophat" ) ) {
			target = undefined;
			break;
		}

		target = target.parentNode;
	}

	var href = target && ( target.href || target.getElementsByTagName("a")[0].href );

	if (!target || !href) return;

	var category = "TopHat";
	var labelEl = ( domUtils.find( target, "menu-label" )[0] || target);
	var action =  "Tophat click";
	var label = (labelEl.textContent || labelEl.innerText || labelEl.innerHTML);

	switch ( domUtils.removeClass( target, "active" ) ) {
		case "menu-profile":
			action = "Your Profile" + (~this.className.indexOf( target.className + "-open" ) ? " expanded" : " collapased");
			href = false;
			break;

		case "menu-evidence":
		case "menu-search":
			action += (~this.className.indexOf( target.className + "-open" ) ? " expanded" : " collapased");
			href = false;
			break;
	}

	ev.preventDefault();

	sendTrackedEvent( category, action, label, function() {
		if (href) window.location.href = href;
	});
}

// Tracking helpers

function sendTrackedEvent( category, action, label, cb ) {
	if (cb) {
		var timeout = window.setTimeout( cb, 2000 );
	}

	if ( window.dataLayer && typeof window.dataLayer.push === "function" ) {
		sendDataLayerEvent( category, action, label, cb );
	}

	else if ( window._gaq && typeof window._gaq.push === "function" ) {
		sendGAEvent( category, action, label );
	}

	else if ( typeof window.ga === "function" ) {
		sendUAEvent( category, action, label );
	}

	window.clearTimeout(timeout);
}

function sendDataLayerEvent( category, action, label, callback) {
	var data = {
		event: "TopHat",
		eventCategory: category,
		eventAction: action,
		eventLabel: label,
		eventCallback: callback
	};

	window.dataLayer.push( data );
}

function sendGAEvent( category, action, label ) {
	var data = [ "_trackEvent", category, action, label ];

	window._gaq.push( data );
}

function sendUAEvent( category, action, label ) {
	var data = {
		category: category,
		action: action,
		label: label
	};

	window.ga( "send", "event", data );
}

function validateTrackedElement( target ) {
	var isTrackedElement = target &&
            target.nodeName.toLowerCase() === "li" &&
            ( ~target.className.indexOf( "menu-" ) || ~target.className.indexOf( "evidence-" )  );

	return !!isTrackedElement;
}

module.exports.handler = trackingHandler;
module.exports.sendTrackedEvent = sendTrackedEvent;
