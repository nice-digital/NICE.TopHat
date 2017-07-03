//The purpose of this module is to control the focus
var states = require('./states');
var keyboardNavigation ={};
var parentIndex, tophatStates, tophat;
var currentFocusIndex = 0;

keyboardNavigation.focus = function(direction){
	var tabIndex =  GetTabbableList();

	currentFocusIndex += direction;
	MoveToEnd(tabIndex.length);

	if(tabIndex[currentFocusIndex].getAttribute("aria-disabled") === "true"){
		currentFocusIndex += direction;
		MoveToEnd(tabIndex.length);
	}

	tabIndex[currentFocusIndex].focus();
};

keyboardNavigation.resetPos = function(){
	currentFocusIndex = 0;
	this.focus(0);
};

keyboardNavigation.closeMenu = function(){
	states.getTophat().unfocus();
	currentFocusIndex = parentIndex;
	this.focus(0);
};

keyboardNavigation.goToLink = function(){
	var el =  GetTabbableList()[currentFocusIndex];
	window.location = el.href;
};

keyboardNavigation.openMenu = function(e){
	parentIndex = currentFocusIndex;

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

function MoveToEnd(numItems){
    if(currentFocusIndex > numItems-1)
      currentFocusIndex = 0;
    if(currentFocusIndex < 0)
      currentFocusIndex = numItems-1;
}

function  GetTabbableList(){
	var links, subMenuContainer,subMenu, mainMenu;
 	var subMenuLinkList = [];
 	var mainMenuLinkList = [];
  	var allMenus = document.getElementsByClassName("menu");
  	var isMobileDevice = matchMedia('(max-width: 47.9375em)').matches;

	for(var i = 0; i < allMenus.length; i++){
		//this vars need resetting as they may not be asigned values and thus would keep values from the last itteration.
  		links = subMenuContainer = subMenu = mainMenu = null;
  		var loopThroughParentNodes = true;
  		var element = allMenus[i];

		while(loopThroughParentNodes){
					if(element.getAttribute("role") === "menubar" && element.getAttribute("aria-hidden") === "false"){
						mainMenu = element;
					}
					if(element.getAttribute("role") === "menu"){
						subMenu = element;
					}
					//this if statement is key as if its hidden subMenuLinkList will not get assigned any values.
					if(element.contains(subMenu) && element.getAttribute("aria-hidden") === "false"){
						subMenuContainer = element;
					}
					if(element == document.body){
						loopThroughParentNodes = false;
					}
					element = element.parentNode;
		}

		links = subMenuContainer || mainMenu;
		if(links){
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

	//if using mobile site both mainmenu and submenu vars will be null initally as the menus they represent are hidden.
	if(isMobileDevice){
		//basically checks if the menu is open
		if(mainMenuLinkList.length <= 0){
			mainMenuLinkList.push(document.getElementById("menu-mobile"));
		}
		else{
			var mobileMenuLinks = mainMenuLinkList.concat(subMenuLinkList);
			return mobileMenuLinks;
		}
	}
	var profile = document.getElementById("anon-profile") || document.getElementById("menu-profile");
	mainMenuLinkList.push(profile);

	return subMenuLinkList.length === 0 ? mainMenuLinkList : subMenuLinkList;
}

module.exports = keyboardNavigation;

