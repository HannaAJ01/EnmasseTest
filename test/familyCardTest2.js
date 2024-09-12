const { Builder, By, until } = require('selenium-webdriver');

describe('Enmasse Stories', function () {
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

    it('Testing family details from the map', async function () {
        await driver.findElement(By.name('email_id')).sendKeys('hanna.joseph@tarento.com');
        await driver.findElement(By.name('password')).sendKeys('Welcome@2024');
        await driver.findElement(By.css('button[type="submit"]')).click();
        await driver.sleep(15000);

        const familyText = await driver.findElement(By.css("h1.Typography_h6__a-onl.Typography_secondary__5si4W.m-0.p-0.text-start")).getText();

        const readMoreButton = await driver.findElement(By.xpath("//button[contains(@class, 'Button_btn_primary_transparent') and contains(text(), 'Read more')]"));
        await driver.executeScript("arguments[0].click();", readMoreButton);
        await driver.sleep(2000)

        const familyName = await driver.findElement(By.css("h1.Typography_h4__U2845.Typography_dark__92uW-.text-start")).getText();

        const elementToClick = await driver.findElement(By.css(".col-lg-4.col-md-6.col-sm-12.padding-left-right-0"));
        await elementToClick.click();
        await driver.sleep(3000)

        const familyNameDetail = await driver.findElement(By.css("h1.Typography_h4__U2845.Typography_dark__92uW-.margin-bottom-0")).getText();

        expect(familyText).to.equal(familyName).to.equal(familyNameDetail)
    })
})
