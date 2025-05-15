describe('Clients per criterion answer report', ()=>{
    it('Performs advanced filter, ensures regulation group and statuses are populated', ()=>{
        cy.visit('/reports').wait(2000)
        
        cy.get('dx-select-box').eq(0).click()
        cy.contains('Client Evaluations & Documents').click().wait(500)

        cy.get('dx-select-box').eq(1).click()
        cy.contains('Clients Per Criterion Answer Report').click().wait(500)
        
        // cy.contains('.dx-button', 'Advanced Filter').click().wait(500)
        cy.getByFormControlName('regulationGroup').click()
        cy.get('.dropdown-list').eq(0).find('.item2 li').eq(0).click().wait(500)
        cy.getByFormControlName('regulationGroup').click() // to close the popup
        
        cy.getByFormControlName('clientStatuses').click()
        cy.get('.dropdown-list').eq(1).find('.item2 li').eq(0).click().wait(500)
        cy.getByFormControlName('clientStatuses').click()
        
        cy.getByFormControlName('criterionId').click()
        cy.get('dx-data-grid .dx-datagrid-rowsview tr .dx-command-select').eq(0).click().wait(3000)
        cy.getByFormControlName('criterionId').click()
        
        cy.contains('sa-button', 'Search').click()
    })
})