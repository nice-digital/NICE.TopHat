var utils = {};

/**
 * Gets the previous link after `currentLink` within the containers array.
 *
 * @param      {HTMLElement}  containers    The containers array
 * @param      {HTMLAnchorElement}  currentLink  The current link
 * @returns    {HTMLAnchorElement} { Previous link }
 */
utils.getPreviousLink = function(containersArray, currentLink) {
	if(!containersArray) return;

	var links = utils.getLinks(containersArray),
		currentIndex = links.indexOf(currentLink)|| 0,
		previousIndex = currentIndex - 1;

	previousIndex = wrapToEnd(previousIndex, links);
	previousIndex = skipDisabledLinks(previousIndex, links, -1);

	return links[previousIndex];
};

/**
 * Gets the next link after `currentLink` within the containers array.
 *
 * @param      {HTMLElement}  containers    The containers array
 * @param      {HTMLAnchorElement}  currentLink  The current link
 * @returns    {HTMLAnchorElement} { Next link }
 */
utils.getNextLink = function(containersArray, currentLink) {
	if(!containersArray) return;

	var links = utils.getLinks(containersArray),
		currentIndex = links.indexOf(currentLink) || 0,
		nextIndex = currentIndex + 1;

	nextIndex = wrapToEnd(nextIndex, links);
	nextIndex = skipDisabledLinks(nextIndex, links, 1);

	return links[nextIndex];
};

/**
 * Gets the elements(Ids) which are controlled by elId.
 * If 'elControlls' is null then there is nothing controlling the element passed in and so it is returned.
 *
 * @param      {HTMLElementId} elId Id of the element which controls other elements.
 * @returns    {Array} { array of Ids }
 */

utils.getIdsOfControlledContainers = function(elId){
	var elControls = document.getElementById(elId).getAttribute("aria-controls");
	if(!elControls)
		return null;
	return elControls.split(" ");
};

/**
 * Gets the element controlling the element passed in. If the controlling element is
 *not accessible find the parent controlling element.
 * @param      {HTMLElement} Controlled element.
 * @returns    {HTMLElementId} { Id }
 */


utils.getControllingElementId = function(element, isMobile){
	if(!element.hasAttribute("aria-labelledby"))
		return null;
	var labelledBy = element.getAttribute("aria-labelledby");
	var controllingEl = document.getElementById(labelledBy);


	//If controlling El is disabled/hidden then find its parent (controlling) element
	if(!isNavigable(controllingEl) && isMobile){
		var nextControllingEl = utils.closestWithClass(controllingEl, "menu");
		if(nextControllingEl)
			return utils.getControllingElementId(nextControllingEl);
	}

	return labelledBy;
};

/**
* If the element passed in is focusable/tabbable then true is retruned.
 * @param      {HTMLElement} element
 * @returns    {boolean} { boolean }
 */
function isNavigable(element){
	if(element.hasAttribute("aria-disabled")){
		if(element.getAttribute("aria-disabled") === "true")
			return false;
	}
	if(element.hasAttribute("aria-hidden")){
		if(element.getAttribute("aria-hidden") === "true")
			return false;
	}
	if(element.parentNode.classList.contains("active")){
		return false;
	}
	return true;
}
/**
* If `index` is the first item within links, then the last items index within links will be returned.
* If `index` is the last item within links, then the first items index within links will be returned.
 * @param      {int} current index
 * @param      {links} list of elements
 * @returns    {int} { index }
 */
function wrapToEnd(index, links){
	if(index > links.length - 1)
		index = 0;
	if(index < 0)
		index = links.length - 1;
	return index;
}

/**
*gets the index of the next accessible element within a list of elements in relation to direction
 * @param      {int}int  current index of element
 * @param      {Array} list of elements
 * @param      {int} direction which the index is trying to move -1 being the previous index
 * 1 being the nect index
 * @returns    {int} { index }
 */
function skipDisabledLinks(index,links, skipDirectionInt){
	while(!isNavigable(links[index])){
		index += skipDirectionInt;
		index = wrapToEnd(index, links);
	}
	return index;
}

/**
 * Gets the links from within the containers, as an Array.
 *
 * @param      {Array}  Array of HTML elements.
 * @return     {Array}  The links within the container.
 */
utils.getLinks = function(containerIds) {
	var links = [];
	for(var x = 0; x < containerIds.length; x++){
		var container = document.getElementById(containerIds[x]);
		var linksInContainerX = utils.toArray(container.getElementsByTagName("a"));
		links = links.concat(linksInContainerX);
	}
	return links;
};


/**
 * Returns an Array from the given HTMLCollection so Array methods like indexOf can be called.
 *
 * @param      {HTMLCollection}  The html collection
 * @return     {Array}  Array of html elements.
 * @see        https://stackoverflow.com/a/222847/486434
 */
utils.toArray = function(htmlCollection) {
	for(var i = 0, a = []; i < htmlCollection.length; i++)
		a.push(htmlCollection[i]);

	return a;
};

/**
 * Traverses up the DOM tree from the given `element`, looking for the first (closest)
 * ancestor that matches the given class. Note: the class name must be an exact match.
 * If not match is found then it will return null.
 *
 * @param      {HTMLElement}  element  The element from which to start traversing up the DOM
 * @param      {string}  className  The class name to use to match the ancestors
 * @return     {HTMLElement}  The first ancestor with the class 'className'; or null if there is no match.
 */
utils.closestWithClass = function(element, className) {
	var parent = element.parentNode;
	while(parent) {
		if(parent.className === className) {
			break;
		}

		parent = parent.parentNode;
	}
	return parent;
};

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
	var add = document.addEventListener ? "addEventListener" : "attachEvent",
		prefix = document.addEventListener ? "" : "on";
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
	if (!~html.indexOf("<")) {
		return document.createElement( html );
	}

	var wrapper = document.createElement("div");

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
	return document.createElement( "a" ).appendChild(
		document.createTextNode( html ) ).parentNode.innerHTML;
};

(function(){
	if (!Array.prototype.indexOf)
	{
		Array.prototype.indexOf = function(elt /*, from*/)
		{
			var len = this.length >>> 0;

			var from = Number(arguments[1]) || 0;
			from = (from < 0) ? Math.ceil(from) : Math.floor(from);
			if (from < 0)
				from += len;

			for (; from < len; from++)
			{
				if (from in this && this[from] === elt)
					return from;
			}
			return -1;
		};
	}
})();

module.exports = utils;
