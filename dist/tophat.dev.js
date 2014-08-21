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
var css = "@font-face{font-family:\"NICE.Glyphs\";src:url(http://cdn.nice.org.uk/V3/Content/nice-glyphs/NICE.Glyphs.eot?#iefix&v=1.3) format('embedded-opentype'),url(http://cdn.nice.org.uk/V3/Content/nice-glyphs/NICE.Glyphs.woff?v=1.3) format('woff'),url(http://cdn.nice.org.uk/V3/Content/nice-glyphs/NICE.Glyphs.ttf?v=13) format('truetype'),url(http://cdn.nice.org.uk/V3/Content/nice-glyphs/NICE.Glyphs.svg#fontawesomeregular?v=1.3) format('svg');font-weight:400;font-style:normal}.nice-tophat{overflow:visible;margin-bottom:24px;min-height:60px;*position:relative;*z-index:2;font-family:Lato,\"Helvetica Neue\",Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:14px;font-weight:400;line-height:24px}.nice-tophat .tophat-inner{width:95.74468085%;max-width:1170px;margin:0 auto}.nice-tophat .menu{position:relative;left:0;display:block;float:right;margin:0 0 0 12px;padding:0;list-style:none}.nice-tophat .menu li{float:left}.nice-tophat a{display:block;padding:6px 12px;color:#fff;text-decoration:none;font-weight:400}.nice-tophat a:focus,.nice-tophat a:hover,.nice-tophat a:active{color:#fff;text-decoration:none}.layout-fill .nice-tophat .tophat-inner{width:auto;max-width:100%;margin:0 12px}.nice-tophat .logo,.nice-tophat .icon-search,.nice-tophat .profile-avatar,.nice-tophat [class^=service-logo-]{font-style:normal;font-family:\"NICE.Glyphs\";speak:none;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased}.nice-tophat .logo,.nice-tophat .partner-logo{float:left;display:block;padding:6px 24px;margin-left:-24px;font-size:0;line-height:0}.nice-tophat .logo small{display:none}.nice-tophat .logo:before{content:\"\\e01a\\e01b\";font-size:48px;line-height:48px;letter-spacing:-.6em}.nice-tophat .profile-avatar,.nice-tophat .service-logo{float:left;position:relative;width:40px;height:40px;line-height:40px;vertical-align:-35%;margin-left:-48px;font-style:normal}.nice-tophat .profile-avatar,.nice-tophat [class^=service-logo-]{color:#fff;text-align:center;position:absolute;width:100%;height:100%;font-size:20px;line-height:inherit;vertical-align:baseline;speak:none;*line-height:40px}.nice-tophat .profile-avatar:before,.nice-tophat [class^=service-logo-]:before{display:inline-block;height:40px;width:40px}.nice-tophat .profile-avatar{float:none;position:relative;margin-left:0}.nice-tophat .service-logo-pathways:before{content:\"\\e005\"}.nice-tophat .service-logo-standards:before{content:\"\\e002\"}.nice-tophat .service-logo-guidance:before{content:\"\\e00e\"}.nice-tophat .service-logo-evidence:before{content:\"\\e017\"}.nice-tophat .icon-search:before,.nice-tophat .service-logo-search:before{content:\"\\e004\"}.nice-tophat .profile-avatar:before{content:\"\\e01f\"}.nice-tophat .service-logo-base{color:#333;font-size:40px;*line-height:40px}.nice-tophat .service-logo-base:before{content:\"\\e019\"}.nice-services,.nice-evidence,.nice-profile,.nice-global{overflow:hidden;clear:both}.nice-services{background-color:#333}.nice-services a{width:70px;padding:10px 0 10px 60px;line-height:20px;border-left:1px solid #343c41}.nice-services a:hover [class^=service-logo-],.nice-services a:focus [class^=service-logo-],.nice-services a:active [class^=service-logo-],.nice-services .active [class^=service-logo-],.nice-services .open [class^=service-logo-]{color:#000}.nice-services a:hover .service-logo-base,.nice-services a:focus .service-logo-base,.nice-services a:active .service-logo-base,.nice-services .active .service-logo-base,.nice-services .open .service-logo-base{color:#FFC100}.nice-services .menu a:hover,.nice-services .menu a:focus,.nice-services .menu a:active{background-color:#234e5b}.nice-services .open a,.nice-services .active a,.nice-services .open a:hover,.nice-services .active a:hover,.nice-services .open a:focus,.nice-services .active a:focus,.nice-services .open a:active,.nice-services .active a:active{background-color:#316e80}.nice-services .menu-anonymous a,.nice-services .menu-profile a{width:auto;text-align:center;padding:12px}.nice-services .menu-anonymous a{line-height:40px;padding:10px 12px}.nice-services .menu-profile .menu-label,.nice-services .menu-guidance .menu-label{line-height:40px}.nice-services .menu-profile .profile-avatar{display:inline-block;width:36px;height:36px;line-height:40px}.nice-services .menu-pathways a{width:65px}.nice-services .menu-standards a{width:95px}.nice-services .menu-search{display:none}.nice-profile,.nice-evidence{background:#316e80;display:none}.nice-profile .menu,.nice-evidence .menu{border-right:1px solid #2d6475}.nice-profile a,.nice-evidence a{padding-left:12px;padding-right:12px;border-left:1px solid #2d6475}.nice-profile a:hover,.nice-evidence a:hover,.nice-profile a:focus,.nice-evidence a:focus,.nice-profile a:active,.nice-evidence a:active{background-color:#387e92}.nice-profile .active a:hover,.nice-evidence .active a:hover,.nice-profile .active a:focus,.nice-evidence .active a:focus,.nice-profile .active a:active,.nice-evidence .active a:active,.nice-profile .active a,.nice-evidence .active a{color:#000;background-color:#ffc100}.menu-profile-open .nice-profile,.menu-evidence-open .nice-evidence{display:block}.nice-profile{position:absolute;width:100%;z-index:3;width:250px;padding:6px 0;left:50%;margin-left:340px}.nice-profile a{border-left:0;border-top:1px solid #2d6475}.nice-profile li:first-child a{border-top:0}.nice-tophat .nice-profile .menu,.nice-tophat .nice-profile li{float:none;display:block;margin-left:0;border-right:0}.nice-global{background:#eff1f3}.nice-global a{font-size:16px;color:#000;padding:19px 12px 20px}.nice-global a:hover,.nice-global a:focus,.nice-global a:active{color:#000;background:rgba(255,255,255,.4);padding-bottom:16px;border-bottom:4px solid #ffc100}.nice-global .active a,.nice-global .active a:hover,.nice-global .active a:focus,.nice-global .active a:active{background:rgba(255,255,255,.6);padding-bottom:16px;border-bottom:4px solid #ffc100}.nice-global .icon-search{font-size:24px}.nice-partner .partner-logo{float:left;display:block;margin:12px 0 0 -24px}.nice-partner .partner-logo:hover,.nice-partner .partner-logo:focus,.nice-partner .partner-logo:active{background:0 0;padding-bottom:0;border-bottom:none}.nice-partner .partner-logo img{height:72px}.nice-partner .partner-brand{display:block;font-size:24px;line-height:36px;margin:0 0 -6px;padding:12px 0 0;color:#888}.nice-partner .partner-brand small{float:right;margin:-10px 10px 0 0}.nice-partner .publication-date{float:right;font-size:16px;margin-top:-4px;margin-right:12px;color:#666}.nice-search{float:left;position:relative;width:40%;margin:12px 0}.nice-search .controls{margin-right:40px}.nice-search input{display:block;width:100%;padding:0 12px;margin:0;height:36px;font-family:Lato,\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-size:18px;font-weight:400;line-height:1;color:#333;border:1px solid #ccc;vertical-align:middle;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;-webkit-appearance:textfield}.nice-search input:focus{outline:0}.nice-search button{display:inline-block;color:#fff;background:#1167b7;overflow:hidden;position:absolute;height:38px;width:38px;margin:0;padding:0;top:0;right:0;border:1px solid #1167b7;font-size:0;line-height:normal}@media (max-width:1059px){.nice-tophat .logo:before{content:\"\\e01a\"}}@media (max-width:979px){.nice-tophat .tophat-inner{width:auto;max-width:100%;margin:0 12px}.menu-profile-open .nice-profile,.menu-evidence-open .nice-evidence{display:block}.nice-search{width:100%}.nice-partner .controls{margin-left:110px}.nice-global{position:relative}.nice-global .menu,.nice-global .partner-brand{display:none;visibility:hidden;speak:none}.nice-partner .partner-logo{position:absolute;top:12px;left:12px;padding:0;margin:0;z-index:2}.nice-partner .partner-logo img{height:38px}}@media (max-width:797px){.nice-tophat{min-height:48px;background:rgba(0,0,0,.075);padding-bottom:2px;margin-bottom:-2px}.nice-tophat .logo{padding:0 0 0 24px}.nice-tophat .logo:before{font-size:38px}.nice-services .menu{margin-right:-12px}.nice-services .menu a{width:auto;padding:6px}.nice-services .profile-avatar,.nice-services .service-logo{float:none;margin-left:0;display:inline-block}.nice-services .menu-search{display:block}.nice-services .menu-label{display:none;visibility:hidden}.nice-services .menu-profile a{padding:8px 12px}.nice-services .anon a{padding:6px 12px}.nice-services .anon .menu-label{display:block;visibility:visible}.nice-global{display:none}.menu-search-open .nice-global{display:block}}@media (max-width:499px){.nice-profile,.nice-evidence{position:absolute;width:100%;z-index:3}.nice-profile a,.nice-evidence a{border-left:0;border-top:1px solid #2d6475}.nice-profile li:first-child a,.nice-evidence li:first-child a{border-top:0}.menu-profile-open .nice-profile{padding:0;left:0;margin-left:0}.nice-tophat .nice-profile .menu,.nice-tophat .nice-evidence .menu,.nice-tophat .nice-profile li,.nice-tophat .nice-evidence li{float:none;display:block;margin-left:0;border-right:0}.nice-services .menu a{padding:4px 1px}.nice-services .menu .menu-profile a{padding:6px 1px}.nice-services .menu .anon a{padding:4px 6px}}"; (require("/Users/matt/Documents/branches/NICE.Tophat/node_modules/cssify"))(css); module.exports = css;
},{"/Users/matt/Documents/branches/NICE.Tophat/node_modules/cssify":1}],3:[function(require,module,exports){
var utils = require('./tophat.utils');
var activeElement;

function attachTophatEvents( document, tophatElement, serviceElement ) {
    var add    = document.addEventListener ? 'addEventListener' : 'attachEvent'
      , prefix = document.addEventListener ? '' : 'on';

    this.tophatElement = tophatElement;

    tophatElement[add](prefix + 'click', proxy( this, clickhandler ), true);

    document[add](prefix + 'click', proxy( this, cancelhandler ), true);
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

    var event = enhance( ev ).preventDefault();

    var elementAlreadyActive = (target === activeElement);
    if (elementAlreadyActive) return;

    this.activeElement = updateStates( this.tophatElement, target, this.activeElement );
}

function cancelhandler( ev ) {
    var target = ev.target || ev.srcElement
      , tophatEvent = false;

    while ( target ) {
        if ( target.className && ~target.className.indexOf( 'nice-tophat' ) ) {
            tophatEvent = true;
            break;
        }

        target = target.parentNode;
    }

    if ( tophatEvent ) return;

    if (activeElement) activeElement.className = activeElement.className.replace( ' open', '' );
    tophatElement.className = 'nice-tophat';
    activeElement = undefined;
}

function proxy( context, fn ) {
    return function( ev ) {
        fn.call( context, ev );
    };
}

function validateTarget( target ) {
    var isValid = target &&
            !~target.className.indexOf( 'menu-evidence' ) &&
            !~target.className.indexOf( 'menu-search' ) &&
            !~target.className.indexOf( 'menu-profile' );

    return isValid;
}

function updateStates( tophatElement, target, activeElement ) {
    tophatElement.className = 'nice-tophat ' + target.className.replace( ' active', '' ) + '-open active';

    if (activeElement) {
        activeElement.className = activeElement.className.replace( ' open', '' );
    }

    target.className += ' open';

    return target;
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

module.exports = attachTophatEvents;

},{"./tophat.utils":20}],4:[function(require,module,exports){
module.exports = '<div class="nice-evidence" id="nice-evidence"><div class="tophat-inner"><ul class="menu">{{menu}}</ul></div></div>';
},{}],5:[function(require,module,exports){
var utils = require('./tophat.utils');
var evidenceLinks = require('./tophat.evidence.links');
var tophatEvidence = require('./tophat.evidence.html');
var tophatEvidenceLinks = require('./tophat.evidence.links.html');

function generateEvidenceElement( tophatElement, config ) {
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

},{"./tophat.evidence.html":4,"./tophat.evidence.links":7,"./tophat.evidence.links.html":6,"./tophat.utils":20}],6:[function(require,module,exports){
module.exports = '<li class="evidence-{{id}}"><a href="{{href}}" title="{{title}}">{{label}}</a></li>';
},{}],7:[function(require,module,exports){
module.exports = {
    bnf: {
        href: "http://evidence.nhs.uk/formulary/bnf/current",
        beta: "http://beta.evidence.nhs.uk/formulary/bnf/current",
        label: "BNF",
        title: "British National Formulary"
    },
    bnfc: {
        href: "http://evidence.nhs.uk/formulary/bnfc/current",
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
        href: "http://evidence.nhs.uk/about-evidence-services/journals-and-databases",
        label: "Journals and databases",
        title: "Journals and databases"
    },
    search: {
        href: "http://evidence.nhs.uk",
        label: "Evidence search",
        title: "Evidence search"
    }
};

},{}],8:[function(require,module,exports){
module.exports = '<div class="nice-global" id="nice-global"><div class="tophat-inner"></div></div>';
},{}],9:[function(require,module,exports){
var utils = require('./tophat.utils');
var tophatGlobal = require('./tophat.global.html');

function generateGlobalElement( tophatElement ) {
    return utils.create( tophatGlobal );
}

module.exports = generateGlobalElement;

},{"./tophat.global.html":8,"./tophat.utils":20}],10:[function(require,module,exports){
// stylesheet to be auto inserted
require('./tophat.css');

// import scripts
var utils = require('./tophat.utils');
var body = document.body;

var config = getTophatConfig();

// find or create the tophat element
var tophatElement = getTophatElement( 'nice-tophat' );
require('./tophat.profile')( tophatElement, config );

// create the service and evidence elements
var serviceElement = require('./tophat.services')( tophatElement, config );
var evidenceElement = require('./tophat.evidence')( tophatElement, config );

// find or create the global element
var globalElement = utils.find( tophatElement, 'nice-global' )[0];
if (!globalElement) {
    var globalElement = require('./tophat.global')( tophatElement );
}

// create the search form and prepend it to the global element
var searchElement = require('./tophat.search')();
addSearchToGlobal( globalElement, searchElement );

// append all the parts to the tophat
constructTophat( tophatElement, serviceElement, evidenceElement, globalElement, config );

// attach the tophat to the top of the body
prependElement( tophatElement, body );

// attach all the events to the tophat
require('./tophat.events')( document, tophatElement, serviceElement );







// helper functions

function getTophatConfig() {
    var attributes = [ 'service', 'evidence', 'environment', 'timestamp' ];
    var config = {};

    var tag = getTophatScriptTag();
    if (tag) {
        len = attributes.length;

        for( i = 0; i < len; i++ ) {
            var key = attributes[i];
            var value = tag.getAttribute( 'data-' + key );

            if ( value && value !== '' ) {
                config[ key ] = value;
            }
        }
    }

    if (config.evidence) config.service = 'evidence';

    config.accountsUrl = 'https://beta-accounts.nice.org.uk/tophat';

    return config;
}

function getTophatScriptTag() {
    var tag = document.currentScript;
    if (tag) return tag;

    var i, len;
    var tags = document.getElementsByTagName( 'script' );
    len = tags.length;

    for (i = 0; i < len; i++) {
        if ( tags[i].src.indexOf('/tophat.js') || tags[i].src.indexOf('/tophat.dev.js') ) {
            return tags[i];
        }
    }
}

function getTophatElement( classname ) {
  var el = utils.find( body, classname )[0];
  if (!el) {
      el = utils.create('<div class="'+ classname +'"/>');
  }

  return el;
}

function constructTophat( el, services, evidenceResources, globalMenu, config ) {
    appendElement( services, el );
    appendElement( evidenceResources, el );
    appendElement( globalMenu, el );
}

function addSearchToGlobal( el, searchForm ) {
    var menu = utils.find( el, 'menu' )[0];

    if (menu) {
        return insertBeforeElement( searchForm, menu );
    }

    appendElement( searchForm, el.firstChild );
}

function prependElement( element, parent ) {
    parent.insertBefore( element, parent.firstChild );
}

function insertBeforeElement( element, sibling ) {
    var parent = sibling.parentNode;

    parent.insertBefore( element, sibling );
}

function appendElement( element, parent ) {
    parent.appendChild( element );
}

},{"./tophat.css":2,"./tophat.events":3,"./tophat.evidence":5,"./tophat.global":9,"./tophat.profile":12,"./tophat.search":15,"./tophat.services":17,"./tophat.utils":20}],11:[function(require,module,exports){
module.exports = '<div class="nice-profile" id="nice-profile"><div class="tophat-inner"><ul class="menu">{{menu}}</ul></div></div>';
},{}],12:[function(require,module,exports){
var utils = require('./tophat.utils');
var xhr = require('./tophat.xhr');
var tophatProfile = require('./tophat.profile.html');
var tophatProfileLinks = require('./tophat.profile.links.html');

function generateProfileElement( tophatElement, config ) {
    if (config.profile === 'none') return disableProfile( tophatElement );

    xhr.get( config.accountsUrl, function( data ) {
        if (!data) return disableProfile( tophatElement );

        onGetProfileResult( tophatElement, data );
    });
}

function onGetProfileResult( el, profile ) {
    if (profile.display_name) {
        return generateProfile( el, profile );
    }

    generateAnonymous( el, profile );
}

function generateProfile( el, profile ) {
    var profilenav = utils.find( el, 'menu-profile' )[0];
    var profileLink = profilenav.getElementsByTagName('a')[0];

    profileLink.setAttribute( 'title', profile.display_name );
    appendElement( utils.create('<span class="caret"/>'), profileLink );

    var linklist = generateLinkList( profile.links );
    var menu = utils.create( tophatProfile.replace( '{{menu}}', linklist ) );

    insertBeforeElement( menu, el.lastChild );
}

function generateAnonymous( el, profile ) {
    var menu = utils.find( el, 'menu-profile' )[0];
    var profileLink = menu.getElementsByTagName('a')[0];

    menu.className = 'menu-anonymous';
    profileLink.href = profile.links[ 'Sign in' ];
    profileLink.innerHTML = 'Sign in';
}

function disableProfile( el ) {
    var menu = utils.find( el, 'menu-profile' )[0];

    menu.parentNode.removeChild( menu );
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

function appendElement( element, parent ) {
    parent.appendChild( element );
}

function insertBeforeElement( element, sibling ) {
    var parent = sibling.parentNode;

    parent.insertBefore( element, sibling );
}

module.exports = generateProfileElement;

},{"./tophat.profile.html":11,"./tophat.profile.links.html":13,"./tophat.utils":20,"./tophat.xhr":21}],13:[function(require,module,exports){
module.exports = '<li><a href="{{href}}">{{label}}</a></li>';
},{}],14:[function(require,module,exports){
module.exports = '<form class="nice-search"><div class="controls"><input type="search" placeholder="Search..."> <button type="submit"><i class="icon-search"></i> <span class="menu-label">Search</span></button></div></form>';
},{}],15:[function(require,module,exports){
var utils = require('./tophat.utils');
var tophatSearch = require('./tophat.search.html');

function generateSearchElement() {
    return utils.create( tophatSearch );
}

module.exports = generateSearchElement;

},{"./tophat.search.html":14,"./tophat.utils":20}],16:[function(require,module,exports){
module.exports = '<div class="nice-services"><div class="tophat-inner"><a href="http://www.nice.org.uk" class="logo">NICE <small>National Institute of<br>Health and Care Excellence</small></a><ul class="menu">{{menu}}<li class="menu-evidence"><a href="#nice-evidence"><i class="service-logo"><i class="service-logo-base"></i> <i class="service-logo-evidence"></i></i> <span class="menu-label">Evidence services</span></a></li><li class="menu-profile"><a href="#nice-profile"><span class="profile-avatar"></span></a></li><li class="menu-search"><a href="#nice-global"><i class="service-logo"><i class="service-logo-base"></i> <i class="service-logo-search"></i></i> <span class="menu-label">Search</span></a></li></ul></div></div>';
},{}],17:[function(require,module,exports){
var utils = require('./tophat.utils');
var serviceLinks = require('./tophat.services.links');
var tophatServices = require('./tophat.services.html');
var tophatServicesLinks = require('./tophat.services.links.html');

function generateServiceElement( tophatElement, config ) {
    cleanUp( tophatElement );

    var linklist = generateLinkList( serviceLinks, config.environment === 'beta' );

    var el = utils.create( tophatServices.replace( '{{menu}}', linklist ) );

    if ( config.service ) {
        var active = utils.find( el, 'menu-' + config.service )[0];
        active.className = active.className + ' active';
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

},{"./tophat.services.html":16,"./tophat.services.links":19,"./tophat.services.links.html":18,"./tophat.utils":20}],18:[function(require,module,exports){
module.exports = '<li class="menu-{{id}}"><a href="{{href}}"><i class="service-logo"><i class="service-logo-base"></i> <i class="service-logo-{{id}}"></i></i> <span class="menu-label">{{label}}</span></a></li>';
},{}],19:[function(require,module,exports){
module.exports = {
    pathways: {
        href: "http://pathways.nice.org.uk",
        label: "NICE Pathways"
    },
    guidance: {
        href: "http://nice.org.uk/Guidance",
        label: "Guidance"
    },
    standards: {
        href: "http://nice.org.uk/standards-and-indicators",
        label: "Standards and&nbsp;indicators"
    }
};

},{}],20:[function(require,module,exports){
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

module.exports = utils;

},{}],21:[function(require,module,exports){
var xhr = {};

xhr.get = function( url, resolve ) {
    var head = document.getElementsByTagName("head")[0] || document.documentElement;
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
            if ( head && script.parentNode ) {
                head.removeChild( script );
            }
        }
    };

    // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
    // This arises when a base node is used (#2709 and #4378).
    head.insertBefore( script, head.firstChild );
};

module.exports = xhr;

},{}]},{},[10]);