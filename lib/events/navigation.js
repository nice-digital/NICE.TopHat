var keyboardNavigation ={};

keyboardNavigation.move = function(direction){
	FocusOnNext(direction);
};

keyboardNavigation.resetPos = function(){
	currentFocus = undefined;
	FocusOnNext(0);
};

keyboardNavigation.closeMenu = function(){
	UpdateVariables();
	tophat.classList = "nice-tophat";
};

keyboardNavigation.WhichMenuOpen = function(){
	return WhichMenuOpen();
};

keyboardNavigation.moveVertically = function(direction, evt){
	UpdateVariables();
	if( WhichMenuOpen() === "profile"){
		evt.preventDefault();
		FocusOnNext(direction);
	}
};

keyboardNavigation.openMenu = function(e){
	UpdateVariables();

	if(evidenceMenuButton === GetNavIndex()[currentFocus]){
		if(WhichMenuOpen() === "evidence")
			this.closeMenu();
		else{
			tophat.classList = "nice-tophat menu-evidence-open";
		}

	}

	if(userProfileLink === GetNavIndex()[currentFocus]){
		if(WhichMenuOpen() === "profile")
			this.closeMenu();
		else
			tophat.classList = "nice-tophat menu-profile-open";
	}
};

var tophat, evidenceMenu,
 evidenceMenuButton, userProfileLink, anonProfileLink,
  menuLinks, currentFocus;

var isMobileDevice = matchMedia('(max-width: 47.9375em)').matches;

function UpdateVariables(){

	tophat = document.getElementById("tophat-container");
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

	if(currentFocus === undefined){
		currentFocus = 0;
	}

	else{
		currentFocus += toFocus;
	}

	MoveToEnd(index.length);
	index[currentFocus].focus();


}

function MoveToEnd(numItems){
        if(currentFocus > numItems-1)
          currentFocus = 0;
        if(currentFocus < 0)
          currentFocus = numItems-1;

}

function WhichMenuOpen(){
	if(tophat.classList.contains("menu-evidence-open"))
		return "evidence";
	else if(tophat.classList.contains("menu-profile-open"))
		return "profile";
	else if(tophat.classList.contains("menu-mobile-open"))
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

	switch(WhichMenuOpen()){
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
	  		listOfIndexes[0] = userProfileLink;
  			for(var c = 0; c < profileMenu.length; c++){
  				listOfIndexes.push(profileMenu[c]);
  			}
  			break;
	}

  return listOfIndexes;
}


module.exports = keyboardNavigation;

