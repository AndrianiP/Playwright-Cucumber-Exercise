Feature: Purchase Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate successful purchase text
    When I login as "standard_user"
    And I add the backpack to the cart
    And I navigate to the cart
    And I select checkout
    And I fill in checkout details with "John", "Doe", and "12345"
    And I select continue
    And I select finish
    Then I validate the successful purchase text "Thank you for your order!"

  Scenario: Validate navigation to checkout summary page with non-empty fields
    When I login as "standard_user"
    And I add the backpack to the cart
    And I navigate to the cart
    And I select checkout
    And I fill in checkout details with "John", "Doe", and "12345"
    And I select continue
    Then I should be navigated to the checkout summary page

  Scenario Outline: Validate native error messages when checkout fields are empty
    When I login as "standard_user"
    And I add the backpack to the cart
    And I navigate to the cart
    And I select checkout
    And I fill in checkout details with "<firstName>", "<lastName>", and "<postal>"
    And I select continue
    Then I should see the checkout error message "<errorMessage>"

    Examples:
      | firstName | lastName | postal | errorMessage                   |
      |           | Doe      | 12345  | Error: First Name is required  |
      | John      |          | 12345  | Error: Last Name is required   |
      | John      | Doe      |        | Error: Postal Code is required |