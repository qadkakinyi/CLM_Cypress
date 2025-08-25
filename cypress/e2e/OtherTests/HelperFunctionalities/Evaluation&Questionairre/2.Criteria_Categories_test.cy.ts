/**
 * @testSuite Criteria Categories
 * @description Tests adding and editing criteria categories in the settings section.
 * @priority Medium
 * @owner QA Team
 * @tags regression, criteria-categories
 */

import {faker} from "@faker-js/faker";

describe('Criteria Categories', ()=>{

    /**
     * @setup Navigate to Criteria Categories settings before each test
     * @steps Visit the Criteria Categories settings page
     * @expectedResult Page loads successfully for each test
     */
    beforeEach(()=>{
        cy.visit('/settings/criteria-categories').wait(2000)
    })

    /**
     * @scenario Add Criteria Category
     * @steps Click Add button
     * @steps Fill in Category name and mapping reference
     * @steps Save the Category
     * @expectedResult Criteria category is successfully added
     */
    it('Adds Criteria Category', ()=>{
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('Test Category DKA')
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13))

        cy.get('#addCriteriaCategoryForm [icon="save"] > .sa-button').click().wait(2000)
        cy.contains('Criteria category has been added')
    })

    /**
     * @scenario Edit Criteria Category
     * @steps Search for the existing Criteria Category by name
     * @steps Click the edit icon
     * @steps Modify the Category name
     * @steps Save the updated Category
     * @expectedResult Criteria category name is updated successfully
     */
    it('Edits a criteria category', () => {
        cy.get('#gridCriteriaCategories tr .dx-first-cell .dx-texteditor-input')
            .type('Test Category DKA', {force:true}).wait(2000)
        cy.get('#gridCriteriaCategories tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridCriteriaCategories .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input')
            .as('categories')

        cy.get('@categories').eq(4).clear().wait(1000).type('DKA Test Category', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`The criteria category has been updated.`).wait(1000)
    })

})

