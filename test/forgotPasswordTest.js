const { Builder, By, until } = require('selenium-webdriver');

describe('Enmasse Login Page ', function () {
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

    it('Forgot Password Testing', async function () {
        await driver.wait(until.elementLocated(By.xpath("//button[text()='Forgot password?']")), 10000);
        const forgotPassword = await driver.findElement(By.xpath("//button[text()='Forgot password?']"));
        await forgotPassword.click();

        await driver.wait(until.elementLocated(By.css("div.modal-content input[type='email'][placeholder='Enter your email id here']")), 10000);
        const email = await driver.findElement(By.css("div.modal-content input[type='email'][placeholder='Enter your email id here']"))
        await email.sendKeys('hanna.joseph@tarento.com');

        await driver.sleep(3000)

        await driver.wait(until.elementLocated(By.xpath("//button[contains(@class, 'Button_btn_primary__Nw7aH') and contains(@class, 'Button_btn_large__fTOtI') and text()='Send Email']")), 10000);
        const sendMailButton = await driver.findElement(By.xpath("//button[contains(@class, 'Button_btn_primary__Nw7aH') and contains(@class, 'Button_btn_large__fTOtI') and text()='Send Email']"));
        await sendMailButton.click();

        await driver.sleep(3000)

        console.log("Test completed.");
    });
});
