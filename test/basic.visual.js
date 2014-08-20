var scenarios =  [
    ''
  , 'fill'
  , 'partner'
];

var testFiles = scenarios.map(function( scenario ) {
    return 'visual' + ('.' + scenario + '.').replace(/\.\./, '.') + 'html';
});

casper.test.begin('Responsive Tophat on Desktop', scenarios.length, function suite() {
    runTestForScenario( casper, 'desktop', 1280, 1024, testFiles );
});

casper.test.begin('Responsive Tophat on Laptop', scenarios.length, function suite() {
    runTestForScenario( casper, 'laptop', 1366, 960, testFiles );
});

casper.test.begin('Responsive Tophat on Netbook', scenarios.length, function suite() {
    runTestForScenario( casper, 'netbook', 1024, 768, testFiles );
});

casper.test.begin('Responsive Tophat on Table in Portrait', scenarios.length, function suite() {
    runTestForScenario( casper, 'tablet-portrait', 768, 1024, testFiles );
});

casper.test.begin('Responsive Tophat on Mobile in Portrait', scenarios.length, function suite() {
    runTestForScenario( casper, 'mobile-portrait', 320, 568, testFiles );
});


function runTestForScenario( casper, deviceType, width, height, testFiles ) {
    var phantomcss = require('phantomcss');

    var src = './test/';
    var output = './test/visual/' + deviceType;
    var failures = output + '/failures';
    var addLabel = true;
    var serverRoot = 'http://localhost:8000';

    phantomcss.init({ libraryRoot: src, screenshotRoot: output, failedComparisonsRoot: failures, addLabelToFailedImage: addLabel });

    casper.start( serverRoot ).viewport( width, height );

    testFiles.forEach( runVisualTest );

    casper.then( compare_against_screenshot ).then( complete );

    /* Casper runs tests */
    casper.run(function() {
        phantom.exit( phantomcss.getExitStatus() );
    });

    function runVisualTest( testFile ) {
        casper.thenOpen( serverRoot + '/' + testFile );

        casper.waitForSelector( '.tophat', function capture_screenshot() {
            var testTitle = this.getTitle();
            var screenshotFileName = testTitle.replace(/\s/ig, '_');

            phantomcss.screenshot('.tophat', screenshotFileName );
        }, function selectorTimeout() {
            casper.test.fail( testFile + ' failed to initialize' );
        });
    }

    function compare_against_screenshot() {
        phantomcss.compareAll();
    }

    function complete() {
        casper.test.done();
    }
}
