/* eslint-env mocha */
/* global browser */
var chai = require("chai");
var cheerio = require("cheerio");
cheerio.load(browser.getSource());
chai.should();

// Consistent, cross-browser way to start with focus in the correct place
// Note: using a number of tabs works differently across browsers.
// (IE includes the URL bar as a Tab).
function focusOnSkipToContent() {
	browser.execute("document.getElementById('skip-to-content').focus()");
}

function focusOnFirstMainMenuItem() {
	browser.execute("document.querySelector(\"#main-menu li:first-child a\").focus()");
}

function focusOnLastMainMenuItem() {
	browser.execute("document.querySelector(\"#main-menu li:last-child a, #main-menu li:last-child button\").focus()");
}

function focusOnFirstEvidenceMenuItem() {
	browser.execute("document.querySelector(\"#nice-evidence li:first-child a\").focus()");
}

function focusOnLastEvidenceMenuItem() {
	browser.execute("document.querySelector(\"#nice-evidence li:last-child a\").focus()");
}

function setDesktopSize() {
	browser.setViewportSize({
		width: 1024,
		height: 768
	});
}

describe("Keyboard navigation functional browser driven tests", function() {

	describe("Desktop resolution", function () {

		beforeEach(function() {
			setDesktopSize();
		});

		describe("Given I am on the NICE org site and I click on the Evidence servies button", function(){
			it("should display the lower menu", async function() {

				browser.url("/niceorg.html");

				browser.click(".nice-tophat #menu-evidence");
				browser.isVisible(".tophat-inner").every((x)=>x).should.be.true;
			});
		});

		describe("Given I am on the NICE org site I can use the keyboard", function(){
			it("end key to go to last item in focused menu", async function() {
				browser.url("/niceorg.html");
				focusOnFirstMainMenuItem();
				browser.isActive("#main-menu li:last-child button").should.be.false;
				browser.keys("End");
				browser.isActive("#main-menu li:last-child button").should.be.true;
			});

			it("home key to go to first item in focused menu", async function() {
				browser.url("/niceorg.html");
				focusOnLastMainMenuItem();
				browser.isActive("#main-menu li:first-child a").should.be.false;
				browser.keys("Home");
				browser.isActive("#main-menu li:first-child a").should.be.true;
			});

			it("right/left key to navigate in focused menu", async function() {
				browser.url("/niceorg.html");
				focusOnFirstMainMenuItem();

				browser.keys(["ArrowRight", "ArrowRight"]);
				browser.isActive("#main-menu li:first-child a").should.be.false;

				browser.keys(["ArrowLeft", "ArrowLeft"]);
				browser.isActive("#main-menu li:first-child a").should.be.true;
			});

			it("up/down key to navigate in focused menu", async function() {
				browser.url("/niceorg.html");
				focusOnFirstMainMenuItem();

				browser.keys(["ArrowDown", "ArrowDown"]);
				browser.isActive("#main-menu li:first-child a").should.be.false;

				browser.keys(["ArrowUp", "ArrowUp"]);
				browser.isActive("#main-menu li:first-child a").should.be.true;
			});
		});

		describe("Given I am on the CKS site I can use the keyboard", function(){
			it("end key to go to last item in focused main menu", async function() {
				browser.url("/cks.html");
				focusOnFirstMainMenuItem();
				browser.keys("End");
				browser.isActive("#main-menu li:last-child button").should.be.true;

			});

			it("home key to go to first item in focused main menu", async function() {
				browser.url("/cks.html");
				focusOnLastMainMenuItem();
				browser.isActive("#main-menu li:first-child a").should.be.false;
				browser.keys("Home");
				browser.isActive("#main-menu li:first-child a").should.be.true;
			});

			it("right/left key to navigate in focused main menu", async function() {
				browser.url("/cks.html");
				focusOnFirstMainMenuItem();

				browser.keys(["ArrowRight", "ArrowRight"]);
				browser.isActive("#main-menu li:first-child a").should.be.false;

				browser.keys(["ArrowLeft", "ArrowLeft"]);
				browser.isActive("#main-menu li:first-child a").should.be.true;
			});

			it("up/down key to navigate in focused main menu", async function() {
				browser.url("/cks.html");
				focusOnFirstMainMenuItem();

				browser.keys(["ArrowDown", "ArrowDown"]);
				browser.isActive("#main-menu li:first-child a").should.be.false;

				browser.keys(["ArrowUp", "ArrowUp"]);
				browser.isActive("#main-menu li:first-child a").should.be.true;
			});

			it("end key to go to last item in focused evidence menu", async function() {
				browser.url("/cks.html");
				focusOnFirstEvidenceMenuItem();
				browser.keys("End");
				browser.isActive("#nice-evidence li:last-child a").should.be.true;
			});

			it("home key to go to first item in focused evidence menu", async function() {
				browser.url("/cks.html");
				focusOnLastEvidenceMenuItem();
				browser.keys("Home");
				browser.isActive("#nice-evidence li:first-child a").should.be.true;
			});

			it("right/left key to navigate in focused evidence menu", async function() {
				browser.url("/cks.html");
				focusOnFirstEvidenceMenuItem();

				browser.keys(["ArrowRight", "ArrowRight", "ArrowRight", "ArrowRight"]);
				browser.isActive("#nice-evidence li:first-child a").should.be.false;

				browser.keys(["ArrowLeft", "ArrowLeft", "ArrowLeft", "ArrowLeft"]);
				browser.isActive("#nice-evidence li:first-child a").should.be.true;
			});

			it("up/down key to navigate in focused evidence menu", async function() {
				browser.url("/cks.html");
				focusOnFirstEvidenceMenuItem();

				browser.keys(["ArrowDown", "ArrowDown", "ArrowDown", "ArrowDown"]);
				browser.isActive("#nice-evidence li:first-child a").should.be.false;

				browser.keys(["ArrowUp", "ArrowUp", "ArrowUp", "ArrowUp"]);
				browser.isActive("#nice-evidence li:first-child a").should.be.true;
			});

			it("right key can focus on cks in evidence menu", async function() {
				browser.url("/cks.html");
				focusOnFirstEvidenceMenuItem();

				browser.keys(["ArrowRight", "ArrowRight", "ArrowRight"]);
				browser.isActive("#nice-evidence li:nth-child(4) a").should.be.true;
			});
		});

		describe("Given I have logged in with NICE Accounts", function(){
			it("I can view the profile menu", async function() {
				browser.click(".nice-tophat #signin");

				browser.waitForExist("body #Email");

				browser.setValue("body #Email", process.env.accountsUsername);
				browser.setValue("body #Password", process.env.accountsPassword);

				browser.click("form button[type='submit']");

				browser.waitForExist(".nice-tophat");

				browser.click(".nice-tophat #menu-profile");
				browser.isVisible(".nice-tophat #nice-profile").should.equal(true, "NICE profile is not visible");
			});
		});

		describe("Given I am on a nice service", function () {
			it("I can use the skip to main content link when main content ID is not provided", async function() {
				browser.url("/niceorg.html");
				var expectedUrl = browser.getUrl() + "#tophat-end";

				focusOnSkipToContent();
				browser.keys(["Enter"]);

				browser.pause(500);

				browser.getUrl().should.be.equal(expectedUrl);
			});

			it("I can use the skip to main content link when main content ID is provided", async function() {
				browser.url("/cks.html");
				var expectedUrl = browser.getUrl() + "#main-content";

				focusOnSkipToContent();
				browser.keys(["Enter"]);

				browser.pause(500);

				browser.getUrl().should.be.equal(expectedUrl);
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

				browser.url("/niceorg.html");

				browser.click(".nice-tophat #menu-mobile");
				browser.isVisible(".nice-tophat #main-menu").should.be.true;
			});
		});

	});

});

