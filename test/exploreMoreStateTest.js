const { Builder, By, until, error } = require('selenium-webdriver');

describe('Enmasse Explore More', function () {

    this.timeout(120000);

    let driver;
    let expect;

    before(async function () {
        const chai = await import('chai');
        expect = chai.expect;
    });

    it('Exploring more on districts of a particular State in India', async function () {
        try {

            driver = await new Builder().forBrowser('chrome').build();

            await driver.get('https://dev-ei.enmasse.world/login');
            await driver.findElement(By.name('email_id')).sendKeys('hanna.joseph@tarento.com');
            await driver.findElement(By.name('password')).sendKeys('Welcome@2024');
            await driver.sleep(2000);
            await driver.findElement(By.css('button[type="submit"]')).click();

            await driver.wait(until.elementLocated(By.xpath("//p[text()='State' and contains(@class, 'Typography_secondary__5si4W') and contains(@class, 'Typography_p4__hqjGv') and contains(@class, 'margin-0') and contains(@class, 'text-start') and contains(@class, 'padding-left-2') and contains(@class, 'm-0')]"
            )), 20000);

            const stateSelectElement = await driver.findElement(By.xpath("//select[@class='Select_select_medium__-635i text-start w-100 padding-left-right-2 Select_select__cHI9k Select_select_text_not_selected__R3IVv']"));
            await stateSelectElement.click();


            const stateOptions = await stateSelectElement.findElements(By.xpath("//option[contains(text(), 'Karnataka')]"), 5000);
            await stateOptions[0].click();

            await driver.sleep(5000)

            const exploreMoreButton = await driver.findElement(By.xpath("//button[contains(@class, 'Button_btn_primary') and contains(text(), 'Explore More')]"));
            await exploreMoreButton.click();

            await driver.sleep(5000);

            const rows = await driver.findElements(By.css('tr.bg-light-grey'));

            const randomIndex = Math.floor(Math.random() * rows.length);
            const randomRow = rows[randomIndex];

            const cells = await randomRow.findElements(By.css('td'));
            for (let i = 0; i < cells.length; i++) {
                const cellText = await cells[i].getText();
                console.log(`Column ${i + 1} Text: ${cellText}`);
            }

            const districtName = await cells[0].getText();
            const eh = await cells[2].getText();
            const tam = await cells[3].getText();
            const poi = await cells[4].getText();
            const districtElement = await driver.findElement(By.xpath(`//td[contains(text(), '${districtName}')]`));
            await districtElement.click();

            await driver.sleep(3000)

            const TAM = await driver.wait(until.elementLocated(By.css('.Typography_h5__9b0AM.Typography_white__Z5rr5.margin-0')), 10000);
            const tamText = await TAM.getText();
            await driver.sleep(2000)
            console.log(tamText);
            expect(tamText).to.include(`${tam}`);
            console.log('TAM value is correct')

            const EHText = await driver.findElement(By.css("div.col-sm-12.col-md-12.col-lg-6.col-xl-6.d-flex.align-items-start.justify-content-center.text-start > h1.Typography_h5__9b0AM")).getText();
            console.log(EHText)
            expect(EHText).to.include(`${eh}`)
            console.log('EH value is correct')

            if (poi != '--') {
                const POIText = await driver.findElement(By.css("div.col-12.col-sm-6.col-md-6.col-lg-9.col-xl-9.d-flex.align-items-start.justify-content-center.text-start.padding-top-bottom-2 > h1.Typography_h5__9b0AM")).getText();
                console.log(POIText)
                expect(POIText).to.include(`${poi}`)
            } else {
                console.log('POI is not present for this state')
            }
        }
        catch {
            (error)
            console.log('The Explore More button is not clickable.');
        }
        finally {
            await driver.quit();
        }
    });
});