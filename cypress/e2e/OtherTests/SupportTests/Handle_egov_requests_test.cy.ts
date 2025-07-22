describe('eGOV Requests', ()=>{
    it('handles eGOV requests', ()=>{
        cy.visit('/processes/handle-eGOV-requests').wait(3000)
        // eq 1 ensures I skip selecting all checkbox and select the checkbox after the one that selects all
        cy.get('.dx-checkbox-icon').eq(1).click().wait(2000)
        cy.contains('sa-button', 'Handle eGOV Requests').click().wait(500)
        cy.get('app-send-egov-emails').contains('sa-button', 'Send Emails').click().wait(2000)
        cy.contains('Your eGOV account is inactive')
    })
})