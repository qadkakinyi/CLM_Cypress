describe('Taansaction Screening Audit TRail Setup', ()=>{
    it('should setup Audit logs for Auto Status Changes', () => {
        cy.visit('/administration/field-log-setups').wait(2000)

        cy.contains('sa-button', 'Add').click().wait(1000)
        
        cy.get('app-add-field-log-setup dx-drop-down-box').eq(0).click().wait(300)
        cy.contains('.dx-popup-wrapper #dynamicSelectBoxDropdownGrid tr td', 'Default').click().wait(500)
        cy.get('app-add-field-log-setup dx-drop-down-box').eq(1).click().wait(300)
        cy.get('.dx-popup-wrapper .dx-texteditor-input-container input').type('TransactionScreeningCase').wait(1000)
        cy.contains('.dx-popup-wrapper #dynamicSelectBoxDropdownGrid tr[aria-rowindex="2"] td', 'TransactionScreeningCase').click().wait(500)
        cy.get('app-add-field-log-setup dx-drop-down-box').eq(2).click().wait(300)
        cy.contains('.dx-popup-wrapper #dynamicSelectBoxDropdownGrid tr td', 'AutoStatus').click().wait(500)
        cy.get('#addFieldLogSetupForm > .custom-backround-transparent [icon="save"] > .sa-button').click()
        
        cy.contains(/(The field already exists|Audit Trail setup has been added.)/i)
    });

    it('should setup Audit logs for Case Status Changes', () => {
        cy.visit('/administration/field-log-setups').wait(2000)

        cy.contains('sa-button', 'Add').click().wait(1000)

        cy.get('app-add-field-log-setup dx-drop-down-box').eq(0).click().wait(300)
        cy.contains('.dx-popup-wrapper #dynamicSelectBoxDropdownGrid tr td', 'Default').click().wait(500)
        cy.get('app-add-field-log-setup dx-drop-down-box').eq(1).click().wait(300)
        cy.get('.dx-popup-wrapper .dx-texteditor-input-container input').type('TransactionScreeningCase').wait(1000)
        cy.contains('.dx-popup-wrapper #dynamicSelectBoxDropdownGrid tr[aria-rowindex="2"] td', 'TransactionScreeningCase').click().wait(500)
        cy.get('app-add-field-log-setup dx-drop-down-box').eq(2).click().wait(300)
        cy.contains('.dx-popup-wrapper #dynamicSelectBoxDropdownGrid tr td', 'CaseStatus').click().wait(500)
        cy.get('#addFieldLogSetupForm > .custom-backround-transparent [icon="save"] > .sa-button').click()

        cy.contains(/(The field already exists|Audit Trail setup has been added.)/i)
    });
})