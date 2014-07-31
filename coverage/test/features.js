var chai = require('chai')
  , should = chai.should();

describe('Given a feature', function() {
    var tophat = require('../lib/index');

    describe('When it is run', function() {

        it('Then it will pass', function( done ) {

            tophat().should.be.equal( true );

            done();
        });

    });

});
