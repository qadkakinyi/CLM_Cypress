/**
 * @testSuite Case Statuses Risk Point
 * @description Verifies that case status risk points can be edited and restored
 * @priority Medium
 * @owner QA Team
 * @tags settings, risk, case-status
 */

describe("Case Statuses Risk Point", ()=> {

    /**
     * @scenario Edit & Revert Case Status Risk Point
     * @description Updates the first case status risk point to 5, verifies success, then reverts to 1
     * @steps
     *  1. Navigate to Settings → Case Statuses Risk Points.
     *  2. Click Edit on the first row.
     *  3. Change risk point to 5 and Save.
     *  4. Confirm success toast.
     *  5. Click Edit again and change risk point back to 1.
     *  6. Save and confirm success.
     * @expectedResult Toast "The case status risk point has been updated." appears after each save.
     */
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

