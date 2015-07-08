(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function (css, customDocument) {
  var doc = customDocument || document;
  if (doc.createStyleSheet) {
    doc.createStyleSheet().cssText = css;
  } else {
    var head = doc.getElementsByTagName('head')[0],
        style = doc.createElement('style');

    style.type = 'text/css';
  
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(doc.createTextNode(css));
    }
    
    head.appendChild(style); 
  }
};

module.exports.byUrl = function(url) {
  if (document.createStyleSheet) {
    document.createStyleSheet(url);
  } else {
    var head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = url;
  
    head.appendChild(link); 
  }
};

},{}],2:[function(require,module,exports){
var attributes = [ 'service', 'evidence', 'environment', 'timestamp', 'search', 'typeaheadtype', 'typeaheadsource', 'internal', 'home', 'wtrealm' ];

var accountsDomains = {
    "local": "http://nice.sts.local"
};

function getTophatConfig() {
    var config = {};

    var tag = getTophatScriptTag();
    if (tag) {
        for( var i = 0, len = attributes.length; i < len; i++ ) {
            var key = attributes[i];
            var value = tag.getAttribute( 'data-' + key );

            if ( value && value !== '' ) {
                config[ key ] = value;
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

        if ( !!~src.indexOf('tophat.js') || !!~src.indexOf('tophat.dev.js') ) {
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

module.exports = getTophatConfig;

},{}],3:[function(require,module,exports){
module.exports = {
    search: {
        href: "http://www.evidence.nhs.uk",
        label: "Evidence search",
        title: "Evidence search"
    },
    bnf: {
        href: "http://www.evidence.nhs.uk/formulary/bnf/current",
        label: "BNF",
        title: "British National Formulary"
    },
    bnfc: {
        href: "http://www.evidence.nhs.uk/formulary/bnfc/current",
        label: "BNFC",
        title: "British National Formulary for Children"
    },
    cks: {
        href: "http://cks.nice.org.uk",
        label: "CKS",
        title: "Clinical Knowledge Summaries"
    },
    journals: {
        href: "http://www.nice.org.uk/about/what-we-do/evidence-services/journals-and-databases",
        label: "Journals and databases",
        title: "Journals and databases"
    }
};

},{}],4:[function(require,module,exports){
module.exports = {
    pathways: {
        href: "http://pathways.nice.org.uk",
        label: "NICE Pathways"
    },
    guidance: {
        href: "http://www.nice.org.uk/Guidance",
        label: "NICE Guidance"
    },
    standards: {
        href: "http://www.nice.org.uk/standards-and-indicators",
        label: "Standards and&nbsp;indicators"
    }
};

},{}],5:[function(require,module,exports){
var utils = require('../utils/dom');
var StateControl = require('./states');
var tophatClassname = 'nice-tophat';
var add, prefix;

function tophatEvents( document, tophatElement, serviceElement, config ) {
    add = document.addEventListener ? 'addEventListener' : 'attachEvent';
    prefix = document.addEventListener ? '' : 'on';

    if (config.internal) {
        tophatClassname += ' nice-internal';
    }

    StateControl.forElement( tophatElement );

    attachTophatEvents( document, tophatElement );
}

function attachTophatEvents( document, tophatElement ) {
    attachDomEvent( tophatElement, 'click', proxy( tophatElement, clickhandler ) );
    attachDomEvent( document, 'click', proxy( tophatElement, cancelhandler ) );
    attachDomEvent( tophatElement, 'click', proxy( tophatElement, trackingHandler ) );
    attachDomEvent( tophatElement, 'submit', proxy( tophatElement, searchHandler ) );
}




// handlers

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

    logEventToConsole( category, action, label );
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

function attachDomEvent( el, ev, fn ) {
    el[add]( prefix + ev, function( event ) { fn( enhance( event ) ); }, true );
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

function proxy( context, fn ) {
    return function( ev ) {
        fn.call( context, ev );
    };
}

function enhance( event ) {
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
}




module.exports = tophatEvents;

},{"../utils/dom":25,"./states":6}],6:[function(require,module,exports){
var evidenceStateClassname = 'menu-evidence-open';
var profileStateClassname = 'menu-profile-open';
var mobileStateClassname = 'menu-mobile-open';

function TophatStates( el ) {
    this.element = el;
    this.classname = cleanClassname( el.className );

    this.data = getStateFromClassname( el.className );

    el.state = this;
}

function getStateFromClassname( classname ) {
    return {
            evidence: ~classname.indexOf(evidenceStateClassname)
          , profile: ~classname.indexOf(profileStateClassname)
          , mobile: ~classname.indexOf(mobileStateClassname)
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
    }

  , toggleEvidence: function() {
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

};

module.exports = {
    forElement: function( el ) {
        new TophatStates( el );
    }
};

},{}],7:[function(require,module,exports){
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

},{"../config/evidence":3,"../templates/evidence/links.html":12,"../templates/evidence/menu.html":13,"../templates/evidence/service.html":14,"../utils/dom":25}],8:[function(require,module,exports){
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

},{"../templates/global/menu.html":15,"../utils/dom":25}],9:[function(require,module,exports){
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

},{"../templates/profile/anon.html":16,"../templates/profile/links.html":17,"../templates/profile/menu.html":18,"../templates/profile/service.html":19,"../utils/dom":25,"../utils/xhr":26}],10:[function(require,module,exports){
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

},{"../templates/search/form.html":20,"../utils/dom":25}],11:[function(require,module,exports){
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

},{"../config/services":4,"../templates/services/links.html":21,"../templates/services/menu.html":22,"../utils/dom":25}],12:[function(require,module,exports){
module.exports = '<li class="evidence-{{id}}"><a href="{{href}}" title="{{title}}">{{label}}</a></li>';
},{}],13:[function(require,module,exports){
module.exports = '<div class="nice-evidence" id="nice-evidence"><div class="tophat-inner"><ul class="menu">{{menu}}</ul></div></div>';
},{}],14:[function(require,module,exports){
module.exports = '<li class="menu-evidence"><a href="#nice-evidence">Evidence services</a></li>';
},{}],15:[function(require,module,exports){
module.exports = '<div class="nice-global" id="nice-global"><div class="tophat-inner"></div></div>';
},{}],16:[function(require,module,exports){
module.exports = '<a href="{{root}}/signin" class="menu-anonymous">Sign in</a>';
},{}],17:[function(require,module,exports){
module.exports = '<li><a href="{{href}}">{{label}}</a></li>';
},{}],18:[function(require,module,exports){
module.exports = '<div class="nice-profile" id="nice-profile"><div class="tophat-inner"><ul class="menu">{{menu}}</ul></div></div>';
},{}],19:[function(require,module,exports){
module.exports = '<a href="#nice-profile" class="menu-profile"><span class="profile-avatar"></span></a>';
},{}],20:[function(require,module,exports){
module.exports = '<form class="nice-search" method="{{method}}" action="{{action}}" data-track="search"><div class="controls"><input name="q" value="{{q}}" autocomplete="off" spellcheck="false" placeholder="Search..." maxlength="250" data-provide="typeahead" data-source-type="{{typeaheadtype}}" data-source="{{typeaheadsource}}"> <button type="submit"><i class="icon-search"></i> <span class="menu-label">Search</span></button></div></form>';
},{}],21:[function(require,module,exports){
module.exports = '<li class="menu-{{id}}"><a href="{{href}}">{{label}}</a></li>';
},{}],22:[function(require,module,exports){
module.exports = '<div class="nice-services"><div class="tophat-inner"><a href="#" class="menu-mobile">menu</a> <a href="{{homelink}}" class="logo">NICE <small>National Institute for<br>Health and Care Excellence</small></a><ul class="menu">{{menu}}</ul></div></div>';
},{}],23:[function(require,module,exports){
var css = "@font-face{font-family:\"NICE.Glyphs\";src:url(//cdn.nice.org.uk/V3/Content/nice-glyphs/NICE.Glyphs.eot?#iefix&v=1.3) format('embedded-opentype'),url(//cdn.nice.org.uk/V3/Content/nice-glyphs/NICE.Glyphs.woff?v=1.3) format('woff'),url(//cdn.nice.org.uk/V3/Content/nice-glyphs/NICE.Glyphs.ttf?v=13) format('truetype'),url(//cdn.nice.org.uk/V3/Content/nice-glyphs/NICE.Glyphs.svg#niceglyphregular?v=1.3) format('svg');font-weight:400;font-style:normal}.nice-tophat{min-height:60px;margin-bottom:24px;*position:relative;*z-index:2001;font-family:Lato,\"Helvetica Neue\",Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:16px;font-weight:400;line-height:24px;-moz-box-shadow:0 0 6px 0 rgba(0,0,0,.2);box-shadow:0 0 6px 0 rgba(0,0,0,.2)}.nice-tophat *{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.nice-tophat .tophat-inner{width:95.74468085%;max-width:1170px;margin:0 auto;*zoom:1}.nice-tophat .tophat-inner:before,.nice-tophat .tophat-inner:after{display:table;content:\"\";line-height:0}.nice-tophat .tophat-inner:after{clear:both}.layout-fill .nice-tophat .tophat-inner{width:auto;max-width:100%;margin:0 24px}@media (max-width:979px){.nice-tophat .tophat-inner,.layout-fill .nice-tophat .tophat-inner{width:auto;max-width:100%;margin:0 12px}}.nice-tophat a{text-decoration:none;font-weight:400}.nice-tophat a:focus,.nice-tophat a:hover,.nice-tophat a:active{text-decoration:none}.nice-tophat .menu-mobile{display:none;top:0;left:0;position:absolute;margin:8px 12px;padding:3px 6px}.nice-tophat .menu-mobile,.nice-tophat .menu-mobile:hover,.nice-tophat .menu-mobile:focus{color:#fff}.nice-tophat .menu{position:relative;left:0;display:block;float:right;margin:0;padding:0;list-style:none}.nice-tophat .menu li{list-style:none;float:left;margin:0}.nice-tophat .menu a{display:block;padding:6px 12px;color:#fff}.nice-tophat .menu a:focus,.nice-tophat .menu a:hover,.nice-tophat .menu a:active{color:#fff}@media (max-width:767px){.nice-tophat .menu{margin:0 -12px;clear:left}.nice-tophat .menu,.nice-tophat .menu li{position:relative;display:block;float:none}.nice-tophat .menu a{padding:0 12px;line-height:24px}}.nice-tophat .logo,.nice-tophat .icon-offcanvas{color:#fff;font-style:normal;font-family:\"NICE.Glyphs\";speak:none;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased}.nice-tophat .logo{float:left;display:block;padding:6px 24px;margin-left:-24px;font-size:0;line-height:0;border:0}.nice-tophat .logo small{display:none}.nice-tophat .logo:before{content:\"\\e01a\\e01b\";font-size:48px;line-height:48px;letter-spacing:-.6em}.nice-tophat .icon-offcanvas:before{content:\"\\e03d\"}.tophat-legacy .logo{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe01a;&#xe01b;');font-size:48px;line-height:48px;letter-spacing:-.6em}.tophat-legacy .icon-offcanvas:before{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe03d;')}@media (max-width:1059px){.nice-tophat .logo:before{content:\"\\e01a\"}}@media (max-width:829px){.nice-tophat{min-height:48px;background-color:rgba(0,0,0,.075);padding-bottom:2px;margin-bottom:-2px}.nice-tophat .logo{padding:0 0 0 24px}.nice-tophat .logo:before{font-size:38px}.nice-tophat .logo small{display:none}}@media (max-width:767px){.nice-tophat .logo{text-align:center;width:auto;margin:0 84px;padding:0 24px;float:none}}.nice-tophat .nice-services{background-color:#333}.nice-tophat .nice-services .menu{border-right:1px solid #343c41}.nice-tophat .nice-services .menu a{width:84px;padding:12px 4.5px 19px 12px;border-left:1px solid #343c41;border-bottom:1px solid #333;line-height:20px;font-size:16px}.nice-tophat .nice-services .menu a:hover,.nice-tophat .nice-services .menu a:focus{background-color:#234e5b}.nice-tophat .nice-services .menu .menu-standards a{width:120px}.nice-tophat .nice-services .menu .menu-evidence{position:relative}.nice-tophat .nice-services .menu .menu-evidence a:before{border:6px solid transparent;content:'';position:absolute;bottom:0;left:50%;border-top-color:#eff1f3;margin-left:-7px}.nice-tophat .nice-services .menu .active a,.nice-tophat .nice-services .menu .active a:hover,.nice-tophat .nice-services .menu .active a:focus{background-color:#316e80}.menu-evidence-open .nice-services .menu .menu-evidence a,.menu-evidence-active .nice-services .menu .menu-evidence a{border-bottom:0;padding-bottom:20px}.menu-evidence-open .nice-services .menu .menu-evidence a,.menu-evidence-active .nice-services .menu .menu-evidence a,.menu-evidence-open .nice-services .menu .menu-evidence a:hover,.menu-evidence-active .nice-services .menu .menu-evidence a:hover,.menu-evidence-open .nice-services .menu .menu-evidence a:focus,.menu-evidence-active .nice-services .menu .menu-evidence a:focus{background-color:#2a5e6e}.menu-evidence-open .nice-services .menu .menu-evidence a:before,.menu-evidence-active .nice-services .menu .menu-evidence a:before{display:none}@media (max-width:979px){.nice-tophat .nice-services .menu a{padding-top:12px;padding-bottom:12px}.menu-evidence-open .nice-services .menu .menu-evidence a,.menu-evidence-active .nice-services .menu .menu-evidence a{padding-bottom:13px}}@media (max-width:767px){.nice-tophat .nice-services .menu{display:none}.nice-tophat .nice-services .menu a{padding-bottom:12px}.nice-tophat .nice-services .menu li a,.nice-tophat .nice-services .menu .menu-standards a{border-left:0;line-height:24px;width:auto}.nice-tophat .nice-services .menu .menu-evidence a,.nice-tophat .nice-services .menu .menu-evidence a:hover,.nice-tophat .nice-services .menu .menu-evidence a:focus{padding-bottom:3px;background-color:#2a5e6e;border:0}.nice-tophat .nice-services .menu .menu-evidence a:before{display:none}.nice-tophat .menu-mobile{display:block}.menu-mobile-open .nice-services .menu{display:block}}@media (max-width:480px){.nice-tophat .nice-services .menu li a{padding:6px 12px}}.nice-tophat .nice-evidence{background-color:#2a5e6e;display:none}.nice-tophat .nice-evidence .menu{border-right:1px solid #2d6475}.nice-tophat .nice-evidence .menu a{padding-left:12px;padding-right:12px;border-left:1px solid #2d6475;font-size:16px}.nice-tophat .nice-evidence .menu a:hover,.nice-tophat .nice-evidence .menu a:focus{background-color:#387e92}.nice-tophat .nice-evidence .menu .active a:hover,.nice-tophat .nice-evidence .menu .active a:focus,.nice-tophat .nice-evidence .menu .active a{color:#000;background-color:#ffc100}.menu-evidence-open .nice-evidence,.menu-evidence-active .nice-evidence{display:block}@media (max-width:767px){.nice-tophat .nice-evidence{display:none}.nice-tophat .nice-evidence .menu{border:0}.nice-tophat .nice-evidence .menu li a{padding:12px 12px 12px 36px;border:0;border-top:1px solid #2d6475;line-height:24px}.nice-tophat .nice-evidence .menu li:first-child a{border-top:0}.menu-mobile-open .nice-evidence{display:block}}@media (max-width:480px){.nice-tophat .nice-evidence .menu li a{padding:6px 6px 6px 24px}}.nice-tophat .nice-global{background-color:#eff1f3}.nice-tophat .nice-global .menu a{color:#000;padding:19px 12px 20px;line-height:24px}.nice-tophat .nice-global .menu a:hover,.nice-tophat .nice-global .menu a:focus{color:#000;background-color:rgba(255,255,255,.4);padding-bottom:16px;border-bottom:4px solid #ffc100}.nice-tophat .nice-global .menu .active a,.nice-tophat .nice-global .menu .active a:hover,.nice-tophat .nice-global .menu .active a:focus{color:#000;background-color:rgba(255,255,255,.6);padding-bottom:16px;border-bottom:4px solid #ffc100}.nice-tophat .nice-global .tool-brand{display:block;font-size:36px;line-height:36px;margin:0 0 -24px;padding:12px 0 0}.nice-tophat .nice-global .tool-brand small{font-size:24px;color:#777}.nice-tophat .nice-global .publication-date{float:right;font-size:16px;margin-top:-4px;margin-right:12px;color:#666}@media (max-width:979px){.nice-tophat .nice-global{position:relative}.nice-tophat .nice-global .tool-brand{margin-bottom:0;padding:6px 0}.nice-tophat .nice-global .menu{display:none;visibility:hidden;speak:none}}@media (max-width:768px){.nice-tophat .nice-global{background-image:none!important}.nice-tophat .nice-global .tool-brand{margin:0;width:100%;text-align:center}}.nice-search{float:left;position:relative;width:40%;margin:12px 0}.nice-search .controls{margin-right:40px}.nice-search input{display:block;width:100%;height:36px;padding:0 12px;margin:0;font-family:Lato,\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-size:18px;font-weight:400;line-height:36px;color:#333;border:1px solid #ccc;border-radius:0;vertical-align:middle;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;-webkit-appearance:none}.nice-search input:focus{outline:0}.nice-search button{display:inline-block;color:#fff;background-color:#1167b7;overflow:hidden;position:absolute;height:36px;width:36px;margin:0;padding:0;top:0;right:0;border:1px solid #1167b7;font-size:0;line-height:normal}.nice-search .icon-search{font-size:24px;font-style:normal;font-family:\"NICE.Glyphs\";speak:none;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased}.nice-search .icon-search:before{content:\"\\e004\"}.nice-search .twitter-typeahead{width:100%}.nice-search .tt-dropdown-menu{width:100%}.tophat-legacy .icon-search{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe004;')}@media (max-width:979px){.nice-search{float:none;width:100%}.nice-partner .nice-search .controls{margin-left:110px}}.nice-tophat .nice-partner .partner-logo{float:left;display:block;margin:22px 24px 0 0}.nice-tophat .nice-partner .partner-logo:hover,.nice-tophat .nice-partner .partner-logo:focus,.nice-tophat .nice-partner .partner-logo:active{background-color:transparent;padding-bottom:0;border-bottom:none}.nice-tophat .nice-partner .partner-logo img{height:72px}.nice-tophat .nice-partner .partner-brand{display:block;font-size:24px;line-height:36px;margin:0 0 -6px;padding:12px 0 0;color:#888}.nice-tophat .nice-partner .partner-brand small{float:right;margin:-10px 10px 0 0}@media (max-width:979px){.nice-tophat .nice-partner .partner-brand{display:none;visibility:hidden;speak:none}.nice-tophat .nice-partner .partner-logo{position:absolute;top:12px;left:12px;padding:0;margin:0;z-index:2002}.nice-tophat .nice-partner .partner-logo img{height:38px}}.nice-internal{min-height:50px;width:100%}.nice-internal .logo{font-size:0;line-height:36px;*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe019;')}.nice-internal .logo,.nice-internal .logo:hover,.nice-internal .logo:focus,.nice-internal .logo:active{color:#263238}.nice-internal .logo small{font-family:Lato,\"Helvetica Neue\",Helvetica,Arial,sans-serif;display:inline;font-size:32px;line-height:46px}.nice-internal .logo:before{float:none;margin-right:.5em;font-size:32px;content:\"\\e01a\";vertical-align:top}.nice-internal .nice-services{background-color:#fff}.nice-internal .nice-services .menu a{color:#263238;border-left:none;padding-top:5px;padding-bottom:5px}.nice-internal .nice-services .menu a:hover,.nice-internal .nice-services .menu a:focus,.nice-internal .nice-services .menu a:active{color:#263238;background-color:transparent}.active .nice-internal .nice-services .menu a,.active .nice-internal .nice-services .menu a:hover,.active .nice-internal .nice-services .menu a:focus,.active .nice-internal .nice-services .menu a:active{color:#263238;background-color:transparent}.nice-internal .nice-services .menu-mobile{display:none}.nice-internal .nice-global a{padding-top:9px;padding-bottom:10px}.nice-internal .nice-global a:hover,.nice-internal .nice-global a:focus{padding-bottom:8px;border-bottom-width:2px}.menu .nice-internal .nice-global a{padding-top:19px;padding-bottom:20px;line-height:24px}.menu .nice-internal .nice-global a:hover,.menu .nice-internal .nice-global a:focus{padding-bottom:16px;border-bottom-width:4px}.active .nice-internal .nice-global a,.active .nice-internal .nice-global a:hover,.active .nice-internal .nice-global a:focus{padding-bottom:8px;border-bottom-width:2px}.menu .active .nice-internal .nice-global a,.menu .active .nice-internal .nice-global a:hover,.menu .active .nice-internal .nice-global a:focus{padding-bottom:16px;border-bottom-width:4px}@media (max-width:767px){.nice-internal .logo{margin:0;padding:0}}.nice-tophat .menu-anonymous,.nice-tophat .menu-profile{float:right}.nice-tophat .menu-anonymous,.nice-tophat .menu-profile,.nice-tophat .menu-anonymous:hover,.nice-tophat .menu-profile:hover,.nice-tophat .menu-anonymous:focus,.nice-tophat .menu-profile:focus{color:#fff}.nice-tophat .menu-anonymous{margin:15px 0 0 12px;padding:6px 12px;border:1px solid #fff}.nice-tophat .menu-profile{position:relative;width:36px;height:36px;padding:9px;line-height:36px}.nice-tophat .menu-profile,.nice-tophat .menu-profile:hover,.nice-tophat .menu-profile:focus{background-color:transparent}.nice-tophat .profile-avatar{position:absolute;width:100%;height:100%;vertical-align:-35%;color:#fff;text-align:center;font-size:20px;font-style:normal;font-family:\"NICE.Glyphs\";speak:none;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased;line-height:inherit;*line-height:40px}.nice-tophat .profile-avatar:before{content:\"\\e01f\"}.nice-tophat .nice-profile{position:absolute;z-index:2003;width:250px;padding:6px 0;left:50%;margin-left:340px;top:50px;background-color:#2a5e6e;display:none}.nice-tophat .nice-profile .menu{border-right:1px solid #2d6475}.nice-tophat .nice-profile .menu,.nice-tophat .nice-profile .menu li{float:none;display:block;margin-left:0;border-right:0}.nice-tophat .nice-profile .menu a{padding-left:12px;padding-right:12px;border-top:1px solid #2d6475}.nice-tophat .nice-profile .menu a:hover,.nice-tophat .nice-profile .menu a:focus{background-color:#387e92}.active .nice-tophat .nice-profile .menu a,.active .nice-tophat .nice-profile .menu a:hover,.active .nice-tophat .nice-profile .menu a:focus{color:#000;background-color:#ffc100}li:first-child .nice-tophat .nice-profile .menu a{border-top:0}.tophat-legacy .profile-avatar{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe01f;')}.menu-profile-open .nice-profile{display:block}.layout-fill .nice-tophat .nice-profile{left:auto;right:12px;margin-left:0}@media (max-width:979px){.nice-tophat .menu-anonymous{margin-top:12px}}@media (max-width:767px){.nice-tophat .menu-anonymous,.nice-tophat .menu-profile{top:0;right:0;position:absolute}.nice-tophat .menu-anonymous{margin:8px 12px;padding:3px 6px;border:0}.nice-tophat .nice-profile{position:relative;left:0;top:0;width:auto;margin:0;padding:0}.nice-tophat .nice-profile .menu{border:0;margin:0 -12px}.nice-tophat .nice-profile .menu li a{padding:12px;border:0;border-top:1px solid #2d6475;line-height:24px}.nice-tophat .nice-profile .menu li:first-child a{border-top:0}.nice-tophat .profile-avatar{font-size:16px;line-height:32px;height:32px;width:32px}.nice-tophat .profile-avatar:before{height:32px;width:32px}.layout-fill .nice-tophat .nice-profile{right:auto}}@media (max-width:480px){.nice-tophat .nice-profile .menu li a{padding:6px 12px}}"; (require("/Users/matt/Documents/branches/NICE.Tophat/node_modules/cssify"))(css); module.exports = css;
},{"/Users/matt/Documents/branches/NICE.Tophat/node_modules/cssify":1}],24:[function(require,module,exports){
// stylesheet to be auto inserted
require('./tophat.css');

// import scripts
var utils = require('./utils/dom');
var body = document.body;

var config = require('./config')();

// find or create the tophat element
var tophatElement = getTophatElement( 'nice-tophat', config );

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







composeTophat( tophatElement, serviceElement, evidenceElement, globalElement, config );

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
      el = utils.create('<div class="'+ classname +'"/>');
  }

  el.className = classname +
      ( config.internal ? ' nice-internal' : '' ) +
      ( config.legacy ? ' tophat-legacy' : '' );

  return el;
}

function composeTophat( el, services, evidenceResources, globalMenu, config ) {
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

},{"./config":2,"./events":5,"./evidence":7,"./global":8,"./profile":9,"./search":10,"./services":11,"./tophat.css":23,"./utils/dom":25}],25:[function(require,module,exports){
var utils = {};

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

module.exports = utils;

},{}],26:[function(require,module,exports){
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

},{"./dom":25}]},{},[24]);