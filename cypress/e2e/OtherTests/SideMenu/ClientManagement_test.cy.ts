/**
 * @testSuite Client Management
 * @description Verifies that clicking the "Know Your Clients" button navigates to the Client Management page.
 * @priority High
 * @owner QA Team
 * @tags regression, navigation, client-management
 * @dependencies cypress, getByDataCy
 * @fileDescription Tests navigation from dashboard to the Client Management page via the "Know Your Clients" button.
 */

describe("Client Management", () => {

    /**
     * @scenario Load the List of Clients
     * @description Clicks the "Know Your Clients" button and validates correct page navigation and heading visibility.
     * @priority High
     * @steps From dashboard → Click "Know Your Clients" button.
     * @steps Confirm that the URL path is "/main/clients".
     * @steps Verify that "Client Management" heading is visible.
     * @expectedResult User is navigated to the Client Management page with correct heading displayed.
     */
    it('Load the list of clients', () => {

        // Click the "Know Your Clients" button
        cy.getByDataCy("know-clients-btn").click()

        // Verify URL
        cy.location("pathname").should('equal', "/main/clients")

        // Verify page heading
        cy.contains("Client Management").should("be.visible")
    })
})

