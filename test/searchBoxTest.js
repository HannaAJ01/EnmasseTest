const { Builder, By, until } = require('selenium-webdriver');

describe('Enmasse Search', function () {
    this.timeout(120000);

    let driver;
    let expect;

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    before(async function () {
        const chai = await import('chai');
        expect = chai.expect;
    });

    it('Searchbox Testing', async function () {
        try {
            driver = await new Builder().forBrowser('chrome').build();

            await driver.get('https://dev-ei.enmasse.world/login');

            await driver.findElement(By.name('email_id')).sendKeys('hanna.joseph@tarento.com');
            await driver.findElement(By.name('password')).sendKeys('Welcome@2024');
            await driver.sleep(2000);
            await driver.findElement(By.css('button[type="submit"]')).click();

            await driver.wait(until.elementLocated(By.css('.Button_btn_primary__Nw7aH.Button_btn_small__JRmxp.d-flex.align-items-center')), 8000).click();

            const searchBox = await driver.findElement(By.css('input[placeholder="Search by District or State"]'))
            await driver.sleep(2000)
            await searchBox.click();
            await searchBox.sendKeys('Karnataka')

            const nameElement = await driver.findElement(By.css('.Search_suggestions_item__nwdHv p'));
            await nameElement.click();

            const dropdownName = await driver.findElement(By.css('.Typography_h4__U2845.Typography_purple__VlLuh.text-start.mb-0.me-1.width-fit-content.bg-purple-4'));
            await dropdownName.click();

            await driver.sleep(4000);
            const titleFinder2 = await driver.wait(until.elementLocated(By.css('.Typography_h4__U2845.Typography_dark__92uW-.margin-top-bottom-0')));
            const title2 = await titleFinder2.getText()

            expect (title2).to.equal ('Karnataka')
            console.log('Correct State was searched and found')
        }
        finally {
            await driver.quit();
        }
    });
})