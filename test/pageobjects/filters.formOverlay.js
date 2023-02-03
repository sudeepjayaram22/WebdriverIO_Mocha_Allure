

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

    selectLeftPanelTab(tabName) {
        this.getLeftPanelTab(tabName).click()
        assert.isTrue(this.getLeftPanelTab(tabName).getAttribute("aria-selected"), "Failed to select " + tabName + " tab in the Left Panel of Filter Overlay")
    }

    selectRightPanelItems(optionsArray) {
        optionsArray.array.forEach(option => {
            this.getRightPanelItem(option).click()
            try { this.getRightPanelItem(option).getAttribute('checked') } catch (exception) {
                assert.fail("Failed to check " + option + " option in the ride side panel of Filter ovelay")
            }
        });
    }



    getFooterButton(buttonName) {
        return $('//button[@aria-label=\'' + buttonName + '\']')
    }

    filterOptionsAndClickApplyButton(tabAndOptionsListMap) {
        for (const [tabName, optionsArray] of tabAndOptionsListMap.entries()) {
            selectLeftPanelTab(tabName)
            this.selectRightPanelItems(optionsArray)
        }
        this.getFooterButton(this.applyButtonName).click()
        this.getFooterButton(this.applyButtonName).waitForExist({ reverse: true, timeout: 5000 })
    }

}

module.exports = new FiltersFormOverlay();
