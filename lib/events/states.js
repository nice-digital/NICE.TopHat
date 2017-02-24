var utils = require('../utils/dom');
var evidenceStateClassname = 'menu-evidence-open';
var profileStateClassname = 'menu-profile-open';
var mobileStateClassname = 'menu-mobile-open';

function TophatStates( el ) {
    this.element = el;
    this.classname = cleanClassname( el.className );

    this.data = getStateFromClassname( el.className );

    this.evidenceBtn = document.getElementById("menu-evidence");
    this.mobileMenuBtn = document.getElementById("menu-mobile");
    // Profile is loaded async so we need to look for profile button again later.
    this.profileBtn = document.getElementById("menu-profile");

window.onresize = function() {
    utils.setAriaStates();
};
    el.state = this;
}

function getStateFromClassname( classname ) {
    return {
            evidence: ~classname.indexOf(evidenceStateClassname)
          , profile: ~classname.indexOf(profileStateClassname)
          , mobile: ~classname.indexOf(mobileStateClassname)
        };
}

function cleanClassname( classname ) {
    return classname
        .replace( ' ' + evidenceStateClassname, '' )
        .replace( ' ' + profileStateClassname, '' )
        .replace( ' ' + mobileStateClassname, '' );
}


TophatStates.prototype = {

    updateState: function() {
        var classname = this.classname +
            ( this.data.evidence ? ' ' + evidenceStateClassname : '' ) +
            ( this.data.profile ? ' ' + profileStateClassname : '' ) +
            ( this.data.mobile ? ' ' + mobileStateClassname : '' );

        this.element.className = classname;

        // Profile request is asynch, so button may have been added later
        this.profileBtn = document.getElementById("menu-profile");

        
        this.toggleAriaAttributes(this.profileBtn, this.data.profile); 
        this.toggleAriaAttributes(this.mobileMenuBtn, this.data.mobile);
        if(this.mobileMenuBtn.getAttribute("aria-hidden") == "true")
            this.toggleAriaAttributes(this.evidenceBtn, this.data.evidence); //evidence menu isn't toggleable in mobile
        
    }

  , toggleAriaAttributes: function(btn, isBtnActive){
        // E.g. if you're logged out, there's no profile button
        if(!btn || btn.getAttribute("aria-hidden") === "true") return;

        btn.setAttribute("aria-expanded", isBtnActive);

        var controls = btn.getAttribute("aria-controls").split(" ");
        for (var i = 0; i < controls.length; i++) {
            var subMenu = document.getElementById(controls[i]);
            subMenu.setAttribute("aria-hidden", !isBtnActive);
        }
  }

  , toggleEvidence: function() {
        this.data.evidence = !this.data.evidence;
        if (this.data.evidence) {
            this.data.profile = false;
            this.data.mobile = false;
        }
        this.updateState();
    }

  , toggleProfile: function() {
        this.data.profile = !this.data.profile;
        if (this.data.profile) {
            this.data.mobile = false;
            this.data.evidence = false;
        }
        this.updateState();
    }

  , toggleMobileMenu: function() {
        this.data.mobile = !this.data.mobile;
        if (this.data.mobile) {
            this.data.profile = false;
            this.data.evidence = false;
        }
        this.updateState();
    }

  , unfocus: function() {
        this.data.profile = false;
        this.data.mobile = false;
        this.data.evidence = false;
        this.updateState();
    }

};

module.exports = {
    forElement: function( el ) {
        new TophatStates( el );
    }
};
