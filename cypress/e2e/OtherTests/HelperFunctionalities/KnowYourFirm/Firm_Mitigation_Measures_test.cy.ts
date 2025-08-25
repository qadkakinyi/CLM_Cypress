/**
 * @testSuite Firm Mitigation Measures
 * @description Validates adding, editing, and deleting firm mitigation measures in the settings section.
 */
describe('Firm Mitigation Measures', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/firm-mitigation-measures').wait(2000)
    })

    /**
     * @scenario Add a Firm Mitigation Measure
     * @description Verifies a new mitigation measure can be created with valid details.
     * @steps
     *  1. Navigate to Firm Mitigation Measures.
     *  2. Click "Add", enter the name, select the regulation group, and choose relevant options.
     *  3. Save the mitigation measure.
     * @expectedResult The firm mitigation measure is successfully added.
     */
    it('Adds a Firm Mitigation Measure', ()=>{
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('Test DKA')

        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid').find('.dx-datagrid-rowsview').find('tr > td').first().click().wait(500)

        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('[aria-rowindex="1"] > .dx-command-select > .dx-widget > .dx-checkbox-container > .dx-checkbox-icon').click({force:true}).wait(500)

        cy.get('#addFirmMitigationActionForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(1000)
        cy.contains('The Firm Mitigation Measure has been added').wait(1000)
    })

    /**
     * @scenario Edit a Firm Mitigation Measure
     * @description Ensures an existing mitigation measure can be modified.
     * @steps
     *  1. Search for the mitigation measure.
     *  2. Update the name and modify related options.
     *  3. Save the changes.
     * @expectedResult The firm mitigation measure is successfully updated.
     */
    it('Edits a Firm Mitigation Measure', () => {
        cy.get('#gridFirmMitigationActions tr .dx-first-cell .dx-texteditor-input').type('Test DKA', {force:true}).wait(2000)
        cy.get('#gridFirmMitigationActions tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.getByFormControlName('name').eq(1).clear().wait(200).type('Test Mitigation Measure DKA')

        cy.get('dx-drop-down-box').eq(3).click().wait(500)
        cy.get('[aria-rowindex="1"] > .dx-command-select > .dx-widget > .dx-checkbox-container > .dx-checkbox-icon').click({force:true}).wait(500)

        cy.get('#editFirmMitigationActionForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(1000)
        cy.contains(`The Firm Mitigation Measure has been modified.`).wait(1000)
    })

    /**
     * @scenario Delete a Firm Mitigation Measure
     * @description Confirms a mitigation measure can be removed.
     * @steps
     *  1. Search for the mitigation measure.
     *  2. Click delete and confirm.
     * @expectedResult The firm mitigation measure is successfully deleted.
     */
    it('Deletes a Firm Mitigation Measure', () => {
        cy.get('#gridFirmMitigationActions tr .dx-first-cell .dx-texteditor-input').type('Test Mitigation Measure DKA', {force:true}).wait(2000)
        cy.get('#gridFirmMitigationActions tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000)

        cy.contains(`The firm mitigation measure has been deleted.`).wait(1000)
    })

})

