/* eslint-env mocha */
var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var tracking = require("../../lib/events/tracking.js");


describe("Unit Tests", function() {
	describe("Given I have a dataLayer", function() {
		it("I can push events to it.", function() {

			//arrange
			var dataLayer = [];
			window = sinon.stub().returns("something");
			window.setTimeout = sinon.stub().returns("something");
			window.dataLayer = dataLayer;
			window.clearTimeout = sinon.stub().returns("something");

			//act
			tracking.sendTrackedEvent("a","b","c", function(){
				1;
			})

			//assert
			expect(dataLayer[0].event).to.equal("TopHat");
			expect(dataLayer[0].category).to.equal("a");
			expect(dataLayer[0].action).to.equal("b");
			expect(dataLayer[0].label).to.equal("c");
		});
	});

});
