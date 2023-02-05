

const { assert } = require('chai');
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class MainPage extends Page {
    get shopByCategoryDropdownButton() {
        return $('//button[@id=\'gh-shop-a\' and text()=\'Shop by category\']')
    }

    get globalSearchInputTextbox() {
        return $('//input[@aria-label=\'Search for anything\']')
    }


    get globalSearchSelectCategoryDropdown() {
        return $('//select[@aria-label=\'Select a category for search\']')
    }

    get globalSearchButton() {
        return $('//input[@value=\'Search\' and @type=\'submit\']')
    }

    //select[@aria-label='Select a category for search']
    getMenutItemAndSection(section, menuItem) {
        return $('//a[text()=\'' + section + '\']//ancestor::h3[@class=\'gh-sbc-parent\']//following-sibling::ul//a[text()=\'' + menuItem + '\']')
    }

    async selectMenuItemFromShopByCategory(categorySection, categoryMenuItem) {
        await this.shopByCategoryDropdownButton.click()
        const categoryMenuItemElement = await this.getMenutItemAndSection(categorySection, categoryMenuItem)
        await categoryMenuItemElement.waitForClickable({ timeout: 10000 })
        await categoryMenuItemElement.click()
        await categoryMenuItemElement.waitForClickable({ reverse: true })
    }

    async searchAndSelectCategory(searchString, categoryOption) {
        await this.globalSearchInputTextbox.setValue(searchString)
        await this.globalSearchSelectCategoryDropdown.selectByVisibleText(categoryOption)
        await this.globalSearchButton.click()
    }
}

module.exports = new MainPage();
