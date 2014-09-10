
function TophatStates( el ) {
    this.element = el;
    this.classname = el.className;

    this.data = {
        evidence: false
      , profile: false
      , search: false
    };

    el.state = this;
}

TophatStates.prototype = {

    updateState: function() {
        var classname = this.classname +
            ( this.data.evidence ? ' menu-evidence-open' : '' ) +
            ( this.data.profile ? ' menu-profile-open' : '' ) +
            ( this.data.search ? ' menu-search-open' : '' );

        this.element.className = classname;
    }

  , toggleEvidence: function() {
        this.data.evidence = !this.data.evidence;
        if (this.data.evidence) {
            this.data.profile = false;
            this.data.search = false;
        }
        this.updateState();
    }

  , toggleProfile: function() {
        this.data.profile = !this.data.profile;
        if (this.data.profile) {
            this.data.search = false;
            this.data.evidence = false;
        }
        this.updateState();
    }

  , toggleSearch: function() {
        this.data.search = !this.data.search;
        if (this.data.search) {
            this.data.profile = false;
            this.data.evidence = false;
        }
        this.updateState();
    }

  , unfocus: function() {
        this.data.profile = false;
        this.updateState();
    }

};

module.exports = {
    forElement: function( el ) {
        new TophatStates( el );
    }
};
