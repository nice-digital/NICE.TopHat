var states = require('./states');


var keyboardNavigation ={};

var evidenceMenu,
 evidenceMenuButton, userProfileLink, anonProfileLink,
  menuLinks, currentFocusIndex, mobileMenuLink,  parentIndex, tophatStates, tophat;

var isMobileDevice = matchMedia('(max-width: 47.9375em)').matches;

keyboardNavigation.move = function(direction){
	FocusOnNext(direction);
};

keyboardNavigation.resetPos = function(){
	currentFocusIndex = undefined;
	FocusOnNext(0);
};

keyboardNavigation.closeMenu = function(){
	UpdateVariables();
	states.getTophat().unfocus();
	currentFocusIndex = parentIndex;
	FocusOnNext(0);
};

keyboardNavigation.whichMenuOpen = function(){
	return whichMenuOpen();
};

keyboardNavigation.goToLink = function(){
	var el = GetTabIndex()[currentFocusIndex];
	window.location = el.href;
};

keyboardNavigation.openMenu = function(e){
	UpdateVariables();
	parentIndex = currentFocusIndex;

	if(evidenceMenuButton === GetTabIndex()[currentFocusIndex]){
		states.getTophat().toggleEvidence();
	}

	if(userProfileLink === GetTabIndex()[currentFocusIndex]){
		states.getTophat().toggleProfile();
	}

	if(mobileMenuLink === GetTabIndex()[currentFocusIndex]){
		states.getTophat().toggleMobileMenu();
	}
};

function UpdateVariables(){

	userProfileLink = document.getElementById("menu-profile");
	anonProfileLink = document.getElementById("anon-profile");
	evidenceMenuButton = document.getElementById("menu-evidence");
	menuLinks = document.getElementById("main-menu").getElementsByTagName('a');
	evidenceMenu = document.getElementById("nice-evidence").getElementsByTagName('a');
	tophatStates = states.getTophat().data; //Returns obj with these properties: evidence,profile,mobile
	tophat = states.getTophat();


	if(document.getElementById("nice-profile") !== null){
		profileMenu = document.getElementById("nice-profile").getElementsByTagName('a');
		userProfileLink = document.getElementById("menu-profile");
	}

	if(isMobileDevice){
		mobileMenuLink = document.getElementById("menu-mobile");
	}
}

function FocusOnNext(directionFocus){
	var tabIndex = GetTabIndex();

	if(currentFocusIndex === undefined)
		currentFocusIndex = 0;
	else
		currentFocusIndex += directionFocus;

	MoveToEnd(tabIndex.length);

	if(tabIndex[currentFocusIndex].getAttribute("aria-disabled") === "true"){
		currentFocusIndex += toFocus;
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

function whichMenuOpen(){
	if(tophatStates.evidence)
		return "evidence";
	else if(tophatStates.profile)
		return "profile";
	else if(tophatStates.mobile)
		return "mobile";
	else
		return "none";
}

function GetTabIndex(){
  var listOfIndexes = [];
  UpdateVariables();

	function Profile(){
		var loggedIn = userProfileLink;
		if(loggedIn === null)
		  	listOfIndexes.push(anonProfileLink);
		else
		  	listOfIndexes.push(userProfileLink);
	}

	switch(whichMenuOpen()){
		case "evidence":
			for(var x = 0; x < evidenceMenu.length; x++){
				listOfIndexes.push(evidenceMenu[x]);
			}
			break;

		case "none":
			if(!isMobileDevice){
				for(var i = 0; i < menuLinks.length; i++){
		  		listOfIndexes[i] = menuLinks[i];
			  	}
			  }
			else
				listOfIndexes.push(mobileMenuLink);

		  	Profile();
	  		break;

	  	case "mobile":
	  		for(var d = 0; d < menuLinks.length; d++){
	  			listOfIndexes[d] = menuLinks[d];
		  	}
		  	for(var w = 0; w < evidenceMenu.length; w++){
	  			listOfIndexes.push(evidenceMenu[w]);
	  		}
	  		break;

	  	case "profile":
	  	//	listOfIndexes[0] = userProfileLink; // when i remove this line menu doesnt open for profile find out why
  			for(var c = 0; c < profileMenu.length; c++){
  				listOfIndexes.push(profileMenu[c]);
  			}
  			break;
	}

  return listOfIndexes;
}


module.exports = keyboardNavigation;

