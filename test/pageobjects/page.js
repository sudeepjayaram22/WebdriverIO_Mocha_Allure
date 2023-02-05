const { default: AllureReporter } = require("@wdio/allure-reporter")
const { assert } = require("chai")

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    async initializeAndNavigate(path, pageLoadTimeout) {
        await browser.maximizeWindow()
        await browser.setTimeout({ 'pageLoad': pageLoadTimeout })
        await browser.navigateTo(path)
        try {
            const acceptButtonObject = await browser.$('button#gdpr-banner-accept')
            await acceptButtonObject.waitForDisplayed({ timeout: 3000 })
            await acceptButtonObject.click()
        } catch (exception) {
            AllureReporter.addStep("Handling banner section in the welcome page by accepting cookies\n" + exception)
        }
    }

    async waitForDisplayed(pageElement) {
        try { await pageElement.waitForDisplayed({ timeout: 10000 }) } catch (exception) {
            AllureReporter.addStep(exception)
            AllureReporter.addIssue(exception)
        }
        // assert.isTrue(await pageElement.waitForDisplayed({ timeout: 10000 }), "Failed due to a problem in loading page")
    }

    feedBreadCrumbArray(arr) {
        var loadedArray = []
        arr.forEach(element => {
            loadedArray.push(element)
        });
        return loadedArray
    }

    acceptAllCookiesInBanner() {
        try {
            const acceptButtonObject = browser.$('button#gdpr-banner-accept')
            acceptButtonObject.waitForDisplayed({ timeout: 3000 })
            acceptButtonObject.click()
        } catch (exception) {
            AllureReporter.addStep("Handling banner section in the welcome page by accepting cookies\n" + exception)
        }
    }
}
