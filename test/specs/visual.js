var chai = require("chai");
chai.should();

const widths = [1920, 450];

function assertDiff(results) {
  results.forEach((result) => result.isExactSameImage.should.be.true);
}
const products = [
  {
    name: 'niceorg',
    url: '/example.niceorg.html'
  },
  {
    name: 'guidance',
    url: '/example.guidance.html'
  },
  {
    name: 'pathways',
    url: '/example.pathways.html'
  }
]

products.map(product => {
  describe('Visually regress TopHat', function(){
    it(product.name, async function() {
    
      await browser.url(product.url); // for base url see wdio.conf.js
      await browser.pause(2000);

      var report = await browser.checkDocument({
        widths: widths 
      });
      assertDiff(report);
    })
  })
})
