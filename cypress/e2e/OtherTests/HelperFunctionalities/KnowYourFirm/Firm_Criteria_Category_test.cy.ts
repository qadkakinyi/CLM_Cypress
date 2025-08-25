import {faker} from "@faker-js/faker";

/**
 * @testSuite Firm Criteria Categories
 * @description Covers adding, editing, and deleting firm criteria categories in the system settings.
 */
describe('Firm Criteria Categories', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/firm-criteria-categories').wait(2000)
    })

    /**
     * @scenario Add a Firm Criteria Category
     * @description Verifies that a new firm criteria category can be added with valid details.
     * @steps
     *  1. Navigate to Firm Criteria Categories.
     *  2. Click "Add" and fill in required details.
     *  3. Save the category.
     * @expectedResult The firm criteria category should be successfully added.
     */
    it('Adds a Criteria Category', ()=>{
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type('Test DKA')

        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid').find('.dx-datagrid-rowsview').find('tr > td').first().click().wait(500)

        cy.get('#addFirmCriteriaCategoryForm [icon="save"] > .sa-button').click().wait(1000)

        cy.contains('The Firm Criteria Category has been added').wait(1000)
    })

    /**
     * @scenario Edit a Firm Criteria Category
     * @description Ensures an existing firm criteria category can be updated successfully.
     * @steps
     *  1. Search for the target firm criteria category.
     *  2. Edit the category name.
     *  3. Save the changes.
     * @expectedResult The firm criteria category should be successfully updated.
     */
    it('Edits a Criteria Category', () => {
        cy.get('#gridFirmCriteriaCategories tr .dx-first-cell .dx-texteditor-input').type('Test DKA', {force:true}).wait(2000)
        cy.get('#gridFirmCriteriaCategories tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridFirmCriteriaCategories .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('criteria')

        cy.get('@criteria').eq(3).clear().wait(1000).type('DKA Test Criterion Category', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`The firm criteria category has been updated.`).wait(1000)
    })

    /**
     * @scenario Delete a Firm Criteria Category
     * @description Validates that an existing firm criteria category can be deleted.
     * @steps
     *  1. Search for the target firm criteria category.
     *  2. Delete and confirm.
     * @expectedResult The firm criteria category should be successfully deleted.
     */
    it('Deletes a Criteria Category', () => {
        cy.get('#gridFirmCriteriaCategories tr .dx-first-cell .dx-texteditor-input').type('DKA Test Criterion Category', {force:true}).wait(2000)
        cy.get('#gridFirmCriteriaCategories tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The firm criteria category has been deleted.`).wait(1000)
    })

})

