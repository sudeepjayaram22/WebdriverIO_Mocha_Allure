const { assert } = require('chai');
const Page = require('./page');

/**
 * Category Results Page containing specific selectors and methods for interacting with objects 
 */
class CategoryResultsPage extends Page {
    categoryName = "";

    /**
   * Get individual DOM-Element from list of navigation elements which is to the left side of results section.
   * @param sectionName is the heading of section which holds the list of navigation elements(e.g. "Shop by Category")
   * @param itemName individual navigation element name(e.g. "Cell Phones & Smartphones")
   * @returns DOM-element found by the given selector
   */
    getLeftSideNavigationListElement(sectionName, itemName) {
        return $('(//div[@id=\'leftnav\']//h2[text()=\'' + sectionName + '\']//ancestor::section//ul)[1]/li/a[text()=\'' + itemName + '\']')
    }


    /**
   * Get button Element of See All for a '<sectionHeaderName>'.
   * @param shopBySectionHeaderName is the heading of section which holds the See All button(e.g. "Shop by Brand")
   * @returns DOM-element found by the given selector
   */
    getSeeAllButtonFromShopBySection(shopBySectionHeaderName) {
        return $('//h2[text()=\'' + shopBySectionHeaderName + '\']//ancestor::section//button//span[text()=\'See All\']')
    }

    /**
    * Get header text element from the Categrory Results page.
    * @param categoryName can be provided via setCategoryName(categoryName) method in this class
    * @returns DOM-element found by the given selector
    */
    async getCategoryResultsPageHeader() {
        return await $('//h1[@class=\'b-pageheader\']//span[text()=\'' + this.categoryName + '\']');
    }

    /**
    * Set Category Name for which the header text is expected to be in the Categrory Results page.
    * @param categoryName is the heading text of the Result page when searchedof section which holds the See All button(e.g. "Shop by Brand")
    * @returns DOM-element found by the given selector
    */
    async setCategoryName(categoryName) {
        this.categoryName = categoryName
        await this.waitForDisplayed(await this.getCategoryResultsPageHeader())
    }

    /**
    * Gets the bread crumbs text from the header section and stores it an array
    * @returns string array(e.g. ["eBay","Electronics","Cell Phones & Accessories"])
    */
    async getHeaderBreadCrumbs() {
        const breadCrumbs = await $$('//nav[@class=\'breadcrumbs breadcrumb--overflow\']/ul/li/a')
        var actualBreadCrumbsTextArray = [];
        for (let i = 0; i < breadCrumbs.length; i++) {
            console.log(await breadCrumbs[i].getText())
            await actualBreadCrumbsTextArray.push(await breadCrumbs[i].getText())
        }
        return actualBreadCrumbsTextArray
    }

    /**
   * Verifies the array of strings holding Bread Cumbs texts using chai assertion.
   * @param expectedBreadCrumbsArray expected array of strings holding Bread Cumbs texts(e.g. ["eBay","Electronics","Cell Phones & Accessories"])
   */
    async verifyHeaderBreadCrumbs(expectedBreadCrumbsArray) {
        try {
            await assert.equal(await this.getHeaderBreadCrumbs(), expectedBreadCrumbsArray, "Bread crumbs mismatch after navigating to Category Page");
        } catch (exception) { console.log(exception) }
    }


    /**
     * overwrite specific options to adapt it to page object
     */
    waitForPageLoad() {
        return super.waitForDisplayed(this.getCategoryResultsPageHeader());
    }
}

module.exports = new CategoryResultsPage();
