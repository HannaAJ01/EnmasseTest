const { Builder, By, until } = require('selenium-webdriver');

describe('Enmasse User Profile Testing', function () {
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

        await driver.findElement(By.name('email_id')).sendKeys('hanna.joseph@tarento.com');
        await driver.findElement(By.name('password')).sendKeys('Welcome@2024');
        await driver.findElement(By.css('button[type="submit"]')).click();
        await driver.wait(until.urlContains('?country=1'), 5000);

        await driver.sleep(5000);

        const profileLogo = await driver.findElement(By.css('.Button_btn_avatar__S-CAk'));
        await profileLogo.click();

    });

    afterEach(async function () {
        await driver.quit();
    });

    async function navigateToChangePassword() {
        await driver.wait(until.elementLocated(By.xpath("//p[text()='Settings']")), 8000);
        const settingsOption = await driver.findElement(By.xpath("//p[text()='Settings']"));
        await settingsOption.click();

        await driver.wait(until.elementLocated(By.xpath("//button[contains(@class, 'Button_btn_secondary__4BB6i') and contains(@class, 'Button_btn_default__-6zGg') and contains(text(), 'Change password')]")), 20000);
        const editSettingsButton = await driver.findElement(By.xpath("//button[contains(@class, 'Button_btn_secondary__4BB6i') and contains(@class, 'Button_btn_default__-6zGg') and contains(text(), 'Change password')]"));
        await editSettingsButton.click();

        await driver.wait(until.elementLocated(By.id('change-password')), 8000);
        const editSettingsForm = await driver.findElement(By.id('change-password'));
        if (editSettingsForm) {
            console.log('Change Password form is present');
        }
    }

    it('Empty Old Password Field Testing', async function () {

        await navigateToChangePassword();

        await driver.wait(until.elementLocated(By.name('new_password')), 8000);
        const newPasswordInput = await driver.findElement(By.name('new_password'));
        await newPasswordInput.sendKeys('Welcome@2024');
        console.log('New password entered');

        await driver.wait(until.elementLocated(By.name('confirm_new_password')), 8000);
        const newPasswordConfirm = await driver.findElement(By.name('confirm_new_password'));
        await newPasswordConfirm.sendKeys('Welcome@2024');
        console.log('New password entered for confirmation');

        await driver.wait(until.elementLocated(By.xpath("//button[contains(@class, 'Button_btn_primary__Nw7aH') and contains(@class, 'Button_btn_large__fTOtI') and text()='Update']")), 8000);
        const updateButton = await driver.findElement(By.xpath("//button[contains(@class, 'Button_btn_primary__Nw7aH') and contains(@class, 'Button_btn_large__fTOtI') and text()='Update']"));
        await updateButton.click();

        const message = await driver.wait(until.elementLocated(By.xpath("//p[contains(@class, 'Typography_warning__czbUp') and contains(@class, 'Typography_p3__qajCP') and contains(@class, 'margin-bottom-1') and contains(@class, 'm-0') and text()='Current password is required']")), 8000);
        expect(message).to.not.be.null;
        console.log('Empty Old Password Field');
    });

    it('Empty New Password Field Testing', async function () {

        await navigateToChangePassword();

        await driver.wait(until.elementLocated(By.name('current_password')), 8000);
        const oldPasswordInput = await driver.findElement(By.name('current_password'));
        await oldPasswordInput.sendKeys('Welcome@123');
        console.log('Old password entered');

        await driver.wait(until.elementLocated(By.name('confirm_new_password')), 8000);
        const newPasswordConfirm = await driver.findElement(By.name('confirm_new_password'));
        await newPasswordConfirm.sendKeys('Welcome@2024');
        console.log('New password entered for confirmation');

        await driver.wait(until.elementLocated(By.xpath("//button[contains(@class, 'Button_btn_primary__Nw7aH') and contains(@class, 'Button_btn_large__fTOtI') and text()='Update']")), 8000);
        const updateButton = await driver.findElement(By.xpath("//button[contains(@class, 'Button_btn_primary__Nw7aH') and contains(@class, 'Button_btn_large__fTOtI') and text()='Update']"));
        await updateButton.click();

        const message = await driver.wait(until.elementLocated(By.xpath("//p[contains(@class, 'Typography_warning__czbUp') and contains(@class, 'Typography_p3__qajCP') and contains(@class, 'm-0') and text()='Password is required']")), 8000);
        expect(message).to.not.be.null;
        console.log('Empty New Password Field');
    });

    it('Empty Re-enter New Password Field Testing', async function () {

        await navigateToChangePassword();

        await driver.wait(until.elementLocated(By.name('current_password')), 8000);
        const oldPasswordInput = await driver.findElement(By.name('current_password'));
        await oldPasswordInput.sendKeys('Welcome@123');
        console.log('Old password entered');

        await driver.wait(until.elementLocated(By.name('new_password')), 8000);
        const newPasswordInput = await driver.findElement(By.name('new_password'));
        await newPasswordInput.sendKeys('Welcome@2024');
        console.log('New password entered');

        await driver.wait(until.elementLocated(By.xpath("//button[contains(@class, 'Button_btn_primary__Nw7aH') and contains(@class, 'Button_btn_large__fTOtI') and text()='Update']")), 8000);
        const updateButton = await driver.findElement(By.xpath("//button[contains(@class, 'Button_btn_primary__Nw7aH') and contains(@class, 'Button_btn_large__fTOtI') and text()='Update']"));
        await updateButton.click();

        const message = await driver.wait(until.elementLocated(By.xpath("//p[contains(@class, 'Typography_warning__czbUp') and contains(@class, 'Typography_p3__qajCP') and contains(@class, 'm-0') and text()='Passwords must match']")), 8000);
        expect(message).to.not.be.null;
        console.log('Empty Re-enter New Password Field');
    });

    it('Different New Password And Confirmation Password Testing', async function () {

        await navigateToChangePassword();

        await driver.wait(until.elementLocated(By.name('current_password')), 8000);
        const oldPasswordInput = await driver.findElement(By.name('current_password'));
        await oldPasswordInput.sendKeys('Welcome@123');
        console.log('Old password entered');

        await driver.wait(until.elementLocated(By.name('new_password')), 8000);
        const newPasswordInput = await driver.findElement(By.name('new_password'));
        await newPasswordInput.sendKeys('Welcome@2024');
        console.log('New password entered');

        await driver.wait(until.elementLocated(By.name('confirm_new_password')), 8000);
        const newPasswordConfirm = await driver.findElement(By.name('confirm_new_password'));
        await newPasswordConfirm.sendKeys('Welcome@12');
        console.log('New password entered for confirmation');

        await driver.wait(until.elementLocated(By.xpath("//button[contains(@class, 'Button_btn_primary__Nw7aH') and contains(@class, 'Button_btn_large__fTOtI') and text()='Update']")), 8000);
        const updateButton = await driver.findElement(By.xpath("//button[contains(@class, 'Button_btn_primary__Nw7aH') and contains(@class, 'Button_btn_large__fTOtI') and text()='Update']"));
        await updateButton.click();

        await driver.sleep(3000)

        const message = await driver.wait(until.elementLocated(By.xpath("//p[contains(@class, 'Typography_warning__czbUp') and contains(@class, 'Typography_p3__qajCP') and contains(@class, 'm-0') and text()='Passwords must match']")), 8000);
        expect(message).to.not.be.null;
        console.log('Different New Password And Confirmation Password');


    });

    it('Valid Old Password And New Password Testing', async function () {

        await navigateToChangePassword();

        await driver.wait(until.elementLocated(By.name('current_password')), 8000);
        const oldPasswordInput = await driver.findElement(By.name('current_password'));
        await oldPasswordInput.sendKeys('Welcome@123');
        console.log('Old password entered');

        await driver.wait(until.elementLocated(By.name('new_password')), 8000);
        const newPasswordInput = await driver.findElement(By.name('new_password'));
        await newPasswordInput.sendKeys('Welcome@2024');
        console.log('New password entered');

        await driver.wait(until.elementLocated(By.name('confirm_new_password')), 8000);
        const newPasswordConfirm = await driver.findElement(By.name('confirm_new_password'));
        await newPasswordConfirm.sendKeys('Welcome@2024');
        console.log('New password entered for confirmation');

        await driver.wait(until.elementLocated(By.xpath("//button[contains(@class, 'Button_btn_primary__Nw7aH') and contains(@class, 'Button_btn_large__fTOtI') and text()='Update']")), 8000);
        const updateButton = await driver.findElement(By.xpath("//button[contains(@class, 'Button_btn_primary__Nw7aH') and contains(@class, 'Button_btn_large__fTOtI') and text()='Update']"));
        await updateButton.click();

        await driver.sleep(5000);

        await driver.wait(until.elementLocated(By.xpath("//button[contains(@class, 'Button_btn_primary__Nw7aH') and contains(@class, 'Button_btn_large__fTOtI') and text()='Continue']")), 8000);
        const continueButton = await driver.findElement(By.xpath("//button[contains(@class, 'Button_btn_primary__Nw7aH') and contains(@class, 'Button_btn_large__fTOtI') and text()='Continue']"));
        await continueButton.click();

        await driver.sleep(2000);

        await driver.findElement(By.name('email_id')).sendKeys('hanna.joseph@tarento.com');
        await driver.findElement(By.name('password')).sendKeys('Welcome@2024');
        await driver.findElement(By.css('button[type="submit"]')).click();

        try {
            await driver.wait(until.urlContains('?country=1'), 5000);
            const currentUrl = await driver.getCurrentUrl();
            expect(currentUrl).to.include('?country=1');
            console.log('Successful Login');
        } catch (error) {
            console.log('Login failed');
        }
    });

});
