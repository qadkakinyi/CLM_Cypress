describe('Dynamic Report Engine Setups', ()=>{
    before(()=>{
        //add email template
        cy.visit('/settings/email-templates').wait(2000)

        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.get('app-add-email-template')
        cy.getByFormControlName('subject').type('DKA Email Test')
        cy.get('dx-drop-down-box').eq(0).click().wait(1500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').eq(0).click({force:true}).wait(500)
        cy.get('ngx-editor > div > div').wait(500).type('This is a test email template')
        cy.get('app-add-email-template').contains('sa-button', 'Save').click().wait(2000)
        // cy.contains('Email Template has been added')
    })
    
    it('Adds Dynamic Report Setup', ()=>{
        cy.visit('/settings/dynamic-report-engine-setups').wait(2000)
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').eq(0).click({force:true}).wait(2000)
        
        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content').eq(1).find('tr td').eq(0).click({force:true}).wait(500)
        
        cy.get('dx-drop-down-box').eq(2).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains('DKA Email Test').click({force:true}).wait(500)

        cy.get('#addDynamicReportEngineSetupForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(1000)
        cy.contains('The Dynamic report setup has been added').wait(2000)
    })
    
    it('Edits a Dynamic Report Setup', ()=>{
        cy.visit('/settings/dynamic-report-engine-setups').wait(2000)
        cy.get('#gridDynamicReportEngineSetups .dx-icon-chevrondoubleright').last().click().wait(1000)
        
        cy.get('#dynamicReportEngineSetupForm')
        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains('Inactive').click({force:true}).wait(500)

        cy.getBySel('saveAndCloseButton').click().wait(2000)
        cy.contains('The Dynamic Report Engine Setup has been updated')
    })
    
    it('Deletes a Dynamic Report Setup', ()=>{
        cy.visit('/settings/dynamic-report-engine-setups').wait(2000)
        cy.get('#gridDynamicReportEngineSetups .dx-icon-trash').last().click().wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The Dynamic Report Setup has been deleted`).wait(1000)
    })

    it('Deletes an Email Template', () => {
        cy.visit('/settings/email-templates').wait(2000)
        cy.get('#gridCustomFields tr .dx-first-cell .dx-texteditor-input').type('DKA Email Test', {force:true}).wait(2000)
        cy.get('#gridCustomFields tr td').find('.fa-angle-double-right').eq(0).click({force:true}).wait(1000)

        cy.contains('sa-button', 'Delete').click().wait(500)

        cy.get('#bot2-Msg1').click({force: true}).wait(1000);

        cy.contains(`Email template has been deleted.`).wait(1000)
    })
})