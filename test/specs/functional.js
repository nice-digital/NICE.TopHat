var chai = require("chai");
chai.should();

describe.only('Given I am on the NICE org site and I click on the Evidence servies button', function(){
  it('should display the lower menu', async function() {

    browser.url('/example.niceorg.html'); // for base url see wdio.conf.js

    browser.click('#menu-evidence');
    browser.isVisible('.tophat-inner').every((x)=>x).should.be.true;
  })
})

describe.only('Given I am on the NICE org site on a mobile and I click on the Menu button', function(){
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

describe.only('Given I am on the NICE org site on a mobile use the keyboard to navigate', function(){
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

describe.only('Given I am on the NICE org site on a mobile', function(){
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
