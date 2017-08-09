// Module responsible for management of state of which menu (evidence/profile/menu) is open/closed

var utils = require('../utils/dom'),
    config = require('../config');

var evidenceStateClassname = 'menu-evidence-open',
    profileStateClassname = 'menu-profile-open',
    mobileStateClassname = 'menu-mobile-open';

function TophatStates( el ) {
    this.element = el;
    this.classname = cleanClassname( el.className );

    this.data = getStateFromClassname( el.className );

    // Cache menu button references
    this.evidenceBtn = document.getElementById("menu-evidence");
    this.mobileMenuBtn = document.getElementById("menu-mobile");
    // Profile is loaded async so we need to look for profile button again later.
    this.profileBtn = document.getElementById("menu-profile");

    // Cache menu references
    this.evidenceMenu = document.getElementById("nice-evidence");
    this.mainMenu = document.getElementById("main-menu");

    el.state = this;

    this.setAriaStates();
}

function getStateFromClassname( classname ) {
    return {
            evidence: !!~classname.indexOf(evidenceStateClassname)
          , profile: !!~classname.indexOf(profileStateClassname)
          , mobile: !!~classname.indexOf(mobileStateClassname)
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

        this.setAriaStates();
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
        if(config.evidence) return; // Don't toggle evidence when on an Evidence service
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

    // Sets the correct state of aria attributes depending on device and mode (mobile/evidence).
    , setAriaStates: function() {
        // See matchMedia vendor polyfill. 47.9375em = 767px
        var isMobileDevice = matchMedia('(max-width: 47.9375em)').matches;

        // Main menu button
        this.mobileMenuBtn.setAttribute("aria-hidden", !isMobileDevice);
        this.mobileMenuBtn.setAttribute("aria-expanded", this.data.mobile);

        // Main menu
        this.mainMenu.setAttribute("aria-hidden", (isMobileDevice && !this.data.mobile));
        if (isMobileDevice)
        	this.mainMenu.setAttribute("aria-labelledby", this.mobileMenuBtn.id);
    	else
    		this.mainMenu.removeAttribute("aria-labelledby");


        // Evidence
        if(isMobileDevice) {
            // Evidence menu is expanded on mobile by default
            this.evidenceBtn.setAttribute("aria-expanded", true);
            this.evidenceBtn.setAttribute("aria-disabled", true);
            this.evidenceMenu.setAttribute("aria-hidden", !this.data.mobile);
        }
        else if(config.evidence) {
            // In an evidence service, evidence is always expanded
            this.evidenceBtn.setAttribute("aria-expanded", true);
            this.evidenceBtn.setAttribute("aria-disabled", true);
            this.evidenceMenu.setAttribute("aria-hidden", false);
        } else {
            this.evidenceBtn.setAttribute("aria-expanded", this.data.evidence);
            this.evidenceBtn.setAttribute("aria-disabled", false);
            this.evidenceMenu.setAttribute("aria-hidden", !this.data.evidence);
        }
    }
};

module.exports = {
    forElement: function( el ) {
        new TophatStates( el );
    }
};
