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