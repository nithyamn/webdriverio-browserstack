const chai = require('chai')
var assert = chai.assert;

describe('Google\'s Search Functionality', () => {
  it('Internet Heroku Login', () => {
  	  browser.setTimeout({ 'implicit': 5000 })
      browser.url('https://the-internet.herokuapp.com/login');
      $('#username').setValue('tomsmith');
      $('#password').setValue('SuperSecretPassword!');
      $('//*[@id="login"]/button').click();
      // $('[name="q"]').setValue('BrowserStack');
      // browser.getTitle().should.match("BrowserStack - Google Search");
  });

  it('Google Search - BrowserStack', () => {
  	  browser.url('https://www.google.com/');
      $('[name="q"]').setValue('BrowserStack');
      assert.equal('Google Search - BrowserStack', 'Google Search - BrowserStack - error');
  });
});
