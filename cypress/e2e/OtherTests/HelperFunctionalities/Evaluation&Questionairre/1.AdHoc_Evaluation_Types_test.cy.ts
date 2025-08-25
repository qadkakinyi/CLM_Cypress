/**
 * @testSuite AdHoc Evaluation Types
 * @description Tests adding, editing, and deleting Evaluation Types in the settings section.
 * @priority Medium
 * @owner QA Team
 * @tags regression, evaluation-types
 */

import {faker} from "@faker-js/faker";

describe('AdHoc Evaluation Types', ()=>{

    /**
     * @setup Navigate to Evaluation Types settings before each test
     * @steps Visit the Evaluation Types settings page
     * @expectedResult Page loads successfully for each test
     */
    beforeEach(()=>{
        cy.visit('/settings/evaluation-types').wait(2000)
    })

    /**
     * @scenario Add an Evaluation Type
     * @steps Click Add button
     * @steps Fill in Evaluation Type name and mapping reference
     * @steps Save the Evaluation Type
     * @expectedResult Evaluation Type is successfully added
     */
    it('Adds an Evaluation Type', ()=>{
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('AdHoc Evaluation Type1 DKA')
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13))

        cy.get('#addEvaluationTypeForm [icon="save"] > .sa-button').click().wait(2000)
        cy.contains('Evaluation Type has been added')
    })

    /**
     * @scenario Edit an Evaluation Type
     * @steps Search for an existing Evaluation Type by name
     * @steps Click the edit icon
     * @steps Modify the Evaluation Type name
     * @steps Save the updated Evaluation Type
     * @expectedResult Evaluation Type name is updated successfully
     */
    it('Edits an Evaluation Type', () => {
        cy.get('#gridEvaluationTypes tr .dx-first-cell .dx-texteditor-input')
            .type('AdHoc Evaluation Type1 DKA', {force:true}).wait(2000)
        cy.get('#gridEvaluationTypes tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridEvaluationTypes .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input')
            .as('evaluationTypes')

        cy.get('@evaluationTypes').eq(3).clear().wait(1000).type('DKA Evaluation Type Updated', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`The Evaluation Type has been updated.`).wait(1000)
    })

    /**
     * @scenario Delete an Evaluation Type
     * @steps Search for the Evaluation Type by updated name
     * @steps Click the delete icon
     * @steps Confirm deletion in the popup
     * @expectedResult Evaluation Type is deleted successfully
     */
    it('Deletes an Evaluation Type', () => {
        cy.get('#gridEvaluationTypes tr .dx-first-cell .dx-texteditor-input')
            .type('DKA Evaluation Type Updated', {force:true}).wait(2000)
        cy.get('#gridEvaluationTypes tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The Evaluation Type has been deleted.`).wait(1000)
    })
})

