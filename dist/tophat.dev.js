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
var attributes = [ 'service', 'evidence', 'environment', 'timestamp', 'search', 'typeaheadtype', 'typeaheadsource', 'internal', 'home' ];

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
var css = "@font-face{font-family:\"NICE.Glyphs\";src:url(//cdn.nice.org.uk/V3/Content/nice-glyphs/NICE.Glyphs.eot?#iefix&v=1.3) format('embedded-opentype'),url(//cdn.nice.org.uk/V3/Content/nice-glyphs/NICE.Glyphs.woff?v=1.3) format('woff'),url(//cdn.nice.org.uk/V3/Content/nice-glyphs/NICE.Glyphs.ttf?v=13) format('truetype'),url(//cdn.nice.org.uk/V3/Content/nice-glyphs/NICE.Glyphs.svg#niceglyphregular?v=1.3) format('svg');font-weight:400;font-style:normal}.nice-tophat{min-height:60px;*position:relative;*z-index:2001;font-family:Lato,\"Helvetica Neue\",Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:14px;font-weight:400;line-height:24px;-moz-box-shadow:0 0 6px 0 rgba(0,0,0,.2);box-shadow:0 0 6px 0 rgba(0,0,0,.2)}.nice-tophat .tophat-inner{width:95.74468085%;max-width:1170px;margin:0 auto}.nice-tophat .menu{position:relative;left:0;display:block;float:right;margin:0;padding:0;list-style:none}.nice-tophat .menu li{float:left}.nice-tophat a{display:block;padding:6px 12px;color:#fff;text-decoration:none;font-weight:400}.nice-tophat a:focus,.nice-tophat a:hover,.nice-tophat a:active{color:#fff;text-decoration:none}.layout-fill .nice-tophat .tophat-inner{width:auto;max-width:100%;margin:0 12px}.nice-tophat .logo,.nice-tophat .icon-search,.nice-tophat .icon-offcanvas,.nice-tophat .profile-avatar,.nice-tophat [class^=service-logo-]{font-style:normal;font-family:\"NICE.Glyphs\";speak:none;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased}.nice-tophat .logo,.nice-tophat .partner-logo{float:left;display:block;padding:6px 24px;margin-left:-24px;font-size:0;line-height:0}.nice-tophat .logo{border-left:0}.nice-tophat .logo small{display:none}.nice-tophat .logo:before{content:\"\\e01a\\e01b\";font-size:48px;line-height:48px;letter-spacing:-.6em}.nice-tophat .profile-avatar,.nice-tophat .service-logo{float:left;position:relative;width:40px;height:40px;line-height:40px;vertical-align:-35%;margin-left:-48px;font-style:normal}.nice-tophat .profile-avatar,.nice-tophat [class^=service-logo-]{color:#fff;text-align:center;position:absolute;display:inline-block;width:100%;height:100%;font-size:20px;line-height:inherit;speak:none;*line-height:40px}.nice-tophat [class^=service-logo-]{vertical-align:baseline}.nice-tophat .profile-avatar{float:none;position:relative;margin-left:0}.nice-tophat .service-logo-pathways:before{content:\"\\e005\"}.nice-tophat .service-logo-standards:before{content:\"\\e002\"}.nice-tophat .service-logo-guidance:before{content:\"\\e00e\"}.nice-tophat .service-logo-evidence:before{content:\"\\e017\"}.nice-tophat .icon-search:before,.nice-tophat .service-logo-search:before{content:\"\\e004\"}.nice-tophat .profile-avatar:before{content:\"\\e01f\"}.nice-tophat .icon-offcanvas:before{content:\"\\e03d\"}.nice-tophat .service-logo-base{color:#333;font-size:40px;*line-height:40px}.nice-tophat .service-logo-base:before{content:\"\\e019\"}.nice-internal{min-height:50px;width:100%}.nice-internal .logo,.nice-internal .logo:hover,.nice-internal .logo:focus,.nice-internal .logo:active{color:#263238}.nice-internal .logo small{font-family:Lato,\"Helvetica Neue\",Helvetica,Arial,sans-serif;display:inline-block;font-size:28px;line-height:36px;vertical-align:top}.nice-internal .logo:before{float:left;margin-top:2px;font-size:32px;line-height:36px;content:\"\\e01a\";letter-spacing:-12px}.tophat-legacy .logo{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe01a;&#xe01b;');font-size:48px;line-height:48px;letter-spacing:-.6em}.tophat-legacy .service-logo-pathways{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe005;')}.tophat-legacy .service-logo-standards{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe002;')}.tophat-legacy .service-logo-guidance{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe00e;')}.tophat-legacy .service-logo-evidence{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe017;')}.tophat-legacy .icon-search,.tophat-legacy .service-logo-search{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe004;')}.tophat-legacy .profile-avatar{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe01f;')}.tophat-legacy .service-logo-base{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe019;')}.tophat-legacy .icon-offcanvas:before{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe03d;')}.tophat-legacy.nice-internal .logo{float:left;margin-top:2px;font-size:32px;line-height:36px;*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe019;');letter-spacing:-12px}.nice-services,.nice-evidence,.nice-profile,.nice-global{*zoom:1}.nice-services:before,.nice-evidence:before,.nice-profile:before,.nice-global:before,.nice-services:after,.nice-evidence:after,.nice-profile:after,.nice-global:after{display:table;content:\"\";line-height:0}.nice-services:after,.nice-evidence:after,.nice-profile:after,.nice-global:after{clear:both}.nice-services{background-color:#333}.nice-services a:hover [class^=service-logo-],.nice-services a:focus [class^=service-logo-],.nice-services a:active [class^=service-logo-],.nice-services .active [class^=service-logo-]{color:#000}.nice-services a:hover .service-logo-base,.nice-services a:focus .service-logo-base,.nice-services a:active .service-logo-base,.nice-services .active .service-logo-base{color:#FFC100}.nice-services .menu a{width:70px;padding:10px 0 10px 60px;line-height:20px;border-left:1px solid #343c41}.nice-services .menu a:hover,.nice-services .menu a:focus,.nice-services .menu a:active{background-color:#234e5b}.nice-services .active a,.nice-services .active a:hover,.nice-services .active a:focus,.nice-services .active a:active{background-color:#316e80}.nice-services .menu-anonymous a,.nice-services .menu-profile a{width:auto;text-align:center;padding:12px}.nice-services .menu-anonymous a{line-height:40px;padding:10px 12px}.nice-services .menu-profile .menu-label,.nice-services .menu-guidance .menu-label{line-height:40px}.nice-services .menu-profile .profile-avatar{display:inline-block;width:36px;height:36px;line-height:36px}.nice-services .menu-pathways a{width:65px}.nice-services .menu-standards a{width:95px}.nice-services .menu-search{display:none}.nice-internal .nice-services{background:#fff}.nice-internal .nice-services a{color:#263238;border-left:none;padding-top:5px;padding-bottom:5px}.nice-internal .nice-services .menu a:hover,.nice-internal .nice-services .menu a:focus,.nice-internal .nice-services .menu a:active{color:#263238;background:0 0}.nice-internal .nice-services .active a,.nice-internal .nice-services .active a:hover,.nice-internal .nice-services .active a:focus,.nice-internal .nice-services .active a:active{color:#263238;background:0 0}.menu-profile-open .menu-profile a,.menu-search-open .menu-search a,.menu-evidence-open .menu-evidence a,.menu-profile-open .menu-profile a:hover,.menu-search-open .menu-search a:hover,.menu-evidence-open .menu-evidence a:hover,.menu-profile-open .menu-profile a:focus,.menu-search-open .menu-search a:focus,.menu-evidence-open .menu-evidence a:focus,.menu-profile-open .menu-profile a:active,.menu-search-open .menu-search a:active,.menu-evidence-open .menu-evidence a:active{background-color:#316e80}.menu-profile-open .menu-profile [class^=service-logo-],.menu-search-open .menu-search [class^=service-logo-],.menu-evidence-open .menu-evidence [class^=service-logo-]{color:#000}.menu-profile-open .menu-profile .service-logo-base,.menu-search-open .menu-search .service-logo-base,.menu-evidence-open .menu-evidence .service-logo-base,.menu-profile-open .menu-profile .service-logo-base,.menu-search-open .menu-search .service-logo-base,.menu-evidence-open .menu-evidence .service-logo-base,.menu-profile-open .menu-profile .service-logo-base,.menu-search-open .menu-search .service-logo-base,.menu-evidence-open .menu-evidence .service-logo-base{color:#FFC100}.nice-profile,.nice-evidence{background:#316e80;display:block}.nice-profile .menu,.nice-evidence .menu{border-right:1px solid #2d6475}.nice-profile a,.nice-evidence a{padding-left:12px;padding-right:12px;border-left:1px solid #2d6475}.nice-profile a:hover,.nice-evidence a:hover,.nice-profile a:focus,.nice-evidence a:focus,.nice-profile a:active,.nice-evidence a:active{background-color:#387e92}.nice-profile .active a:hover,.nice-evidence .active a:hover,.nice-profile .active a:focus,.nice-evidence .active a:focus,.nice-profile .active a:active,.nice-evidence .active a:active,.nice-profile .active a,.nice-evidence .active a{color:#000;background-color:#ffc100}.nice-profile{display:none}.menu-profile-open .nice-profile{display:block}.nice-profile{position:absolute;z-index:2003;width:250px;padding:6px 0;left:50%;margin-left:340px;top:50px}.nice-profile a{border-left:0;border-top:1px solid #2d6475}.nice-profile li:first-child a{border-top:0}.layout-fill .nice-profile{left:auto;right:12px;margin-left:0}.nice-tophat .nice-profile .menu,.nice-tophat .nice-profile li{float:none;display:block;margin-left:0;border-right:0}.nice-internal .profile-avatar{color:#263238}.nice-internal .menu-profile a,.nice-internal .menu-profile a:hover,.nice-internal .menu-profile a:focus,.nice-internal .menu-profile a:active{background:0 0}.nice-internal .nice-profile{background-color:#37474f}.nice-internal .nice-profile li a{border-top-color:#37474f}.nice-internal .nice-profile li a,.nice-internal .nice-profile li a:hover,.nice-internal .nice-profile li a:focus,.nice-internal .nice-profile li a:active{color:#fff}.nice-internal .nice-profile li a:hover{background-color:internalEvidenceHoverBackgroundColor}.nice-internal .profile-container.open{background:#f5f5f5}.nice-global{background:#eff1f3}.nice-global a{font-size:16px;color:#000;padding:19px 12px 20px}.nice-global a:hover,.nice-global a:focus,.nice-global a:active{color:#000;background:rgba(255,255,255,.4);padding-bottom:16px;border-bottom:4px solid #ffc100}.nice-global .active a,.nice-global .active a:hover,.nice-global .active a:focus,.nice-global .active a:active{background:rgba(255,255,255,.6);padding-bottom:16px;border-bottom:4px solid #ffc100}.nice-global .icon-search{font-size:24px}.nice-internal .nice-global a{padding-top:9px;padding-bottom:10px}.nice-internal .nice-global a:hover,.nice-internal .nice-global a:focus,.nice-internal .nice-global a:active{padding-bottom:8px;border-bottom-width:2px}.nice-internal .nice-global .active a,.nice-internal .nice-global .active a:hover,.nice-internal .nice-global .active a:focus,.nice-internal .nice-global .active a:active{padding-bottom:8px;border-bottom-width:2px}.nice-partner .partner-logo{float:left;display:block;margin:12px 0 0 -24px}.nice-partner .partner-logo:hover,.nice-partner .partner-logo:focus,.nice-partner .partner-logo:active{background:0 0;padding-bottom:0;border-bottom:none}.nice-partner .partner-logo img{height:72px}.nice-partner .partner-brand{display:block;font-size:24px;line-height:36px;margin:0 0 -6px;padding:12px 0 0;color:#888}.nice-partner .partner-brand small{float:right;margin:-10px 10px 0 0}.nice-partner .publication-date{float:right;font-size:16px;margin-top:-4px;margin-right:12px;color:#666}.nice-search{float:left;position:relative;width:40%;margin:12px 0}.nice-search .controls{margin-right:40px}.nice-search input{display:block;width:100%;padding:0 12px;margin:0;height:36px;font-family:Lato,\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-size:18px;font-weight:400;line-height:36px;color:#333;border:1px solid #ccc;border-radius:0;vertical-align:middle;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;-webkit-appearance:none}.nice-search input:focus{outline:0}.nice-search button{display:inline-block;color:#fff;background:#1167b7;overflow:hidden;position:absolute;height:38px;width:38px;margin:0;padding:0;top:0;right:0;border:1px solid #1167b7;font-size:0;line-height:normal}@media (max-width:1180px){.nice-profile{left:auto;right:12px;margin-left:0}}@media (max-width:1059px){.nice-tophat .logo:before{content:\"\\e01a\"}.tophat-legacy .logo{*zoom:expression( this.runtimeStyle['zoom'] = '1', this.innerHTML = '&#xe01a;')}}@media (max-width:979px){.nice-tophat .tophat-inner{width:auto;max-width:100%;margin:0 12px}.nice-search{width:100%}.nice-partner .controls{margin-left:110px}.nice-global{position:relative}.nice-global .menu,.nice-global .partner-brand{display:none;visibility:hidden;speak:none}.nice-partner .partner-logo{position:absolute;top:12px;left:12px;padding:0;margin:0;z-index:2002}.nice-partner .partner-logo img{height:38px}}@media (max-width:829px){.nice-tophat{min-height:48px;background:rgba(0,0,0,.075);padding-bottom:2px;margin-bottom:-2px}.nice-tophat .logo{padding:0 0 0 24px}.nice-tophat .logo:before{font-size:38px}.nice-tophat .logo small{display:none}.nice-services .menu{margin-right:-12px}.nice-services .menu a{width:auto;padding:6px}.nice-services .profile-avatar,.nice-services .service-logo{float:none;margin-left:0;display:inline-block}.nice-services .menu-search{display:block}.nice-services .menu-label{display:none;visibility:hidden}.nice-services .menu-profile a{padding:8px 12px}.nice-services .anon a{padding:6px 12px}.nice-services .anon .menu-label{display:block;visibility:visible}.nice-evidence,.nice-global{display:none}.menu-evidence-open .nice-evidence,.menu-search-open .nice-global{display:block}}@media (max-width:499px){.nice-profile,.nice-evidence{position:absolute;width:100%;z-index:2003;right:0}.nice-profile a,.nice-evidence a{border-left:0;border-top:1px solid #2d6475}.nice-profile li:first-child a,.nice-evidence li:first-child a{border-top:0}.menu-profile-open .nice-profile{padding:0;left:auto;top:auto;margin-left:0;border:0}.nice-tophat .nice-profile .menu,.nice-tophat .nice-evidence .menu,.nice-tophat .nice-profile li,.nice-tophat .nice-evidence li{float:none;display:block;margin-left:0;border-right:0}.nice-services .menu a{padding:4px 1px}.nice-services .menu .menu-profile a{padding:6px 1px}.nice-services .menu .menu-anonymous a{padding:4px 6px}}@media (max-width:415px){.nice-tophat{min-height:32px}.nice-tophat [class^=service-logo-],.nice-tophat .service-logo,.nice-services .menu-profile .profile-avatar{font-size:16px;line-height:32px;height:32px;width:32px}.nice-tophat .service-logo-base{font-size:32px}.nice-services .menu-anonymous a{line-height:31px}.nice-services .menu .menu-profile a{padding:0 0 4px}.nice-tophat .logo{padding-left:6px;margin-left:-12px}.nice-tophat .logo:before{font-size:38px;line-height:38px}.nice-tophat .profile-avatar:before,.nice-tophat [class^=service-logo-]:before{height:32px;width:32px}}"; (require("/Users/matt/Documents/branches/NICE.Tophat/node_modules/cssify"))(css); module.exports = css;
},{"/Users/matt/Documents/branches/NICE.Tophat/node_modules/cssify":1}],4:[function(require,module,exports){
var utils = require('./tophat.utils');
var StateControl = require('./tophat.states');
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

    var href = target.href || target.getElementsByTagName('a')[0].href;

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

    switch ( cleanClass( target.className ) ) {
        case 'menu-evidence':
            this.state.toggleEvidence();
            break;

        case 'menu-profile':
            this.state.toggleProfile();
            break;

        case 'menu-search':
            this.state.toggleSearch();
            break;
    }
}

function validateTarget( target ) {
    var isValid = target &&
            !~target.className.indexOf( 'menu-evidence' ) &&
            !~target.className.indexOf( 'menu-search' ) &&
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
            ~target.action.indexOf( '%term' ) ) {
        var term = escape( target.q.value.replace(/\s/g, '+') );
        var location = target.action.replace(/%term/ig, term);

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
      return sendDataLayerEvent( category, action, label, value, cb );
    }

    if ( window._gaq && typeof window._gaq.push === 'function' ) {
      return sendGAEvent( category, action, label );
    }

    if ( typeof window.ga === 'function' ) {
        return sendUAEvent( category, action, label );
    }

    logEventToConsole( category, action, label );
}

function sendDataLayerEvent( category, action, label, value ) {
  var data = {
    event: 'GAevent',
    eventCategory: category,
    eventAction: action,
    eventLabel: label
  };

  if ( value ) {
    data.eventValue = value;
  }

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

},{"./tophat.states":25,"./tophat.utils":26}],5:[function(require,module,exports){
module.exports = '<div class="nice-evidence" id="nice-evidence"><div class="tophat-inner"><ul class="menu">{{menu}}</ul></div></div>';
},{}],6:[function(require,module,exports){
var utils = require('./tophat.utils');
var evidenceLinks = require('./tophat.evidence.links');
var tophatEvidence = require('./tophat.evidence.html');
var tophatEvidenceService = require('./tophat.evidence.service.html');
var tophatEvidenceLinks = require('./tophat.evidence.links.html');

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

},{"./tophat.evidence.html":5,"./tophat.evidence.links":8,"./tophat.evidence.links.html":7,"./tophat.evidence.service.html":9,"./tophat.utils":26}],7:[function(require,module,exports){
module.exports = '<li class="evidence-{{id}}"><a href="{{href}}" title="{{title}}">{{label}}</a></li>';
},{}],8:[function(require,module,exports){
module.exports = {
    search: {
        href: "http://www.evidence.nhs.uk",
        beta: "http://beta.evidence.nhs.uk",
        label: "Evidence search",
        title: "Evidence search"
    },
    bnf: {
        href: "http://www.evidence.nhs.uk/formulary/bnf/current",
        beta: "http://beta.evidence.nhs.uk/formulary/bnf/current",
        label: "BNF",
        title: "British National Formulary"
    },
    bnfc: {
        href: "http://www.evidence.nhs.uk/formulary/bnfc/current",
        beta: "http://beta.evidence.nhs.uk/formulary/bnfc/current",
        label: "BNFC",
        title: "British National Formulary for Children"
    },
    cks: {
        href: "http://cks.nice.org.uk",
        beta: "http://beta.cks.nice.org.uk",
        label: "CKS",
        title: "Clinical Knowledge Summaries"
    },
    journals: {
        href: "http://www.evidence.nhs.uk/about-evidence-services/journals-and-databases",
        label: "Journals and databases",
        title: "Journals and databases"
    }
};

},{}],9:[function(require,module,exports){
module.exports = '<li class="menu-evidence"><a href="#nice-evidence"><i class="service-logo"><i class="service-logo-base"></i> <i class="service-logo-evidence"></i></i> <span class="menu-label">Evidence services</span></a></li>';
},{}],10:[function(require,module,exports){
module.exports = '<div class="nice-global" id="nice-global"><div class="tophat-inner"></div></div>';
},{}],11:[function(require,module,exports){
var utils = require('./tophat.utils');
var tophatGlobal = require('./tophat.global.html');

function generateGlobalElement( tophatElement ) {
    var el = utils.find( tophatElement, 'nice-global' )[0];

    if (!el) {
        el = utils.create( tophatGlobal );
    }

    return el;
}

module.exports = generateGlobalElement;

},{"./tophat.global.html":10,"./tophat.utils":26}],12:[function(require,module,exports){
// stylesheet to be auto inserted
require('./tophat.css');

// import scripts
var utils = require('./tophat.utils');
var body = document.body;

var config = require('./tophat.config.js')();

// find or create the tophat element
var tophatElement = getTophatElement( 'nice-tophat', config );

// create the service elements
var serviceElement = require('./tophat.services')( tophatElement, config );

// create the evidence elements
var evidenceElement = require('./tophat.evidence')( tophatElement, serviceElement, config );

// create the profile elements
require('./tophat.profile')( tophatElement, serviceElement, config );

// find or create the global element
var globalElement = require('./tophat.global')( tophatElement );

// create the search form and prepend it to the global element
var searchElement = require('./tophat.search')( globalElement, serviceElement, config );







composeTophat( tophatElement, serviceElement, evidenceElement, globalElement, config );

// attach all the events to the tophat
require('./tophat.events')( document, tophatElement, serviceElement, config );

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

},{"./tophat.config.js":2,"./tophat.css":3,"./tophat.events":4,"./tophat.evidence":6,"./tophat.global":11,"./tophat.profile":15,"./tophat.search":19,"./tophat.services":22,"./tophat.utils":26}],13:[function(require,module,exports){
module.exports = '<li class="menu-anonymous"><a href="{{root}}/signin">Sign in</a></li>';
},{}],14:[function(require,module,exports){
module.exports = '<div class="nice-profile" id="nice-profile"><div class="tophat-inner"><ul class="menu">{{menu}}</ul></div></div>';
},{}],15:[function(require,module,exports){
var utils = require('./tophat.utils');
var xhr = require('./tophat.xhr');
var tophatProfile = require('./tophat.profile.html');
var tophatProfileService = require('./tophat.profile.service.html');
var tophatProfileAnon = require('./tophat.profile.anon.html');
var tophatProfileLinks = require('./tophat.profile.links.html');
var tophatProfileEndpoint = '/tophat';

function generateProfileElement( tophatElement, serviceElement, config ) {
    if (config.profile === 'none') return;

    utils.appendElement( utils.create( tophatProfileAnon.replace('{{root}}', config.accountsUrl) ), utils.find( serviceElement, 'menu' )[0] );

    xhr.get( config.accountsUrl + tophatProfileEndpoint, function( data ) {
        if (!data) {
          disableProfile( tophatElement );
          return;
        }

        if (data.display_name) {
            generateProfile( tophatElement, data );
        }
    });
}

function generateProfile( el, profile ) {
    var anonitem = utils.find( el, 'menu-anonymous' )[0];
    var profilenav = utils.create( tophatProfileService );
    var profileLink = profilenav.getElementsByTagName('a')[0];

    profileLink.setAttribute( 'title', profile.display_name );
    if (profile.thumbnail && profile.thumbnail.length) {
        profileLink.innerHTML = '<img src="'+ profile.thumbnail +'" class="profile-avatar" alt="Your profile image" />';
    }

    var linklist = generateLinkList( profile.links );
    var menu = utils.create( tophatProfile.replace( '{{menu}}', linklist ) );

    utils.insertBeforeElement( profilenav, anonitem );
    utils.remove( anonitem );
    utils.insertBeforeElement( menu, el.lastChild );
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

},{"./tophat.profile.anon.html":13,"./tophat.profile.html":14,"./tophat.profile.links.html":16,"./tophat.profile.service.html":17,"./tophat.utils":26,"./tophat.xhr":27}],16:[function(require,module,exports){
module.exports = '<li><a href="{{href}}">{{label}}</a></li>';
},{}],17:[function(require,module,exports){
module.exports = '<li class="menu-profile"><a href="#nice-profile"><span class="profile-avatar"></span></a></li>';
},{}],18:[function(require,module,exports){
module.exports = '<form class="nice-search" method="{{method}}" action="{{action}}" data-track="search"><div class="controls"><input name="q" value="{{q}}" autocomplete="off" spellcheck="false" placeholder="Search..." maxlength="250" data-provide="typeahead" data-source-type="{{typeaheadtype}}" data-source="{{typeaheadsource}}"> <button type="submit"><i class="icon-search"></i> <span class="menu-label">Search</span></button></div></form>';
},{}],19:[function(require,module,exports){
var utils = require('./tophat.utils');
var tophatSearch = require('./tophat.search.html');
var tophatSearchService = require('./tophat.search.service.html');

function generateSearchElement( globalElement, serviceElement, config ) {
    if (!config.search) return;

    utils.appendElement( utils.create( tophatSearchService ), utils.find( serviceElement, 'menu' )[0] );

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
    return decodeURIComponent( (s || '').replace( /\+/g, ' ' ) );
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

},{"./tophat.search.html":18,"./tophat.search.service.html":20,"./tophat.utils":26}],20:[function(require,module,exports){
module.exports = '<li class="menu-search"><a href="#nice-global"><i class="service-logo"><i class="service-logo-base"></i> <i class="service-logo-search"></i></i> <span class="menu-label">Search</span></a></li>';
},{}],21:[function(require,module,exports){
module.exports = '<div class="nice-services"><div class="tophat-inner"><a href="{{homelink}}" class="logo">NICE <small>National Institute of<br>Health and Care Excellence</small></a><ul class="menu">{{menu}}</ul></div></div>';
},{}],22:[function(require,module,exports){
var utils = require('./tophat.utils');
var serviceLinks = require('./tophat.services.links');
var tophatServices = require('./tophat.services.html');
var tophatServicesLinks = require('./tophat.services.links.html');

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

},{"./tophat.services.html":21,"./tophat.services.links":24,"./tophat.services.links.html":23,"./tophat.utils":26}],23:[function(require,module,exports){
module.exports = '<li class="menu-{{id}}"><a href="{{href}}"><i class="service-logo"><i class="service-logo-base"></i> <i class="service-logo-{{id}}"></i></i> <span class="menu-label">{{label}}</span></a></li>';
},{}],24:[function(require,module,exports){
module.exports = {
    pathways: {
        href: "http://pathways.nice.org.uk",
        label: "NICE Pathways"
    },
    guidance: {
        href: "http://www.nice.org.uk/Guidance",
        label: "Guidance"
    },
    standards: {
        href: "http://www.nice.org.uk/standards-and-indicators",
        label: "Standards and&nbsp;indicators"
    }
};

},{}],25:[function(require,module,exports){
var evidenceStateClassname = 'menu-evidence-open';
var profileStateClassname = 'menu-profile-open';
var searchStateClassname = 'menu-search-open';

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
          , search: ~classname.indexOf(searchStateClassname)
        };
}

function cleanClassname( classname ) {
    return classname
        .replace( ' ' + evidenceStateClassname, '' )
        .replace( ' ' + profileStateClassname, '' )
        .replace( ' ' + searchStateClassname, '' );
}

TophatStates.prototype = {

    updateState: function() {
        var classname = this.classname +
            ( this.data.evidence ? ' ' + evidenceStateClassname : '' ) +
            ( this.data.profile ? ' ' + profileStateClassname : '' ) +
            ( this.data.search ? ' ' + searchStateClassname : '' );

        this.element.className = classname;
    }

  , toggleEvidence: function() {
        this.data.evidence = !this.data.evidence;
        if (this.data.evidence) {
            this.data.profile = false;
            this.data.search = false;
        }
        this.updateState();
    }

  , toggleProfile: function() {
        this.data.profile = !this.data.profile;
        if (this.data.profile) {
            this.data.search = false;
            this.data.evidence = false;
        }
        this.updateState();
    }

  , toggleSearch: function() {
        this.data.search = !this.data.search;
        if (this.data.search) {
            this.data.profile = false;
            this.data.evidence = false;
        }
        this.updateState();
    }

  , unfocus: function() {
        this.data.profile = false;
        this.updateState();
    }

};

module.exports = {
    forElement: function( el ) {
        new TophatStates( el );
    }
};

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
var utils = require('./tophat.utils');
var xhr = {};

xhr.get = function( url, resolve ) {
    var body = document.body;
    var script = document.createElement("script");
    script.src = url + '?' + Math.floor(Math.random() * 10000000000);

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

},{"./tophat.utils":26}]},{},[12]);