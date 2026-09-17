import { Then, When} from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Login } from '../pages/login.page';

Then('I should see the title {string}', async (expectedTitle) => {
  await new Login(getPage()).validateTitle(expectedTitle);
});

When('I login as {string}', async (userName) => {
  await new Login(getPage()).loginAsUser(userName);
});

Then('I should see the error message {string}', async function (expectedMessage: string) {
  await  new Login(getPage()).validateErrorMessage(expectedMessage);
});

Then('I validate the login button is visible', async () => {
    await new Login(getPage()).validateLoginButtonVisible();
});