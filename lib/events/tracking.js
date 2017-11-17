var domUtils = require("../utils/dom");

function trackingHandler( ev ) {
	var target = ev.target || ev.srcElement;
	target = getTrackingElement(target);
	if (!target) return;

	var category = "TopHat";
	var	action =  "Tophat click";
	var	labelEl = ( domUtils.find( target, "menu-label" )[0] || target);
	var	label = getLabel(labelEl);

	var href = target.getAttribute("href");
	var navigateCallback = createEventCallback(href);

	if(navigateCallback) {
		domUtils.enhanceEvent(ev).preventDefault();
	}

	sendTrackedEvent( category, action, label, navigateCallback);
}

function createEventCallback(href) {
	if(isInternalLink(href))
		return null;

	return function() { window.location.href = href; };
}

function isInternalLink(href) {
	return href.indexOf("#") === 0;
}

function sendTrackedEvent( category, action, label, callback ) {
	var callbackFunc;

	if (callback) {
		var timeout = window.setTimeout( callback, 2000 );
		callbackFunc = function() {
			clearTimeout(timeout);
			callback();
		};
	}

	if ( window.dataLayer && typeof window.dataLayer.push === "function" ) {
		var data = {
			event: "TopHat",
			eventCategory: category,
			eventAction: action,
			eventLabel: label
		};

		if(callback) {
			data.eventCallback = callbackFunc;
		}

		window.dataLayer.push(data);
	}

}

function getLabel(element) {
	var menuStateLabel;

	if(element.className.indexOf("menu-profile") > -1)
		menuStateLabel = "Profile" + (element.getAttribute("aria-expanded") == "true" ? " expanded" : " collapased");
	else if(element.className.indexOf("logo") > -1)
		menuStateLabel = "Logo";
	else if(element.className.indexOf("user-name") > -1)
		menuStateLabel = "Edit profile";

	return menuStateLabel || element.textContent || element.innerText || element.innerHTML ;
}

function getTrackingElement(target){
	while(!(target.nodeName === "A")) {

		if ( ~target.className.indexOf( "nice-tophat" ) ) {
			return undefined;
		}

		target = target.parentNode;
	}

	return target;
}

module.exports.getTrackingElement = getTrackingElement;
module.exports.handler = trackingHandler;
module.exports.getLabel = getLabel;
module.exports.sendTrackedEvent = sendTrackedEvent;
