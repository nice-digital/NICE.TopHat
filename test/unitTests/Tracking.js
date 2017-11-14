/* eslint-env mocha */
/* eslint no-global-assign: 0 */
var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var tracking = require("../../lib/events/tracking.js");
var domUtils = require("../../lib/utils/dom.js");
var assert = require("assert");



describe("Unit Tests", function() {
	var sandbox;
	beforeEach(function () {
		sandbox = sinon.sandbox.create();
	});

	afterEach(function () {
		sandbox.restore();
	});

	describe("trackingHandler", function() {
		it("should prevent default brrowser action", function() {

			//arrange
			var dataLayer = [];
			window = sandbox.stub().returns("something");
			window.setTimeout = sandbox.stub().returns("something");
			window.dataLayer = dataLayer;
			window.clearTimeout = sandbox.stub().returns("something");
			var ev = {
				target: {
					nodeName: "A",
					href: "www.google.com",
					classList: "",
					getAttribute: function(){
						return this.href;
					}
				}
			};
			domUtils.find = sandbox.stub().returns(ev.target);


			var spy = sandbox.spy(domUtils.enhanceEvent(ev), "preventDefault");

			//act
			tracking.handler(ev);

			//assert
			sandbox.assert.calledOnce(spy);
		});
	});

	describe("sendTrackedEvent", function() {
		it("will push to datalayer without callback", function() {

			var dataLayer = [];
			window = sandbox.stub().returns("something");
			window.dataLayer = dataLayer;
			window.setTimeout = sandbox.stub().returns("something");
			window.clearTimeout = sandbox.stub().returns("something");

			//act
			tracking.sendTrackedEvent("a","b","c");

			//assert
			expect(dataLayer[0].event).to.equal("TopHat");
			expect(dataLayer[0].eventCategory).to.equal("a");
			expect(dataLayer[0].eventAction).to.equal("b");
			expect(dataLayer[0].eventLabel).to.equal("c");
		});
	});

	describe("getLabel", function() {
		it("Does nothing and erturns param", function() {
			var element = {
				nodeName: "A",
				href: "www.google.com",
				classList: "",
				textContent: "text"
			};

			var result = tracking.getLabel(element);

			expect(result).to.be.equal(element.textContent);

		});

		it("profile should be expanded when class contains menu-profile", function() {
			var element = {
				nodeName: "A",
				href: "www.google.com",
				textContent: "text",
				classList: "menu-profile",
				"aria-expanded": "true",
				getAttribute: function(st){
					return this["aria-expanded"];
				}
			};

			var result = tracking.getLabel(element);

			expect(result).to.be.equal("Profile expanded");

		});

		it("I can get the correct event label when profile collaped", function() {
			var element = {
				nodeName: "A",
				href: "www.google.com",
				textContent: "text",
				classList: "menu-profile",
				"aria-expanded": "false",
				getAttribute: function(s){
					return this["aria-expanded"];
				}
			};

			var result = tracking.getLabel(element);

			expect(result).to.be.equal("Profile collapased");

		});

	});

	describe("Given I have a getTrackingElement function", function() {
		it("it can identify valid element", function() {
			var element = {
				nodeName: "A"
			};

			var result = tracking.getTrackingElement(element);

			expect(result).to.be.equal(element);
		});

		it("it can identify invalid element", function() {

			var parentElement = {
				nodeName: "LI",
				className: "element nice-tophat"
			};
			var element = {
				nodeName: "LI",
				parentNode: parentElement,
				className: "element"
			};

			var result = tracking.getTrackingElement(element);

			expect(result).to.be.equal(undefined);
		});

		it("I can get the valid parent element when child element is invalid", function() {

			var parentElement = {
				nodeName: "A",
				className: "element nice-tophat"
			};
			var element = {
				nodeName: "LI",
				parentNode: parentElement,
				className: "element"
			};

			var result = tracking.getTrackingElement(element);

			expect(result).to.be.equal(parentElement);
		});
	});

});
