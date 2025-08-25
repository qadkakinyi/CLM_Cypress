/**
 * @testSuite Dynamic Report Engine Setups
 * @description Covers creation, modification, and deletion of dynamic report setups and related email templates
 * @priority Medium
 * @owner QA Team
 * @tags reporting, email, configuration
 */

describe('Dynamic Report Engine Setups', () => {

    before(() => {
        /**
         * @scenario Precondition - Add Email Template
         * @description Creates an email template to be linked with a dynamic report setup
         * @steps
         *  1. Navigate to Email Templates page
         *  2. Click "Add"
         *  3. Fill out Subject, select related Intro/Ending, and type email body
         *  4. Save the template
         * @expectedResult Email template is saved successfully
         */
        cy.visit('/settings/email-templates').wait(2000);

        cy.contains('sa-button', 'Add').click().wait(1000);
        cy.get('app-add-email-template');
        cy.getByFormControlName('subject').type('DKA Email Test');
        cy.get('dx-drop-down-box').eq(0).click().wait(1500);
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td')
            .eq(0).click({ force: true }).wait(500);
        cy.get('ngx-editor > div > div').wait(500).type('This is a test email template');
        cy.get('app-add-email-template').contains('sa-button', 'Save').click().wait(2000);
        // cy.contains('Email Template has been added')
    });

    /**
     * @scenario Add Dynamic Report Setup
     * @description Adds a new dynamic report setup with linked entities
     * @steps
     *  1. Navigate to Dynamic Report Engine Setups
     *  2. Click "Add"
     *  3. Select first drop-down option
     *  4. Select second drop-down option
     *  5. Select email template "DKA Email Test"
     *  6. Save
     * @expectedResult Dynamic report setup is successfully added
     */
    it('Adds Dynamic Report Setup', () => {
        cy.visit('/settings/dynamic-report-engine-setups').wait(2000);
        cy.contains('sa-button', 'Add').click().wait(1000);
        cy.get('dx-drop-down-box').eq(0).click().wait(500);
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td')
            .eq(0).click({ force: true }).wait(2000);

        cy.get('dx-drop-down-box').eq(1).click().wait(500);
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content').eq(1)
            .find('tr td').eq(0).click({ force: true }).wait(500);

        cy.get('dx-drop-down-box').eq(2).click().wait(500);
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td')
            .contains('DKA Email Test').click({ force: true }).wait(500);

        cy.get('#addDynamicReportEngineSetupForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button')
            .click().wait(1000);
        cy.contains('The Dynamic report setup has been added').wait(2000);
    });

    /**
     * @scenario Edit Dynamic Report Setup
     * @description Updates the status of an existing dynamic report setup
     * @steps
     *  1. Navigate to Dynamic Report Engine Setups
     *  2. Expand the last setup
     *  3. Change status to "Inactive"
     *  4. Save changes
     * @expectedResult Dynamic report setup is updated successfully
     */
    it('Edits a Dynamic Report Setup', () => {
        cy.visit('/settings/dynamic-report-engine-setups').wait(2000);
        cy.get('#gridDynamicReportEngineSetups .dx-icon-chevrondoubleright').last().click().wait(1000);

        cy.get('#dynamicReportEngineSetupForm');
        cy.get('dx-drop-down-box').eq(1).click().wait(500);
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td')
            .contains('Inactive').click({ force: true }).wait(500);

        cy.getBySel('saveAndCloseButton').click().wait(2000);
        cy.contains('The Dynamic Report Engine Setup has been updated');
    });

    /**
     * @scenario Delete Dynamic Report Setup
     * @description Deletes the most recent dynamic report setup
     * @steps
     *  1. Navigate to Dynamic Report Engine Setups
     *  2. Click delete icon for the last setup
     *  3. Confirm deletion
     * @expectedResult Dynamic report setup is deleted successfully
     */
    it('Deletes a Dynamic Report Setup', () => {
        cy.visit('/settings/dynamic-report-engine-setups').wait(2000);
        cy.get('#gridDynamicReportEngineSetups .dx-icon-trash').last().click().wait(1000);
        cy.get('.dx-popup-normal').contains('Yes').click({ force: true }).wait(1000);

        cy.contains(`The Dynamic Report Setup has been deleted`).wait(1000);
    });

    /**
     * @scenario Cleanup - Delete Email Template
     * @description Deletes the email template created in precondition
     * @steps
     *  1. Navigate to Email Templates
     *  2. Search for "DKA Email Test"
     *  3. Expand the entry
     *  4. Click Delete
     *  5. Confirm deletion
     * @expectedResult Email template is deleted successfully
     */
    it('Deletes an Email Template', () => {
        cy.visit('/settings/email-templates').wait(2000);
        cy.get('#gridCustomFields tr .dx-first-cell .dx-texteditor-input').type('DKA Email Test', { force: true }).wait(2000);
        cy.get('#gridCustomFields tr td').find('.fa-angle-double-right').eq(0).click({ force: true }).wait(1000);

        cy.contains('sa-button', 'Delete').click().wait(500);
        cy.get('#bot2-Msg1').click({ force: true }).wait(1000);

        cy.contains(`Email template has been deleted.`).wait(1000);
    });
});

