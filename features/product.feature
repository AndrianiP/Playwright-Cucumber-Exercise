Feature: Product Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  # Create a datatable to validate the Price (high to low) and Price (low to high) sort options (top-right) using a Scenario Outline
Scenario Outline: Validate product sort by price <sort>
    When I login as "standard_user"
    And I sort the items by "<sort>"
    Then I validate all 6 items are sorted correctly by price "<sort>"

  Examples:
    | sort                |
    | Price (low to high) |
    | Price (high to low) |

Scenario: Validate add to cart increments badge
    When I login as "standard_user"
    And I add the backpack to the cart
    Then I validate the cart badge shows "1"

Scenario: Validate remove from cart clears badge
    When I login as "standard_user"
    And I add the backpack to the cart
    And I remove the backpack from the cart
    Then I validate the cart badge is empty

Scenario: Validate add to cart increments badge dynamically
    When I login as "standard_user"
    And I add the bike light to the cart
    And I note the cart badge count
    And I add the backpack to the cart
    Then I validate the cart badge count increased by 1

Scenario: Validate remove from cart decrements badge dynamically
    When I login as "standard_user"
    And I add the bike light to the cart
    And I add the backpack to the cart
    And I note the cart badge count
    And I remove the backpack from the cart
    Then I validate the cart badge count decreased by 1