describe('Report Engine Setups', ()=>{
    it('Adds a Report Engine Setups', ()=>{
        cy.visit('/settings/report-engine-setups').wait(2000)
        cy.contains('Add').click().wait(1000)
        cy.getByFormControlName('name').type('Test Engine DKA')

        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').eq(0).click({force:true}).wait(500)

        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content').eq(1).find('tr td').eq(0).click({force:true}).wait(500)
        
        cy.getByFormControlName('resultProperties').click().wait(500)
        
        cy.get('.item2 > li').eq(0).click().wait(500)

        cy.get('[icon="save"]').click().wait(1000)

        cy.contains('Report has been added').wait(1000)
    })

    it('Edits a Report Engine Setups', () => {
        cy.visit('/settings/report-engine-setups').wait(2000)
        cy.get('#gridReportEngineSetups tr .dx-first-cell .dx-texteditor-input').type('Test Engine DKA', {force:true}).wait(2000)
        cy.get('#gridReportEngineSetups tr td').find('.dx-icon-chevrondoubleright').eq(0).click({force:true}).wait(2000)

        cy.getByFormControlName('name').clear().wait(1000).type('Test Engine DKA Edited')

        cy.getBySel('saveAndCloseButton').click().wait(1000)

        cy.contains(`Report has been updated.`).wait(1000)
    })

    it('Deletes a Report Engine Setups', () => {
        cy.visit('/settings/report-engine-setups').wait(2000)
        cy.get('#gridReportEngineSetups tr .dx-first-cell .dx-texteditor-input').type('Test Engine DKA Edited', {force:true}).wait(2000)
        cy.get('#gridReportEngineSetups tr td').find('.dx-icon-chevrondoubleright').eq(0).click({force:true}).wait(1000)

        cy.contains('sa-button', 'Delete').click().wait(500)

        cy.get('#bot2-Msg1').click({force: true}).wait(1000);

        cy.contains(`Report engine setup has been deleted.`).wait(1000)
    })
})