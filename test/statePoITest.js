const { Builder, By, until } = require('selenium-webdriver');

describe('Enmasse Login Page', function () {
    this.timeout(180000);

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

    it('PoI value testing of all the States', async function () {
        await driver.findElement(By.name('email_id')).sendKeys('hanna.joseph@tarento.com');
        await driver.findElement(By.name('password')).sendKeys('Welcome@2024')
        await driver.findElement(By.css('button[type="submit"]')).click();

        await driver.wait(until.urlContains('?country=1'), 5000);
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('?country=1');
        console.log('Successful Login');

        await driver.sleep(2000);

        await driver.wait(until.elementLocated(By.xpath("//p[text()='State' and contains(@class, 'Typography_secondary__5si4W') and contains(@class, 'Typography_p4__hqjGv') and contains(@class, 'margin-0') and contains(@class, 'text-start') and contains(@class, 'padding-left-2') and contains(@class, 'm-0')]"
        )), 20000);

        const stateSelectElement = await driver.findElement(By.xpath("//select[@class='Select_select_medium__-635i text-start w-100 padding-left-right-2 Select_select__cHI9k Select_select_text_not_selected__R3IVv']"));
        await stateSelectElement.click();

        const stateOptions = await stateSelectElement.findElements(By.css('option[value]'));

        let totalStatePoISum = 0;

        for (let i = 1; i < stateOptions.length; i++) {
            try {
                await stateSelectElement.click();
                await stateOptions[i].click();
                await driver.sleep(3000);

                const isPoIVisible = await driver.findElements(By.css('#Healthcare.Typography_h5__9b0AM.Typography_dark__92uW-.margin-0.initial'));

                if (isPoIVisible.length > 0) {
                    async function getCleanedValue(elementId) {
                        await driver.wait(until.elementLocated(By.css(`#${elementId}.Typography_h5__9b0AM.Typography_dark__92uW-.margin-0.initial`)), 5000);
                        const element = await driver.findElement(By.css(`#${elementId}.Typography_h5__9b0AM.Typography_dark__92uW-.margin-0.initial`));
                        const text = await element.getText();
                        const cleanedText = text.replace(/[^\d.]/g, '');
                        return parseFloat(cleanedText);
                    }

                    const healthValue = await getCleanedValue('Healthcare');
                    const educationValue = await getCleanedValue('Education');
                    const agricultureValue = await getCleanedValue('Agri_Markets');
                    const financialValue = await getCleanedValue('Financial_Solutions');

                    const totalPoI = healthValue + educationValue + agricultureValue + financialValue;
                    console.log(`Total PoI for state ${i}: ${totalPoI}`);

                    await driver.wait(until.elementLocated(By.css('div.col-12 h1.Typography_h5__9b0AM.Typography_dark__92uW-.margin-0')), 5000);
                    const poiElement = await driver.findElement(By.css('div.col-12 h1.Typography_h5__9b0AM.Typography_dark__92uW-.margin-0'));
                    const poiText = await poiElement.getText();
                    const cleanedPoiText = poiText.replace(/[^\d.]/g, '');
                    const poiValue = parseFloat(cleanedPoiText);
                    console.log(`PoI Value for state ${i}: ${poiValue}`);

                    totalStatePoISum += totalPoI;

                    expect(totalPoI).to.be.equal(poiValue);
                } else {
                    console.log(`PoI is not present for state ${i}`);
                }
            } catch (error) {
                console.error(`Error for state ${i}:`, error);
            }
        }
        console.log(`Total PoI sum across all states: ${totalStatePoISum}`);
    });
});
