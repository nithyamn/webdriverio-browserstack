const testname = 'single.conf.js';

exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACC_KEY',

  updateJob: false,
  specs: [
    './tests/specs/single_test.js'
  ],
  exclude: [],
  // services: [
  //   [
  //   'browserstack',
  //     {
  //       browserstackLocal: false
  //     }
  //   ],
  // ],
  //The above code causes the same error as Shay is getting (this is for cucumber for chai/mocha this is not needed)

  capabilities: [{
    browser: 'Chrome',
    name: testname,
    project: 'Webdriver IO tests',
    build: 'webdriver-browserstack'
  }],
  
  logLevel: 'warn',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  host: 'hub.browserstack.com',

  // before: function () {
  //   var chai = require('chai');
  //   global.expect = chai.expect;
  //   chai.Should();
  // },
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
//   reporters: ['junit'],
//     reporterOptions: {
//         browserstack: {
//             outputDir: './'
//         }
//     },
  reporters: ['junit'],
    reporterOptions: {
        junit: {
            outputDir: './test-reports/'
        }
    },

  beforeSession: function (config, capabilities, specs) {
    var path = specs[0];
    var testname = path.replace(/^.*[\\/]/, '').replace(/.js/, '');
    var projectname = `_test_${new Date().toLocaleDateString()}`;

    //console.log("specs:"+testname);
    capabilities.name = testname;
    capabilities.project = projectname;
  },
  beforeTest: function (test, context) {
        var testName = "\"********"+test.title+"*******\";"
        browser.execute(testName)
        console.log('--- Running test: ' + testName);
  },

  // afterTest: function (test) {
  //       const projectname = `test_${new Date().toLocaleDateString()}`;
  //       var request = require('request');
  //       const sessionid = browser.sessionId;
  //       console.log("Session ID printed: "+sessionid);
  //       request({
  //           uri: "https://"+this.user+":"+this.key+"@api.browserstack.com/automate/sessions/"+sessionid+".json", 
  //           method:"PUT", 
  //           form:{"name":"updated_sessionname","status":"passed","reason":""}
  //       })
  //   }
}
