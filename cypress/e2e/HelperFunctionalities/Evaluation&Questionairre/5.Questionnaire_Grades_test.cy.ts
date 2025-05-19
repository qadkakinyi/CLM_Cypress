import {faker} from "@faker-js/faker";

describe('Questionnaire Grades', ()=>{
    beforeEach(()=>{
        cy.visit('/settings/questionnaire-grades').wait(2000)
    })

    it('Adds a Questionnaire Grade', ()=>{
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('Test Grade DKA')

        //questionnaire types
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').eq(0).click({force:true}).wait(500)

        cy.getByFormControlName('scorePointFrom').type('1')
        cy.getByFormControlName('scorePointTo').type('2')

        //color
        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains('Coral').click({force:true}).wait(500)
        
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13))

        cy.get('#addQuestionnaireGradeForm [icon="save"] > .sa-button').click().wait(1000)
        cy.contains('Questionnaire Grade has been added').wait(1000)
    })

    it('Edits a Questionnaire Grade', () => {

        cy.get('#gridQuestionnaireGrades tr .dx-first-cell .dx-texteditor-input').type('Test Grade DKA', {force:true}).wait(2000)
        cy.get('#gridQuestionnaireGrades tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridQuestionnaireGrades .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('evaluationTypes')

        cy.get('@evaluationTypes').eq(5).clear().wait(1000).type('DKA Questionnaire Grade', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`The questionnaire grade has been updated.`).wait(1000)
    })

    it('Deletes a Questionnaire Grade', () => {

        cy.get('#gridQuestionnaireGrades tr .dx-first-cell .dx-texteditor-input').type('DKA Questionnaire Grade', {force:true}).wait(2000)
        cy.get('#gridQuestionnaireGrades tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The questionnaire grade has been deleted.`).wait(1000)
    })
})