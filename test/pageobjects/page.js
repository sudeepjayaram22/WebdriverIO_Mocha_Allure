const { default: AllureReporter } = require("@wdio/allure-reporter")
const { assert } = require("chai")

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
    * Initializes, sets up browser properties and navigates to mentioned url
    * @param url path of application under test (e.g. https://www.ebay.com)
    * @param pageLoadTimeout time in milliseconds (e.g. 30000)
    */
    async initializeAndNavigate(url, pageLoadTimeout) {
        await browser.maximizeWindow()
        await browser.setTimeout({ 'pageLoad': pageLoadTimeout })
        await browser.navigateTo(url)
        try {
            const acceptButtonObject = await browser.$('button#gdpr-banner-accept')
            await acceptButtonObject.waitForDisplayed({ timeout: 3000 })
            await acceptButtonObject.click()
        } catch (exception) {
            AllureReporter.addStep("Handling banner section in the welcome page by accepting cookies\n" + exception)
        }
    }

    /**
    * Waits for the page element to be displayed
    * @param pageElement page element to be waited for (e.g. $('#loginButton'))
    */
    async waitForDisplayed(pageElement) {
        assert.isTrue(await pageElement.waitForDisplayed({ timeout: 10000 }), "Failed due to a problem in loading page")
    }
}