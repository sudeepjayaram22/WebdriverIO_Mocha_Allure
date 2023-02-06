const { expect } = require('chai');
const FiltersFormOverlay = require('../pageobjects/filters.formOverlay')
const { default: AllureReporter } = require('@wdio/allure-reporter');
const mainPage = require('../pageobjects/main.page');
const categoryPage = require('../pageobjects/categoryResults.page');
const filtersFormOverlay = require('../pageobjects/filters.formOverlay');
const resultsSection = require('../pageobjects/results.section');
const { initializeAndNavigate } = require('../pageobjects/main.page');
const testDataObject = require("../testdata/ebayTests.json");

describe('EBay Test Suite', () => {
    before(async () => {
        await initializeAndNavigate(await config.url, 15000)
    });

    describe('TestCaseID001 - Access a Product via category after applying multiple filters', () => {
        //Setting up test data from json file
        //Retrieving test data via testDataObject which can be used to iterate for data driven execution of scenarios
        let categorySection = testDataObject[0].TestCaseID001.categorySection
        let categoryMenuItem = testDataObject[0].TestCaseID001.categoryMenuItem
        let categoryIntendedItem = testDataObject[0].TestCaseID001.categoryIntendedItem
        var breadCrumbArray = testDataObject[0].TestCaseID001.breadCumbArray
        const tabAndOptionsListMap = new Map();

        it('Select a category from Shop by Category flyout in the header section', async () => {
            await mainPage.selectMenuItemFromShopByCategoryFlyout(categorySection, categoryMenuItem)
            await categoryPage.setCategoryName(categoryMenuItem)
            await categoryPage.verifyHeaderBreadCrumbs(breadCrumbArray)
        });

        it('Select Shop by Category from the left side navigation panel', async () => {
            await categoryPage.getLeftSideNavigationListElement("Shop by Category", categoryIntendedItem).click()

            categoryPage.setCategoryName(categoryIntendedItem)
            breadCrumbArray.push(categoryIntendedItem)
            await categoryPage.verifyHeaderBreadCrumbs(breadCrumbArray)

        });

        it('Select Shop by Brand and apply filters', async () => {
            let shopByBrandEle = await categoryPage.getSeeAllButtonFromShopBySection("Shop by Brand")
            await shopByBrandEle.waitForDisplayed()
            await shopByBrandEle.click()

            //Setting filter names and its values in the map 
            //Please Note: Location based filter has an issue from the eBay site. In the past it was resolved and it is occuring again.
            //Similarly another filter can be applied by feeding it in the Map e.g. tabAndOptionsListMap.set("Operating System", ["iOS", "Android"])
            tabAndOptionsListMap.set(testDataObject[0].TestCaseID001.filterOption1.filterName, testDataObject[0].TestCaseID001.filterOption1.filterValue)
            tabAndOptionsListMap.set(testDataObject[0].TestCaseID001.filterOption2.filterName, testDataObject[0].TestCaseID001.filterOption2.filterValue)

            await filtersFormOverlay.filterOptionsAndClickApplyButton(tabAndOptionsListMap);

            //This needs to be implemented dynamically with iterating through loop to get the array of key from Map object
            //due to time constraint I am hard coding
            await categoryPage.setCategoryName((tabAndOptionsListMap.get("Screen Size"))[0].replace("in", "Inch") + " " + categoryIntendedItem
                + " between " + (tabAndOptionsListMap.get("Price"))[0].replace("-", " and "))
        });

        it('Verify the correct set of filters are applied in the result page', async () => {
            await resultsSection.verifyNumberOfFiltersApplied(tabAndOptionsListMap)
            await resultsSection.verifyFiltersApplied(tabAndOptionsListMap)
        });
    });

    describe('TestCaseID002 - Access a Product via Search bar', () => {
        let searchProductText = testDataObject[0].TestCaseID002.searchProductText
        let searchProductCategory = testDataObject[0].TestCaseID002.searchProductCategory

        it('Type any search string in the search bar. Change the Search category. Click Search.',
            async () => {
                await mainPage.searchAndSelectCategoryViaGlobalSearch(searchProductText, searchProductCategory)
            });

        it('Verify that page loads completely and the first result name matches with the search string.', async () => {
            await resultsSection.getResultsSection().waitForDisplayed({ timeout: 10000 })
            let firstSearchResult = await resultsSection.getResultsList()
            let firstSearchResultText = await resultsSection.getResultListIndividualTitleText(firstSearchResult[0])
            await expect(firstSearchResultText.toLowerCase()).contains(searchProductText.toLowerCase())
        });
    });
});