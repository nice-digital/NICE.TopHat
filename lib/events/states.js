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
        var classname = this.classname +
            ( this.data.evidence ? ' ' + evidenceStateClassname : '' ) +
            ( this.data.profile ? ' ' + profileStateClassname : '' ) +
            ( this.data.mobile ? ' ' + mobileStateClassname : '' );

        this.element.className = classname;
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
