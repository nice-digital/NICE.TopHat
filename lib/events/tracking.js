var domUtils = require("../utils/dom");

function trackingHandler( ev ) {
	var target = ev.target || ev.srcElement;
	target = getTrackingElement(target);
	if (!target) return;

	var category = "TopHat";
	var	action =  "Tophat click";
	var	labelEl = ( domUtils.find( target, "menu-label" )[0] || target);
	var	label = getLabel(labelEl);

	//Do not navigate to href if on the same page
	var href = target.getAttribute("href").indexOf("#") === 0 ? false : target.href;
	domUtils.enhanceEvent(ev).preventDefault();
	var navigateCallback = function() {
		if (href) window.location.href = href;
	};

	sendTrackedEvent( category, action, label, navigateCallback);
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

	if(element.classList.indexOf("menu-profile") > -1)
		menuStateLabel = "Profile" + (element.getAttribute("aria-expanded") == "true" ? " expanded" : " collapased");

	return menuStateLabel || element.textContent || element.innerText || element.innerHTML ;
}

function getTrackingElement(target){
	while(!(target.nodeName === "A" || target.nodeName === "BUTTON")) {

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
