// Module responsible for handling dom events and delegating the action elsewhere
var domUtils = require("../utils/dom"),
	StateControl = require("./states"),
	tracking = require("./tracking"),
	getContainerIds = require("../utils/dom/getContainerIds");

var KeysDict = {
	left: 37,
	right: 39,
	space: 32,
	enter: 13,
	home: 36,
	end: 35,
	escape: 27,
	up: 38,
	down: 40
};

function tophatEvents( document, tophatElement ) {
	StateControl.forElement( tophatElement );

	attachTophatEvents( document, tophatElement );
}

function attachTophatEvents( document, tophatElement ) {
	domUtils.attachDomEvent( tophatElement, "click", domUtils.proxy( tophatElement, clickhandler ) );
	domUtils.attachDomEvent( document, "click", domUtils.proxy( tophatElement, cancelhandler ) );
	domUtils.attachDomEvent( tophatElement, "click", domUtils.proxy( tophatElement, tracking.handler ) );
	domUtils.attachDomEvent( tophatElement, "submit", domUtils.proxy( tophatElement, searchHandler ) );
	domUtils.attachDomEvent( tophatElement, "keydown", domUtils.proxy( tophatElement, keyHandler ) );

	// Throttle window resize event to 15fps
	var fps = 15,
		wait = Math.round(1000 / fps);
	domUtils.attachDomEvent( window, "resize", domUtils.throttle(domUtils.proxy( tophatElement, resizeHandler), wait) );
}

// Handle key press to delegate action
function keyHandler(e) {

	// Get keycode, decide what to do based on the key
	var target = e.target || e.srcElement,
		keyCode = e.which || e.keyCode;

	//Gets menuIds controlled by the element controlling the parentmenu
	var parentMenuEl = domUtils.closestWithClass(target, "menu");
	var menuIdsWithinScope = getContainerIds(parentMenuEl,domUtils,this.state.data.mobile);

	if(keyCode === KeysDict.escape) {
		this.state.unfocus(); // Close all menus
		if(parentMenuEl) {
			// Return focus to the controlling link for a sub menu
			var controllerLinkId = parentMenuEl.getAttribute("aria-labelledby");
			document.getElementById(controllerLinkId).focus();
		}
		return;
	}
	else if(keyCode === KeysDict.enter || keyCode === KeysDict.space) {
		// Pressing space/enter 'activates' a link/button so use the click handler we already have
		clickhandler.call(this, e);
		return;
	}

	if(!menuIdsWithinScope) {
		return;
	}

	switch(keyCode) {
		case KeysDict.left:
		case KeysDict.up:
			domUtils.getPreviousLink(menuIdsWithinScope, target).focus();
			break;
		case KeysDict.right:
		case KeysDict.down:
			domUtils.getNextLink(menuIdsWithinScope, target).focus();
			break;
		case KeysDict.home:
			domUtils.getLinks(menuIdsWithinScope)[0].focus();
			break;
		case KeysDict.end:
			var links = domUtils.getLinks(menuIdsWithinScope);
			links[links.length - 1].focus();
			break;
		default:
			return;
	}
	domUtils.enhanceEvent(e).preventDefault();
}

// Hande the window resizing
function resizeHandler() {
	this.state.setAriaStates();
}

function clickhandler( ev ) {
	var target = ev.target || ev.srcElement;

	while ( validateTarget( target ) ) {

		if ( ~target.className.indexOf( "nice-tophat" ) ) {
			target = undefined;
			break;
		}

		target = target.parentNode;
	}

	var mustIgnoreEvent = !( target && !~target.className.indexOf( "nice-tophat" ) );
	if (mustIgnoreEvent) return;

	ev.preventDefault();

	(ev.target || ev.srcElement).blur();
	var elementId = domUtils.removeClass( target, "active" );
	switch (elementId) {
		case "menu-evidence":
			this.state.toggleEvidence();
			focusOnMenu(elementId);
			break;

		case "menu-profile":
			this.state.toggleProfile();
			focusOnMenu(elementId);
			break;

		case "menu-mobile":
			this.state.toggleMobileMenu();
			focusOnMenu(elementId);
			break;
	}
}

function focusOnMenu(controllerId){
	var controls = domUtils.getIdsOfControlledContainers(controllerId);
	var firstControlledContainer = document.getElementById(controls[0]);
	var menu = firstControlledContainer.querySelectorAll(".menu")[0] || firstControlledContainer;

	menu.focus();
}

function validateTarget( target ) {
	var isValid = target &&
            !~target.className.indexOf( "menu-evidence" ) &&
            !~target.className.indexOf( "menu-mobile" ) &&
            !~target.className.indexOf( "menu-profile" );

	return !!isValid;
}




function cancelhandler( ev ) {
	var target = ev.target || ev.srcElement;

	if ( isTophatElement( target ) ) return;

	this.state.unfocus();
}

function isTophatElement( el ) {
	var tophatEvent = false;
	var target = el;

	while ( target ) {
		if ( target.className && ~target.className.indexOf( "nice-tophat" ) ) {
			tophatEvent = true;
			break;
		}

		target = target.parentNode;
	}

	return tophatEvent;
}




function searchHandler( ev ) {
	var target = ev.target || ev.srcElement;

	if ( target.className && ~target.className.indexOf( "nice-search" ) &&
            ~target.action.search( /%(25)?term/ig ) && target.q ) {

		var placeholder = target.q.getAttribute("placeholder");
		var q = target.q.value;
		var term = ( q !== placeholder ) ? escape( q.replace(/\s/g, "+") ) : "";
		var location = target.action.replace(/%(25)?term/ig, term);

		tracking.sendTrackedEvent( "Search", term, location, function() {
			window.location.href = location;
		});

		ev.preventDefault();
	}
}

module.exports = tophatEvents;
