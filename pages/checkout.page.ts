import { Page, expect } from "@playwright/test";

export class Checkout {
    private readonly page: Page;
    private readonly cartIcon: string = '.shopping_cart_link';
    private readonly checkoutBtn: string = '#checkout';
    private readonly firstNameInput: string = '#first-name';
    private readonly lastNameInput: string = '#last-name';
    private readonly zipInput: string = '#postal-code';
    private readonly continueBtn: string = '#continue';
    private readonly finishBtn: string = '#finish';
    private readonly completeHeader: string = '.complete-header';

    constructor(page: Page) {
        this.page = page;
    }

    public async navigateToCart() {
        await this.page.locator(this.cartIcon).click();
    }

    public async selectCheckout() {
        await this.page.locator(this.checkoutBtn).click();
    }

    public async fillCheckoutDetails(firstName: string, lastName: string, zip: string) {
        await this.page.locator(this.firstNameInput).fill(firstName);
        await this.page.locator(this.lastNameInput).fill(lastName);
        await this.page.locator(this.zipInput).fill(zip);
    }

    public async clickContinue() {
        await this.page.locator(this.continueBtn).click();
    }

    public async clickFinish() {
        await this.page.locator(this.finishBtn).click();
    }

    public async validateOrderCompleteText(expectedText: string) {
        await expect(this.page.locator(this.completeHeader)).toHaveText(expectedText);
    }
}