/**
 * @testSuite Report Engine Setups
 * @description Covers adding, editing, and deleting report engine setup configurations in system settings.
 * @priority Medium
 * @owner QA Team
 * @tags reports, setup, configuration
 */

describe('Report Engine Setups', () => {

    /**
     * @scenario Add Report Engine Setup
     * @description Creates a new report engine setup with name, type, template, and result properties.
     * @steps
     *  1. Navigate to Report Engine Setups settings page.
     *  2. Click the Add button.
     *  3. Enter the report engine setup name.
     *  4. Select a report type from the first dropdown.
     *  5. Select a template from the second dropdown.
     *  6. Open Result Properties and select a property.
     *  7. Save the new setup.
     * @expectedResult A confirmation message "Report has been added" is displayed.
     */
    it('Adds a Report Engine Setups', () => {
        cy.visit('/settings/report-engine-setups').wait(2000)
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').type('Test Engine DKA')

        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td')
            .eq(0).click({ force: true }).wait(500)

        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content')
            .eq(1).find('tr td').eq(0).click({ force: true }).wait(500)

        cy.getByFormControlName('resultProperties').click().wait(500)
        cy.get('.item2 > li').eq(0).click().wait(500)

        cy.get('#addReportEngineSetupForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button')
            .click().wait(1000)

        cy.contains('Report has been added').wait(1000)
    })

    /**
     * @scenario Edit Report Engine Setup
     * @description Searches for an existing setup, updates the name, and saves changes.
     * @steps
     *  1. Navigate to Report Engine Setups.
     *  2. Search for the setup by name.
     *  3. Open the setup details.
     *  4. Change the name to "Test Engine DKA Edited".
     *  5. Save and close.
     * @expectedResult A confirmation message "Report has been updated." is displayed.
     */
    it('Edits a Report Engine Setups', () => {
        cy.visit('/settings/report-engine-setups').wait(2000)
        cy.get('#gridReportEngineSetups tr .dx-first-cell .dx-texteditor-input')
            .type('Test Engine DKA', { force: true }).wait(2000)
        cy.get('#gridReportEngineSetups tr td').find('.dx-icon-chevrondoubleright')
            .eq(0).click({ force: true }).wait(2000)

        cy.getByFormControlName('name').clear().wait(1000).type('Test Engine DKA Edited')

        cy.getBySel('saveAndCloseButton').click().wait(1000)

        cy.contains(`Report has been updated.`).wait(1000)
    })

    /**
     * @scenario Delete Report Engine Setup
     * @description Deletes an existing report engine setup.
     * @steps
     *  1. Navigate to Report Engine Setups.
     *  2. Search for the setup by edited name.
     *  3. Open the setup details.
     *  4. Click Delete and confirm the action.
     * @expectedResult A confirmation message "Report engine setup has been deleted." is displayed.
     */
    it('Deletes a Report Engine Setups', () => {
        cy.visit('/settings/report-engine-setups').wait(2000)
        cy.get('#gridReportEngineSetups tr .dx-first-cell .dx-texteditor-input')
            .type('Test Engine DKA Edited', { force: true }).wait(2000)
        cy.get('#gridReportEngineSetups tr td').find('.dx-icon-chevrondoubleright')
            .eq(0).click({ force: true }).wait(1000)

        cy.contains('sa-button', 'Delete').click().wait(500)
        cy.get('#bot2-Msg1').click({ force: true }).wait(1000)

        cy.contains(`Report engine setup has been deleted.`).wait(1000)
    })

})

