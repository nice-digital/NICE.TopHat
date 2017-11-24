/* eslint-env mocha */
/* eslint no-global-assign: 0 */
var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var tracking = require("../../lib/events/tracking.js");
var domUtils = require("../../lib/utils/dom.js");

describe("Tracking module unit tests", function() {
	var sandbox;

	beforeEach(function () {
		sandbox = sinon.sandbox.create();
		window = { dataLayer: [] };
	});

	afterEach(function () {
		sandbox.restore();
	});

	describe("trackingHandler", function() {
		it("should prevent default browser action for external links", function() {
			//arrange
			window.setTimeout = sandbox.stub().returns("something");
			window.clearTimeout = sandbox.stub().returns("something");
			var ev = {
				target: {
					nodeName: "A",
					href: "www.google.com",
					className: "",
					getAttribute: function(){
						return this.href;
					}
				},
				preventDefault: function() {}
			};
			domUtils.find = sandbox.stub().returns(ev.target);

			var spy = sandbox.spy(ev, "preventDefault");

			//act
			tracking.handler(ev);

			//assert
			sandbox.assert.calledOnce(spy);
		});

		it("shouldn't prevent default browser action for internal hashlinks", function() {

			//arrange
			var ev = {
				target: {
					nodeName: "A",
					href: "#dylan",
					className: "",
					getAttribute: function(){
						return this.href;
					}
				},
				preventDefault: function() {}
			};
			domUtils.find = sandbox.stub().returns(ev.target);

			var spy = sandbox.spy(ev, "preventDefault");

			//act
			tracking.handler(ev);

			//assert
			sandbox.assert.notCalled(spy);
		});
	});

	describe("sendTrackedEvent", function() {
		it("will push to datalayer without callback", function() {

			//act
			tracking.sendTrackedEvent("a","b","c");

			var result = {
				event:"TopHat",
				eventCategory:"a",
				eventAction:"b",
				eventLabel:"c"
			};
			//assert
			expect(window.dataLayer[0]).to.deep.equal(result);
		});

		it("will push to datalayer with callback", function() {
			window.setTimeout = sandbox.stub().returns("something");
			window.clearTimeout = sandbox.stub().returns("something");
			var cb = function(){
				1;
			};

			//act
			tracking.sendTrackedEvent("a","b","c",cb);

			//assert
			expect(window.dataLayer[0].eventCallback).to.be.a("function");
		});

		it("will use fallback timeout for callback", function() {
			var callback = function() {};
			window.setTimeout = sandbox.stub().returns("timeout");

			//act
			tracking.sendTrackedEvent("a","b","c",callback);

			//assert
			sandbox.assert.calledOnce(window.setTimeout.withArgs(callback));
		});
	});

	describe("getLabel", function() {
		it("Returns param text", function() {
			var element = {
				nodeName: "A",
				href: "www.google.com",
				className: "",
				textContent: "TEXT CONTENT HERE"
			};

			var result = tracking.getLabel(element);

			expect(result).to.be.equal(element.textContent);

		});

		it("should return 'Profile expanded' when className contains menu-profile and aria-expanded is true", function() {
			var element = {
				nodeName: "A",
				href: "www.google.com",
				textContent: "TEXT CONTENT HERE",
				className: "menu-profile",
				"aria-expanded": "true",
				getAttribute: function(st){
					return this["aria-expanded"];
				}
			};

			var result = tracking.getLabel(element);

			expect(result).to.be.equal("Profile expanded");

		});

		it("should return 'Profile collapsed' when className contains menu-profile and aria-expanded is false", function() {
			var element = {
				nodeName: "A",
				href: "www.google.com",
				textContent: "TEXT CONTENT HERE",
				className: "menu-profile",
				"aria-expanded": "false",
				getAttribute: function(s){
					return this["aria-expanded"];
				}
			};

			var result = tracking.getLabel(element);

			expect(result).to.be.equal("Profile collapsed");

		});

		it("should return 'Evidence services expanded' when id contains menu-evidence and aria-expanded is true", function() {
			var element = {
				nodeName: "A",
				href: "www.google.com",
				textContent: "TEXT CONTENT HERE",
				className: "",
				id: "menu-evidence",
				"aria-expanded": "true",
				getAttribute: function(st){
					return this["aria-expanded"];
				}
			};

			var result = tracking.getLabel(element);

			expect(result).to.be.equal("Evidence services expanded");

		});

		it("should return 'Evidence services collapsed' when id contains menu-evidence and aria-expanded is false", function() {
			var element = {
				nodeName: "A",
				href: "www.google.com",
				textContent: "TEXT CONTENT HERE",
				className: "",
				id: "menu-evidence",
				"aria-expanded": "false",
				getAttribute: function(s){
					return this["aria-expanded"];
				}
			};

			var result = tracking.getLabel(element);

			expect(result).to.be.equal("Evidence services collapsed");

		});

		it("should return 'Edit profile' when the menu item is the users name", function() {
			var element = {
				nodeName: "A",
				href: "www.google.com",
				textContent: "USERNAME CONTENT HERE",
				className: "user-name",
				"aria-expanded": "false",
				getAttribute: function(s){
					return this["aria-expanded"];
				}
			};

			var result = tracking.getLabel(element);

			expect(result).to.be.equal("Edit profile");

		});

		it("should trim whitespace from the element's text", function() {
			var element = {
				nodeName: "A",
				href: "www.google.com",
				className: "",
				textContent: "   \r\n     TEXT CONTENT HERE    \r\n     "
			};

			var result = tracking.getLabel(element);

			expect(result).to.be.equal("TEXT CONTENT HERE");
		});

	});

	describe("getTrackingElement", function() {
		it("it can identify a valid element", function() {
			var element = {
				nodeName: "A"
			};

			var result = tracking.getTrackingElement(element);

			expect(result).to.be.equal(element);
		});

		it("it can identify an invalid element", function() {

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

		it("It can get the valid parent element when child element is invalid", function() {

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
