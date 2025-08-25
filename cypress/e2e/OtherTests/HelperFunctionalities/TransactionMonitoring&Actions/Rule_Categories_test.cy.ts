import {faker} from "@faker-js/faker";

/**
 * @testSuite Rule Categories
 * @description Covers creation, editing, and deletion of rule categories
 * @priority Medium
 * @owner QA Team
 * @tags rules, categories, configuration
 */

describe('Rule Categories', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/rule-categories').wait(2000)
    })

    /**
     * @scenario Add Rule Category
     * @description Adds a new rule category with a generated mapping reference
     * @steps
     *  1. Navigate to Rule Categories page
     *  2. Click "Add"
     *  3. Type name and mapping reference
     *  4. Click Save
     * @expectedResult Rule category is added successfully
     */
    it('Adds an Rule Category', ()=>{
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('Rule Test DKA')
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13))

        cy.get('#addRuleCategoryForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(1000)
        cy.contains('Rule category has been added')
    })

    /**
     * @scenario Edit Rule Category
     * @description Modifies the name of the existing rule category
     * @steps
     *  1. Search for "Rule Test DKA"
     *  2. Click edit icon
     *  3. Change the name to "DKA Test Rule"
     *  4. Save changes
     * @expectedResult Rule category is updated successfully
     */
    it('Edits an Rule Category', () => {
        cy.get('#gridRuleCategories tr .dx-first-cell .dx-texteditor-input').type('Rule Test DKA', {force:true}).wait(2000)
        cy.get('#gridRuleCategories tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridRuleCategories .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('categories')

        cy.get('@categories').eq(3).clear().wait(1000).type('DKA Test Rule', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`The rule category has been updated.`).wait(1000)
    })

    /**
     * @scenario Delete Rule Category
     * @description Deletes a rule category by name
     * @steps
     *  1. Search for "DKA Test Rule"
     *  2. Click delete icon
     *  3. Confirm deletion
     * @expectedResult Rule category is deleted successfully
     */
    it('Deletes an Rule Category', () => {
        cy.get('#gridRuleCategories tr .dx-first-cell .dx-texteditor-input').type('DKA Test Rule', {force:true}).wait(2000)
        cy.get('#gridRuleCategories tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The rule category has been deleted.`).wait(1000)
    })
})

