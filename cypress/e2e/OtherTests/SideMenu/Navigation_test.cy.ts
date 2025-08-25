/**
 * @testSuite Navigation Menu - RegTek
 * @description Validates that all main navigation menu items in RegTek are clickable.
 * @priority High
 * @owner QA Team
 * @tags regression, navigation, ui
 * @fileDescription This test ensures that the RegTek main navigation menu items respond to clicks for the System Admin user.
 */

describe('Click on navigation menu of RegTek', () => {

  /**
   * @scenario Click All Main Navigation Items
   * @description Logs in as system admin and clicks all items in the main navigation menu.
   * @priority High
   * @steps Login as "systemadmin" with "Password1!".
   * @steps Select all "ul.main-menu>li>sa-menu-item>a" elements.
   * @steps Click each menu item (multiple mode).
   * @expectedResult All main navigation menu items are clicked without errors.
   */
  it('Start clicking on navigation items', () => {
    cy.login("systemadmin", "Password1!")
    cy.get('ul.main-menu>li>sa-menu-item>a').click({ multiple: true });
  })

})

