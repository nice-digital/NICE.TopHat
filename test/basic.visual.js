var phantomcss = require('phantomcss');

phantomcss.init({
    libraryRoot: './test/',
    screenshotRoot: './test/visual/desktop',
    failedComparisonsRoot: './reports/visual/desktop/failures',
    addLabelToFailedImage: true
});

var testFiles =  [
    "./test/visual.html"
  , "./test/visual.layout-fill.html"
  , "./test/visual.tophat-partner.html"
];

casper.start( testFiles[0] );

casper.viewport( 1280, 960 );

testFiles.forEach(function runVisualTest( testFile ) {

    casper.thenOpen( testFile );

    casper.waitForSelector( '.tophat', function capture_screenshot() {
        var testTitle = this.getTitle();
        var screenshotFileName = testTitle.replace(/\s/ig, '_');

    	  phantomcss.screenshot('.tophat', screenshotFileName );
    }, function selectorTimeout() {
        this.test.fail( testTitle + ' failed to initialize' );
    });

});

casper.then(function compare_against_screenshot() {
    phantomcss.compareAll();
});

casper.then(function complete() {
    this.test.done();
});

/* Casper runs tests */
casper.run(function() {
    phantom.exit( phantomcss.getExitStatus() );
});
