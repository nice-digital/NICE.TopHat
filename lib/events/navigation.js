var states = require('./states');

var keyboardNavigation ={};

var tophat, evidenceMenu,
 evidenceMenuButton, userProfileLink, anonProfileLink,
  menuLinks, currentFocusIndex, mobileMenuLink, classNames, parentIndex;

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
	tophat.className = "nice-tophat";
	currentFocusIndex = parentIndex;
	FocusOnNext(0);
};

keyboardNavigation.whichMenuOpen = function(){
	return whichMenuOpen();
};

keyboardNavigation.goToLink = function(){
	var  p  = GetNavIndex()[currentFocusIndex];
	window.location = p.href;
	//window.location =  = $("a").attr("href");
};

keyboardNavigation.openMenu = function(e){
	UpdateVariables();
	parentIndex = currentFocusIndex;

	if(evidenceMenuButton === GetNavIndex()[currentFocusIndex]){
		if(whichMenuOpen() === "evidence")
			this.closeMenu();
		else{
			tophat.className = "nice-tophat menu-evidence-open";
		}
		return;

	}

	if(userProfileLink === GetNavIndex()[currentFocusIndex]){
		if(whichMenuOpen() === "profile")
			this.closeMenu();
		else
			tophat.className = "nice-tophat menu-profile-open";
		return;
	}

	if(mobileMenuLink === GetNavIndex()[currentFocusIndex]){
		if(whichMenuOpen() === "mobile")
			this.closeMenu();
		else
			tophat.className = "nice-tophat menu-mobile-open";
		return;
	}
};

function UpdateVariables(){

	tophat = document.getElementById("tophat-container");
	tophatClassNames = tophat.className.split(" ");
	userProfileLink = document.getElementById("menu-profile");
	anonProfileLink = document.getElementById("anon-profile");
	evidenceMenuButton = document.getElementById("menu-evidence");
	menuLinks = document.getElementById("main-menu").getElementsByTagName('a');
	evidenceMenu = document.getElementById("nice-evidence").getElementsByTagName('a');


	if(document.getElementById("nice-profile") !== null){
		profileMenu = document.getElementById("nice-profile").getElementsByTagName('a');
		userProfileLink = document.getElementById("menu-profile");
	}

	if(isMobileDevice){
		mobileMenuLink = document.getElementById("menu-mobile");
	}
}

function FocusOnNext(toFocus){
	var index = GetNavIndex();

	if(currentFocusIndex === undefined)
		currentFocusIndex = 0;
	else
		currentFocusIndex += toFocus;

	MoveToEnd(index.length);

	if(index[currentFocusIndex].getAttribute("aria-disabled") === "true"){
		currentFocusIndex += toFocus;
		MoveToEnd(index.length);
	}

	index[currentFocusIndex].focus();
}

function MoveToEnd(numItems){
        if(currentFocusIndex > numItems-1)
          currentFocusIndex = 0;
        if(currentFocusIndex < 0)
          currentFocusIndex = numItems-1;
	}

function whichMenuOpen(){

	function Contains(array,value){
		for(var item = 0; item < array.length;item++){
			if(array[item] === value)
				return true;
		}
		return false;
	}
	if(Contains(tophatClassNames,"menu-evidence-open"))
		return "evidence";
	else if(Contains(tophatClassNames,"menu-profile-open"))
		return "profile";
	else if(Contains(tophatClassNames,"menu-mobile-open"))
		return "mobile";
	else
		return "none";
}

function GetNavIndex(){
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

