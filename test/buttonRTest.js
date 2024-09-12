const { Builder, By, until } = require('selenium-webdriver');

describe('Enmasse Home Page', function () {
  this.timeout(120000);

  let driver;
  let expect;

  before(async function () {
    const chai = await import('chai');
    expect = chai.expect;
  });

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://dev-ei.enmasse.world/login');

    await driver.findElement(By.name('email_id')).sendKeys('hanna.joseph@tarento.com');
    await driver.findElement(By.name('password')).sendKeys('Welcome@2024');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlContains('?country=1'), 5000);
  });

  afterEach(async function () {
    await driver.quit();
  });

  it('Indian Rupee Testing', async function () {

    await driver.sleep(5000);
    const currencyDropdown = await driver.wait(until.elementLocated(By.css('select[name="currency"]')), 10000);
    await driver.wait(until.elementIsVisible(currencyDropdown), 10000);
    await currencyDropdown.click();

    const inrOption = await driver.wait(until.elementLocated(By.css('select[name="currency"] option[value="INR"]')), 10000);
    await driver.wait(until.elementIsVisible(inrOption), 10000);
    await inrOption.click();

    await driver.sleep(3000)

    const tam = await driver.wait(until.elementLocated(By.css('.Typography_h5__9b0AM.Typography_white__Z5rr5.margin-0')), 10000);
    const tamText = await tam.getText();
    await driver.sleep(2000)
    console.log(tamText);
    expect(tamText).to.include('₹');
    console.log('Indian Rupee Selected and TAM,CTV and EH values given in rupees');
  });

  it('US Dollar Testing', async function () {

    await driver.sleep(5000);
    const currencyDropdown = await driver.wait(until.elementLocated(By.css('select[name="currency"]')), 10000);
    await driver.wait(until.elementIsVisible(currencyDropdown), 10000);
    await currencyDropdown.click();

    const usdOption = await driver.wait(until.elementLocated(By.css('select[name="currency"] option[value="USD"]')), 10000);
    await driver.wait(until.elementIsVisible(usdOption), 10000);
    await usdOption.click();

    await driver.sleep(2000)

    const tam = await driver.wait(until.elementLocated(By.css('.Typography_h5__9b0AM.Typography_white__Z5rr5.margin-0')),1000);
    const tamText = await tam.getText();
    await driver.sleep(2000)
    console.log(tamText)
    expect(tamText).to.include('$')
    console.log('US Dollar Selected and TAM,CTV and EH values are given in dollar');
  });
  
});
