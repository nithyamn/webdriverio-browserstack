var browserstack = require('browserstack-local');

exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACC_KEY',
  browserstackLocalIdentifier: process.env.BROWSERSTACK_LOCAL_IDENTIFIER,

  updateJob: false,
  specs: [
    './tests/specs/local_test.js'
  ],
  exclude: [],

  capabilities: [{
    browser: 'chrome',
    name: 'local_test',
    build: 'webdriver-browserstack',
    'browserstack.local': true,
    'browserstack.localIdentifier': browserstackLocalIdentifier 
  }],

  logLevel: 'warn',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  host: 'hub.browserstack.com',

  before: function () {
    var chai = require('chai');
    global.expect = chai.expect;
    chai.Should();
  },
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },

  // Code to start browserstack local before start of test
  onPrepare: function (config, capabilities) {
    console.log("Connecting local");
    return new Promise(function (resolve, reject) {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({ 'key': exports.config.key }, function (error) {
        if (error) return reject(error);

        console.log('Connected. Now testing...');
        resolve();
      });
    });
  },

  // Code to stop browserstack local after end of test
  onComplete: function (capabilties, specs) { 
    return new Promise(function(resolve, reject){
      exports.bs_local.stop(function() {
        console.log("Binary stopped");
        resolve();
      });
    });
  }
}
