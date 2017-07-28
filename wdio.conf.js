var path = require('path');
var VisualRegressionCompare = require('wdio-visual-regression-service/compare');

function getScreenshotName(basePath) {
  return function(context) {
    var type = context.type;
    var testName = context.test.title;
    var browserVersion = parseInt(context.browser.version, 10);
    var browserName = context.browser.name;
    var browserWidth = context.meta.width;
    return path.join(basePath, `${testName}_${type}_${browserName}_v${browserVersion}_${browserWidth}.png`);
  };
}

exports.config = {
    
    specs: [
        './test/specs/**/*.js'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome'
    }],
    sync: true,
    logLevel: 'silent',
    coloredLogs: true,
    bail: 0,
    screenshotPath: './errorShots/',
    baseUrl: 'http://localhost:8000',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    //
    // Initialize the browser instance with a WebdriverIO plugin. The object should have the
    // plugin name as key and the desired plugin options as properties. Make sure you have
    // the plugin installed before running any tests. The following plugins are currently
    // available:
    // WebdriverCSS: https://github.com/webdriverio/webdrivercss
    // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
    // Browserevent: https://github.com/webdriverio/browserevent
    // plugins: {
    //     webdrivercss: {
    //         screenshotRoot: 'my-shots',
    //         failedComparisonsRoot: 'diffs',
    //         misMatchTolerance: 0.05,
    //         screenWidth: [320,480,640,1024]
    //     },
    //     webdriverrtc: {},
    //     browserevent: {}
    // },
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: ['visual-regression'],
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
      timeout: 60000,
      compilers: [
        'js:babel-register'
      ]
    }
}
