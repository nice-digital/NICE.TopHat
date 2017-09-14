var chai = require("chai");
var cheerio = require("cheerio");
var $ = cheerio.load(browser.getSource());
chai.should();

describe('Functionally browser driven tests', function() {
  describe('Given I am on the NICE org site and I click on the Evidence servies button', function(){
    it('should display the lower menu', async function() {

      browser.url('/example.niceorg.html'); // for base url see wdio.conf.js

      browser.click('#menu-evidence');
      browser.isVisible('.tophat-inner').every((x)=>x).should.be.true;
    })
  })

  describe('Given I am on the NICE org site on a mobile and I click on the Menu button', function(){
    it('should display the mobile menu', async function() {

      browser.setViewportSize({
          width: 500,
          height: 500
      });
      browser.url('/example.niceorg.html'); // for base url see wdio.conf.js

      browser.click('#menu-mobile');
      browser.isVisible('#main-menu').should.be.true;
    })
  })

  describe('Given I am on the NICE org site on a mobile use the keyboard to navigate', function(){
    it('I can select the main menu using the space bar', async function() {

      browser.setViewportSize({
          width: 500,
          height: 500
      });
      browser.url('/example.niceorg.html'); // for base url see wdio.conf.js
      browser.keys("Tab");
      browser.keys(" ");

      browser.isVisible('#main-menu').should.be.true;
    })
  })

  describe('Given I am on the NICE org site on a mobile', function(){
    it('I can view the profile menu', async function() {

      browser.setViewportSize({
          width: 500,
          height: 500
      });

      browser.click("#signin");

      browser.waitForExist("#Email");

      browser.setValue("#Email", process.env.username);
      browser.setValue("#Password", process.env.password);

      browser.submitForm('form');

      browser.url('/example.niceorg.html'); // for base url see wdio.conf.js

      browser.click('#menu-profile');
      browser.isVisible('#nice-profile').should.be.true;
    })
  })


  describe('Given I am on the NICE org site on a mobile use the keyboard to navigate', function(){
    it('I can select items in the evidence menu by using up arrow key to navigate', async function() {

      browser.setViewportSize({
          width: 500,
          height: 500
      });
      browser.url('/example.niceorg.html'); // for base url see wdio.conf.js

      browser.keys("Tab");
      browser.keys(" ");
      browser.keys("Tab");
      browser.keys("ArrowUp");

      var active = browser.elementActive().value.ELEMENT;
      var lastItemInEvidenceMenu = browser.element("#nice-evidence li:last-child a").value.ELEMENT;

      var result = lastItemInEvidenceMenu === active;
      // console.log(lastItemInEvidenceMenu)
      // console.log(active)


      result.should.be.equal(true);
    })
  })

   describe('Given I am on the NICE org site I can use the keyboard to navigate', function(){
    it('I can exit a menu using escape key', async function() {

      browser.setViewportSize({
          width: 500,
          height: 500
      });
      browser.url('/example.niceorg.html'); // for base url see wdio.conf.js
      browser.keys("Tab");
      browser.keys(" ");
      browser.keys("Escape");


      browser.isVisible('#main-menu').should.be.false;
    })
  })

describe('Given I am on the NICE org site I can use the keyboard', function(){
    it('end key to go to last item in focused menu', async function() {

    	browser.setViewportSize({
          width: 1000,
          height: 500
      });

      browser.url('/example.niceorg.html'); // for base url see wdio.conf.js
      browser.keys("Tab");
      browser.keys("Tab");
      browser.keys("Tab");
      browser.keys("End");

      var active = browser.elementActive().value.ELEMENT;
      var lastItemInMainMenu = browser.element("#main-menu li:last-child a").value.ELEMENT;
			lastItemInMainMenu.should.be.equal(active);

    })
  })

describe('Given I am on the NICE org site I can use the keyboard', function(){
    it('home key to go to first item in focused menu', async function() {

    	browser.setViewportSize({
          width: 1000,
          height: 500
      });

      browser.url('/example.niceorg.html'); // for base url see wdio.conf.js
      browser.keys("Tab");
      browser.keys("Tab");
      browser.keys("Tab");
      browser.keys("Home");

      var active = browser.elementActive();
      var firstItemInMainMenu = browser.element("#main-menu li:first-child a");
			var result = firstItemInMainMenu.value.ELEMENT === active.value.ELEMENT;

      result.should.be.equal(true);
    })
  })

describe('Given I am on the NICE org site I can use the keyboard', function(){
    it('right/left key to navigate in focused menu', async function() {

    	browser.setViewportSize({
          width: 1000,
          height: 500
      });

      browser.url('/example.niceorg.html'); // for base url see wdio.conf.js
      browser.keys("Tab");
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
    })
  })

describe('Given I am on the NICE org site I can use the keyboard', function(){
    it('up/down key to navigate in focused menu', async function() {

    	browser.setViewportSize({
          width: 1000,
          height: 500
      });

      browser.url('/example.niceorg.html'); // for base url see wdio.conf.js
      browser.keys("Tab");
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
    })
  })


});

