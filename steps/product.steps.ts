import { When, Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';

When('I add the backpack to the cart', async () => {
  await new Product(getPage()).addBackPackToCart();
});

When('I sort the items by {string}', async (sortOption: string) => {
  await new Product(getPage()).sortBy(sortOption);
});

Then('I validate all 6 items are sorted correctly by price {string}', async (sortOption: string) => {
  await new Product(getPage()).validatePriceSort(sortOption);
});