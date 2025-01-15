describe("Case Suspicion Levels Risk Point", ()=> {

    it('Edits a Case Suspicion Levels Risk Point', () => {

        cy.visit('/settings/case-suspicion-levels-risk-points').wait(2000)
        cy.get('#gridCaseSuspicionLevelsRiskPoints tr td').find('.dx-icon-edit').eq(0).click({force: true}).wait(1000)

        cy.get('#gridCaseSuspicionLevelsRiskPoints .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('riskPoints')
        cy.get('@riskPoints').eq(2).clear().wait(1000).type('2').wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains('The case suspicion level risk point has been updated.')

        // revert back the value to 1 
        cy.get('#gridCaseSuspicionLevelsRiskPoints tr td').find('.dx-icon-edit').eq(0).click({force: true}).wait(1000)
        cy.get('#gridCaseSuspicionLevelsRiskPoints .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('riskPoints')
        cy.get('@riskPoints').eq(2).clear().wait(1000).type('0').wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)
    })
})