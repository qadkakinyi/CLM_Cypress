import {faker} from "@faker-js/faker";

describe('Questionnaire Types', ()=>{
    beforeEach(()=>{
        cy.visit('/settings/questionnaire-types').wait(2000)
    })

    it('Adds a Questionnaire Type', ()=>{
        
        cy.contains('sa-button','Add').click().wait(1000)

        cy.getByDataCy('questionnaire-type-name').type('Questionnaire Type DKA')
        cy.getByDataCy('questionnaire-type-mapping-reference').type(faker.string.alphanumeric((15)))

        cy.getByDataCy('save-questionnaire-type-btn').click().wait(1000)

        cy.contains('Questionnaire type has been added').wait(1000)
    })

    it('Edits a Questionnaire Type', () => {

        cy.get('#gridQuestionnaireTypes tr .dx-first-cell .dx-texteditor-input').type('Questionnaire Type DKA', {force:true}).wait(2000)
        cy.get('#gridQuestionnaireTypes tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridQuestionnaireTypes .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('grades')

        cy.get('@grades').eq(5).clear().wait(1000).type('Questionnaire Type DKA Updated', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`The questionnaire type has been updated.`).wait(1000)
    })

    // it.skip('Deletes a Questionnaire Type', () => {
    //     cy.visit('/settings/questionnaire-types').wait(2000)
    //     cy.get('#gridQuestionnaireTypes tr .dx-first-cell .dx-texteditor-input').type('Questionnaire Type DKA Updated', {force:true}).wait(2000)
    //     cy.get('#gridQuestionnaireTypes tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
    //     cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);
    //
    //     cy.contains(`The questionnaire type has been deleted.`).wait(1000)
    // })
})