/* eslint-env mocha */
/* global browser */
var chai = require("chai");
var cheerio = require("cheerio");
cheerio.load(browser.getSource());
chai.should();

// Consistent, cross-browser way to start with focus in the correct place
// Note: using a number of tabs works differently across browsers.
// (IE includes the URL bar as a Tab).
function focusOnLogo() {
	browser.execute("document.getElementsByClassName('logo')[0].focus()");
}

describe("Keyboard navigation functional browser driven tests", function() {

	describe("Desktop resolution", function () {

		function setDesktopSize() {
			browser.setViewportSize({
				width: 1024,
				height: 768
			});
		}

		beforeEach(function() {
			setDesktopSize();
		});

		describe("Given I am on the NICE org site and I click on the Evidence servies button", function(){
			it("should display the lower menu", async function() {

				browser.url("/example.niceorg.html");

				browser.click("#menu-evidence");
				browser.isVisible(".tophat-inner").every((x)=>x).should.be.true;
			});
		});

		describe("Given I am on the NICE org site I can use the keyboard", function(){
			it("end key to go to last item in focused menu", async function() {

				browser.url("/example.niceorg.html");
				focusOnLogo();
				browser.keys("Tab");
				browser.keys("Tab");
				browser.keys("End");

				var active = browser.elementActive().value.ELEMENT;
				var lastItemInMainMenu = browser.element("#main-menu li:last-child a").value.ELEMENT;
				lastItemInMainMenu.should.be.equal(active);

			});

			it("home key to go to first item in focused menu", async function() {
				browser.url("/example.niceorg.html");
				focusOnLogo();
				browser.keys("Tab");
				browser.keys("Tab");
				browser.keys("Tab");
				browser.keys("Home");

				var active = browser.elementActive();
				var firstItemInMainMenu = browser.element("#main-menu li:first-child a");
				var result = firstItemInMainMenu.value.ELEMENT === active.value.ELEMENT;

				result.should.be.equal(true);
			});

			it("right/left key to navigate in focused menu", async function() {
				browser.url("/example.niceorg.html");
				focusOnLogo();
				browser.keys("Tab");
				browser.keys("Tab");

				var startPos = browser.elementActive().value.ELEMENT;

				browser.keys("ArrowRight");
				browser.keys("ArrowRight");
				browser.keys("ArrowRight");

				var moveSuccess = startPos !== browser.elementActive().value.ELEMENT;

				browser.keys("ArrowLeft");
				browser.keys("ArrowLeft");
				browser.keys("ArrowLeft");

				var active = browser.elementActive().value.ELEMENT;
				var result = startPos === active;

				result.should.be.equal(true);
				moveSuccess.should.be.equal(true);
			});

			it("up/down key to navigate in focused menu", async function() {
				browser.url("/example.niceorg.html");
				focusOnLogo();
				browser.keys("Tab");
				browser.keys("Tab");

				var startPos = browser.elementActive().value.ELEMENT;

				browser.keys("ArrowDown");
				browser.keys("ArrowDown");
				browser.keys("ArrowDown");

				var moveSuccess = startPos !== browser.elementActive().value.ELEMENT;

				browser.keys("ArrowUp");
				browser.keys("ArrowUp");
				browser.keys("ArrowUp");

				var active = browser.elementActive().value.ELEMENT;
				var result = startPos === active;

				result.should.be.equal(true);
				moveSuccess.should.be.equal(true);
			});
		});

		describe("Given I have logged in with NICE Accounts", function(){
			it("I can view the profile menu", async function() {
				browser.click("#signin");

				browser.waitForExist("#Email");

				browser.setValue("#Email", process.env.accountsUsername);
				browser.setValue("#Password", process.env.accountsPassword);

				browser.submitForm("#Email");

				browser.waitForExist(".nice-tophat");

				browser.click("#menu-profile");
				browser.isVisible("#nice-profile").should.be.true;
			});
		});

	});

	describe("Mobile resolution", function () {

		function setMobileSize() {
			browser.setViewportSize({
				width: 480,
				height: 480
			});
		}

		beforeEach(function() {
			setMobileSize();
		});

		describe("Given I am on the NICE org site on a mobile and I click on the Menu button", function(){
			it("should display the mobile menu", async function() {

				browser.url("/example.niceorg.html");

				browser.click("#menu-mobile");
				browser.isVisible("#main-menu").should.be.true;
			});
		});

	});

});

