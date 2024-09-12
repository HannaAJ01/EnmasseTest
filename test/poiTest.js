const { Builder, By, until } = require('selenium-webdriver');
const { get } = require('selenium-webdriver/http');

describe('Enmasse Login Page', function () {
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
    });

    afterEach(async function () {
        await driver.quit();
    });

    it('PoI value testing For India', async function () {
        await driver.findElement(By.name('email_id')).sendKeys('hanna.joseph@tarento.com');
        await driver.findElement(By.name('password')).sendKeys('Welcome@2024');
        await driver.findElement(By.css('button[type="submit"]')).click();

        await driver.wait(until.urlContains('?country=1'), 5000);
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('?country=1');
        console.log('Successful Login');

        async function getCleanedValue(elementId) {
            await driver.wait(until.elementLocated(By.css(`#${elementId}.Typography_h5__9b0AM.Typography_dark__92uW-.margin-0.initial`)), 5000);
            const element = await driver.findElement(By.css(`#${elementId}.Typography_h5__9b0AM.Typography_dark__92uW-.margin-0.initial`));
            const text = await element.getText();
            const cleanedText = text.replace(/[^\d.]/g, '');
            return parseFloat(cleanedText);
        }

        const healthValue = await getCleanedValue('Healthcare')
        const educationValue = await getCleanedValue('Education')
        const agricultureValue = await getCleanedValue('Agri_Markets')
        const financialValue = await getCleanedValue('Financial_Solutions')
        const totalPoI = healthValue + educationValue + agricultureValue + financialValue;
        console.log(`Total PoI: ${totalPoI}`);

        await driver.wait(until.elementLocated(By.css('div.col-12 h1.Typography_h5__9b0AM.Typography_dark__92uW-.margin-0')), 8000);
        const poiElement = await driver.findElement(By.css('div.col-12 h1.Typography_h5__9b0AM.Typography_dark__92uW-.margin-0'));
        const poiText = await poiElement.getText();
        const cleanedPoiText = poiText.replace(/[^\d.]/g, '');
        const poiValue = parseFloat(cleanedPoiText);
        console.log(`PoI Value: ${poiValue}`);

        expect(totalPoI).to.be.equal(poiValue);
    });
});
