import {faker} from "@faker-js/faker";

/**
 * @testSuite Firm Criteria
 * @description Covers adding, editing, and deleting firm criteria in the system settings.
 */
describe('Firm Criteria', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/firm-criteria').wait(2000)
    })

    /**
     * @scenario Add a Firm Criteria
     * @description Verifies that a new firm criterion can be created with valid details.
     * @steps
     *  1. Navigate to Firm Criteria settings.
     *  2. Click "Add" and fill in the name, related dropdowns, and selections.
     *  3. Save the criterion.
     * @expectedResult The firm criterion should be successfully added.
     */
    it('Adds a Firm Criteria', ()=>{
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type('Test DKA')

        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid').find('.dx-datagrid-rowsview').find('tr > td').first().click().wait(500)

        cy.getByFormControlName('firmCriterionCategoryId').select('Delivery Channel')

        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains('Audit Services').click({force:true}).wait(500)

        cy.get('#addFirmCriterionForm [icon="save"] > .sa-button').click().wait(1000)

        cy.contains('The firm criterion has been added').wait(1000)
    })

    /**
     * @scenario Edit a Firm Criteria
     * @description Ensures that an existing firm criterion can be updated successfully.
     * @steps
     *  1. Search for the target firm criterion.
     *  2. Edit the criterion name.
     *  3. Save the changes.
     * @expectedResult The firm criterion should be successfully updated.
     */
    it('Edits a Firm Criteria', () => {
        cy.get('#gridFirmCriteria tr .dx-first-cell .dx-texteditor-input').type('Test DKA', {force:true}).wait(2000)
        cy.get('#gridFirmCriteria tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridFirmCriteria .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('criteria')
        cy.get('@criteria').eq(6).clear().wait(1000).type('DKA Test Criterion', {force: true}).wait(1000)
        cy.get('.dx-datagrid-table > tbody > .dx-edit-row > .dx-command-edit > .dx-link-save').eq(1).click().wait(1500)

        cy.contains(`The firm criterion has been updated.`).wait(1000)
    })

    /**
     * @scenario Delete a Firm Criteria
     * @description Validates that an existing firm criterion can be deleted.
     * @steps
     *  1. Search for the target firm criterion.
     *  2. Delete and confirm.
     * @expectedResult The firm criterion should be successfully deleted.
     */
    it('Deletes a Firm Criteria', () => {
        cy.get('#gridFirmCriteria tr .dx-first-cell .dx-texteditor-input').type('DKA Test Criterion', {force:true}).wait(2000)
        cy.get('#gridFirmCriteria tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The firm criterion has been deleted.`).wait(1000)
    })

})

