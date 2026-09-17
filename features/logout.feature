Feature: Logout Feature

  Background:
    Given I open the "https://www.saucedemo.com/" page

  Scenario: Validate standard user can successfully log out
    When I login as "standard_user"
    And I open the hamburger menu
    And I select logout
    Then I validate the login button is visible