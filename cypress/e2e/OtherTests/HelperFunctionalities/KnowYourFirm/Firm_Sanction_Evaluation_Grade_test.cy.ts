
describe('Firm Sanction Evaluation Grades', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/firm-sanction-evaluation-grades').wait(2000)
    })

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

    it('should delete an impact score', () => {
        cy.get('#gridFirmImpactScores tr .dx-first-cell .dx-texteditor-input').type('Test DKA', {force:true}).wait(2000)
        cy.get('.dx-icon-trash').last().click().wait(500)
        cy.get('.dx-overlay-content').contains('Yes').click().wait(500)
        cy.contains('The firm impact score has been deleted').wait(1000)
    });

})
