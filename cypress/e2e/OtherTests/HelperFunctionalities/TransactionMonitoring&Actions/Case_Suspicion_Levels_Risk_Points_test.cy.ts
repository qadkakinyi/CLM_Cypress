/**
 * @testSuite Case Suspicion Levels Risk Point
 * @description Ensures that case suspicion level risk points can be modified and reverted to their original values.
 * @priority Medium
 * @owner QA Team
 * @tags settings, risk, suspicion-level
 */

describe("Case Suspicion Levels Risk Point", ()=> {

    /**
     * @scenario Edit and Revert Risk Point
     * @description Updates the first case suspicion level risk point to a new value and then reverts it to the original.
     * @steps
     *  1. Navigate to Settings → Case Suspicion Levels Risk Points.
     *  2. Click the Edit icon for the first row.
     *  3. Change the risk point value to 2 and save.
     *  4. Verify the success message appears.
     *  5. Click Edit again for the same row.
     *  6. Change the risk point value back to 0 and save.
     *  7. Verify the success message appears again.
     * @expectedResult The risk point value is successfully updated both times and the correct success message is displayed.
     */
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

