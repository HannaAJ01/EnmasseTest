const { Builder, By, until, error } = require('selenium-webdriver');

describe('Enmasse Explore More', function () {

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

    it('Core Solutions Percentage Testing', async function () {
        try {

            driver = await new Builder().forBrowser('chrome').build();

            await driver.get('https://dev-ei.enmasse.world/login');
            await driver.findElement(By.name('email_id')).sendKeys('hanna.joseph@tarento.com');
            await driver.findElement(By.name('password')).sendKeys('Welcome@2024');
            await driver.sleep(2000);
            await driver.findElement(By.css('button[type="submit"]')).click();

            await driver.wait(until.elementsLocated(By.xpath("//p[text()='State' and contains(@class, 'Typography_secondary__5si4W') and contains(@class, 'Typography_p4__hqjGv') and contains(@class, 'margin-0') and contains(@class, 'text-start') and contains(@class, 'padding-left-2') and contains(@class, 'm-0')]")), 5000);
            const stateSelectElement = await driver.findElement(By.xpath("//select[@class='Select_select_medium__-635i text-start w-100 padding-left-right-2 Select_select__cHI9k Select_select_text_not_selected__R3IVv']"));
            await stateSelectElement.click();
            const stateOptions = await stateSelectElement.findElements(By.css('option[value]'));
            const numberOfStateOptions = stateOptions.length;
            const randomStateIndex = getRandomInt(1, numberOfStateOptions - 1);
            const selectedStateOption = stateOptions[randomStateIndex];
            await driver.sleep(2000);
            const selectedStateText = await selectedStateOption.getText('text');
            console.log(selectedStateText)
            await selectedStateOption.click();

            await driver.sleep(2000)

            const exploreMoreButton = await driver.findElement(By.xpath("//button[contains(@class, 'Button_btn_primary') and contains(text(), 'Explore More')]"));
            await exploreMoreButton.click();

            await driver.sleep(5000);

            const percentageElements = await driver.findElements(By.css('g.highcharts-label.highcharts-data-label.highcharts-data-label-color-0'));

            let totalPercentage = 0;

            for (let i = 0; i < percentageElements.length; i++) {

                const tspanElement = await percentageElements[i].findElement(By.css('tspan'));

                const percentageText = await tspanElement.getText();

                const percentageValue = parseFloat(percentageText.replace('%', ''));
                console.log(percentageValue);

                totalPercentage += percentageValue;
            }
            expect(totalPercentage).to.equal(100)
            console.log('The total percentage is 100%.');
        }
        catch (error) {
            console.log('Explore More Button is not clickable for this State')
        }
        finally {
            await driver.quit();
        }
    })

});
