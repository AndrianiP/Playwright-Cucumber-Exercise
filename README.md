# Playwright Automation Test

## System Requirements

node >= v18.5.x

npm >= v7


## Setup

// Install Visual Studio Code (or any editor)

https://code.visualstudio.com/download


// Install Node.js

https://nodejs.org/en/download


```bash
git clone https://github.com/automationExamples/Playwright-Cucumber-Exercise.git
npm install
npx playwright install
```

### Recommended vscode extensions

Cucumber v1.7.0

Cucumber (Gherkin) Support enhanced for Behat


## Instructions
To run the test
```bash
npm run test
```

After running, to generate the cucumber report (cucumber_report.html)
```bash
npm run report
```

It is not expected that you complete every task, however, please give your best effort 

You will be scored based on your ability to complete the following tasks:

- [ ] Install and setup this repository on your personal computer
- [ ] Complete the automation tasks listed below

### Tasks
- [X] Modify the scenario 'Validate the login page title' from [login.feature](features/login.feature#8) which runs but fails. Determine the cause of the failure and update the scenario to pass in the test
- [X] Extend the scenario 'Validate login error message' from [login.feature](features/login.feature#10) which runs and passes but is missing a step. Extend the scenario to validate the error message received.
- [X] Modify and extend the 'Validate successful purchase text' from [purchase.feature](features/purchase.feature#6) with steps for each comment listed. Consider writing a new steps.ts file along with an appropriate page.ts
- [X] Modify and extend the 'Validate product sort by price sort' from [product.feature](features/product.feature#6) with steps for each comment listed. Utilize the Scenario Outline and Examples table to parameterize the test
- [X] Extend the testing coverage with anything you believe would be beneficial

## Feature Coverage & Validations

### 🔐 Login (`features/login.feature`)
* **Title Validation:** Verifies the page title matches `"Swag Labs"` using Playwright's auto-retrying `toHaveTitle` check.
* **Error Handling:** Validates locked-out user scenarios render the native error banner (`"Epic sadface: Sorry, this user has been locked out."`).

### 📦 Product & Inventory (`features/product.feature`)
* **Parameterized Price Sorting:** Utilizes a `Scenario Outline` with `Examples` to test both `"Price (low to high)"` and `"Price (high to low)"` sorting options.
  * *Validation Strategy:* Extracts price strings from DOM elements, strips currency symbols (`$`), parses values into floating-point numbers, and asserts mathematical array ordering across all 6 inventory items.
* **Dynamic Cart Badge Increment ($N + 1$):** Reads the current badge count $N$ (defaulting to 0 if hidden), adds an item, and asserts the new badge value equals $N + 1$.
* **Dynamic Cart Badge Decrement ($N - 1$):** Reads current count $N$, removes an item, and asserts count equals $N - 1$ (or confirms the badge is hidden from the DOM if $N = 1$).

### 🛒 Purchase & Checkout (`features/purchase.feature`)
* **End-to-End Order Completion:** Validates the entire purchase workflow from item selection to order submission, asserting the final completion text (`"Thank you for your order!"`).
* **Step Navigation Boundary Check:** Asserts that submitting valid checkout form data successfully navigates the user from Step 1 to Step 2 (`checkout-step-two.html`).
* **Native Missing Field Validation:** Parameterized `Scenario Outline` testing application response to empty form submissions:
  * Missing First Name $\rightarrow$ Asserts native error: `"Error: First Name is required"`
  * Missing Last Name $\rightarrow$ Asserts native error: `"Error: Last Name is required"`
  * Missing Postal Code $\rightarrow$ Asserts native error: `"Error: Postal Code is required"`

### 🚪 Session & Logout (`features/logout.feature`)
* **Session Termination:** Expands the hamburger menu, executes logout, and asserts redirection to the login screen by checking login button visibility.
