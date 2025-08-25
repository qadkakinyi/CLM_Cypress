/**
 * @testSuite Firm Sanction Evaluation Grades
 * @description Covers creation and deletion of firm sanction impact scores
 * @priority Medium
 * @owner QA Team
 * @tags firm, sanctions, evaluation, compliance
 * @dependencies faker-js
 */

describe('Firm Sanction Evaluation Grades', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/firm-sanction-evaluation-grades').wait(2000)
    })

    /**
     * @scenario Add Firm Sanction Impact Score
     * @description Adds a new firm sanction impact score with regulation group, risk points, and color
     * @steps
     *  1. Navigate to Firm Sanction Evaluation Grades.
     *  2. Click "Add".
     *  3. Enter Name.
     *  4. Select Regulation Group.
     *  5. Enter Risk Point.
     *  6. Select Color.
     *  7. Click Save.
     * @expectedResult Firm sanction impact score is added successfully with a confirmation message.
     */
    it('Adds a Firm Sanction Impact Score', ()=>{

        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').eq(2).type('Test DKA')

        //regulation group
        cy.get('#addFirmImpactScoreForm dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid').find('.dx-datagrid-rowsview').find('tr > td').first().click().wait(500)

        cy.getByFormControlName('riskPoint').eq(0).type('6')

        //color
        cy.get('#addFirmImpactScoreForm dx-drop-down-box').eq(1).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains('Coral').click({force:true}).wait(500)

        cy.get('#addFirmImpactScoreForm > .custom-backround-transparent > .row > .col > [icon="save"]').click().wait(1000)

        cy.contains('Sanction impact score has been added').wait(1000)
    })

    /**
     * @scenario Delete Firm Sanction Impact Score
     * @description Deletes an existing firm sanction impact score
     * @steps
     *  1. Filter the grid by Name.
     *  2. Click the Trash icon on the matching record.
     *  3. Confirm deletion.
     * @expectedResult The firm sanction impact score is deleted with a confirmation message.
     */
    it('should delete an impact score', () => {
        cy.get('#gridFirmImpactScores tr .dx-first-cell .dx-texteditor-input').type('Test DKA', {force:true}).wait(2000)
        cy.get('.dx-icon-trash').last().click().wait(500)
        cy.get('.dx-overlay-content').contains('Yes').click().wait(500)
        cy.contains('The firm impact score has been deleted').wait(1000)
    });

})

