const { assert } = require('chai');
const Page = require('./page');

/**
 * Filters form overlay window considered as page containing specific selectors and methods for interacting & operating with objects 
 */
class FiltersFormOverlay extends Page {
    filterFormXPath = "//form[@id=\'x-overlay__form\']"

    //Button Enumerations which can be passed as paramter to getFooterButton(buttonName) method
    applyButtonName = "Apply"
    cancelButtonName = "Cancel"

    /**
   * Gets the Left Panel Tab Element from Filters Form Overlay 
   * @param tabName name of the tab intedended to operate on(e.g. "Screen Size")
   * @returns DOM-element found by the given selector
   */
    getLeftPanelTab(tabName) {
        return $(this.filterFormXPath + '//span[text()=\'' + tabName + '\']/ancestor::div[@role=\'tab\']')
    }

    /**
   * Gets the Right Panel Filter Option Element from Filters Form Overlay 
   * @param option name of the option provided in the right panel to operate on(e.g. "5.0 - 5.4 in" of the Screen Size tab)
   * @returns DOM-element found by the given selector
   */
    getRightPanelItem(option) {
        return $('//div[@role=\'tabpanel\']//span[text()=\'' + option + '\']//ancestor::span[@class=\'field\']')
    }

    /**
   * Selects the Left Panel Tab Element from Filters Form Overlay and asserts if the tab is selected
   * @param tabName name of the tab intedended to operate on(e.g. "Screen Size")
   */
    async selectLeftPanelTab(tabName) {
        await this.getLeftPanelTab(tabName).click()
        assert.isTrue(await this.getLeftPanelTab(tabName).getAttribute("aria-selected") === 'true', "Failed to select " + tabName + " tab in the Left Panel of Filter Overlay")
    }

    /**
     * Selects the Checkbox options in the Right Panel in Form Overlay and asserts if the option was checked
     * @param optionsArray array of check box option names(e.g. ["5.0 - 5.4 in","5.5 - 5.9 in"]])
     */
    async selectCheckboxItemsRightPanel(optionsArray) {
        for (let i = 0; i < optionsArray.length; i++) {
            await this.getRightPanelItem(optionsArray[i]).click()
            try { await this.getRightPanelItem(optionsArray[i]).getAttribute('checked') } catch (exception) {
                await assert.fail("Failed to check " + optionsArray[i] + " option in the ride side panel of Filter ovelay")
            }
        }
    }

    /**
     * Enter the Price range for the Price filter in the Right Panel
     * @param optionsArray array of minmum and maximum price rand to enter in the input textbox(e.g. ["5.0 - 5.4 in","5.5 - 5.9 in"])
     */
    async enterPriceRangeInTextboxRightPanel(optionsArray) {
        const priceRange = optionsArray[0].split('-')
        await $('//div[@class=\'x-textrange\']//input[contains(@aria-label,\'Minimum Value\')]').setValue(priceRange[0].replace("$", ""))
        await $('//div[@class=\'x-textrange\']//input[contains(@aria-label,\'Maximum Value\')]').setValue(priceRange[1].replace("$", ""))
    }

    /**
     * Gets the Apply/Cancel button element in the footer section of Filter Form Overlay
     * @param buttonName in the footer section (e.g. "Apply")
     */
    getFooterButton(buttonName) {
        return $('//button[@aria-label=\'' + buttonName + '\']')
    }

    /**
    *  Main method used to apply all the filters based on the input Map object which holds tabName as the Key and array of String options as Value 
    *  also clicks on Apply button and waits for the filter form overlay to disappear
    * @param tabAndOptionsListMap Map object which holds tabName as the 'Key' and array of String options as 'Value' 
    */
    async filterOptionsAndClickApplyButton(tabAndOptionsListMap) {
        for (const [tabName, optionsArray] of tabAndOptionsListMap) {
            await this.selectLeftPanelTab(tabName)
            if (tabName === 'Price') {
                await this.enterPriceRangeInTextboxRightPanel(optionsArray)
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