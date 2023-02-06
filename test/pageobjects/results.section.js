const { assert, expect } = require('chai');
const Page = require('./page');
const { Key } = require('webdriverio');

/**
 *  Results Section Page containing specific selectors and methods for interacting with objects 
 */
class ResultsSection extends Page {

    /**
    * Method name: get filtersAppliedSectionXpath
    * Description: Returns the xpath of the section containing the applied filters
    * 
    * @returns {String} The xpath of the section containing the applied filters
    */
    get filtersAppliedSectionXpath() {
        return '//section//ul//li[contains(@class,\'applied\')]'
    }

    /**
     * Method name: get filtersAppliedFlyoutTriggerButton
     * Description: Returns the trigger button element of the filters applied flyout
     * 
     * @returns {WebElement} The trigger button element of the filters applied flyout
     */
    get filtersAppliedFlyoutTriggerButton() {
        return $(this.filtersAppliedSectionXpath + '//span[contains(text(),\'filters applied\')]//ancestor::button[@data-marko]')
    }

    /**
     * Method name: get filtersAppliedFlyout
     * Description: Returns the flyout element containing the filters that have been applied
     * 
     * @returns {WebElement} The flyout element containing the filters that have been applied
     */
    get filtersAppliedFlyout() {
        return $(this.filtersAppliedSectionXpath + '//div[contains(@class,\'x-flyout__content\')]')
    }

    /**
     * Method name: get filterAppliedFlyoutItemLabels
     * Description: Returns an array of elements containing the labels of the filters that have been applied
     * 
     * @returns {Array of WebElements} An array of elements containing the labels of the filters that have been applied
     */
    get filterAppliedFlyoutItemLabels() {
        return $$(this.filtersAppliedSectionXpath + '//div[contains(@class,\'x-flyout__content\')]//span[contains(@class,\'item-label\')]')
    }

    /**
     * Method name: getresultsSection
     * Description: Returns the element of the section that contains the results of a search
     * 
     * @returns {WebElement} The element of the section that contains the results of a search
     */
    getResultsSection() {
        return $('//ul[@class=\'srp-results srp-list clearfix\']')
    }

    /**
     * Method name: getresultsList
     * Description: Returns an array of elements representing individual items in the results list
     * 
     * @returns {Array of WebElements} An array of elements representing individual items in the results list
     */
    getResultsList() {
        return this.getResultsSection().$$('//li[@data-viewport and contains(@class,\'s-item\')]')
    }

    /**
     * Method name: getResultListIndividualTitleText
     * Description: Returns the text of the title of an individual item in the results list
     * 
     * @param {WebElement} listElement - The element representing an individual item in the results list
     * 
     * @returns {String} The text of the title of an individual item in the results list
     */
    async getResultListIndividualTitleText(listElement) {
        return await listElement.$('//a//div[@class=\'s-item__title\']//span[@role=\'heading\']//span').getText()
    }


    /**
    getFilters_FiltersAppliedFlyout - method to get the list of filters applied in the flyout
    @return {Array} filtersList - an array containing the list of filters applied in the flyout
    */
    async getFilters_FiltersAppliedFlyout() {
        const filtersAppliedListElements = await this.filterAppliedFlyoutItemLabels
        var filtersList = []
        for (let i = 0; i < filtersAppliedListElements.length; i++) {
            let filtersAppliedListElementsText = await filtersAppliedListElements[i].getText()
            filtersList.push(filtersAppliedListElementsText.replace('\nfilter applied', ''))
        }
        return filtersList
    }

    /**
    verifyNumberOfFiltersApplied - method to verify the number of filters applied with the expected number of filters
    @param {Map} tabAndOptionsListMap - map containing the tab name and its corresponding options list
    */
    async verifyNumberOfFiltersApplied(tabAndOptionsListMap) {
        let filterCounter = 0
        for (const [tabName, optionsArray] of tabAndOptionsListMap) {
            for (let j = 0; j < optionsArray.length; j++) {
                filterCounter = filterCounter + 1
            }
        }

        let filtersAppliedFlyoutTriggerButtonText = await this.filtersAppliedFlyoutTriggerButton.getText()
        assert.equal(filtersAppliedFlyoutTriggerButtonText.replace(/[^0-9]/g, ''), "" + filterCounter, "Mismatch in number of Filters Applied")
    }

    /**
    verifyFiltersApplied - method to verify the filters applied with the expected filters applied
    @param {Map} filtersAppliedMap - map containing the tab name and its corresponding options list applied
    */
    async verifyFiltersApplied(filtersAppliedMap) {
        await this.filtersAppliedFlyoutTriggerButton.click()
        await this.filtersAppliedFlyout.waitForDisplayed({ timeout: 1000 })
        var appliedFiltersList = await this.getFilters_FiltersAppliedFlyout()
        let j = 0
        for (const [tabName, optionsArray] of filtersAppliedMap) {
            for (; j < optionsArray.length; j++) {
                let expectedFilterAppliedStr = tabName + ": " + optionsArray[j]
                assert.equal(appliedFiltersList[j], expectedFilterAppliedStr, "Mismatch in Filters Applied")
            }
        }
        await browser.$('.srp-mask--display').click()
        await this.filtersAppliedFlyout.waitForDisplayed({ timeout: 1000, reverse: true })
    }
}
module.exports = new ResultsSection();