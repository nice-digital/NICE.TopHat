var chai = require('chai')
  , should = chai.should();

describe('Given a feature', function() {

    describe('When it is run', function() {

        it('Then it will pass', function( done ) {

            (true).should.be.equal( true );

            done();
        });

    });

});
