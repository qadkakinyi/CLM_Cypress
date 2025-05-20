//THIS TEST IS NO LONGER VALID AS THIS FUNCTIONALITY HAS BEEN REMOVED
describe.skip('Firm Sanction Mitigation Measures', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/firm-sanction-mitigation-measures').wait(2000)
    })

    it('Adds a Firm Sanction Mitigation Measure', ()=>{

        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('Sanction Mitigation Measure DKA')

        //regulation group
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid').find('.dx-datagrid-rowsview').find('tr > td').first().click().wait(500)

        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('[aria-rowindex="1"] > .dx-command-select > .dx-widget > .dx-checkbox-container > .dx-checkbox-icon').click({force:true}).wait(500)

        cy.get('#addFirmMitigationActionForm [icon="save"]').eq(0).click().wait(1000)

        cy.contains('The Firm Mitigation Measure has been added').wait(1000)
    })
    
    it('Edits a firm sanction mitigation measure', ()=>{
        cy.get('#gridFirmSanctionMitigationActions tr .dx-first-cell .dx-texteditor-input').type('Sanction Mitigation Measure DKA', {force:true}).wait(2000)
        cy.get('.dx-icon-edit').first().click({force:true}).wait(1000)
        
        cy.getByFormControlName('name').eq(1).type(' Edited')
        cy.get('#editFirmMitigationActionForm [icon="save"]').eq(0).click().wait(1000)

        cy.contains('The Firm Mitigation Measure has been modified').wait(1000)
    })

    it('should delete a firm mitigation', () => {
        cy.get('#gridFirmSanctionMitigationActions tr .dx-first-cell .dx-texteditor-input').type('Sanction Mitigation Measure DKA', {force:true}).wait(2000)
        cy.get('.dx-icon-trash').first().click({force:true}).wait(1000)
        cy.get('.dx-overlay-content').contains('Yes').click({force:true}).wait(500)
        cy.contains('The firm mitigation measure has been deleted').wait(1000)
    });

})
