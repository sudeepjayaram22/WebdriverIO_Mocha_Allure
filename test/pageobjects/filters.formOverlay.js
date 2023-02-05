

const { assert } = require('chai');
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class FiltersFormOverlay extends Page {

    filterFormXPath = "//form[@id=\'x-overlay__form\']"
    applyButtonName = "Apply"
    cancelButtonName = "Cancel"

    getLeftPanelTab(tabName) {
        return $(this.filterFormXPath + '//span[text()=\'' + tabName + '\']/ancestor::div[@role=\'tab\']')
    }
    getRightPanelItem(option) {
        return $('//div[@role=\'tabpanel\']//span[text()=\'' + option + '\']//ancestor::span[@class=\'field\']')
    }

    async selectLeftPanelTab(tabName) {
        await this.getLeftPanelTab(tabName).click()
        assert.isTrue(await this.getLeftPanelTab(tabName).getAttribute("aria-selected") === 'true', "Failed to select " + tabName + " tab in the Left Panel of Filter Overlay")
    }

    async selectCheckboxItemsRightPanel(optionsArray) {
        for (let i = 0; i < optionsArray.length; i++) {
            await this.getRightPanelItem(optionsArray[i]).click()
            try { await this.getRightPanelItem(optionsArray[i]).getAttribute('checked') } catch (exception) {
                await assert.fail("Failed to check " + optionsArray[i] + " option in the ride side panel of Filter ovelay")
            }
        }
    }

    async enterTextboxInRightPanel(optionsArray) {
        const priceRange = optionsArray[0].split('-')
        await $('//div[@class=\'x-textrange\']//input[contains(@aria-label,\'Minimum Value\')]').setValue(priceRange[0].replace("$", ""))
        await $('//div[@class=\'x-textrange\']//input[contains(@aria-label,\'Maximum Value\')]').setValue(priceRange[1].replace("$", ""))
    }

    getFooterButton(buttonName) {
        return $('//button[@aria-label=\'' + buttonName + '\']')
    }

    async filterOptionsAndClickApplyButton(tabAndOptionsListMap) {
        for (const [tabName, optionsArray] of tabAndOptionsListMap) {
            await this.selectLeftPanelTab(tabName)
            if (tabName === 'Price') {
                await this.enterTextboxInRightPanel(optionsArray)
            } else {
                await this.selectCheckboxItemsRightPanel(optionsArray)
            }
        }
        const applyButton = await this.getFooterButton(this.applyButtonName)
        await assert.isTrue(await applyButton.isEnabled(), "Apply button is not enabled")
        await applyButton.click()
        await applyButton.waitForExist({ reverse: true, timeout: 5000 })
    }
}

module.exports = new FiltersFormOverlay();
