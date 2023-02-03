/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open(path) {
        return browser.url(`https://the-internet.herokuapp.com/${path}`)
    }

    get shopByCategoryDropdownButton() {
        return $('//button[@id=\'gh-shop-a\' and text()=\'Shop by category\']')
    }

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

    waitForDisplayed(pageElement) {
        pageElement.waitForDisplayed({ timeout: 30000 })
    }

    feedBreadCrumbArray(arr) {
        var loadedArray = []
        arr.array.forEach(element => {
            loadedArray.push(element)
        });
        return loadedArray
    }
}
