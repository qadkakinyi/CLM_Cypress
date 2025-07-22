describe("Case Statuses Risk Point", ()=> {

    it('Edits a Case Statuses Risk Point', () => {

        cy.visit('/settings/case-statuses-risk-points').wait(2000)
        // cy.get('#gridCaseStatusesRiskPoints tr .dx-first-cell .dx-texteditor-input').type(name, {force: true}).wait(1000)
        cy.get('#gridCaseStatusesRiskPoints tr td').find('.dx-icon-edit').eq(0).click({force: true}).wait(1000)

        cy.get('#gridCaseStatusesRiskPoints .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('riskPoints')
        cy.get('@riskPoints').eq(2).clear().wait(1000).type('5').wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains('The case status risk point has been updated.')
        
        // revert back the value to 1 
        cy.get('#gridCaseStatusesRiskPoints tr td').find('.dx-icon-edit').eq(0).click({force: true}).wait(1000)
        cy.get('#gridCaseStatusesRiskPoints .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('riskPoints')
        cy.get('@riskPoints').eq(2).clear().wait(1000).type('1').wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)
    })
})