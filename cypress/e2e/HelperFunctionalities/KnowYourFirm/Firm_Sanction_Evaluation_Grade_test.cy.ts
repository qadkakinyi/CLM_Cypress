
describe('Firm Sanction Evaluation Grades', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/firm-sanction-evaluation-grades').wait(2000)
    })

    it('Adds a Firm Sanction Impact Score', ()=>{

        cy.contains('Add').click().wait(1000)
        cy.getByFormControlName('name').eq(3).type('Test DKA')

        //regulation group
        cy.get('dx-drop-down-box').eq(6).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid').find('.dx-datagrid-rowsview').find('tr > td').first().click().wait(500)
        
        cy.getByFormControlName('riskPoint').eq(1).type('6')

        //color
        cy.get('dx-drop-down-box').eq(7).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains('Coral').click({force:true}).wait(500)

        cy.get('[icon="save"]').eq(3).click().wait(1000)

        cy.contains('Sanction impact score has been added').wait(1000)
    })

    it('should delete an impact score', () => {
        cy.get('#gridFirmImpactScores tr .dx-first-cell .dx-texteditor-input').type('Test DKA', {force:true}).wait(2000)
        cy.get('.dx-icon-trash').last().click().wait(500)
        cy.get('.dx-overlay-content').contains('Yes').click().wait(500)
        cy.contains('The firm impact score has been deleted').wait(1000)
    });

})
