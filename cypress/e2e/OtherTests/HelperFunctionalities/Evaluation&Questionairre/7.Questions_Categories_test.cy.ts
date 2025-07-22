import {faker} from "@faker-js/faker";

describe('Questionnaire Categories', ()=>{
    beforeEach(()=>{
        cy.visit('/settings/questions-categories').wait(2000)
    })

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

    it('Edits a Question Category', () => {

        cy.get('#gridQuestionsCategories tr .dx-first-cell .dx-texteditor-input').type('Closed Ended Questions', {force:true}).wait(2000)
        cy.get('#gridQuestionsCategories tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridQuestionsCategories .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('categories')

        cy.get('@categories').eq(4).clear().wait(1000).type('DKA Edited Closed Ended Questions', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`Questions category has been updated.`).wait(1000)
    })

    // it.skip('Deletes a Question Category', () => {
    //     cy.visit('/settings/questions-categories').wait(2000)
    //     cy.get('#gridQuestionsCategories tr .dx-first-cell .dx-texteditor-input').type('Closed Ended Questions DKA Edited', {force:true}).wait(2000)
    //     cy.get('#gridQuestionsCategories tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
    //     cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);
    //
    //     cy.contains(`Questions category has been deleted.`).wait(1000)
    // })
})