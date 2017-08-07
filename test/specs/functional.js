var chai = require("chai");
chai.should();

describe.only('Given I am on the NICE org site and I click on the Evidence servies button', function(){
  it('should display the lower menu', async function() {
  
    browser.url('/example.niceorg.html'); // for base url see wdio.conf.js

    browser.click('#menu-evidence');
    browser.isVisible('.tophat-inner').every((x)=>x).should.be.true;
  })
})
