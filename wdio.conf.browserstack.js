var path = require('path');
var VisualRegressionCompare = require('wdio-visual-regression-service/compare');

function getScreenshotName(basePath) {
  return function(context) {
    var testName = context.test.title;
    var resolution = context.meta.width || context.meta.orientation || 'unknown';
    var browserVersion = parseInt(/\d+/.exec(context.browser.version)[0]);
    var browserName = context.browser.name;

    return path.join(basePath, `${testName}_${browserName}_v${browserVersion}_${resolution}.png`);
  };
}

exports.config = {

    user: process.env.browserStackUser,
    key: process.env.browserStackKey,
    specs: [
      './test/specs/functional/**/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    capabilities: [{
        browser:"chrome",
        name:"Keyboard nav",
        build:"webdriver-tophat"
    },{
 		'browserName' : 'IE',
 		'browser_version' : '11.0',
 		'os' : 'Windows',
 		'os_version' : '10',
 		'resolution' : '1024x768'
		}],
    sync: true,
    logLevel: 'silent',
    coloredLogs: true,
    bail: 0,
    screenshotPath: './errorShots/',
    //baseUrl: 'http://website:8000',
    baseUrl: process.env.BASE_URL,
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    plugins: { 'wdio-screenshot':{}},
    services: ['visual-regression', 'browserstack'],
    visualRegression: {
      compare: new VisualRegressionCompare.LocalCompare({
        referenceName: getScreenshotName(path.join(process.cwd(), 'screenshots/reference')),
        screenshotName: getScreenshotName(path.join(process.cwd(), 'screenshots/taken')),
        diffName: getScreenshotName(path.join(process.cwd(), 'screenshots/diff')),
        misMatchTolerance: 0.01,
      })
    },
    framework: 'mocha',
    reporters: ['spec','teamcity'],
    mochaOpts: {
      ui: 'bdd',
      timeout: 600000,
      compilers: [
        'js:babel-register'
      ]
    }
}
