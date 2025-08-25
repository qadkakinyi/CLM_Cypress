/**
 * @testSuite Side-menu Visibility
 * @description Validates that the side menu is visible upon login and contains the expected Dashboard link.
 * @priority High
 * @owner QA Team
 * @tags regression, ui, navigation
 * @dependencies cypress
 * @fileDescription Ensures that the side menu is rendered and accessible after a successful login.
 */

describe('Side-menu Visibility', () => {

    /**
     * @scenario Check Side-menu on Login
     * @description Confirms that the side menu is displayed after logging in and that the "Dashboard" option is present.
     * @priority High
     * @steps Ensure the user is logged in and the dashboard is loaded.
     * @steps Verify `.left-menu` element is visible.
     * @steps Verify the "Dashboard" text is present in the menu.
     * @expectedResult Side menu is visible and contains a "Dashboard" entry.
     */
    it('Checks if side-menu is visible on login', () => {
        cy.get('.left-menu').should('be.visible')
        cy.contains('Dashboard')
    })
})

