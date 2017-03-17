var homeIcon, tophat, evidenceMenu, userProfileLink, anonProfileLink, menuLinks, currentFocus;

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

keyboardNavigation.moveVertically = function(direction, evt){
	UpdateVariables();
	if( tophat.classList.contains("menu-profile-open")){
		evt.preventDefault();
		FocusOnNext(direction);
	}
};

function FocusOnNext(toFocus){
	var index = GenerateIndex();

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
	menuLinks = document.getElementById("main-menu").getElementsByTagName('a');
	evidenceMenu = document.getElementById("nice-evidence").getElementsByTagName('a');
	if(document.getElementById("nice-profile") !== null)
		mobileMenu = document.getElementById("nice-profile").getElementsByTagName('a');


}

function GenerateIndex(){

  var listOfIndexes = [];
  UpdateVariables();



  if( tophat.classList.contains("menu-evidence-open")){
  	for(var x = 0; x < evidenceMenu.length; x++){
  		listOfIndexes.push(evidenceMenu[x]);

  	}

  }

  //Mobile menu needs implienting
  else if( tophat.classList.contains("menu-profile-open")){
  	for(var c = 0; c < mobileMenu.length; c++){
  		listOfIndexes.push(mobileMenu[c]);
  	}

  }

  else{
	  for(var i = 0; i < menuLinks.length; i++){
	  	listOfIndexes[i] = menuLinks[i];
	  }
 	}
  return listOfIndexes;
}

/*function KeyPress(){
	switch(event.keyCode){
        case 39:
        FocusOnNext(1, currentFocus);
        alert("abc");
        break;
	}
}*/


module.exports = keyboardNavigation;

