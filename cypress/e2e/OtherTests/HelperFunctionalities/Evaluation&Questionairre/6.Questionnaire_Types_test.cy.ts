/**
 * @testSuite Questionnaire Types Management
 * @description Tests adding and editing questionnaire types in the settings section.
 * @priority Medium
 * @owner QA Team
 * @tags regression, questionnaire, settings
 */

import {faker} from "@faker-js/faker";

describe('Questionnaire Types', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/questionnaire-types').wait(2000)
    })

    /**
     * @scenario Add Questionnaire Type
     * @steps Navigate to Questionnaire Types settings
     * @steps Click Add and fill in questionnaire type details (name, mapping reference)
     * @steps Save the questionnaire type
     * @expectedResult Questionnaire type is successfully added
     */
    it('Adds a Questionnaire Type', ()=>{
        cy.contains('sa-button','Add').click().wait(1000)

        cy.getByDataCy('questionnaire-type-name')
            .type('Questionnaire Type DKA')
        cy.getByDataCy('questionnaire-type-mapping-reference')
            .type(faker.string.alphanumeric(15))

        cy.getByDataCy('save-questionnaire-type-btn').click().wait(1000)
        cy.contains('Questionnaire type has been added').wait(1000)
    })

    /**
     * @scenario Edit Questionnaire Type
     * @steps Search for questionnaire type by name
     * @steps Click edit, update the questionnaire type name
     * @steps Save the changes
     * @expectedResult Questionnaire type is successfully updated
     */
    it('Edits a Questionnaire Type', () => {
        cy.get('#gridQuestionnaireTypes tr .dx-first-cell .dx-texteditor-input')
            .type('Questionnaire Type DKA', {force:true}).wait(2000)
        cy.get('#gridQuestionnaireTypes tr td').find('.dx-icon-edit').eq(0)
            .click({force:true}).wait(1000)

        cy.get('#gridQuestionnaireTypes .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input')
            .as('grades')

        cy.get('@grades').eq(5).clear().wait(1000)
            .type('Questionnaire Type DKA Updated', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`The questionnaire type has been updated.`).wait(1000)
    })

    // /**
    //  * @scenario Delete Questionnaire Type
    //  * @steps Search for questionnaire type by name
    //  * @steps Click delete and confirm
    //  * @expectedResult Questionnaire type is successfully deleted
    //  */
    // it.skip('Deletes a Questionnaire Type', () => {
    //     cy.get('#gridQuestionnaireTypes tr .dx-first-cell .dx-texteditor-input')
    //       .type('Questionnaire Type DKA Updated', {force:true}).wait(2000)
    //     cy.get('#gridQuestionnaireTypes tr td').find('.dx-icon-trash').eq(1)
    //       .click({force: true}).wait(1000)
    //     cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000)
    //     cy.contains(`The questionnaire type has been deleted.`).wait(1000)
    // })
})

