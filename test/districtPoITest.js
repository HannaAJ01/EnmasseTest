const { Builder, By, until } = require('selenium-webdriver');

describe('Enmasse Home Page', function () {
    this.timeout(300000);

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

    it('PoI value testing of all the Districts of a particular State', async function () {
        await driver.findElement(By.name("email_id")).sendKeys('hanna.joseph@tarento.com');
        await driver.findElement(By.name("password")).sendKeys('Welcome@2024');
        await driver.findElement(By.css('button[type="submit"]')).click();

        await driver.wait(until.urlContains('?country=1'), 5000);
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('?country=1');
        console.log('Successful Login');

        await driver.wait(until.elementLocated(By.xpath("//p[text()='State' and contains(@class, 'Typography_secondary__5si4W') and contains(@class, 'Typography_p4__hqjGv') and contains(@class, 'margin-0') and contains(@class, 'text-start') and contains(@class, 'padding-left-2') and contains(@class, 'm-0')]"
        )), 20000);

        const stateSelectElement = await driver.findElement(By.xpath("//select[@class='Select_select_medium__-635i text-start w-100 padding-left-right-2 Select_select__cHI9k Select_select_text_not_selected__R3IVv']"));
        await stateSelectElement.click();


        const stateOptions = await stateSelectElement.findElements(By.xpath("//option[contains(text(), 'Karnataka')]"), 5000);
        await stateOptions[0].click();

        await driver.sleep(3000)

        await driver.wait(until.elementLocated(By.xpath("//p[text()='District' and contains(@class, 'Typography_secondary__5si4W') and contains(@class, 'Typography_p4__hqjGv') and contains(@class, 'margin-0') and contains(@class, 'text-start') and contains(@class, 'padding-left-2') and contains(@class, 'm-0')]")), 20000);

        const districtSelectElement = await driver.findElement(By.xpath("//select[@class='Select_select_medium__-635i text-start w-100 padding-left-right-2 Select_select__cHI9k Select_select_text_not_selected__R3IVv']"));
        await districtSelectElement.click();

        const districtOptions = await districtSelectElement.findElements(By.css('option[value]'));

        for (let i = 1; i < districtOptions.length; i++) {
            try {
                await districtSelectElement.click();
                await districtOptions[i].click();
                await driver.sleep(3000)

                const isPoIVisible = await driver.findElements(By.css('#Healthcare.Typography_h5__9b0AM.Typography_dark__92uW-.margin-0.initial'));

                if (isPoIVisible.length > 0) {
                    async function getCleanedValue(elementId) {
                        await driver.wait(until.elementLocated(By.css(`#${elementId}.Typography_h5__9b0AM.Typography_dark__92uW-.margin-0.initial`)), 5000);
                        const element = await driver.findElement(By.css(`#${elementId}.Typography_h5__9b0AM.Typography_dark__92uW-.margin-0.initial`));
                        const text = await element.getText();
                        const cleanedText = text.replace(/[^\d.]/g, '');
                        return parseFloat(cleanedText)
                    }

                    const healthValue = await getCleanedValue('Healthcare');
                    const educationValue = await getCleanedValue('Education');
                    const agricultureValue = await getCleanedValue('Agri_Markets');
                    const financialValue = await getCleanedValue('Financial_Solutions');

                    const totalPoI = healthValue + educationValue + agricultureValue + financialValue;
                    console.log(`Total PoI for district ${i}: ${totalPoI}`);

                    await driver.wait(until.elementLocated(By.css('div.col-12.col-sm-6.col-md-6.col-lg-9.col-xl-9.d-flex.flex-column.align-items-start.justify-content-center.text-start.padding-top-bottom-2 > h1')), 5000);
                    const poiElement = await driver.findElement(By.css('div.col-12.col-sm-6.col-md-6.col-lg-9.col-xl-9.d-flex.flex-column.align-items-start.justify-content-center.text-start.padding-top-bottom-2 > h1'));
                    const poiText = await poiElement.getText();
                    const cleanedPoiText = poiText.replace(/[^\d.]/g, '');
                    const poiValue = parseFloat(cleanedPoiText);
                    console.log(`PoI Value for district ${i}: ${poiValue}`);

                    expect(totalPoI).to.be.equal(poiValue);
                } else {
                    console.log(`PoI is not present for district ${i}`);
                }
            } catch (error) {
                console.error(`Error for district ${i}:`, error);
            }
        }
    });
});
