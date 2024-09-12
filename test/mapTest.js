const { Builder, By, until } = require('selenium-webdriver');

describe('Enmasse Map', function () {
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

    it('Map Testing of state and district', async function () {
        try {
            driver = await new Builder().forBrowser('chrome').build();

            await driver.get('https://dev-ei.enmasse.world/login');

            await driver.findElement(By.name('email_id')).sendKeys('hanna.joseph@tarento.com');
            await driver.findElement(By.name('password')).sendKeys('Welcome@2024');
            await driver.sleep(2000);
            await driver.findElement(By.css('button[type="submit"]')).click();

            await driver.wait(until.elementLocated(By.xpath("//p[text()='State' and contains(@class, 'Typography_secondary__5si4W') and contains(@class, 'Typography_p4__hqjGv') and contains(@class, 'margin-0') and contains(@class, 'text-start') and contains(@class, 'padding-left-2') and contains(@class, 'm-0')]"
            )), 20000);

            let stateSelectElement = await driver.findElement(By.xpath("//select[@class='Select_select_medium__-635i text-start w-100 padding-left-right-2 Select_select__cHI9k Select_select_text_not_selected__R3IVv']"));
            await stateSelectElement.click();

            const stateOptions = await stateSelectElement.findElements(By.css('option[value]'));
            const numberOfStateOptions = stateOptions.length;
            const randomStateIndex = getRandomInt(1, numberOfStateOptions - 1);
            const selectedStateOption = stateOptions[randomStateIndex];
            const selectedStateValue = await selectedStateOption.getAttribute('value');
            const selectedStateText = await selectedStateOption.getText('text');
            await driver.sleep(2000);
            await selectedStateOption.click();

            await driver.sleep(5000);

            const stateUrl = await driver.getCurrentUrl();
            expect(stateUrl).to.include(`state=${selectedStateValue}`);
            console.log(`Selected state: ${selectedStateText}`);
            console.log(stateUrl.includes(`state=${selectedStateValue}`) ? "State's map is correct" : "State's map is not correct");

            await driver.sleep(2000)

            await driver.wait(until.elementLocated(By.xpath("//p[text()='District' and contains(@class, 'Typography_secondary__5si4W') and contains(@class, 'Typography_p4__hqjGv') and contains(@class, 'margin-0') and contains(@class, 'text-start') and contains(@class, 'padding-left-2') and contains(@class, 'm-0')]")), 20000);

            let districtSelectElement = await driver.findElement(By.xpath("//select[@class='Select_select_medium__-635i text-start w-100 padding-left-right-2 Select_select__cHI9k Select_select_text_not_selected__R3IVv']"));
            await districtSelectElement.click();

            const districtOptions = await districtSelectElement.findElements(By.css('option[value]'));
            const numberOfDistrictOptions = districtOptions.length;

            const randomDistrictIndex = getRandomInt(1, numberOfDistrictOptions - 1);
            const selectedDistrictOption = districtOptions[randomDistrictIndex];
            const selectedDistrictValue = await selectedDistrictOption.getAttribute('value');
            const selectedDistrictText = await selectedDistrictOption.getText();
            await driver.sleep(2000);
            await selectedDistrictOption.click();

            await driver.sleep(3000);

            const districtUrl = await driver.getCurrentUrl();
            expect(districtUrl).to.include(`district=${selectedDistrictValue}`);
            console.log(`Selected district: ${selectedDistrictText}`);
            console.log(districtUrl.includes(`district=${selectedDistrictValue}`) ? "District's map is correct" : "District's map is not correct");

            const breadcrumbItem2 = await driver.findElement(By.xpath(`//li[@class="breadcrumb-item d-flex align-items-center inactive"]//p[text()="${selectedStateText}"]`));
            await breadcrumbItem2.click();
            await driver.sleep(2000)

            const titleFinder2 = await driver.wait(until.elementLocated(By.css('.Typography_h4__U2845.Typography_dark__92uW-.margin-top-bottom-0')));
            const title2 = await titleFinder2.getText()
            console.log(title2)
            await driver.sleep(3000)

            expect(title2).to.include(selectedStateText)
            if (title2 === selectedStateText) {
                console.log("Correct State Map")
            }
            else {
                console.log("Wrong State Map")
            }

            const breadcrumbItem1 = await driver.findElement(By.xpath('//li[@class="breadcrumb-item d-flex align-items-center inactive"]//p[text()="India"]'), 3000);
            await breadcrumbItem1.click();
            await driver.sleep(2000)

            const titleFinder1 = await driver.wait(until.elementLocated(By.css('.Typography_h4__U2845.Typography_dark__92uW-.margin-top-bottom-0')));
            const title1 = await titleFinder1.getText()
            console.log(title1)
            await driver.sleep(3000)

            expect(title1).to.include('India');
            if (title1.includes('India')) {
                console.log('Correct Country Map')
            }
            else {
                console.log('Wrong Country Map')
            }
            await driver.sleep(3000)
            const exploreMoreButton = await driver.findElement(By.xpath("//button[contains(@class, 'Button_btn_primary') and contains(text(), 'Explore More')]"))
            await exploreMoreButton.click();
            await driver.sleep(3000)

            const logo = await driver.findElement(By.css('div.d-flex.margin-left-right-4.align-items-center img.cursor-pointer.margin-left-0.logo-height'))
            await logo.click();
        }
        finally {
            await driver.quit();
        }
    });
});
