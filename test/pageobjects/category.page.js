

const { assert } = require('chai');
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CategoryPage extends Page {
    categoryName = "";
    // constructor(categoryName) {
    // this.categoryName = categoryName;
    // this.waitForDisplayed();
    // }

    async setCategoryName(categoryName) {
        this.categoryName = categoryName
        await this.waitForDisplayed(await this.getCategoryPageHeader())
    }
    /**
     * define selectors using getter methods
     */
    async getCategoryPageHeader() {
        return await $('//h1[@class=\'b-pageheader\']//span[text()=\'' + this.categoryName + '\']');
    }

    getLeftSideNavigationListElement(sectionName, itemName) {
        return $('(//div[@id=\'leftnav\']//h2[text()=\'' + sectionName + '\']//ancestor::section//ul)[1]/li/a[text()=\'' + itemName + '\']')
    }

    getSeeAllButtonFromShopBySection(shopBySectionHeaderName) {
        return $('//h2[text()=\'' + shopBySectionHeaderName + '\']//ancestor::section//button//span[text()=\'See All\']')
    }

    async getHeaderBreadCrumbs() {
        const breadCrumbs = await $$('//nav[@class=\'breadcrumbs breadcrumb--overflow\']/ul/li/a')
        var actualBreadCrumbsTextArray = [];
        for (let i = 0; i < breadCrumbs.length; i++) {
            console.log(await breadCrumbs[i].getText())
            await actualBreadCrumbsTextArray.push(await breadCrumbs[i].getText())
        }
        // await breadCrumbs.forEach(element => {
        //     actualBreadCrumbsTextArray.push(element.getText())
        // });
        return actualBreadCrumbsTextArray
    }

    async verifyHeaderBreadCrumbs(expectedBreadCrumbsArray) {
        try {
            await assert.equal(await this.getHeaderBreadCrumbs(), expectedBreadCrumbsArray, "Bread crumbs mismatch after navigating to Category Page");
        } catch (exception) { }
    }


    /**
     * overwrite specific options to adapt it to page object
     */
    waitForPageLoad() {
        return super.waitForDisplayed(this.getCategoryPageHeader());
    }
}

module.exports = new CategoryPage();
