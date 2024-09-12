const { Builder, By, until } = require('selenium-webdriver');

describe('Enmasse Stories', function () {
    this.timeout(120000);

    let driver;
    let expect;
    let selectedH1Text;

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

    it('Testing the family Details', async function () {
        await driver.findElement(By.name('email_id')).sendKeys('hanna.joseph@tarento.com');
        await driver.findElement(By.name('password')).sendKeys('Welcome@2024');
        await driver.findElement(By.css('button[type="submit"]')).click();
        await driver.sleep(5000);

        const exploreMoreButton = await driver.findElement(By.xpath("//button[contains(@class, 'Button_btn_primary') and contains(text(), 'Explore More')]"));
        await exploreMoreButton.click();

        await driver.sleep(10000);

        const familyButton = await driver.findElement(By.xpath("//button[contains(@class, 'rounded') and contains(text(), 'View all families')]"));
        await familyButton.click();

        await driver.sleep(15000);

        let elements = await driver.findElements(By.css('.col-lg-4.col-md-6.col-sm-12.padding-left-right-0'));
        for (let i = 0; i < elements.length; i++) {
            try {
                elements = await driver.findElements(By.css('.col-lg-4.col-md-6.col-sm-12.padding-left-right-0'));

                let randomIndex = Math.floor(Math.random() * elements.length);
                let element = elements[randomIndex];

                let h1Element = await element.findElement(By.css('div.text-start.padding-3 h1.Typography_h4__U2845.Typography_dark__92uW'));

                const selectedH1Text = await h1Element.getText();
                console.log(`Selected Family: ${selectedH1Text}`);

                await element.click();

                await driver.sleep(2000);
            } catch (error) {
                console.log('Error while interacting with elements:', error);
            }
        }
        await driver.sleep(4000);

        const familyNameDetail = await driver.findElement(By.css('div.d-flex.flex-column.align-items-start.justify-content-start.text-start > h1'))
        const familyName = await familyNameDetail.getText();
        console.log(familyName)

        expect(selectedH1Text).to.equal(familyName);

        await driver.sleep(3000);
    });
});
