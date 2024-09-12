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

  it('Core Solutions, Stories And Request Layers Testing', async function () {

    await driver.sleep(5000);

    const coreSolutionSwitch = await driver.findElement(By.css('label.Switch_switch__DXSwB input[name="coreSolution"]'), 8000);

    const isChecked = await coreSolutionSwitch.isSelected();

    if (isChecked) {
      const specificDiv = await driver.findElement(By.css('div.bg-white.margin-top-1.padding-2'));
      const isDivDisplayed = await specificDiv.isDisplayed();

      expect(isDivDisplayed).to.be.true;
      console.log('Core Solutions are visible in the map');
    } else {
      console.error('Core Solutions not visible');
    }

    await driver.sleep(3000);

    const viewStoriesButton = await driver.findElement(By.css('label.Switch_switch__DXSwB input[name="viewStories"]'));
    const isButtonEnabled = await viewStoriesButton.isSelected();

    if (isButtonEnabled) {
      const specificDialog = await driver.findElement(By.css('div.gm-style-iw.gm-style-iw-c'));
      const isDialogDisplayed = await specificDialog.isDisplayed();

      expect(isDialogDisplayed).to.be.true;
      console.log('Stories are visible in the map');
    } else {
      console.error('Stories not visible');
    }
    await driver.sleep(2000)

    await driver.sleep(5000);
    await driver.findElement(By.css('.Button_btn_primary_transparent__dEdCj.Button_btn_default__-6zGg.h-auto.padding-0')).click();

    try {
      await driver.wait(until.elementLocated(By.id('request-layers')), 10000);
      const requestLayersForm = await driver.findElement(By.id('request-layers'));
      const isFormDisplayed = await requestLayersForm.isDisplayed();

      expect(isFormDisplayed).to.be.true;
      console.log('Request layers form is visible');
    } catch (error) {
      console.error('Request layers form not found');
    }
  });
});


/*const storiesCloseButton = await driver.findElement(By.css('button.gm-ui-hover-effect[aria-label="Close"]'))
    await storiesCloseButton.click();
    console.log('clicked')
    await driver.sleep(6000)

    const storiesCloseButtons = await driver.findElements(By.css('button.gm-ui-hover-effect[aria-label="Close"]'));
    for (let i = 0; i < storiesCloseButtons.length; i++) {
      await storiesCloseButtons[i].click(), 2000;
      console.log(`Clicked button ${i + 1}`);
      await driver.sleep(3000);
    };*/