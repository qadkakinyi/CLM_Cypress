/**
 * @testSuite Transaction Screening Audit Trail Setup
 * @description Ensures audit trail setups exist for Transaction Screening Case fields: AutoStatus and CaseStatus.
 * @priority Medium
 * @owner QA Team
 * @tags regression, administration, audit-trail, configuration
 * @dependencies cypress
 * @fileDescription Adds Field Log Setups for TransactionScreeningCase.AutoStatus and TransactionScreeningCase.CaseStatus, tolerating "already exists" responses.
 */

describe('Transaction Screening Audit TRail Setup', ()=>{
    /**
     * @scenario Configure Audit Trail for Auto Status
     * @description Adds a field log setup entry for TransactionScreeningCase → AutoStatus under the Default context.
     * @priority Medium
     * @steps
     * 1) Visit /administration/field-log-setups.
     * 2) Click Add.
     * 3) Select Context = Default.
     * 4) Select Entity = TransactionScreeningCase.
     * 5) Select Field = AutoStatus.
     * 6) Save and accept either success or “already exists”.
     * @expectedResult A setup exists for AutoStatus (either newly added or already present).
     */
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

    /**
     * @scenario Configure Audit Trail for Case Status
     * @description Adds a field log setup entry for TransactionScreeningCase → CaseStatus under the Default context.
     * @priority Medium
     * @steps
     * 1) Visit /administration/field-log-setups.
     * 2) Click Add.
     * 3) Select Context = Default.
     * 4) Select Entity = TransactionScreeningCase.
     * 5) Select Field = CaseStatus.
     * 6) Save and accept either success or “already exists”.
     * @expectedResult A setup exists for CaseStatus (either newly added or already present).
     */
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

