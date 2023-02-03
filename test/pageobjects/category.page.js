

const { assert } = require('chai');
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CategoryPage extends Page {

    constructor(categoryName) {
        this.categoryName = categoryName;
        this.waitForDisplayed();
    }

    /**
     * define selectors using getter methods
     */
    getCategoryPageHeader() {
        return $('//h1[@class=\'b-pageheader\']//span[text()=\'' + this.categoryName + '\']');
    }

    getLeftSideNavigationListElement(sectionName, itemName) {
        return $('(//div[@id=\'leftnav\']//h2[text()=\'' + sectionName + '\']//ancestor::section//ul)[1]/li/a[text()=\'' + itemName + '\']')
    }

    getSeeAllButtonFromShopBySection(shopBySectionHeaderName) {
        return $('//h2[text()=\'' + shopBySectionHeaderName + '\']//ancestor::section//button//span[text()=\'See All\']')
    }

    async getHeaderBreadCrumbs() {
        let breadCrumbs = $$('//nav[@class=\'breadcrumbs breadcrumb--overflow\']/ul/li/a')
        var actualBreadCrumbsTextArray = [];
        breadCrumbs.forEach(element => {
            actualBreadCrumbsTextArray.push(element.getText())
        });
        return actualBreadCrumbsTextArray
    }

    async verifyHeaderBreadCrumbs(expectedBreadCrumbsArray) {
        assert.equal(actualBreadCrumbsTextArray, expectedBreadCrumbsArray, "Bread crumbs mismatch after navigating to Category Page");
    }


    /**
     * overwrite specific options to adapt it to page object
     */
    waitForPageLoad() {
        return super.waitForDisplayed(this.getCategoryPageHeader());
    }
}

module.exports = new CategoryPage();
