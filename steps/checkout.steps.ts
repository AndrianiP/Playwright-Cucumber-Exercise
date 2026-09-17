import { When, Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Checkout } from '../pages/checkout.page';

When('I navigate to the cart', async () => {
    await new Checkout(getPage()).navigateToCart();
});

When('I select checkout', async () => {
    await new Checkout(getPage()).selectCheckout();
});

When('I fill in checkout details with {string}, {string}, and {string}', async (firstName: string, lastName: string, zip: string) => {
    await new Checkout(getPage()).fillCheckoutDetails(firstName, lastName, zip);
});

When('I select continue', async () => {
    await new Checkout(getPage()).clickContinue();
});

When('I select finish', async () => {
    await new Checkout(getPage()).clickFinish();
});

Then('I validate the successful purchase text {string}', async (expectedText: string) => {
    await new Checkout(getPage()).validateOrderCompleteText(expectedText);
});