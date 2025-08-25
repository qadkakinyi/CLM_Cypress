/**
 * @testSuite Opens API Documentation
 * @description Validates that the RegTek+ API documentation page is accessible after logging out of the system.
 * @priority Medium
 * @owner QA Team
 * @tags regression, API, documentation, authentication
 * @dependencies Cypress environment variable `api_baseUrl`
 * @fileDescription Confirms that the API documentation page loads and displays expected sections like "RegTek+ API Documentation" and "Authentication".
 */

let ApiBaseUrl = Cypress.env('api_baseUrl');

describe('Opens API Documentation', ()=>{

    /**
     * @scenario Access API Documentation after Logout
     * @description Logs out from the current session and navigates directly to the API documentation URL to confirm availability and expected content.
     * @priority Medium
     * @steps
     * 1) Click user options and select "Logout".
     * 2) Confirm logout action in the modal.
     * 3) Visit the API documentation URL.
     * 4) Verify that "RegTek+ API Documentation" and "Authentication" sections are visible.
     * @expectedResult The API documentation page opens successfully and displays both the documentation title and the Authentication section.
     */
    it('successfully opens API Documentation', ()=>{
        cy.wait(2000)
        cy.get('sa-user-options sa-icon-button a[title="User"]').click().wait(500)
        cy.get('sa-logout').click()
        cy.get('#bot2-Msg1').click().wait(2500)

        cy.visit(`${ApiBaseUrl}/documentation/apidocumentation?`).wait(15000)

        cy.origin(`${ApiBaseUrl}`, () => {
            cy.contains('RegTek+ API Documentation')
            cy.contains('Authentication')
        })
    })
})

