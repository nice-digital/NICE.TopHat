// 3rd party dependencies
var Cookies = require('js-cookie');

// Module in this project
var utils = require('../utils/dom');

// Templates
var cookieTemplate = require('../templates/cookie/message.html');

// Constants
var CookieKey = 'seen_cookie_message';

function generateCookieElement( tophatElement, config ) {
	// Default is to not show cookies message.
	// So must be turned 'on' via a config option
    if (!config.cookie || config.cookie == 'false') return;

    // if the cookie is already set then don't generate the message
    if(Cookies.get(CookieKey) && Cookies.get(CookieKey) === 'yes') return;

    var view = cookieTemplate
        .replace('{{label}}', utils.htmlEncode(config.cookieLabel || "NICE uses cookies to make the site better."));

    var cookieElement = utils.create( view );

    return cookieElement;
}

// TODO: Add click handler for close button

module.exports = generateCookieElement;
