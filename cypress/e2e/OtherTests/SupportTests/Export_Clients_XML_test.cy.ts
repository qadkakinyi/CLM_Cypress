describe('Export clients XML', ()=>{
    it('Exports clients XML successfully', ()=>{
        cy.visit('/processes/export-clients-xml').wait(3000)
        
        cy.getByFormControlName('enableEmail').check().wait(500)
        cy.getByFormControlName('email').type('daniel.kakinyi@yopmail.com').wait(500)
        cy.contains('sa-button', 'Search').click().wait(1000)
        
        cy.contains('You are going to receive the XML Report file to your email in few minutes.')
        cy.contains('Error').should('not.exist')
    })
})