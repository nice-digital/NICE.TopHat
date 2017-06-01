/*!
@name NICE.TopHat
@version 0.1.4 | 2017-05-26
*/

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

function injectStyleTag (document, fileName, cb) {
  var style = document.getElementById(fileName)

  if (style) {
    cb(style)
  } else {
    var head = document.getElementsByTagName('head')[0]

    style = document.createElement('style')
    if (fileName != null) style.id = fileName
    cb(style)
    head.appendChild(style)
  }

  return style
}

module.exports = function (css, customDocument, fileName) {
  var doc = customDocument || document
  /* istanbul ignore if: not supported by Electron */
  if (doc.createStyleSheet) {
    var sheet = doc.createStyleSheet()
    sheet.cssText = css
    return sheet.ownerNode
  } else {
    return injectStyleTag(doc, fileName, function (style) {
      /* istanbul ignore if: not supported by Electron */
      if (style.styleSheet) {
        style.styleSheet.cssText = css
      } else {
        style.innerHTML = css
      }
    })
  }
}

module.exports.byUrl = function (url) {
  /* istanbul ignore if: not supported by Electron */
  if (document.createStyleSheet) {
    return document.createStyleSheet(url).ownerNode
  } else {
    var head = document.getElementsByTagName('head')[0]
    var link = document.createElement('link')

    link.rel = 'stylesheet'
    link.href = url

    head.appendChild(link)
    return link
  }
}

},{}],2:[function(require,module,exports){
/*!
 * JavaScript Cookie v2.1.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

},{}],3:[function(require,module,exports){
var attributes = [
	'service',
	'evidence',
	'environment',
	'timestamp',
	'search',
	'search-placeholder',
	'typeaheadtype',
	'typeaheadsource',
	'internal',
	'home',
	'wtrealm',
	'cookie',
	'cookie-message',
	'cookie-url' ];

var accountsDomains = {
    "local": "http://nice.sts.local"
};

// Camel cases an attribute. E.g. search-placeholder becomes searchPlaceholder
// See http://stackoverflow.com/a/32604073/486434
function camelCaseAttribute(str) {
  // Lower cases the string
  return str.toLowerCase()
    // Replaces any - or _ characters with a space
    .replace( /[-_]+/g, ' ')
    // Removes any non alphanumeric characters
    .replace( /[^\w\s]/g, '')
    // Uppercases the first character in each group immediately following a space
    // (delimited by spaces)
    .replace( / (.)/g, function($1) { return $1.toUpperCase(); })
    // Removes spaces
    .replace( / /g, '' );
}

function getTophatConfig() {
    var config = {};

    var tag = getTophatScriptTag();
    if (tag) {
        for( var i = 0, len = attributes.length; i < len; i++ ) {
            var key = attributes[i];
            var value = tag.getAttribute( 'data-' + key );

            if ( value && value !== '' ) {
                config[ camelCaseAttribute(key) ] = value;
            }
        }
    }

    if (config.evidence) config.service = 'evidence';

    config.accountsUrl = generateAccountsUrl( config );
    config.legacy = isLegacy();

    return config;
}

function getTophatScriptTag() {
    var tag = document.currentScript;
    if (tag) return tag;

    var tags = document.getElementsByTagName( 'script' );

    for ( var i = 0, len = tags.length; i < len; i++ ) {
        var src = tags[i].src.toLowerCase();

        if ( /tophat(.*)?\.js/i.test(src) ) {
            return tags[i];
        }
    }
}

function generateAccountsUrl( config ) {
    var env = (config.environment || 'live').toLowerCase();
    var accountsDomain = accountsDomains[env] || 'https://' + ( env !== 'live' ? env + '-' : '' ) + 'accounts.nice.org.uk';

    return accountsDomain;
}

function isLegacy()
{
    // legacy mode is for IE7 icon content
    if ( navigator.appName == 'Microsoft Internet Explorer' ) {
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

},{}],4:[function(require,module,exports){
module.exports = {
    search: {
        href: "https://www.evidence.nhs.uk",
        label: "Evidence search",
        title: "Evidence search"
    },
    bnf: {
        href: "https://bnf.nice.org.uk",
        label: "BNF",
        title: "British National Formulary"
    },
    bnfc: {
        href: "https://bnfc.nice.org.uk",
        label: "BNFC",
        title: "British National Formulary for Children"
    },
    cks: {
        href: "https://cks.nice.org.uk",
        label: "CKS",
        title: "Clinical Knowledge Summaries"
    },
    journals: {
        href: "https://www.nice.org.uk/about/what-we-do/evidence-services/journals-and-databases",
        label: "Journals and databases",
        title: "Journals and databases"
    }
};

},{}],5:[function(require,module,exports){
module.exports = {
    pathways: {
        href: "https://pathways.nice.org.uk/",
        label: "NICE Pathways"
    },
    guidance: {
        href: "https://www.nice.org.uk/guidance",
        label: "NICE Guidance"
    },
    standards: {
        href: "https://www.nice.org.uk/standards-and-indicators",
        label: "Standards and&nbsp;indicators"
    }
};

},{}],6:[function(require,module,exports){
// 3rd party dependencies
var Cookies = require('js-cookie');

// Module in this project
var utils = require('../utils/dom');

// Templates
var cookieTemplate = require('../templates/cookie/message.html');

// Constants
var CookieKey = 'seen_cookie_message',
	CookieValue = 'yes',
	DefaultPolicyUrl = 'https://www.nice.org.uk/cookies',
	DefaultMessage = 'NICE uses cookies to make the site better.';

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
    if (!config.cookie || config.cookie == 'false') return;

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

    utils.attachDomEvent( cookieElement, 'click', utils.proxy( tophatElement, closeHandler ) );

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

	while ( target && !~target.className.indexOf('js-close-cookie-message') ) {
		if ( ~target.className.indexOf( 'nice-cookie' ) ) {
			target = undefined;
			break;
		}
		target = target.parentNode;
	}

	if(target && ~target.className.indexOf('js-close-cookie-message')) {
		setCookie();
		closeMessage();
	}
}

/**
 * Closes the cookie message.
 */
function closeMessage() {
	cookieElement.setAttribute('aria-hidden', true);
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
	return !!~host.indexOf("nice.org.uk") ? ".nice.org.uk" : host;
}

module.exports = generateCookieElement;

},{"../templates/cookie/message.html":14,"../utils/dom":28,"js-cookie":2}],7:[function(require,module,exports){
var utils = require('../utils/dom');
var StateControl = require('./states');
var tophatClassname = 'nice-tophat';

function tophatEvents( document, tophatElement, serviceElement, config ) {
    if (config.internal) {
        tophatClassname += ' nice-internal';
    }

    StateControl.forElement( tophatElement );

    attachTophatEvents( document, tophatElement );
}

function attachTophatEvents( document, tophatElement ) {
    utils.attachDomEvent( tophatElement, 'click', utils.proxy( tophatElement, clickhandler ) );
    utils.attachDomEvent( document, 'click', utils.proxy( tophatElement, cancelhandler ) );
    utils.attachDomEvent( tophatElement, 'click', utils.proxy( tophatElement, trackingHandler ) );
    utils.attachDomEvent( tophatElement, 'submit', utils.proxy( tophatElement, searchHandler ) );

    // Throttle window resize event to 15fps
    var fps = 15,
        wait = Math.round(1000 / 15);
    utils.attachDomEvent( window, 'resize', utils.throttle(utils.proxy( tophatElement, resizeHandler), wait) );
}




// handlers
//

// Hande the window resizing
function resizeHandler(e) {
    this.state.setAriaStates();
}

function trackingHandler( ev ) {
    var target = ev.target || ev.srcElement;

    while ( !validateTrackedElement( target ) ) {

        if ( ~target.className.indexOf( 'nice-tophat' ) ) {
            target = undefined;
            break;
        }

        target = target.parentNode;
    }

    var href = target && ( target.href || target.getElementsByTagName('a')[0].href );

    if (!target || !href) return;

    var category = 'tophat';
    var labelEl = ( utils.find( target, 'menu-label' )[0] || target);
    var action = labelEl.textContent || labelEl.innerText || labelEl.innerHTML;
    var label = window.location.href;

    switch ( cleanClass( target.className ) ) {
        case 'menu-profile':
            action = 'Your Profile' + (~this.className.indexOf( target.className + '-open' ) ? ' expanded' : ' collapased');
            href = false;
            break;

        case 'menu-evidence':
        case 'menu-search':
            action += (~this.className.indexOf( target.className + '-open' ) ? ' expanded' : ' collapased');
            href = false;
            break;
    }

    ev.preventDefault();

    sendTrackedEvent( category, action, label, function() {
        if (href) window.location.href = href;
    });
}

function validateTrackedElement( target ) {
    var isTrackedElement = target &&
            target.nodeName.toLowerCase() === 'li' &&
            ( ~target.className.indexOf( 'menu-' ) || ~target.className.indexOf( 'evidence-' )  );

    return !!isTrackedElement;
}




function clickhandler( ev ) {
    var target = ev.target || ev.srcElement;

    while ( validateTarget( target ) ) {

        if ( ~target.className.indexOf( 'nice-tophat' ) ) {
            target = undefined;
            break;
        }

        target = target.parentNode;
    }

    var mustIgnoreEvent = !( target && !~target.className.indexOf( 'nice-tophat' ) );
    if (mustIgnoreEvent) return;

    ev.preventDefault();

    (ev.target || ev.srcElement).blur();

    switch ( cleanClass( target.className ) ) {
        case 'menu-evidence':
            this.state.toggleEvidence();
            break;

        case 'menu-profile':
            this.state.toggleProfile();
            break;

        case 'menu-mobile':
            this.state.toggleMobileMenu();
            break;
    }
}

function validateTarget( target ) {
    var isValid = target &&
            !~target.className.indexOf( 'menu-evidence' ) &&
            !~target.className.indexOf( 'menu-mobile' ) &&
            !~target.className.indexOf( 'menu-profile' );

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
        if ( target.className && ~target.className.indexOf( 'nice-tophat' ) ) {
            tophatEvent = true;
            break;
        }

        target = target.parentNode;
    }

    return tophatEvent;
}




function searchHandler( ev ) {
    var target = ev.target || ev.srcElement;

    if ( target.className && ~target.className.indexOf( 'nice-search' ) &&
            ~target.action.search( /%(25)?term/ig ) && target.q ) {

        var placeholder = target.q.getAttribute('placeholder');
        var q = target.q.value;
        var term = ( q !== placeholder ) ? escape( q.replace(/\s/g, '+') ) : '';
        var location = target.action.replace(/%(25)?term/ig, term);

        sendTrackedEvent( 'Search', term, location, function() {
            window.location.href = location;
        });

        ev.preventDefault();
    }
}




// Tracking helpers

function sendTrackedEvent( category, action, label, cb ) {
    if (cb) {
        window.setTimeout( cb, 50 );
    }

    if ( window.dataLayer && typeof window.dataLayer.push === 'function' ) {
      return sendDataLayerEvent( category, action, label );
    }

    if ( window._gaq && typeof window._gaq.push === 'function' ) {
      return sendGAEvent( category, action, label );
    }

    if ( typeof window.ga === 'function' ) {
        return sendUAEvent( category, action, label );
    }

    //logEventToConsole( category, action, label );
}

function sendDataLayerEvent( category, action, label ) {
  var data = {
    event: 'GAevent',
    eventCategory: category,
    eventAction: action,
    eventLabel: label
  };

  window.dataLayer.push( data );
}

function sendGAEvent( category, action, label ) {
    var data = [ '_trackEvent', category, action, label ];

    window._gaq.push( data );
}

function sendUAEvent( category, action, label ) {
    var data = {
        category: category,
        action: action,
        label: label
    };

    window.ga( 'send', 'event', data );
}

function logEventToConsole( category, action, label ) {
    var console = window.console;

    if ( console && console.log ) {
        console.log( 'track', category, action, label );
    }
}




// utils

function cleanClass( className ) {
    return className.replace(' active', '');
}

function fireDomEvent( document, el, event, data ) {
    var evt;

    if ( document.createEventObject ) {
        // dispatch for IE
        evt = document.createEventObject();

        if (data) {
            for ( var pram in data ) {
                evt[param] = data[param];
            }
        }

        return el.fireEvent( 'on' + event, evt );
    }

    // dispatch for firefox + others
    evt = document.createEvent( "HTMLEvents" );
    evt.initEvent( event, true, true, data );

    el.dispatchEvent( evt );
}

module.exports = tophatEvents;

},{"../utils/dom":28,"./states":8}],8:[function(require,module,exports){
var utils = require('../utils/dom'),
    config = require('../config');

var evidenceStateClassname = 'menu-evidence-open',
    profileStateClassname = 'menu-profile-open',
    mobileStateClassname = 'menu-mobile-open';

function TophatStates( el ) {
    this.element = el;
    this.classname = cleanClassname( el.className );

    this.data = getStateFromClassname( el.className );

    // Cache menu button references
    this.evidenceBtn = document.getElementById("menu-evidence");
    this.mobileMenuBtn = document.getElementById("menu-mobile");
    // Profile is loaded async so we need to look for profile button again later.
    this.profileBtn = document.getElementById("menu-profile");

    // Cache menu references
    this.evidenceMenu = document.getElementById("nice-evidence");
    this.mainMenu = document.getElementById("main-menu");

    el.state = this;

    this.setAriaStates();
}

function getStateFromClassname( classname ) {
    return {
            evidence: !!~classname.indexOf(evidenceStateClassname)
          , profile: !!~classname.indexOf(profileStateClassname)
          , mobile: !!~classname.indexOf(mobileStateClassname)
        };
}

function cleanClassname( classname ) {
    return classname
        .replace( ' ' + evidenceStateClassname, '' )
        .replace( ' ' + profileStateClassname, '' )
        .replace( ' ' + mobileStateClassname, '' );
}


TophatStates.prototype = {

    updateState: function() {
        var classname = this.classname +
            ( this.data.evidence ? ' ' + evidenceStateClassname : '' ) +
            ( this.data.profile ? ' ' + profileStateClassname : '' ) +
            ( this.data.mobile ? ' ' + mobileStateClassname : '' );

        this.element.className = classname;

        // Profile request is asynch, so button may have been added later
        this.profileBtn = document.getElementById("menu-profile");

        this.toggleAriaAttributes(this.profileBtn, this.data.profile); 

        this.setAriaStates();
    }

  , toggleAriaAttributes: function(btn, isBtnActive){
        // E.g. if you're logged out, there's no profile button
        if(!btn || btn.getAttribute("aria-hidden") === "true") return;

        btn.setAttribute("aria-expanded", isBtnActive);

        var controls = btn.getAttribute("aria-controls").split(" ");
        for (var i = 0; i < controls.length; i++) {
            var subMenu = document.getElementById(controls[i]);
            subMenu.setAttribute("aria-hidden", !isBtnActive);
        }
  }

  , toggleEvidence: function() {
        if(config.evidence) return; // Don't toggle evidence when on an Evidence service
        this.data.evidence = !this.data.evidence;
        if (this.data.evidence) {
            this.data.profile = false;
            this.data.mobile = false;
        }
        this.updateState();
    }

  , toggleProfile: function() {
        this.data.profile = !this.data.profile;
        if (this.data.profile) {
            this.data.mobile = false;
            this.data.evidence = false;
        }
        this.updateState();
    }

  , toggleMobileMenu: function() {
        this.data.mobile = !this.data.mobile;
        if (this.data.mobile) {
            this.data.profile = false;
            this.data.evidence = false;
        }
        this.updateState();
    }

  , unfocus: function() {
        this.data.profile = false;
        this.data.mobile = false;
        this.data.evidence = false;
        this.updateState();
    }

    // Sets the correct state of aria attributes depending on device and mode (mobile/evidence).
    , setAriaStates: function() {
        // See matchMedia vendor polyfill. 47.9375em = 767px
        var isMobileDevice = matchMedia('(max-width: 47.9375em)').matches;

        // Main menu button
        this.mobileMenuBtn.setAttribute("aria-hidden", !isMobileDevice);
        this.mobileMenuBtn.setAttribute("aria-expanded", this.data.mobile);

        // Main menu
        this.mainMenu.setAttribute("aria-hidden", (isMobileDevice && !this.data.mobile));

        // Evidence
        if(isMobileDevice) {
            // Evidence menu is expanded on mobile by default
            this.evidenceBtn.setAttribute("aria-expanded", true);
            this.evidenceBtn.setAttribute("aria-disabled", true);
            this.evidenceMenu.setAttribute("aria-hidden", !this.data.mobile);
        }
        else if(config.evidence) {
            // In an evidence service, evidence is always expanded
            this.evidenceBtn.setAttribute("aria-expanded", true);
            this.evidenceBtn.setAttribute("aria-disabled", true);
            this.evidenceMenu.setAttribute("aria-hidden", false);
        } else {
            this.evidenceBtn.setAttribute("aria-expanded", this.data.evidence);
            this.evidenceBtn.setAttribute("aria-disabled", false);
            this.evidenceMenu.setAttribute("aria-hidden", !this.data.evidence);
        }
    }
};

module.exports = {
    forElement: function( el ) {
        new TophatStates( el );
    }
};

},{"../config":3,"../utils/dom":28}],9:[function(require,module,exports){
var utils = require('../utils/dom');
var evidenceLinks = require('../config/evidence');
var tophatEvidence = require('../templates/evidence/menu.html');
var tophatEvidenceService = require('../templates/evidence/service.html');
var tophatEvidenceLinks = require('../templates/evidence/links.html');

function generateEvidenceElement( tophatElement, serviceElement, config ) {
    if (config.internal) return;

    utils.appendElement( utils.create( tophatEvidenceService ), utils.find( serviceElement, 'menu' )[0] );

    var linklist = generateLinkList( evidenceLinks, config.environment === 'beta' );

    var el = utils.create( tophatEvidence.replace( '{{menu}}', linklist ) );

    if ( config.evidence ) {
        var active = utils.find( el, 'evidence-' + config.evidence )[0];
        active.className = active.className + ' active';
    }

    return el;
}

function generateLinkList( links, isBeta ) {
    var output = [];
    for ( var id in links ) {
        var link = links[ id ];

        output.push( generateLink( id, link, isBeta ) );
    }

    return output.join( '' );
}

function generateLink( id, link, isBeta ) {
    var output = tophatEvidenceLinks
          .replace( /{{id}}/ig, id )
          .replace( /{{label}}/ig, link.label )
          .replace( /{{title}}/ig, link.title )
          .replace( /{{href}}/ig, ( isBeta ? link.beta : undefined ) || link.href );

    return output;
}

module.exports = generateEvidenceElement;

},{"../config/evidence":4,"../templates/evidence/links.html":15,"../templates/evidence/menu.html":16,"../templates/evidence/service.html":17,"../utils/dom":28}],10:[function(require,module,exports){
var utils = require('../utils/dom');
var tophatGlobal = require('../templates/global/menu.html');

function generateGlobalElement( tophatElement ) {
    var el = utils.find( tophatElement, 'nice-global' )[0];

    if (!el) {
        el = utils.create( tophatGlobal );
    }

    return el;
}

module.exports = generateGlobalElement;

},{"../templates/global/menu.html":18,"../utils/dom":28}],11:[function(require,module,exports){
var utils = require('../utils/dom');
var xhr = require('../utils/xhr');
var tophatProfile = require('../templates/profile/menu.html');
var tophatProfileService = require('../templates/profile/service.html');
var tophatProfileAnon = require('../templates/profile/anon.html');
var tophatProfileLinks = require('../templates/profile/links.html');
var tophatProfileEndpoint = '/tophat';

function generateProfileElement( tophatElement, serviceElement, config ) {
    if (config.profile === 'none') return;

    utils.insertBeforeElement( utils.create( tophatProfileAnon.replace('{{root}}', config.accountsUrl) ), utils.find( serviceElement, 'menu' )[0] );

    xhr.get( config.accountsUrl + tophatProfileEndpoint + ( config.wtrealm ? '?wtrealm=' + config.wtrealm : '' ), function( data ) {
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
  var anonitem = utils.find( el, 'menu-anonymous' )[0];
  var profileLink = utils.create( tophatProfileService );

  profileLink.setAttribute( 'title', profile.display_name );
  profileLink.setAttribute( 'aria-label', "Show user menu for " + profile.display_name );
  if (profile.thumbnail && profile.thumbnail.length) {
    profileLink.innerHTML = '<img src="'+ profile.thumbnail +'" class="profile-avatar" alt="Your profile image" />';
  }

  var linklist = generateLinkList( profile.links );
  var menu = utils.create( tophatProfile.replace( '{{menu}}', linklist ) );

  utils.insertBeforeElement( profileLink, anonitem );
  utils.remove( anonitem );
  utils.insertBeforeElement( menu, el.lastChild );
}

function generateAnonProfile( el, profile ) {
  var profileLink = utils.find( el, 'menu-anonymous' )[0];

  if (profile.links && profile.links["Sign in"]) {
    profileLink.setAttribute( 'href', profile.links["Sign in"] );
  }
}

function disableProfile( el ) {
    var profilenav = utils.find( el, 'menu-profile' )[0];
    utils.remove( profilenav );
}

function generateLinkList( links ) {
    var output = [];
    for ( var label in links ) {
        var href = links[ label ];

        output.push( generateLink( label, href ) );
    }

    return output.join( '' );
}

function generateLink( label, href ) {
    var output = tophatProfileLinks
        .replace( /{{label}}/ig, label )
        .replace( /{{href}}/ig, href );

    return output;
}

module.exports = generateProfileElement;

},{"../templates/profile/anon.html":19,"../templates/profile/links.html":20,"../templates/profile/menu.html":21,"../templates/profile/service.html":22,"../utils/dom":28,"../utils/xhr":29}],12:[function(require,module,exports){
var utils = require('../utils/dom');
var tophatSearch = require('../templates/search/form.html');

function generateSearchElement( globalElement, serviceElement, config ) {
    if (!config.search) return;

    var params = parseQueryStringWithRegExp( window.location.search );

    var view = tophatSearch
        .replace('{{method}}', 'get')
        .replace('{{action}}', config.search.replace( /"/g, '&quot;' ))
        .replace('{{typeaheadtype}}', config.typeaheadtype || '')
        .replace('{{typeaheadsource}}', config.typeaheadsource || '')
        .replace('{{placeholder}}', config.searchPlaceholder || 'Search...')
        .replace('{{q}}', (params.q || '').replace( /"/g, '&quot;' ));

    var searchElement = utils.create( view );

    addSearchToGlobal( globalElement, searchElement );

    return searchElement;
}

function addSearchToGlobal( el, searchForm ) {
    var menu = utils.find( el, 'menu' )[0];

    if (menu) {
        return utils.insertBeforeElement( searchForm, menu );
    }

  utils.appendElement( searchForm, el.firstChild );
}


function decodeURIComponentExtended ( s ) {
    return decodeURIComponent( unescape( (s || '').replace( /\+/g, ' ' ) ) );
}

function extendParam( obj, name, val ) {
    var key = decodeURIComponentExtended( name );
    var value = decodeURIComponentExtended( val );
    var existing = obj[key];

    if ( typeof existing === 'undefined' ) {
        obj[key] = value;
        return;
    }

    if ( typeof existing !== 'object' || !existing.length ) {
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

},{"../templates/search/form.html":23,"../utils/dom":28}],13:[function(require,module,exports){
var utils = require('../utils/dom');
var serviceLinks = require('../config/services');
var tophatServices = require('../templates/services/menu.html');
var tophatServicesLinks = require('../templates/services/links.html');

function generateServiceElement( tophatElement, config ) {
    cleanUp( tophatElement );

    var menu = '';
    if (!config.internal) {
        menu = generateLinkList( serviceLinks, config.environment === 'beta' );
    }

    return generateServiceBar( menu, config );
}

function generateServiceBar( menu, config ) {
    var services = tophatServices
            .replace( '{{menu}}', menu )
            .replace( '{{homelink}}', config.home || 'http://www.nice.org.uk');

    var el = utils.create( services );

    if (config.internal) {
        utils.find( el, 'logo')[0].getElementsByTagName( 'small' )[0].innerHTML = config.internal;
    }

    return el;
}

function generateLinkList( links, isBeta ) {
    var output = [];
    for ( var id in links ) {
        var link = links[id];

        output.push( generateLink( id, link, isBeta ) );
    }

    return output.join( '' );
}

function generateLink( id, link, isBeta ) {
    var output = tophatServicesLinks
          .replace( /{{id}}/ig, id )
          .replace( /{{label}}/ig, link.label )
          .replace( /{{title}}/ig, link.title )
          .replace( /{{href}}/ig, ( isBeta ? link.beta : undefined ) || link.href );

    return output;
}

function cleanUp( tophatElement ) {
    var oldElement = utils.find( tophatElement, 'nice-services' )[0];

    if (oldElement) {
        oldElement.parentNode.removeChild( oldElement );
    }
}

module.exports = generateServiceElement;

},{"../config/services":5,"../templates/services/links.html":24,"../templates/services/menu.html":25,"../utils/dom":28}],14:[function(require,module,exports){
module.exports = '<div class="nice-cookie" id="nice-cookie" role="dialog"><div class="tophat-inner"><p class="nice-cookie__message">{{message}} <a href="{{policyUrl}}" target="_blank" aria-label="Learn more about cookies on the NICE website">Learn more about cookies</a></p><button type="button" class="nice-cookie__close js-close-cookie-message" aria-label="Dismiss cookie message" aria-controls="nice-cookie"><span aria-hidden="true">×</span></button></div></div>';
},{}],15:[function(require,module,exports){
module.exports = '<li class="evidence-{{id}}" role="presentation"><a href="{{href}}" title="{{title}}" role="menuitem">{{label}}</a></li>';
},{}],16:[function(require,module,exports){
module.exports = '<div class="nice-evidence" id="nice-evidence" aria-hidden="true"><div class="tophat-inner" role="navigation"><ul class="menu" role="menu" aria-labelledby="menu-evidence">{{menu}}</ul></div></div>';
},{}],17:[function(require,module,exports){
module.exports = '<li class="menu-evidence" role="presentation"><a href="#nice-evidence" id="menu-evidence" role="menuitem" aria-haspopup="true" aria-controls="nice-evidence" aria-expanded="false">Evidence services</a></li>';
},{}],18:[function(require,module,exports){
module.exports = '<div class="nice-global" id="nice-global"><div class="tophat-inner"></div></div>';
},{}],19:[function(require,module,exports){
module.exports = '<a href="{{root}}/signin" class="menu-anonymous">Sign in</a>';
},{}],20:[function(require,module,exports){
module.exports = '<li role="presentation"><a href="{{href}}" role="menuitem">{{label}}</a></li>';
},{}],21:[function(require,module,exports){
module.exports = '<div class="nice-profile" id="nice-profile" aria-hidden="true"><div class="tophat-inner" role="navigation"><ul class="menu" role="menu" aria-labelledby="menu-profile">{{menu}}</ul></div></div>';
},{}],22:[function(require,module,exports){
module.exports = '<a href="#nice-profile" class="menu-profile" id="menu-profile" aria-controls="nice-profile" aria-haspopup="true" aria-expanded="false"><span class="profile-avatar"></span></a>';
},{}],23:[function(require,module,exports){
module.exports = '<form class="nice-search" method="{{method}}" action="{{action}}" data-track="search" role="search"><div class="controls"><input name="q" value="{{q}}" autocomplete="off" spellcheck="false" placeholder="{{placeholder}}" maxlength="250" data-provide="typeahead" data-source-type="{{typeaheadtype}}" data-source="{{typeaheadsource}}" id="search" aria-label="Search query"> <button type="submit" aria-label="Perform search"><i aria-hidden="true" class="icon-search"></i> <span class="menu-label">Search</span></button></div></form>';
},{}],24:[function(require,module,exports){
module.exports = '<li class="menu-{{id}}" role="presentation"><a href="{{href}}" role="menuitem">{{label}}</a></li>';
},{}],25:[function(require,module,exports){
module.exports = '<div class="nice-services" role="navigation"><div class="tophat-inner"><a href="#" class="menu-mobile" id="menu-mobile" aria-expanded="false" aria-controls="main-menu nice-evidence" aria-hidden="true" aria-label="Site navigation">Menu </a><a href="{{homelink}}" class="logo">NICE <small>National Institute for<br>Health and Care Excellence</small></a><ul class="menu" role="menubar" id="main-menu" aria-labelledby="menu-mobile" aria-hidden="false">{{menu}}</ul></div></div>';
},{}],26:[function(require,module,exports){
var inject = require('./../node_modules/cssify');
var css = "@font-face{font-family:\"NICE.Glyphs\";src:url('//cdn.nice.org.uk/V3.1/Content/nice-glyphs/NICE.Glyphs.eot?#iefix&v=1.3') format('embedded-opentype'),url('//cdn.nice.org.uk/V3.1/Content/nice-glyphs/NICE.Glyphs.woff?v=1.3') format('woff'),url('//cdn.nice.org.uk/V3.1/Content/nice-glyphs/NICE.Glyphs.ttf?v=1.3') format('truetype'),url('//cdn.nice.org.uk/V3.1/Content/nice-glyphs/NICE.Glyphs.svg#niceglyphregular?v=1.3') format('svg');font-weight:normal;font-style:normal}.nice-tophat{min-height:60px;margin-bottom:24px;*position:relative;*z-index:2001;font-family:Lato,\"Helvetica Neue\",Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:16px;font-weight:400;line-height:24px}.nice-tophat *{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.nice-tophat .tophat-inner{width:95.74468085%;max-width:1170px;margin:0 auto;*zoom:1}.nice-tophat .tophat-inner:before,.nice-tophat .tophat-inner:after{display:table;content:\"\";line-height:0}.nice-tophat .tophat-inner:after{clear:both}.layout-fill .nice-tophat .tophat-inner{width:auto;max-width:100%;margin:0 24px}@media (max-width:979px){.nice-tophat .tophat-inner,.layout-fill .nice-tophat .tophat-inner{width:auto;max-width:100%;margin:0 12px}}.nice-tophat a{text-decoration:none;font-weight:normal}.nice-tophat a:focus,.nice-tophat a:hover,.nice-tophat a:active{text-decoration:none}.nice-tophat .menu-mobile{display:none;top:0;left:0;position:absolute;margin:8px 12px;padding:3px 6px}.nice-tophat .menu-mobile,.nice-tophat .menu-mobile:hover,.nice-tophat .menu-mobile:focus{color:#0E0E0E;font-weight:600}.nice-tophat .menu{position:relative;left:0;display:block;float:right;margin:0;padding:0;list-style:none}.nice-tophat .menu li{list-style:none;float:left;margin:0}.nice-tophat .menu a{display:block;padding:12px;color:#0E0E0E}.nice-tophat .menu a:focus,.nice-tophat .menu a:hover,.nice-tophat .menu a:active{color:#0E0E0E}@media (max-width:767px){.nice-tophat .menu{margin:0 -12px;clear:left}.nice-tophat .menu,.nice-tophat .menu li{position:relative;display:block;float:none}.nice-tophat .menu a{padding:0 12px;line-height:24px}}.nice-tophat .logo,.nice-tophat .icon-offcanvas{color:#0E0E0E;font-style:normal;font-family:\"NICE.Glyphs\";speak:none;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased}.nice-tophat .logo{float:left;display:block;padding:12px 24px;margin-left:-24px;font-size:0;line-height:0;border:0}.nice-tophat .logo small{display:none}.nice-tophat .logo:before{content:\"\\e01a\\e01b\";font-size:48px;line-height:48px;letter-spacing:-0.6em}.nice-tophat .icon-offcanvas:before{content:\"\\e03d\"}.tophat-legacy .logo{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe01a;&#xe01b;');font-size:48px;line-height:48px;letter-spacing:-0.6em}.tophat-legacy .icon-offcanvas:before{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe03d;')}@media (max-width:1059px){.nice-tophat .logo:before{content:\"\\e01a\"}}@media (max-width:829px){.nice-tophat{min-height:48px;background-color:rgba(0,0,0,0.075);padding-bottom:2px;margin-bottom:-2px}.nice-tophat .logo{padding:0 0 0 24px}.nice-tophat .logo:before{font-size:38px}.nice-tophat .logo small{display:none}}@media (max-width:767px){.nice-tophat .logo{text-align:center;width:auto;margin:0 84px;padding:0 24px;float:none}}.nice-tophat .nice-services{background-color:#fff;border-bottom:1px solid #adadad}.nice-tophat .nice-services .menu{border-right:1px solid #adadad}.nice-tophat .nice-services .menu a{width:84px;padding:12px 4.5px 20px 12px;border-left:1px solid #adadad;line-height:20px;font-size:16px}.nice-tophat .nice-services .menu a:hover,.nice-tophat .nice-services .menu a:focus{background-color:#e9e9e9}.nice-tophat .nice-services .menu a[aria-disabled=\"true\"]{cursor:none;pointer-events:none}.nice-tophat .nice-services .menu .menu-standards a{width:120px}.nice-tophat .nice-services .menu .menu-evidence{position:relative}.nice-tophat .nice-services .menu .menu-evidence a:before{border:6px solid transparent;content:'';position:absolute;bottom:0;left:50%;border-top-color:#0e0e0e;margin-left:-7px}.nice-tophat .nice-services .menu .active a,.nice-tophat .nice-services .menu .active a:hover,.nice-tophat .nice-services .menu .active a:focus{background-color:#004650;color:#fff;position:relative}.nice-tophat .nice-services .menu .active a:after{background-color:#004650;content:'';height:1px;left:0;position:absolute;top:100%;width:100%}.menu-evidence-open .nice-services .menu .menu-evidence a,.menu-evidence-active .nice-services .menu .menu-evidence a{border-bottom:0;padding-bottom:20px;position:relative}.menu-evidence-open .nice-services .menu .menu-evidence a,.menu-evidence-active .nice-services .menu .menu-evidence a,.menu-evidence-open .nice-services .menu .menu-evidence a:hover,.menu-evidence-active .nice-services .menu .menu-evidence a:hover,.menu-evidence-open .nice-services .menu .menu-evidence a:focus,.menu-evidence-active .nice-services .menu .menu-evidence a:focus{background-color:#e9e9e9;color:#0E0E0E}.menu-evidence-open .nice-services .menu .menu-evidence a:before,.menu-evidence-active .nice-services .menu .menu-evidence a:before{display:none}.menu-evidence-open .nice-services .menu .menu-evidence a:after,.menu-evidence-active .nice-services .menu .menu-evidence a:after{background-color:#e9e9e9;content:'';height:1px;left:0;position:absolute;top:100%;width:100%}@media (max-width:979px){.nice-tophat .nice-services .menu a{padding-top:12px;padding-bottom:20px}.menu-evidence-open .nice-services .menu .menu-evidence a,.menu-evidence-active .nice-services .menu .menu-evidence a{padding-bottom:20px}}@media (max-width:767px){.nice-tophat .nice-services{border-bottom:none;position:relative}.nice-tophat .nice-services .menu{display:none;border-right:none}.nice-tophat .nice-services .menu a{padding-bottom:12px}.nice-tophat .nice-services .menu li a,.nice-tophat .nice-services .menu .menu-standards a{border-left:0;line-height:24px;width:auto}.nice-tophat .nice-services .menu .menu-evidence a,.nice-tophat .nice-services .menu .menu-evidence a:hover,.nice-tophat .nice-services .menu .menu-evidence a:focus{padding-bottom:3px;background-color:#e9e9e9;border:0}.nice-tophat .nice-services .menu .menu-evidence a:before{display:none}.nice-tophat .menu-mobile{display:block}.menu-mobile-open .nice-services .menu{display:block}}@media (max-width:480px){.nice-tophat .nice-services .menu li a{padding:6px 12px}}.nice-tophat .nice-evidence{background-color:#e9e9e9;display:none}.nice-tophat .nice-evidence .menu{border-right:1px solid #d6d6d6}.nice-tophat .nice-evidence .menu a{padding-left:12px;padding-right:12px;border-left:1px solid #d6d6d6;font-size:16px}.nice-tophat .nice-evidence .menu a:hover,.nice-tophat .nice-evidence .menu a:focus{background-color:#d6d6d6}.nice-tophat .nice-evidence .menu .active a:hover,.nice-tophat .nice-evidence .menu .active a:focus,.nice-tophat .nice-evidence .menu .active a{color:#fff;background-color:#004650}.menu-evidence-open .nice-evidence,.menu-evidence-active .nice-evidence{display:block}@media (max-width:767px){.nice-tophat .nice-evidence{display:none}.nice-tophat .nice-evidence .menu{border:0}.nice-tophat .nice-evidence .menu li a{padding:12px 12px 12px 36px;border:0;border-top:1px solid #d6d6d6;line-height:24px}.nice-tophat .nice-evidence .menu li:first-child a{border-top:0}.menu-mobile-open .nice-evidence{display:block}}@media (max-width:480px){.nice-tophat .nice-evidence .menu li a{padding:6px 6px 6px 24px}}.nice-tophat .nice-global{background-color:#004650;color:#fff}.nice-tophat .nice-global .menu a{color:#fff;padding:19px 12px 20px;line-height:24px}.nice-tophat .nice-global .menu a:hover,.nice-tophat .nice-global .menu a:focus{color:#fff;background-color:#18646e}.nice-tophat .nice-global .menu .active a,.nice-tophat .nice-global .menu .active a:hover,.nice-tophat .nice-global .menu .active a:focus{color:#000;background-color:#fff}.nice-tophat .nice-global .tool-brand{display:block;font-size:36px;line-height:36px;margin:0 0 -24px;padding:12px 0 0}.nice-tophat .nice-global .tool-brand small{font-size:24px;color:#777}.nice-tophat .nice-global .publication-date{float:right;font-size:16px;margin-top:-4px;margin-right:12px;color:#666}@media (max-width:979px){.nice-tophat .nice-global{position:relative}.nice-tophat .nice-global .tool-brand{margin-bottom:0;padding:6px 0}.nice-tophat .nice-global .menu{display:none;visibility:hidden;speak:none}}@media (max-width:768px){.nice-tophat .nice-global{background-image:none !important}.nice-tophat .nice-global .tool-brand{margin:0;width:100%;text-align:center}}.nice-search{color:#0E0E0E;float:left;position:relative;width:40%;margin:12px 0}.nice-search .controls{margin-right:40px}.nice-search input{display:block;width:100%;height:36px;padding:0 12px;margin:0;font-family:Lato,\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-size:18px;font-weight:400;line-height:36px;color:#0E0E0E;border:1px solid #ccc;border-radius:0;vertical-align:middle;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);box-shadow:inset 0 1px 1px rgba(0,0,0,0.075);-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;-webkit-appearance:none}.nice-search input:focus{outline:none}.nice-search button{display:inline-block;color:#0E0E0E;background-color:#d6d6d6;overflow:hidden;position:absolute;height:36px;width:36px;margin:0;padding:0;top:0;right:0;border:1px solid #d6d6d6;font-size:0;line-height:normal}.nice-search button:hover{background-color:#adadad;border-colour:#adadad}.nice-search .icon-search{font-size:24px;font-style:normal;font-family:\"NICE.Glyphs\";speak:none;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased}.nice-search .icon-search:before{content:\"\\e004\"}.nice-search .twitter-typeahead{width:100%}.nice-search .tt-dropdown-menu{width:100%}.tophat-legacy .icon-search{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe004;')}@media (max-width:979px){.nice-search{float:none;width:100%}.nice-partner .nice-search .controls{margin-left:110px}}.nice-tophat .nice-partner .partner-logo{float:left;display:block;margin:22px 24px 0 0}.nice-tophat .nice-partner .partner-logo:hover,.nice-tophat .nice-partner .partner-logo:focus,.nice-tophat .nice-partner .partner-logo:active{background-color:transparent;padding-bottom:0;border-bottom:none}.nice-tophat .nice-partner .partner-logo img{height:72px}.nice-tophat .nice-partner .partner-brand{display:block;font-size:24px;line-height:36px;margin:0 0 -6px;padding:12px 0 0;color:#fff}.nice-tophat .nice-partner .partner-brand small{float:right;margin:-10px 10px 0 0}@media (max-width:979px){.nice-tophat .nice-partner .partner-brand{display:none;visibility:hidden;speak:none}.nice-tophat .nice-partner .partner-logo{position:absolute;top:12px;left:12px;padding:0;margin:0;z-index:2002}.nice-tophat .nice-partner .partner-logo img{height:38px}}.nice-internal{min-height:50px;width:100%}.nice-internal .logo{font-size:0;line-height:36px;*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe019;')}.nice-internal .logo,.nice-internal .logo:hover,.nice-internal .logo:focus,.nice-internal .logo:active{color:#263238}.nice-internal .logo small{font-family:Lato,\"Helvetica Neue\",Helvetica,Arial,sans-serif;display:inline;font-size:32px;line-height:46px}.nice-internal .logo:before{float:none;margin-right:.5em;font-size:32px;content:\"\\e01a\";vertical-align:top}.nice-internal .nice-services{background-color:#fff}.nice-internal .nice-services .menu a{color:#263238;border-left:none;padding-top:5px;padding-bottom:5px}.nice-internal .nice-services .menu a:hover,.nice-internal .nice-services .menu a:focus,.nice-internal .nice-services .menu a:active{color:#263238;background-color:transparent}.active .nice-internal .nice-services .menu a,.active .nice-internal .nice-services .menu a:hover,.active .nice-internal .nice-services .menu a:focus,.active .nice-internal .nice-services .menu a:active{color:#263238;background-color:transparent}.nice-internal .nice-services .menu-mobile{display:none}.nice-internal .nice-global a{padding-top:9px;padding-bottom:10px}.nice-internal .nice-global a:hover,.nice-internal .nice-global a:focus{padding-bottom:8px;border-bottom-width:2px}.menu .nice-internal .nice-global a{padding-top:19px;padding-bottom:20px;line-height:24px}.menu .nice-internal .nice-global a:hover,.menu .nice-internal .nice-global a:focus{padding-bottom:16px;border-bottom-width:4px}.active .nice-internal .nice-global a,.active .nice-internal .nice-global a:hover,.active .nice-internal .nice-global a:focus{padding-bottom:8px;border-bottom-width:2px}.menu .active .nice-internal .nice-global a,.menu .active .nice-internal .nice-global a:hover,.menu .active .nice-internal .nice-global a:focus{padding-bottom:16px;border-bottom-width:4px}@media (max-width:767px){.nice-internal .logo{margin:0;padding:0}}.nice-tophat .menu-anonymous,.nice-tophat .menu-profile{float:right}.nice-tophat .menu-anonymous,.nice-tophat .menu-profile,.nice-tophat .menu-anonymous:hover,.nice-tophat .menu-profile:hover,.nice-tophat .menu-anonymous:focus,.nice-tophat .menu-profile:focus{color:#0E0E0E;font-weight:600}.nice-tophat .menu-anonymous{margin:15px 0 0 12px;padding:6px 12px;border:2px solid #0E0E0E}.nice-tophat .menu-profile{position:relative;width:36px;height:36px;padding:9px;line-height:36px}.nice-tophat .menu-profile,.nice-tophat .menu-profile:hover,.nice-tophat .menu-profile:focus{background-color:transparent}.nice-tophat .menu-profile:hover{color:#999}.nice-tophat .profile-avatar{position:absolute;width:100%;height:100%;vertical-align:-35%;text-align:center;font-size:20px;font-style:normal;font-family:\"NICE.Glyphs\";speak:none;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased;line-height:inherit;*line-height:40px}.nice-tophat .profile-avatar:before{content:\"\\e01f\"}.nice-tophat .nice-profile{position:absolute;z-index:2003;width:250px;left:50%;margin-left:340px;top:50px;background-color:#e9e9e9;display:none;border:1px solid #adadad}.nice-tophat .nice-profile:before{border:6px solid transparent;content:'';position:absolute;bottom:100%;right:18px;border-bottom-color:#0E0E0E}.nice-tophat .nice-profile .tophat-inner{margin-left:0;width:100%}.nice-tophat .nice-profile .menu{border-right:1px solid #d6d6d6}.nice-tophat .nice-profile .menu,.nice-tophat .nice-profile .menu li{float:none;display:block;margin-left:0;border-right:0}.nice-tophat .nice-profile .menu a{padding-left:12px;padding-right:12px;border-top:1px solid #d6d6d6}.nice-tophat .nice-profile .menu a:hover,.nice-tophat .nice-profile .menu a:focus{background-color:#d6d6d6}.active .nice-tophat .nice-profile .menu a,.active .nice-tophat .nice-profile .menu a:hover,.active .nice-tophat .nice-profile .menu a:focus{color:#fff;background-color:#004650}li:first-child .nice-tophat .nice-profile .menu a{border-top:0}.nice-tophat .nice-profile .menu li:first-child a{border-top:0}.tophat-legacy .profile-avatar{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe01f;')}.menu-profile-open .nice-profile{display:block}.layout-fill .nice-tophat .nice-profile{left:auto;right:16px;margin-left:0}.layout-fill .nice-tophat .nice-profile .tophat-inner{margin-left:0}@media (max-width:1220px){.nice-tophat .nice-profile{left:auto;right:1.5%}}@media (max-width:979px){.nice-tophat .menu-anonymous{margin-top:12px}.nice-tophat .nice-profile{right:5px}.layout-fill .nice-tophat .nice-profile{right:5px}}@media (max-width:767px){.nice-tophat .menu-anonymous,.nice-tophat .menu-profile{top:0;right:0;position:absolute}.nice-tophat .menu-anonymous{margin:8px 12px;padding:3px 6px;border:0}.nice-tophat .nice-profile{position:relative;left:0;top:0;width:auto;margin:0;padding:0}.nice-tophat .nice-profile:before{right:21px}.nice-tophat .nice-profile .menu{border:0;margin:0}.nice-tophat .nice-profile .menu li a{padding:12px;border:0;border-top:1px solid #d6d6d6;line-height:24px}.nice-tophat .nice-profile .menu li:first-child a{border-top:0}.nice-tophat .profile-avatar{font-size:16px;line-height:32px;height:32px;width:32px}.nice-tophat .profile-avatar:before{height:32px;width:32px}.layout-fill .nice-tophat .nice-profile{right:auto}}@media (max-width:480px){.nice-tophat .nice-profile .menu li a{padding:6px 12px}}.nice-tophat .nice-cookie{background:#d6d6d6;border-bottom:1px solid #adadad}.nice-tophat .nice-cookie[aria-hidden='true']{display:none}.nice-tophat .nice-cookie .tophat-inner{position:relative}.nice-tophat .nice-cookie__message{margin:1em 2.5em 1em 0}.nice-tophat .nice-cookie__message a{text-decoration:underline}.nice-tophat .nice-cookie__close{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-webkit-appearance:none;appearance:none;background:0;border:0;font-size:1.5em;margin:-1em 0 0 0;padding:.5em;position:absolute;right:0;top:50%}.nice-tophat .nice-cookie__close::-moz-focus-inner,.nice-tophat .nice-cookie__close::-moz-focus-inner{border:0;padding:0}";
inject(css, undefined, '_recyxf');
module.exports = css;

},{"./../node_modules/cssify":1}],27:[function(require,module,exports){
// stylesheet to be auto inserted
require('./tophat.css');

require('./vendor/matchMedia');

// import scripts
var utils = require('./utils/dom');
var body = document.body;

var config = require('./config');

// find or create the tophat element
var tophatElement = getTophatElement( 'nice-tophat', config );

// create the cookie message element
var cookieElement = require('./cookie')( tophatElement, config );

// create the service elements
var serviceElement = require('./services')( tophatElement, config );

// create the evidence elements
var evidenceElement = require('./evidence')( tophatElement, serviceElement, config );

// create the profile elements
require('./profile')( tophatElement, serviceElement, config );

// find or create the global element
var globalElement = require('./global')( tophatElement );

// create the search form and prepend it to the global element
var searchElement = require('./search')( globalElement, serviceElement, config );

composeTophat( tophatElement, cookieElement, serviceElement, evidenceElement, globalElement, config );

// attach all the events to the tophat
require('./events')( document, tophatElement, serviceElement, config );

// notify scripts that tophat has loaded
if (document.onTophatReady) {
    document.onTophatReady();
}



// helper functions

function getTophatElement( classname, config ) {
  var el = utils.find( body, classname )[0];
  if (!el) {
      el = utils.create('<div role="banner" class="'+ classname +'"></div>');
  }

  el.className = classname +
      ( config.internal ? ' nice-internal' : '' ) +
      ( config.legacy ? ' tophat-legacy' : '' );

  return el;
}

function composeTophat( el, cookieElement, services, evidenceResources, globalMenu, config ) {
    if (cookieElement) utils.appendElement( cookieElement, el );
    utils.appendElement( services, el );
    if (evidenceResources) utils.appendElement( evidenceResources, el );
    if (globalMenu) utils.appendElement( globalMenu, el );

    if ( config.service ) {
        var className = 'menu-' + config.service;
        var active = utils.find( el, className )[0];
        active.className += ' active';
        el.className += ' ' + className + '-active';
    }

    // attach the tophat to the top of the body
    utils.prependElement( tophatElement, body );
}

},{"./config":3,"./cookie":6,"./events":7,"./evidence":9,"./global":10,"./profile":11,"./search":12,"./services":13,"./tophat.css":26,"./utils/dom":28,"./vendor/matchMedia":30}],28:[function(require,module,exports){
var config = require('../config');

var utils = {};

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
// See http://stackoverflow.com/a/27078401/486434
utils.throttle = function(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

/**
 * Makes sure that the given function is always called
 * with `this` as `context`.
 *
 * @param      {Object}    context  The context to use as 'this'
 * @param      {Function}  fn       The function
 * @return     {Function}    { The function with the conext set }
 */
utils.proxy = function( context, fn ) {
    return function( ev ) {
        fn.call( context, ev );
    };
};


/**
 * Enhances an event object by adding a cross-browser implementation
 * of `stopPropagation` and `preventDefault`
 *
 * @param      {Event}  event   The event
 * @return     {Event}  { The enhanced event }
 */
utils.enhanceEvent = function(event) {
    var _stopPropagation = event.stopPropagation
      , _preventDefault = event.preventDefault;

    event.stopPropagation = function() {
        if (_stopPropagation) {
            _stopPropagation.call( event );
        } else {
            event.cancelBubble = true;
        }

        return event;
    };

    event.preventDefault = function() {
        if (_preventDefault) {
            _preventDefault.call( event );
        } else {
            event.returnValue = false;
        }

        return event;
    };

    return event;
};

/**
 * Attach a dom event to the given element.
 * E.g.:
 * utils.attachDomEvent(element, "click", function(e) {});
 *
 * @param      {<type>}    element     The element
 * @param      {<type>}    eventName   The event name
 * @param      {Function}  callbackFn  The callback function
 */
utils.attachDomEvent = function( element, eventName, callbackFn ) {
    var add = document.addEventListener ? 'addEventListener' : 'attachEvent',
        prefix = document.addEventListener ? '' : 'on';
    element[add]( prefix + eventName, function( event ) { callbackFn( utils.enhanceEvent( event ) ); }, true );
};

utils.find = function( root, search ){
    var find = document.getElementsByClassName ? nativeGetElementsByClassName : polyfilGetElementsByClassName;
    utils.find = find;

    return find( root, search );

    function nativeGetElementsByClassName( root, search ) {
        return root.getElementsByClassName(search);
    }

    function polyfilGetElementsByClassName( root, search ) {
        var d = root, elements, pattern, i, results = [];

        if (root.querySelectorAll) { // IE8
            return root.querySelectorAll("." + search);
        }

        if (root.evaluate) { // IE6, IE7
            pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
            elements = root.evaluate(pattern, d, null, 0, null);

            while ((i = elements.iterateNext())) {
                results.push(i);
            }
        } else {
            elements = root.getElementsByTagName("*");
            pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");

            var len = elements.length;
            for (i = 0; i < len; i++) {
                if ( pattern.test(elements[i].className) ) {
                    results.push(elements[i]);
                }
            }
        }

        return results;
    }
};

utils.create = function( html ) {
    if (!~html.indexOf('<')) {
        return document.createElement( html );
    }

    var wrapper = document.createElement('div');

    wrapper.innerHTML = html;

    return wrapper.firstChild;
};

utils.remove = function( element ) {
    element.parentNode.removeChild( element );
};

utils.prependElement = function( element, parent ) {
    parent.insertBefore( element, parent.firstChild );
};

utils.insertBeforeElement = function( element, sibling ) {
    var parent = sibling.parentNode;

    parent.insertBefore( element, sibling );
};

utils.appendElement = function( element, parent ) {
    parent.appendChild( element );
};


// See http://stackoverflow.com/a/15348311
utils.htmlEncode = function htmlEncode( html ) {
    return document.createElement( 'a' ).appendChild(
        document.createTextNode( html ) ).parentNode.innerHTML;
};

module.exports = utils;

},{"../config":3}],29:[function(require,module,exports){
var utils = require('./dom');
var xhr = {};

xhr.get = function( url, resolve ) {
    var body = document.body;
    var script = document.createElement("script");
    script.src = url + ( ~url.indexOf('?') ? '&' : '?' ) + Math.floor(Math.random() * 10000000000);

    // Handle Script loading
    var done = false;

    // Attach handlers for all browsers
    script.onload = script.onreadystatechange = function() {
        if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
            done = true;
            resolve( window._na );

            // Handle memory leak in IE
            script.onload = script.onreadystatechange = null;
            if ( body && script.parentNode ) {
                body.removeChild( script );
            }
        }
    };

    utils.prependElement( script, body );
};

module.exports = xhr;

},{"./dom":28}],30:[function(require,module,exports){
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

window.matchMedia || (window.matchMedia = function() {
    "use strict";

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style       = document.createElement('style'),
            script      = document.getElementsByTagName('script')[0],
            info        = null;

        style.type  = 'text/css';
        style.id    = 'matchmediajs-test';

        if (!script) {
          document.head.appendChild(style);
        } else {
          script.parentNode.insertBefore(style, script);
        }

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function(media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());

},{}]},{},[27]);
