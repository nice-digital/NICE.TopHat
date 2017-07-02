//The purpose of this module is to control the focus

var states = require('./states');


var keyboardNavigation ={};

var currentFocusIndex, parentIndex, tophatStates, tophat;

var isMobileDevice = matchMedia('(max-width: 47.9375em)').matches;

keyboardNavigation.move = function(direction){
	FocusOnNext(direction);
};

keyboardNavigation.resetPos = function(){
	currentFocusIndex = undefined;
	FocusOnNext(0);
};

keyboardNavigation.closeMenu = function(){
	states.getTophat().unfocus();
	currentFocusIndex = parentIndex;
	FocusOnNext(0);
};

keyboardNavigation.whichMenuOpen = function(){
	return whichMenuOpen();
};

keyboardNavigation.goToLink = function(){
	var el =  GetTabbableList()[currentFocusIndex];
	window.location = el.href;
};

keyboardNavigation.openMenu = function(e){
	parentIndex = currentFocusIndex;

	if(currentFocusIndex === undefined)
		currentFocusIndex = 0;

	switch( GetTabbableList()[currentFocusIndex]){
		case(states.getTophat().evidenceBtn):
		states.getTophat().toggleEvidence();
		break;

		case(states.getTophat().profileBtn):
		states.getTophat().toggleProfile();
		break;

		case(states.getTophat().mobileMenuBtn):
		states.getTophat().toggleMobileMenu();
		break;

		default:
		return(false);

	}

	return(true);
};

function FocusOnNext(directionFocus){
	var tabIndex =  GetTabbableList();

	if(currentFocusIndex === undefined)
		currentFocusIndex = 0;
	else
		currentFocusIndex += directionFocus;

	MoveToEnd(tabIndex.length);

	if(tabIndex[currentFocusIndex].getAttribute("aria-disabled") === "true"){
		currentFocusIndex += directionFocus;
		MoveToEnd(tabIndex.length);
	}

	tabIndex[currentFocusIndex].focus();
}

function MoveToEnd(numItems){
    if(currentFocusIndex > numItems-1)
      currentFocusIndex = 0;
    if(currentFocusIndex < 0)
      currentFocusIndex = numItems-1;
	}

function  GetTabbableList(){
  var subMenuLinkList = [];
  var mainMenuLinkList = [];
  var allMenus = document.getElementsByClassName("menu");
  var links, subMenuContainer,subMenu, mainMenu;

	for(var i = 0; i < allMenus.length; i++){

  		links = subMenuContainer = subMenu = mainMenu = null;
  		var t = true;
  		var element = allMenus[i];

		while(t){
					if(element.getAttribute("role") === "menubar" && element.getAttribute("aria-hidden") === "false"){
							mainMenu = element;
							t = false;
						}
					if(element.getAttribute("role") === "menu"){
							subMenu = element;
						}
					if(element.contains(subMenu) && element.getAttribute("aria-hidden") === "false"){
						subMenuContainer = element;
						t = false;
					}
					if(element == document.body){
						//If the loops have bubbled up to the body the allMenu[i] menu is obviously not open so we leave while loop.
						t = false;
					}
					element = element.parentNode;

		}

		if(subMenuContainer || mainMenu){
			links = subMenuContainer || mainMenu;
			links = links.getElementsByTagName("a");

	  		for(var k = 0; k < links.length; k++){
	  			if(mainMenu){
	  				mainMenuLinkList.push(links[k]);
	  			}
	  			else{
	  				subMenuLinkList.push(links[k]);
	  			}

	  		}
		}
	}
	if(mainMenuLinkList.length <= 0){
		mainMenuLinkList.push(document.getElementById("menu-mobile"));
	}
	var profile = document.getElementById("anon-profile") || document.getElementById("menu-profile");
	mainMenuLinkList.push(profile);

	return subMenuLinkList.length === 0 ? mainMenuLinkList : subMenuLinkList;
}

module.exports = keyboardNavigation;

