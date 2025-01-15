
describe('Firm Sanction Criteria', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/firm-sanction-criteria').wait(2000)
    })

    it('Adds a Firm Sanction Criteria', ()=>{

        cy.contains('Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('Test DKA')
        cy.getByFormControlName('riskPoint').eq(0).type('4')

        //regulation group
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid').find('.dx-datagrid-rowsview').find('tr > td').first().click().wait(500)

        //category
        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains('Client Base').click({force:true}).wait(500)

        cy.get('[icon="save"]').eq(0).click().wait(1000)

        cy.contains('The criterion has been added').wait(1000)
    })

    it('Edits a Firm Sanction Criteria', () => {

        cy.get('#gridSanctionCriteria tr .dx-first-cell .dx-texteditor-input').type('Test DKA', {force:true}).wait(2000)
        cy.get('#gridSanctionCriteria tr td').find('.fa-angle-double-right').eq(0).click({force:true}).wait(1000)

        cy.getByFormControlName('name').eq(0).clear().wait(200).type('Test Sanction Criteria DKA')

        // disable status
        cy.get('dx-drop-down-box').eq(2).click().wait(500)
        cy.contains('Disabled').click().wait(500)

        cy.get('[icon="save"]').eq(0).click().wait(1000)

        cy.contains(`The criterion has been updated.`).wait(1000)
    })

    it('Deletes a Firm Sanction Criteria', () => {

        cy.get('#gridSanctionCriteria tr .dx-first-cell .dx-texteditor-input').type('Test ', {force:true}).wait(2000)
        cy.get('#gridSanctionCriteria tr td').find('.fa-angle-double-right').eq(0).click({force: true}).wait(1000)
        cy.contains('sa-button', 'Delete').click().wait(1000)
        cy.get('.MessageBoxContainer').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The criterion has been deleted.`).wait(1000)
    })

})