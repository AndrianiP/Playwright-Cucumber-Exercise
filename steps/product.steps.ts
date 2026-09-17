import { When, Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

// Variable to store the cart state between steps
let previousCartCount = 0;

When('I add the backpack to the cart', async () => {
    await new Product(getPage()).addBackPackToCart();
});

When('I add the bike light to the cart', async () => {
    await new Product(getPage()).addBikeLightToCart();
});

When('I remove the backpack from the cart', async () => {
    await new Product(getPage()).removeBackPackFromCart();
});

// Captures the state BEFORE the action
When('I note the cart badge count', async () => {
    previousCartCount = await new Product(getPage()).getCartCount();
});

// Validates the state AFTER the action against the captured state
Then('I validate the cart badge count increased by 1', async () => {
    await new Product(getPage()).validateCartCountIncreased(previousCartCount);
});

Then('I validate the cart badge count decreased by 1', async () => {
    await new Product(getPage()).validateCartCountDecreased(previousCartCount);
});

Then('I validate the cart badge shows {string}', async (count: string) => {
    await new Product(getPage()).validateCartBadgeCount(count);
});

Then('I validate the cart badge is empty', async () => {
    await new Product(getPage()).validateCartBadgeIsEmpty();
});

When('I sort the items by {string}', async (sortOption: string) => {
  await new Product(getPage()).sortBy(sortOption);
});

Then('I validate all 6 items are sorted correctly by price {string}', async (sortOption: string) => {
  await new Product(getPage()).validatePriceSort(sortOption);
});

When('I open the hamburger menu', async () => {
    await new Product(getPage()).openMenu();
});

When('I select logout', async () => {
    await new Product(getPage()).selectLogout();
});