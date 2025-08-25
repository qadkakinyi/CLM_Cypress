import {faker} from "@faker-js/faker";

/**
 * @testSuite Questionnaire Categories
 * @description Covers adding and editing questionnaire categories in the settings section.
 */
describe('Questionnaire Categories', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/questions-categories').wait(2000)
    })

    /**
     * @scenario Add a Questionnaire Category
     * @description Verifies that a new questionnaire category can be added with valid details.
     * @steps
     *  1. Navigate to Questionnaire Categories settings.
     *  2. Click "Add" and fill in category name, mapping reference, questionnaire type, and weight.
     *  3. Save the new category.
     * @expectedResult The questionnaire category should be successfully added.
     */
    it('Adds a Question Category', ()=>{
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByDataCy('question-category-name').type('Closed Ended Questions')
        cy.getByDataCy('question-category-mapping-reference').type(faker.string.alphanumeric(15))
        cy.getByDataCy('questionnaire-type-options').click()
        cy.get('.multiselect-item-checkbox').contains('Questionnaire Type DKA Updated').click().wait(500)
        cy.getByDataCy('question-weight').type('4')
        cy.getByDataCy('save-question-category').click()
        cy.wait(500)

        cy.contains('Questions category has been added').wait(1000)
    })

    /**
     * @scenario Edit a Questionnaire Category
     * @description Ensures an existing questionnaire category can be updated.
     * @steps
     *  1. Search for the target questionnaire category.
     *  2. Edit its name and save the changes.
     * @expectedResult The questionnaire category should be updated successfully.
     */
    it('Edits a Question Category', () => {
        cy.get('#gridQuestionsCategories tr .dx-first-cell .dx-texteditor-input').type('Closed Ended Questions', {force:true}).wait(2000)
        cy.get('#gridQuestionsCategories tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridQuestionsCategories .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('categories')

        cy.get('@categories').eq(4).clear().wait(1000).type('DKA Edited Closed Ended Questions', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`Questions category has been updated.`).wait(1000)
    })

    // /**
    //  * @scenario Delete a Questionnaire Category
    //  * @description Validates that a questionnaire category can be deleted.
    //  * @steps
    //  *  1. Search for the target questionnaire category.
    //  *  2. Click delete and confirm the action.
    //  * @expectedResult The questionnaire category should be deleted successfully.
    //  */
    // it.skip('Deletes a Question Category', () => {
    //     cy.visit('/settings/questions-categories').wait(2000)
    //     cy.get('#gridQuestionsCategories tr .dx-first-cell .dx-texteditor-input').type('Closed Ended Questions DKA Edited', {force:true}).wait(2000)
    //     cy.get('#gridQuestionsCategories tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
    //     cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);
    //
    //     cy.contains(`Questions category has been deleted.`).wait(1000)
    // })
})

