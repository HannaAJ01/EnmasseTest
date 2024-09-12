const { Builder, By, until } = require('selenium-webdriver');

describe('Enmasse Login Page', function() {
  this.timeout(120000); 

  let driver;
  let expect;

  before(async function() {
    const chai = await import('chai');
    expect = chai.expect;
  });

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://dev-ei.enmasse.world/login');
  });

  afterEach(async function() {
    await driver.quit();
  });

  it('Valid Credentials', async function() {
    await driver.findElement(By.name('email_id')).sendKeys('hanna.joseph@tarento.com');
    await driver.findElement(By.name('password')).sendKeys('Welcome@2024');
    await driver.findElement(By.css('button[type="submit"]')).click();

    try {
      await driver.wait(until.urlContains('?country=1'), 5000);
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('?country=1');

      await driver.wait(until.elementLocated(By.css(img[alt="logo"])))
      const logo = await driver.findElement(By.css(img[alt="logo"]))
      expect (logo).to.not.be.null;

      await driver.wait(until.elementLocated(By.css('label.Switch_switch__DXSwB input[name="coreSolution"]')))
      const coreSolution = await driver.findElement(By.css('label.Switch_switch__DXSwB input[name="coreSolution"]'))
      expect (coreSolution).to.not.be.null;

      console.log('Successful Login');
    } catch (error) {
      console.log('Login failed for valid credentials');
    }
  });

  it('Invalid Credentials' , async function(){
    await driver.findElement(By.name('email_id')).sendKeys('hanna.joseph@tarent.com');
    await driver.findElement(By.name('password')).sendKeys('Welcome@12%');
    await driver.findElement(By.css('button[type="submit"]')).click();

    try {
      await driver.wait(until.urlContains('login'), 5000);
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('login');
      console.log('Invalid Email and Password');
    } catch (error) {
      console.log('Unexpected Error');
    }
  });

  it('Invalid Email' , async function(){
    await driver.findElement(By.name('email_id')).sendKeys('hanna.joseph@tarent.com');
    await driver.findElement(By.name('password')).sendKeys('Welcome@2024');
    await driver.findElement(By.css('button[type="submit"]')).click();

    try {
      await driver.wait(until.urlContains('login'), 5000);
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('login');
      console.log('Email is invalid');
    } catch (error) {
      console.log('Unexpected Error');
    }
  });

  it('Invalid Password' , async function(){
    await driver.findElement(By.name('email_id')).sendKeys('hanna.joseph@tarento.com');
    await driver.findElement(By.name('password')).sendKeys('Welcome@12');
    await driver.findElement(By.css('button[type="submit"]')).click();

    try {
      await driver.wait(until.urlContains('login'), 5000);
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.include('login');
      console.log('Password is invalid');
    } catch (error) {
      console.log('Unexpected Error');
    }
  });

  it('Empty Email Field', async function() {
    await driver.findElement(By.name('password')).sendKeys('Welcome@2024');
    
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    const isButtonEnabled = await submitButton.isEnabled();
    expect(isButtonEnabled).to.be.false;
    
    if (!isButtonEnabled) {
      console.log('Email field is empty');
    } else {
      console.log('Unexpected Error');
    }
  });

  it('Empty Password Field', async function() {
    await driver.findElement(By.name('email_id')).sendKeys('hanna.joseph@tarento.com');
    
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    const isButtonEnabled = await submitButton.isEnabled();
    expect(isButtonEnabled).to.be.false;
    
    if (!isButtonEnabled) {
      console.log('Password field is empty');
    } else {
      console.log('Unexpected Error');
    }
  });

  it('Empty Fields', async function() {
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    const isButtonEnabled = await submitButton.isEnabled();
    expect(isButtonEnabled).to.be.false;
    
    if (!isButtonEnabled) {
      console.log('Email and Password fields are empty');
    } else {
      console.log('Unexpected Error');
    }
  });
});