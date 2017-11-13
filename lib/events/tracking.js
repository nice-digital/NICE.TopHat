var domUtils = require("../utils/dom");

function trackingHandler( ev ) {
	var target = ev.target || ev.srcElement;

	while ( !validateTrackedElement( target ) ) {
		target = target.parentNode;
	}

	if (!target) return;

	var href = target.href.indexOf("#") === -1 ? target.href : false;
	var category = "TopHat";
	var labelEl = ( domUtils.find( target, "menu-label" )[0] || target);
	var action =  "Tophat click";
	var label = getLabel(labelEl);

	domUtils.enhanceEvent(ev).preventDefault();

	sendTrackedEvent( category, action, label, function() {
		if (href) window.location.href = href;
	});
}

// Tracking helpers

function sendTrackedEvent( category, action, label, cb ) {
	var cbFn;
	if (cb) {
		var timeout = window.setTimeout( cb, 2000 );
		cbFn = function() {
			clearTimeout(timeout);
			cb();
		};
	}

	if ( window.dataLayer && typeof window.dataLayer.push === "function" ) {
		sendDataLayerEvent( category, action, label, cbFn );
	}

}

function sendDataLayerEvent( category, action, label, callback) {
	var data = {
		event: "TopHat",
		eventCategory: category,
		eventAction: action,
		eventLabel: label
	};

	if(callback) {
		data.eventCallback = callback;
	}

	window.dataLayer.push( data );
}

function getLabel(element){
	var menuStateLabel;

	if( domUtils.removeClass( element, "active" ) === "menu-profile")
		menuStateLabel = "Profile" + (element.getAttribute("aria-expanded") === "true" ? " expanded" : " collapased");

	return menuStateLabel || element.textContent || element.innerText || element.innerHTML ;
}

function validateTrackedElement( target ) {
	var isTrackedElement = target.nodeName === "A" || target.nodeName === "BUTTON";

	return isTrackedElement;
}

module.exports.handler = trackingHandler;
module.exports.sendTrackedEvent = sendTrackedEvent;
