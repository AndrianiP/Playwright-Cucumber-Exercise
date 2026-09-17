import { Page, expect } from "@playwright/test"

export class Product {
    private readonly page: Page;


    private readonly sortDropdown: string = '.product_sort_container';
    private readonly itemPrices: string = '.inventory_item_price';

    private readonly cartBadge: string = '.shopping_cart_badge';
    private readonly addToCartBackpack: string = '#add-to-cart-sauce-labs-backpack';
    private readonly addToCartBikeLight: string = '#add-to-cart-sauce-labs-bike-light';
    private readonly removeFromCartBackpack: string = '#remove-sauce-labs-backpack';

    private readonly hamburgerMenu: string = '#react-burger-menu-btn';
    private readonly logoutLink: string = '#logout_sidebar_link';

    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
            await this.page.locator(this.addToCartBackpack).click();
        }

    public async addBikeLightToCart() {
        await this.page.locator(this.addToCartBikeLight).click();
    }

    public async removeBackPackFromCart() {
        await this.page.locator(this.removeFromCartBackpack).click();
    }

    // Helper method to safely get the current cart count as a number
    public async getCartCount(): Promise<number> {
        const badge = this.page.locator(this.cartBadge);
        if (await badge.isVisible()) {
            const countText = await badge.innerText();
            return parseInt(countText, 10);
        }
        return 0; // If hidden/missing, the count is 0
    }

    public async validateCartCountIncreased(previousCount: number) {
        const currentCount = await this.getCartCount();
        expect(currentCount).toBe(previousCount + 1);
    }

    public async validateCartCountDecreased(previousCount: number) {
        const currentCount = await this.getCartCount();
        expect(currentCount).toBe(previousCount - 1);
    }

    public async validateCartBadgeCount(expectedCount: string) {
        await expect(this.page.locator(this.cartBadge)).toHaveText(expectedCount);
    }
    
    public async validateCartBadgeIsEmpty() {
        // When the cart is empty in SauceDemo, the badge element is entirely removed from the DOM
        await expect(this.page.locator(this.cartBadge)).toBeHidden();
    }
    public async openMenu() {
        await this.page.locator(this.hamburgerMenu).click();
    }

    public async selectLogout() {
            await this.page.locator(this.logoutLink).click();
        }
    public async sortBy(sortOption: string) {
        // Selects the option by its visible text label
        await this.page.locator(this.sortDropdown).selectOption({ label: sortOption });
    }

    public async validatePriceSort(sortOption: string) {
        const priceLocators = this.page.locator(this.itemPrices);
        const count = await priceLocators.count();
        const prices: number[] = [];

        // Extract text, remove the $ sign, and convert to floating-point numbers
        for (let i = 0; i < count; i++) {
            const priceText = await priceLocators.nth(i).innerText();
            prices.push(parseFloat(priceText.replace('$', '')));
        }

        const sortedPrices = [...prices];
        if (sortOption === 'Price (low to high)') {
            sortedPrices.sort((a, b) => a - b);
        } else if (sortOption === 'Price (high to low)') {
            sortedPrices.sort((a, b) => b - a);
        }

        // Validate the count is exactly 6 and the sorting algorithm matches the UI order
        expect(prices.length).toBe(6);
        expect(prices).toEqual(sortedPrices);
    }
}