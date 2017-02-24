var config = require('../config');

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


utils.setAriaStates = function(){
    var mobile = document.body.clientWidth < 767;
    var mobileMenu = document.getElementById("menu-mobile");
    var mobileEvidenceMenu = document.getElementById("menu-evidence");
    var mobileDropdown = document.getElementById("nice-evidence");
    var mainMenu = document.getElementById("main-menu");

    function setMobileState(bool){
        var mobileState = bool;
        mobileMenu.setAttribute("aria-hidden",!bool);
        mainMenu.setAttribute("aria-hidden",bool);
        mobileDropdown.setAttribute("aria-hidden",bool);
        mobileEvidenceMenu.setAttribute("aria-expanded",bool);
    }

    function setEvidenceServiceStates(){
        var service = config().evidence;
        if(service !== undefined)
            mobileEvidenceMenu.setAttribute("aria-expanded","true");
    }
    
    if(mobile)
         setMobileState(true); 

    else
        setMobileState(false);

    setEvidenceServiceStates();

};
module.exports = utils;
