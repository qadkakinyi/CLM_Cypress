
describe('Firm Mitigation Measures', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/firm-mitigation-measures').wait(2000)
    })

    it('Adds a Firm Mitigation Measure', ()=>{

        cy.contains('Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('Test DKA')

        //regulation group
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid').find('.dx-datagrid-rowsview').find('tr > td').first().click().wait(500)
        
        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('[aria-rowindex="1"] > .dx-command-select > .dx-widget > .dx-checkbox-container > .dx-checkbox-icon').click({force:true}).wait(500)

        cy.get('[icon="save"]').eq(0).click().wait(1000)

        cy.contains('The Firm Mitigation Measure has been added').wait(1000)
    })

    it('Edits a Firm Mitigation Measure', () => {

        cy.get('#gridFirmMitigationActions tr .dx-first-cell .dx-texteditor-input').type('Test DKA', {force:true}).wait(2000)
        cy.get('#gridFirmMitigationActions tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.getByFormControlName('name').eq(1).clear().wait(200).type('Test Mitigation Measure DKA')
        
        cy.get('dx-drop-down-box').eq(3).click().wait(500)
        cy.get('[aria-rowindex="1"] > .dx-command-select > .dx-widget > .dx-checkbox-container > .dx-checkbox-icon').click({force:true}).wait(500)
        
        cy.get('[icon="save"]').eq(1).click().wait(1000)
        
        cy.contains(`The Firm Mitigation Measure has been modified.`).wait(1000)
    })

    it('Deletes a Firm Mitigation Measure', () => {

        cy.get('#gridFirmMitigationActions tr .dx-first-cell .dx-texteditor-input').type('Test Mitigation Measure DKA', {force:true}).wait(2000)
        cy.get('#gridFirmMitigationActions tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The firm mitigation measure has been deleted.`).wait(1000)
    })

})