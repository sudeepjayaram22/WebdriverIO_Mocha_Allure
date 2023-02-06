const { assert } = require('chai');
const Page = require('./page');

/**
 * MainPage containing specific selectors and methods for interacting with objects which are common across other sub pages 
 */
class MainPage extends Page {
    /**
    * define selectors using getter methods
    */

    /**
    shopByCategoryDropdownButton - Method to get the Shop by category dropdown button
    @returns {WebElement} the web element of the Shop by category dropdown button
    */
    get shopByCategoryDropdownButton() {
        return $('//button[@id=\'gh-shop-a\' and text()=\'Shop by category\']')
    }

    /**
    getGlobalSearchInputTextbox - This method returns the global search input textbox element
    @return {WebElement} The global search input textbox element
    */
    get globalSearchInputTextbox() {
        return $('//input[@aria-label=\'Search for anything\']')
    }

    /**
    globalSearchSelectCategoryDropdown - Returns the global search select category dropdown element
    @return {WebElement} - The selected dropdown element as a WebdriverJS element object
    */
    get globalSearchSelectCategoryDropdown() {
        return $('//select[@aria-label=\'Select a category for search\']')
    }

    /**
    Retrieves the global search button element
    @return {WebElement} - the search button element
    */
    get globalSearchButton() {
        return $('//input[@value=\'Search\' and @type=\'submit\']')
    }

    /**
   * Used to get Menu Item element from a section in Shop By category flyout.
   * @param categorySection under the Shop By category flyout(e.g. "Electronics")
   * @param categoryMenuItem under the Shop By category flyout(e.g. "Cell Phones, Smart Watches & Accessories")
   * @returns DOM-element found by the given selector
   */
    getMenutItemFromShopByCatergoryFlyout(categorySection, categoryMenuItem) {
        return $('//a[text()=\'' + categorySection + '\']//ancestor::h3[@class=\'gh-sbc-parent\']//following-sibling::ul//a[text()=\'' + categoryMenuItem + '\']')
    }

    /**
    * Used to select Menu Item element from a section in Shop By category flyout.
    * @param categorySection under the Shop By category flyout(e.g. "Electronics")
    * @param categoryMenuItem under the Shop By category flyout(e.g. "Cell Phones, Smart Watches & Accessories")
    */
    async selectMenuItemFromShopByCategoryFlyout(categorySection, categoryMenuItem) {
        await this.shopByCategoryDropdownButton.click()
        const categoryMenuItemElement = await this.getMenutItemFromShopByCatergoryFlyout(categorySection, categoryMenuItem)
        await categoryMenuItemElement.waitForClickable({ timeout: 10000 })
        await categoryMenuItemElement.click()
        await categoryMenuItemElement.waitForClickable({ reverse: true })
    }

    /**
    * Used to search for an item and select a catergory
    * @param searchString to search for a product(e.g. "Macbook")
    * @param categoryOption - optional - to filter the results based on the category(e.g. "Computers/Tablets & Networking")
    */
    async searchAndSelectCategoryViaGlobalSearch(searchString, categoryOption = "") {
        await this.globalSearchInputTextbox.setValue(searchString)
        if (categoryOption !== "") {
            await this.globalSearchSelectCategoryDropdown.selectByVisibleText(categoryOption)
        }
        await this.globalSearchButton.click()
    }
}

module.exports = new MainPage();
