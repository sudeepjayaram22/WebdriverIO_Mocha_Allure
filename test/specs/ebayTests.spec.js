const { expect } = require('chai');
const FiltersFormOverlay = require('../pageobjects/filters.formOverlay')
const { default: AllureReporter } = require('@wdio/allure-reporter');
const mainPage = require('../pageobjects/main.page');
const categoryPage = require('../pageobjects/category.page');
const filtersFormOverlay = require('../pageobjects/filters.formOverlay');
const resultsSection = require('../pageobjects/results.section');
const { initializeAndNavigate } = require('../pageobjects/main.page');

describe('EBay Test Suite', () => {
    before(async () => {
        await initializeAndNavigate(await config.url, 15000)
    });

    describe('TestCaseID001 - Access a Product via category after applying multiple filters', () => {
        let categorySection = "Electronics"
        let categoryMenuItem = "Cell Phones, Smart Watches & Accessories"
        let categoryIntendedItem = "Cell Phones & Smartphones"
        var breadCrumbArray = [];

        it('should verify the product search is successful with multiple filters & category applied', async () => {

            await mainPage.selectMenuItemFromShopByCategory(categorySection, categoryMenuItem)

            breadCrumbArray = mainPage.feedBreadCrumbArray(['eBay', categorySection, 'Cell Phones & Accessories'])
            await categoryPage.setCategoryName(categoryMenuItem)
            await categoryPage.verifyHeaderBreadCrumbs(breadCrumbArray)
            await categoryPage.getLeftSideNavigationListElement("Shop by Category", categoryIntendedItem).click()

            categoryPage.setCategoryName(categoryIntendedItem)
            breadCrumbArray.push(categoryIntendedItem)
            await categoryPage.verifyHeaderBreadCrumbs(breadCrumbArray)
            await categoryPage.getSeeAllButtonFromShopBySection("Shop by Brand").click()

            const tabAndOptionsListMap = new Map();
            tabAndOptionsListMap.set("Screen Size", ["5.0 - 5.4 in"])
            // tabAndOptionsListMap.set("Screen Size", ["5.0 - 5.4 in", "5.5 - 5.9 in"])
            tabAndOptionsListMap.set("Price", ["$100.00-$500.00"])

            ///Please Note: Location based filter has an issue from the eBay site. In the past it was resolved and it is occuring again.
            //Similarly another filter can be applied by feeding it in the Map
            // tabAndOptionsListMap.set("Operating System", ["iOS", "Android"])
            await filtersFormOverlay.filterOptionsAndClickApplyButton(tabAndOptionsListMap);

            //This needs to be implemented with iterating through loop to get the array of key
            //due to time constraint I am hard coding
            await categoryPage.setCategoryName((tabAndOptionsListMap.get("Screen Size"))[0].replace("in", "Inch") + " " + categoryIntendedItem
                + " between " + (tabAndOptionsListMap.get("Price"))[0].replace("-", " and "))

            await resultsSection.verifyNumberOfFiltersApplied(tabAndOptionsListMap)
            await resultsSection.verifyFiltersApplied(tabAndOptionsListMap)
        });
    });

    describe('TestCaseID002 - Access a Product via Search bar', () => {
        let searchProductText = "MacBook"
        let searchProductCategory = "Computers/Tablets & Networking"
        it('Type any search string in the search bar.\nChange the Search category. For example: Computers/Tablets & Networking and click Search.',
            async () => {
                await mainPage.searchAndSelectCategory(searchProductText, searchProductCategory)
            });

        it('Verify that page loads completely and the first result name matches with the search string.', async () => {
            await resultsSection.getresultsSection().waitForDisplayed({ timeout: 10000 })
            let firstSearchResult = await resultsSection.getresultsList();
            let firstSearchResultText = await resultsSection.getResultListIndividualTitleText(firstSearchResult[0])
            await expect(firstSearchResultText).contains(searchProductText)
        });
    });
});