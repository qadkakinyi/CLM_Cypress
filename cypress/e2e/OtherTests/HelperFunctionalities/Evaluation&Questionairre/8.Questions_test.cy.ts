import {faker} from "@faker-js/faker";

/**
 * @testSuite Questions
 * @description Covers adding, editing, and deleting questions, as well as related questionnaire categories and types.
 */
describe('Questions', ()=>{

    /**
     * @scenario Add a Question
     * @description Verifies that a new question can be added with valid details including category, client type, capacities, and risk points.
     * @steps
     *  1. Navigate to Questions settings.
     *  2. Click "Add" and fill in all required question details.
     *  3. Save the question.
     * @expectedResult The question should be successfully added.
     */
    it('Adds a Question', ()=>{
        cy.visit('/settings/questions').wait(2000)
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type('Are you a Forex Trader?')
        cy.getByDataCy('regulation-group-list').click()
        cy.get('#dynamicSelectBoxDropdownGrid').find('.dx-datagrid-rowsview').find('tr > td').first().click()
        cy.getByFormControlName('questionsCategoryId').click()
        cy.get('.dx-popup-content .dx-scrollable-container').contains('DKA Edited Closed Ended Questions').click()
        cy.getByDataCy('client-type').click()
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-content>table tr>td').contains('Individual').click()
        cy.getByDataCy('question-setup-type').click()
        cy.get('.dx-overlay-content .dx-datagrid-rowsview').contains('List of Answers').click().wait(500)
        cy.getByFormControlName('order').type(`1`)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(12))
        // This causes an error when deleting unless the relationship is removed first
        cy.getByFormControlName('capacities').click().wait(200)
        cy.get('.dropdown-list .item2 li').eq(0).click().wait(200)
        cy.getByFormControlName('riskPoint').type('4')

        cy.getByDataCy('save-question').click()
        cy.wait(2000)

        cy.contains('Question has been added').wait(1000)
    })

    /**
     * @scenario Edit a Question
     * @description Ensures an existing question can be updated including status and capacity unlinking.
     * @steps
     *  1. Search for the target question.
     *  2. Edit question details and unlink capacities.
     *  3. Save changes.
     * @expectedResult The question should be updated successfully.
     */
    it('Edits a Question', () => {
        cy.visit('/settings/questions').wait(2000)
        cy.get('#gridQuestions tr .dx-first-cell .dx-texteditor-input').type('Are you a Forex Trader?', {force:true}).wait(2000)
        cy.get('#gridQuestions tr td').find('.fa-angle-double-right').eq(0).click({force:true}).wait(2000)

        cy.getByFormControlName('name').clear().type('Are you a Legit Forex Trader?').wait(500)
        // Status disable
        cy.get('dx-drop-down-box').eq(3).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains('Disabled').click({force:true}).wait(500)
        // Capacities unlink
        cy.getByFormControlName('capacities').eq(0).click().wait(200)
        cy.get('.dropdown-list .item2 li').eq(0).click().wait(200)

        cy.getBySel('saveAndCloseButton').click()

        cy.poll(`Question has been updated.`).wait(1000)
    })

    /**
     * @scenario Delete a Question
     * @description Validates that an existing question can be deleted after all related dependencies are cleared.
     * @steps
     *  1. Search for the target question.
     *  2. Delete and confirm.
     * @expectedResult The question should be deleted successfully.
     */
    it('Deletes a Question', () => {
        cy.visit('/settings/questions').wait(2000)
        cy.get('#gridQuestions tr .dx-first-cell .dx-texteditor-input').type('Are you a Legit Forex Trader?', {force:true}).wait(3000)
        cy.get('#gridQuestions tr td').find('.fa-angle-double-right').eq(0).click({force:true}).wait(2000)

        cy.get('[icon="trash"]').eq(0).click().wait(1000)
        cy.get('#bot2-Msg1').contains('Yes').click().wait(1000)

        cy.contains(`Question has been deleted.`).wait(1000)
    })

    /**
     * @scenario Delete a Question Category
     * @description Ensures a question category can be deleted after questions related to it are removed.
     * @steps
     *  1. Search for the target question category.
     *  2. Delete and confirm.
     * @expectedResult The question category should be deleted successfully.
     */
    it('Deletes a Question Category', () => {
        cy.visit('/settings/questions-categories').wait(2000)
        cy.get('#gridQuestionsCategories tr .dx-first-cell .dx-texteditor-input').type('DKA Edited Closed Ended Questions', {force:true}).wait(2000)
        cy.get('#gridQuestionsCategories tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`Questions category has been deleted.`).wait(1000)
    })

    /**
     * @scenario Delete a Questionnaire Type
     * @description Validates that a questionnaire type can be deleted after dependent categories and questions are removed.
     * @steps
     *  1. Search for the target questionnaire type.
     *  2. Delete and confirm.
     * @expectedResult The questionnaire type should be deleted successfully.
     */
    it('Deletes a Questionnaire Type', () => {
        cy.visit('/settings/questionnaire-types').wait(2000)
        cy.get('#gridQuestionnaireTypes tr .dx-first-cell .dx-texteditor-input').type('Questionnaire Type DKA Updated', {force:true}).wait(2000)
        cy.get('#gridQuestionnaireTypes tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The questionnaire type has been deleted.`).wait(1000)
    })
})

