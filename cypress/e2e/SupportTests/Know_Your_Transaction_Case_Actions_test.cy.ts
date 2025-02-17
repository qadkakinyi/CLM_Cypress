describe('Know your transactions - Support', ()=>{
    
    beforeEach(()=>{
        cy.visit( "/know-your-transactions/transactions").wait(2500)
        cy.contains("Know your Transactions")

        cy.getByFormControlName('dateFrom').type('2024-12-12')
        cy.getByFormControlName('transactionOrigins').click().wait(1000)
        cy.contains('.multiselect-item-checkbox', 'Live').click().wait(500)

        cy.contains('sa-button', 'Search').click().wait(2000)

        // navigate to single transaction
        cy.get('.dx-datagrid-table td .fa-angle-double-right').eq(0).click({force:true}).wait(2000)
        cy.contains('.dx-item', 'Live Cases').click().wait(3000)
    })
    
    it('It drills into a single case action', ()=>{
        
        cy.contains('.nav-tabs li ', 'Actions').scrollIntoView().click().wait(1000)
        cy.contains('.dx-tabs span', 'Case Actions').click().wait(2000)
        
        //navigate to single case action
        cy.get('.dx-datagrid-table td .fa-angle-double-right').eq(0).click({force:true}).wait(2000)
        cy.contains('sa-lg-breadcrumbs', 'Edit Action').wait(2000)
    })
    
    it('Differentiates `Save` vs `Save & Close` in Live Transaction', ()=>{
        // edit status so as to save
        cy.get('dx-drop-down-box').eq(0).click().wait(1000)
        cy.get('.dx-popup-content dx-data-grid').should('be.visible').eq(0).find('tr').last().prev().click()
        
        // toggle save button
        cy.get('.dropdown-toggle').click()
        cy.get('.save-and-close-link').click()
        cy.contains('The case has been updated').wait(2000)
        cy.contains('Case Number') // in the page
        
        // SAVE AND CLOSE
        // edit status so as to save
        cy.get('dx-drop-down-box').eq(0).click().wait(1000)
        cy.get('.dx-popup-content dx-data-grid').should('be.visible').eq(0).find('tr').first().next().click()

        // click save&close button
        cy.getBySel('saveAndCloseButton').click()
        cy.contains('The case has been updated').wait(2000)
        cy.contains('Advanced Filter')
    })
})