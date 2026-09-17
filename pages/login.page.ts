import { Page, expect} from "@playwright/test"

export class Login {
    private readonly page: Page
    private readonly password: string = 'secret_sauce'
    private readonly passwordField: string = 'input[id="password"]'
    private readonly userNameField: string = 'input[id="user-name"]'
    private readonly loginButton: string = 'input[id="login-button"]'
    private readonly errorMessageElement: string = '[data-test="error"]';

    constructor(page: Page) {
        this.page = page;
    }
    
    // Rewriting to use playwrights expect to wait for the dom fully to load and retries if title doesnt match.
    public async validateTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    public async validateLoginButtonVisible() {
        await expect(this.page.locator(this.loginButton)).toBeVisible();
    }

    // Adds check to validate error message shows
    public async validateErrorMessage(expectedMessage: string){
        const errorLocator = this.page.locator(this.errorMessageElement);
 
        await expect(errorLocator).toHaveText(expectedMessage);
    }

    public async loginAsUser(userName: string) {
        await this.page.locator(this.userNameField).fill(userName)
        await this.page.locator(this.passwordField).fill(this.password)
        await this.page.locator(this.loginButton).click()
    }

    

}