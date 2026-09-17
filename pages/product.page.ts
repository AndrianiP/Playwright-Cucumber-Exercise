import { Page, expect } from "@playwright/test"

export class Product {
    private readonly page: Page;

    // Classes
    private readonly sortDropdown: string = '.product_sort_container';
    private readonly itemPrices: string = '.inventory_item_price';
    // IDs
    private readonly addToCart: string = '#add-to-cart-sauce-labs-backpack';
    private readonly hamburgerMenu: string = '#react-burger-menu-btn';
    private readonly logoutLink: string = '#logout_sidebar_link';


    constructor(page: Page) {
        this.page = page;
    }

    public async addBackPackToCart() {
        await this.page.locator(this.addToCart).click();
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