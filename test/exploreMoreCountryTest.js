const { Builder, By, until } = require('selenium-webdriver');

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

    it('Exploring more on States in India', async function () {
        try {
            driver = await new Builder().forBrowser('chrome').build();

            await driver.get('https://dev-ei.enmasse.world/login');
            await driver.findElement(By.name('email_id')).sendKeys('hanna.joseph@tarento.com');
            await driver.findElement(By.name('password')).sendKeys('Welcome@2024');
            await driver.sleep(2000);
            await driver.findElement(By.css('button[type="submit"]')).click();

            await driver.sleep(3000)

            const exploreMoreButton = await driver.findElement(By.css("button.Button_btn_primary__Nw7aH.Button_btn_small__JRmxp.w-100"));
            await driver.sleep(2000);
            await exploreMoreButton.click();

            await driver.sleep(5000);

            const rows = await driver.findElements(By.css('tr.bg-light-grey'));

            const randomIndex = Math.floor(Math.random() * rows.length);
            const randomRow = rows[randomIndex];

            const cells = await randomRow.findElements(By.css('td'));
            for (let i = 0; i < cells.length; i++) {
                const cellText = await cells[i].getText();
                console.log(`Cell ${i + 1} Text: ${cellText}`);
            }

            const stateName = await cells[0].getText();
            const eh = await cells[2].getText();
            const tam = await cells[3].getText();
            const poi = await cells[4].getText();
            const stateElement = await driver.findElement(By.xpath(`//td[contains(text(), '${stateName}')]`));
            await stateElement.click();

            await driver.sleep(3000)

            const TAM = await driver.wait(until.elementLocated(By.css('.Typography_h5__9b0AM.Typography_white__Z5rr5.margin-0')), 10000);
            const tamText = await TAM.getText();
            await driver.sleep(2000)
            console.log(tamText);
            expect(tamText).to.include(`${tam}`);

            const EHText = await driver.findElement(By.css("div.col-sm-12.col-md-12.col-lg-6.col-xl-6.d-flex.align-items-start.justify-content-center.text-start > h1.Typography_h5__9b0AM")).getText();
            console.log(EHText)
            expect(EHText).to.include(`${eh}`)

            if (poi != '--') {
                const POIText = await driver.findElement(By.css("div.col-12.col-sm-6.col-md-6.col-lg-9.col-xl-9.d-flex.align-items-start.justify-content-center.text-start.padding-top-bottom-2 > h1.Typography_h5__9b0AM")).getText();
                console.log(POIText)
                expect(POIText).to.include(`${poi}`)
            } else {
                console.log('POI is not present for this state')
            }
        }
        finally {
            await driver.quit();
        }
    })
})
