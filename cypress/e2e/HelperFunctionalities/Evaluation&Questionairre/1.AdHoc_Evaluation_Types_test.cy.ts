import {faker} from "@faker-js/faker";

describe('AdHoc Evaluation Types', ()=>{
    beforeEach(()=>{
        cy.visit('/settings/evaluation-types').wait(2000)
    })

    it('Adds an Evaluation Type', ()=>{
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('AdHoc Evaluation Type1 DKA')
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13))

        cy.contains('sa-button', 'Save').click().wait(1000)
        cy.contains('Evaluation Type has been added')
    })

    it('Edits an Evaluation Type', () => {

        cy.get('#gridEvaluationTypes tr .dx-first-cell .dx-texteditor-input').type('AdHoc Evaluation Type1 DKA', {force:true}).wait(2000)
        cy.get('#gridEvaluationTypes tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridEvaluationTypes .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('evaluationTypes')

        cy.get('@evaluationTypes').eq(3).clear().wait(1000).type('DKA Evaluation Type Updated', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`The Evaluation Type has been updated.`).wait(1000)
    })

    it('Deletes an Evaluation Type', () => {

        cy.get('#gridEvaluationTypes tr .dx-first-cell .dx-texteditor-input').type('DKA Evaluation Type Updated', {force:true}).wait(2000)
        cy.get('#gridEvaluationTypes tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The Evaluation Type has been deleted.`).wait(1000)
    })
})