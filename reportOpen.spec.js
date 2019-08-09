// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox');
const chrome = require('selenium-webdriver/chrome');
const proxy = require('selenium-webdriver/proxy')
const logging = require('selenium-webdriver/lib/logging')
const fs = require('fs');
const baseURL = fs.readFileSync('site').toString()
const token = fs.readFileSync('token').toString()
const reportID = fs.readFileSync('reportId').toString()

const screen = {
  width: 1440,
  height: 1080
};

describe('ReportOpen', function() {
  this.timeout(150000)
  let driver
  let vars
  beforeEach(async function() {
    
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('ReportOpen', async function() {
    console.log("Before build")
    var prefs = new logging.Preferences();
    prefs.setLevel(logging.Type.BROWSER, logging.Level.ALL);
    prefs.setLevel(logging.Type.DRIVER, logging.Level.ALL);
    driver = await new Builder()
      .withCapabilities(
        {
          acceptInsecureCerts: true,
          loggingPrefs: prefs
        })      
      .forBrowser('chrome')
      .setProxy(proxy.manual({
        httpProxy: 'www-proxy-hqdc.us.oracle.com:80',
        sslProxy: 'www-proxy-hqdc.us.oracle.com:80',
        ftpProxy: 'www-proxy-hqdc.us.oracle.com:80',
        socksProxy: 'www-proxy-hqdc.us.oracle.com:80',
        socksVersion: 5,
        noProxy:[".lan"]
      }))
      .setChromeOptions(new chrome.Options().headless().windowSize(screen))
      .build()
    console.log("After build")
    await driver.get(`${baseURL}/AgentWeb/`)
    await driver.takeScreenshot().then(
      function(image, err) {
          fs.writeFile(`login.png`, image, 'base64', function(err) {
              console.log(err);
          });
      }
    );
    await driver.findElement(By.id("username")).click()
    await driver.findElement(By.id("username")).sendKeys("admin")
    await driver.findElement(By.id("loginbutton")).click()
    console.log("Cookie Set")
    await driver.get(`${baseURL}/AgentWeb/Bookmark/Report/${reportID}`)
    await driver.executeScript("window.scrollTo(0,0)")
    await waitForElement(driver, By.id(`tabHeader-AC-${reportID}`))
    await sleep(5000)
    await driver.takeScreenshot().then(
      function(image, err) {
          fs.writeFile(`${reportID}.png`, image, 'base64', function(err) {
              console.log(err);
          });
      }
    );
  })

  function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
  }

  async function waitForElement(dr, selector){
    return await dr.wait(async function() {
      let el
      try{
        el = await dr.findElement(selector)
        return el.isDisplayed().then(v => v ? el : null)
      } catch {
        el = null
      }
      return false
    }, 30000)
  }
})
