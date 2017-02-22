var evidenceStateClassname = 'menu-evidence-open';
var profileStateClassname = 'menu-profile-open';
var mobileStateClassname = 'menu-mobile-open';

function TophatStates( el ) {
    this.element = el;
    this.classname = cleanClassname( el.className );

    this.data = getStateFromClassname( el.className );

    

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
        this.evidenceBtn = document.getElementById("menu-evidence");
        this.mobileMenuBtn = document.getElementById("menu-mobile");
        this.profileBtn = document.getElementById("menu-profile");
        var classname = this.classname +
            ( this.data.evidence ? ' ' + evidenceStateClassname : '' ) +
            ( this.data.profile ? ' ' + profileStateClassname : '' ) +
            ( this.data.mobile ? ' ' + mobileStateClassname : '' );

        this.toggleAriaAttributes(this.evidenceBtn, this.data.evidence);
        this.toggleAriaAttributes(this.profileBtn, this.data.profile); 
        this.toggleAriaAttributesOnMobile(this.mobileMenuBtn, this.data.mobile);

        this.element.className = classname;
    }

  , toggleAriaAttributes: function(btn, isBtnActive){
        var controls = btn.getAttribute("aria-controls");
        var subMenu = document.getElementById(controls);

        btn.setAttribute("aria-expanded",isBtnActive);
        subMenu.setAttribute("aria-hidden",isBtnActive);

  }

  , toggleAriaAttributesOnMobile: function(btn,isBtnActive){
        var menuId = btn.getAttribute("aria-controls");
        var subMenu = document.getElementById(menuId);

        btn.setAttribute("aria-expanded",isBtnActive);
        btn.setAttribute("aria-hidden",!isBtnActive);
        subMenu.setAttribute("aria-hidden",!isBtnActive);

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
