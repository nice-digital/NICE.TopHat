// 3rd party dependencies
var Cookies = require("js-cookie");

// Module in this project
var utils = require("../utils/dom");

// Templates
var cookieTemplate = require("../templates/cookie/message.html");

// Constants
var CookieKey = "seen_cookie_message",
	CookieValue = "yes",
	DefaultPolicyUrl = "https://www.nice.org.uk/cookies",
	DefaultMessage = "NICE uses cookies to make the site better.";

// Cached reference to the containing element for the cookie message
var cookieElement;


/**
 * Generates the cookie element by rendering the template with
 *
 * @param      {HTMLElement}  tophatElement  The tophat element
 * @param      {Object}  config         The config object
 * @return     {HTMLElement}  { The cookie element }
 */
function generateCookieElement( tophatElement, config ) {
	// Default is to not show cookies message.
	// So must be turned 'on' via a config option
	if (!config.cookie || config.cookie == "false") return;

	// if the cookie is already set then don't generate the message
	if(Cookies.get(CookieKey) && Cookies.get(CookieKey) === CookieValue) return;

	// Using 'implied content' so only show on first load
	// Remove this to show the message until a user clicks 'close'
	setCookie();

	var viewModel = getViewModel(config);

	var view = cookieTemplate
		.replace(/{{policyUrl}}/, viewModel.policyUrl)
		.replace(/{{message}}/, viewModel.message);

	cookieElement = utils.create( view );

	utils.attachDomEvent( cookieElement, "click", utils.proxy( tophatElement, closeHandler ) );

	return cookieElement;
}

/**
 * Gets the view model that will be rendered by the template for the cookie message.
 *
 * @param      {Object}  config      { The config object }
 * @return     {Object}  The view model.
 */
function getViewModel(config) {
	return {
		policyUrl: config.cookieUrl || DefaultPolicyUrl,
		message: utils.htmlEncode(config.cookieMessage || DefaultMessage)
	};
}

/**
 * Handle clicking on the close button to dismiss the cookie message.
 * Hides the cookie message and stores a cookie so the user doesn't see
 * the message again.
 *
 * @param      {Event}  ev      { Event argument }
 */
function closeHandler(ev) {
	var target = ev.target || ev.srcElement;

	while ( target && !~target.className.indexOf("js-close-cookie-message") ) {
		if ( ~target.className.indexOf( "nice-cookie" ) ) {
			target = undefined;
			break;
		}
		target = target.parentNode;
	}

	if(target && ~target.className.indexOf("js-close-cookie-message")) {
		setCookie();
		closeMessage();
	}
}

/**
 * Closes the cookie message.
 */
function closeMessage() {
	cookieElement.setAttribute("aria-hidden", true);
}

/**
 * Sets the cookie of `seen_cookie_message=yes` on the domain
 * '.nice.org.uk' so it's available to all sub domains.
 */
function setCookie() {
	var opts = {
		secure: false,
		expires: 365 * 10, // In days
	};

	if(window.location.hostname !== "localhost") {
		opts.domain = getCookieDomain(window.location.hostname);
	}

	Cookies.set(CookieKey, CookieValue, opts);
}

/**
 * Gets the domain for the cookie. This is '.nice.org.uk' for any site
 * under the NICE domain.
 *
 * @param      {string}  host    The host
 * @return     {string}  The cookie domain.
 */
function getCookieDomain(host) {
	return ~host.indexOf("nice.org.uk") ? ".nice.org.uk" : host;
}

module.exports = generateCookieElement;
