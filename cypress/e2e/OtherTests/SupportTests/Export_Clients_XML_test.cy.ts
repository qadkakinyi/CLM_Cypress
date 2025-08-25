/**
 * @testSuite Export Clients XML
 * @description Verifies that the "Export Clients XML" process successfully sends the XML report to the specified email.
 * @priority Medium
 * @owner QA Team
 * @tags regression, export, xml, email
 * @dependencies cypress
 * @fileDescription Navigates to the export clients XML page, enables email sending, specifies the recipient, and validates that the confirmation message appears without errors.
 */

describe('Export clients XML', ()=>{
    /**
     * @scenario Export Clients XML via Email
     * @description Enables email option, inputs recipient email, triggers search/export, and validates confirmation message is displayed without error.
     * @priority Medium
     * @steps
     * 1) Visit `/processes/export-clients-xml`.
     * 2) Check the "Enable Email" checkbox.
     * 3) Enter recipient email address.
     * 4) Click the "Search" button to trigger the export.
     * 5) Verify that the success message appears and no error is shown.
     * @expectedResult Success confirmation is displayed stating the XML file will be emailed, and no error messages are present.
     */
    it('Exports clients XML successfully', ()=>{
        cy.visit('/processes/export-clients-xml').wait(3000)

        cy.getByFormControlName('enableEmail').check().wait(500)
        cy.getByFormControlName('email').type('daniel.kakinyi@yopmail.com').wait(500)
        cy.contains('sa-button', 'Search').click().wait(1000)

        cy.contains('You are going to receive the XML Report file to your email in few minutes.')
        cy.contains('Error').should('not.exist')
    })
})

