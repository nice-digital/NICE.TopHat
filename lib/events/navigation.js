var homeIcon, tophat, evidenceMenu,
 evidenceMenuButton, userProfileLink, anonProfileLink,
 mobileMenuButton, menuLinks, currentFocus;

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

	if(mobileMenuButton === GetNavIndex()[currentFocus]){
		if(WhichMenuOpen() === "profile")
			this.closeMenu();
		else
			tophat.classList = "nice-tophat menu-profile-open";
	}
};

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
function UpdateVariables(){

	tophat = document.getElementById("tophat-container");
	userProfileLink = document.getElementById("menu-profile");
	anonProfileLink = document.getElementById("anon-profile");
	evidenceMenuButton = document.getElementById("menu-evidence");
	menuLinks = document.getElementById("main-menu").getElementsByTagName('a');
	evidenceMenu = document.getElementById("nice-evidence").getElementsByTagName('a');

	if(document.getElementById("nice-profile") !== null){
		mobileMenu = document.getElementById("nice-profile").getElementsByTagName('a');
		mobileMenuButton = document.getElementById("menu-profile");
	}


}

function WhichMenuOpen(){
	if(tophat.classList.contains("menu-evidence-open"))
		return "evidence";
	else if(tophat.classList.contains("menu-profile-open"))
		return "profile";
	else
		return "none";
}

function GetNavIndex(){

  var listOfIndexes = [];
  UpdateVariables();

  if( WhichMenuOpen() === "evidence"){
  	for(var x = 0; x < evidenceMenu.length; x++){
  		listOfIndexes.push(evidenceMenu[x]);

  	}

  }

  //Mobile menu needs implienting
  else if( WhichMenuOpen() === "profile"){
  	listOfIndexes[0] = mobileMenuButton;
  	for(var c = 0; c < mobileMenu.length; c++){
  		listOfIndexes.push(mobileMenu[c]);
  	}

  }

  else{
	  for(var i = 0; i < menuLinks.length; i++){
	  	listOfIndexes[i] = menuLinks[i];
	  }
	  var loggedIn = userProfileLink;
	  if(loggedIn === null)
	  	listOfIndexes.push(anonProfileLink);
	  else
	  	listOfIndexes.push(userProfileLink);



 	}
  return listOfIndexes;
}


module.exports = keyboardNavigation;

