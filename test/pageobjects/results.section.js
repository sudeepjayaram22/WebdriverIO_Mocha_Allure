const { assert, expect } = require('chai');
const Page = require('./page');
const { Key } = require('webdriverio');
/**
 * sub page containing specific selectors and methods for a specific page
 */
class ResultsSection extends Page {

    get filtersAppliedSectionXpath() {
        return '//section//ul//li[contains(@class,\'applied\')]'
    }

    get filtersAppliedFlyoutTriggerButton() {
        return $(this.filtersAppliedSectionXpath + '//span[contains(text(),\'filters applied\')]//ancestor::button[@data-marko]')
    }

    get filtersAppliedFlyout() {
        return $(this.filtersAppliedSectionXpath + '//div[contains(@class,\'x-flyout__content\')]')
    }

    get filterAppliedFlyoutItemLabels() {
        return $$(this.filtersAppliedSectionXpath + '//div[contains(@class,\'x-flyout__content\')]//span[contains(@class,\'item-label\')]')
    }

    getresultsSection() {
        return $('//ul[@class=\'srp-results srp-list clearfix\']')
    }
    getresultsList() {
        return this.getresultsSection().$$('//li[@data-viewport and contains(@class,\'s-item\')]')
    }

    async getResultListIndividualTitleText(listElement) {
        return await listElement.$('//a//div[@class=\'s-item__title\']//span[@role=\'heading\']//span').getText()
    }

    async getFilters_FiltersAppliedFlyout() {
        const filtersAppliedListElements = await this.filterAppliedFlyoutItemLabels
        var filtersList = []
        for (let i = 0; i < filtersAppliedListElements.length; i++) {
            let filtersAppliedListElementsText = await filtersAppliedListElements[i].getText()
            filtersList.push(filtersAppliedListElementsText.replace('\nfilter applied', ''))
        }
        return filtersList
    }

    async verifyNumberOfFiltersApplied(tabAndOptionsListMap) {
        const values = tabAndOptionsListMap.values()
        let filterCounter = 0

        for (const [tabName, optionsArray] of tabAndOptionsListMap) {
            for (let j = 0; j < optionsArray.length; j++) {
                filterCounter = filterCounter + 1
            }
        }

        let filtersAppliedFlyoutTriggerButtonText = await this.filtersAppliedFlyoutTriggerButton.getText()
        assert.equal(filtersAppliedFlyoutTriggerButtonText.replace(/[^0-9]/g, ''), "" + filterCounter, "Mismatch in number of Filters Applied")
    }

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
        await browser.keys([Key.Escape])
        await this.filtersAppliedFlyout.waitForDisplayed({ timeout: 1000, reverse: true })
    }
}

module.exports = new ResultsSection();
