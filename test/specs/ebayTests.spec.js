const { expect } = require('chai');
const { selectMenuItemFromShopByCategory: selectMenuItem, feedBreadCrumbArray } = require('../pageobjects/login.page');
const LoginPage = require('../pageobjects/login.page')
const CategoryPage = require('../pageobjects/category.page')
const FiltersFormOverlay = require('../pageobjects/filters.formOverlay')
const { default: AllureReporter } = require('@wdio/allure-reporter');

describe('EBay Test Suite', () => {
    beforeEach(async () => {
        await browser.navigateTo(config.url);
        await browser.maximizeWindow();
    });

    describe('Access a Product via category after applying multiple filters', () => {
        let categorySection = "Electronics"
        let categoryMenuItem = "Cell Phones, Smart Watches & Accessories"
        let categoryIntendedItem = "Cell Phones & Smartphones"
        var breadCrumbArray = [];

        it('should verify the product search is successful with multiple filters & category applied', async () => {
            //add test data in json
            await selectMenuItem(categorySection, categoryMenuItem)

            let categoryPage = new CategoryPage(categoryMenuItem)

            breadCrumbArray = feedBreadCrumbArray(['eBay', categorySection, 'Cell Phones & Accessories'])
            await categoryPage.verifyHeaderBreadCrumbs(breadCrumbArray)
            await categoryPage.getLeftSideNavigationListElement("Shop by Category", categoryIntendedItem).click()

            categoryPage = new CategoryPage(categoryIntendedItem)
            breadCrumbArray.push(categoryIntendedItem)
            await categoryPage.verifyHeaderBreadCrumbs(breadCrumbArray)
            await categoryPage.getSeeAllButtonFromShopBySection("Shop by Brand")

            const tabAndOptionsListMap = new Map();
            tabAndOptionsListMap.set("Screen Size", ["5.0 - 5.4 in"])
            tabAndOptionsListMap.set("", [""])
            tabAndOptionsListMap.set("", [""])
            await FiltersFormOverlay.filterOptionsAndClickApplyButton("").click();
            //form[@id='x-overlay__form']//span[text()='Network']/ancestor::div[@role='tab']

            // await expect(SecurePage.flashAlert).toBeExisting()
            // await expect(SecurePage.flashAlert).toHaveTextContaining(
            //     'You logged into a secure area!')
        });
    });

    describe('Access a Product via Search bar', () => {
        it('should verify the page with search results load successfully', async () => {
            // await LoginPage.open()

            await LoginPage.login('tomsmith', 'SuperSecretPassword!')
            await expect(SecurePage.flashAlert).toBeExisting()
            await expect(SecurePage.flashAlert).toHaveTextContaining(
                'You logged into a secure area!')
        });
        it('should verify the first result name matches with the search string', async () => {

        });
    });
});