/**
 * @testSuite eGOV Requests Handling
 * @description Verifies that the eGOV requests handling process works as expected, including selecting specific requests and attempting to send related emails.
 * @priority Medium
 * @owner QA Team
 * @tags regression, processes, eGOV, email
 * @dependencies cypress
 * @fileDescription Opens the eGOV requests handling page, selects a request (skipping "select all"), triggers the "Handle eGOV Requests" process, sends emails, and verifies the appropriate response.
 */

describe('eGOV Requests', ()=>{
    /**
     * @scenario Handle and Send eGOV Requests Emails
     * @description Selects an individual eGOV request (not all), processes it, attempts to send emails, and validates the inactive account message appears.
     * @priority Medium
     * @steps
     * 1) Visit `/processes/handle-eGOV-requests`.
     * 2) Skip the "Select All" checkbox and select the next checkbox (index 1).
     * 3) Click "Handle eGOV Requests".
     * 4) Click "Send Emails" in the send email modal.
     * 5) Verify that a message appears indicating the eGOV account is inactive.
     * @expectedResult The process runs, attempts email sending, and the system displays "Your eGOV account is inactive".
     */
    it('handles eGOV requests', ()=>{
        cy.visit('/processes/handle-eGOV-requests').wait(3000)
        // eq 1 ensures I skip selecting all checkbox and select the checkbox after the one that selects all
        cy.get('.dx-checkbox-icon').eq(1).click().wait(2000)
        cy.contains('sa-button', 'Handle eGOV Requests').click().wait(500)
        cy.get('app-send-egov-emails').contains('sa-button', 'Send Emails').click().wait(2000)
        cy.contains('Your eGOV account is inactive')
    })
})

