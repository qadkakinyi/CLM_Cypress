/**
 * @testSuite Evaluation Grades Management
 * @description Tests adding, editing, and deleting both Overall and Answer Evaluation Grades in the settings section.
 * @priority Medium
 * @owner QA Team
 * @tags regression, evaluation, settings
 */

import {faker} from "@faker-js/faker";

describe('Evaluation Grades', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/evaluation-grades').wait(2000)
    })

    /**
     * @scenario Add Overall Evaluation Grade
     * @steps Navigate to Evaluation Grades settings
     * @steps Click Add and fill in grade details (name, mapping reference, risk points, color, regulation group, next evaluation days)
     * @steps Save the overall evaluation grade
     * @expectedResult Overall evaluation grade is successfully added
     */
    it('Adds an Overall Evaluation Grade', ()=>{
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('Evaluation Grade1 DKA')
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13))
        cy.getByFormControlName('riskPointFrom').type('1001')
        cy.getByFormControlName('riskPointTo').type('2000')

        // Color
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td')
            .eq(0).click({force:true}).wait(500)

        cy.getByFormControlName('nextEvaluationDays').type('30')

        // Regulation group
        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td')
            .eq(14).click({force:true}).wait(500)

        cy.get('#addOverallEvaluationGradeForm [icon="save"] > .sa-button').click().wait(1000)
        cy.contains('The overall evaluation grade has been added')
    })

    /**
     * @scenario Edit Overall Evaluation Grade
     * @steps Search for the grade by name
     * @steps Click edit, change the grade name
     * @steps Save the changes
     * @expectedResult Overall evaluation grade is successfully updated
     */
    it('Edits an Overall Evaluation Grade', () => {
        cy.get('#gridEvaluationGrades tr .dx-first-cell .dx-texteditor-input')
            .type('Evaluation Grade1 DKA', {force:true}).wait(2000)
        cy.get('#gridEvaluationGrades tr td').find('.dx-icon-edit').eq(0)
            .click({force:true}).wait(1000)

        cy.get('#gridEvaluationGrades .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input')
            .as('evaluationGrades')

        cy.get('@evaluationGrades').eq(7).clear().wait(1000)
            .type('DKA Evaluation Grade Updated', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`Evaluation grade has been updated.`).wait(1000)
    })

    /**
     * @scenario Add Answer Evaluation Grade
     * @steps Navigate to Answer Evaluation Grades tab
     * @steps Click Add, fill in details (name, mapping reference, color, regulation group, score, overall evaluation grade)
     * @steps Save the answer evaluation grade
     * @expectedResult Answer evaluation grade is successfully added
     */
    it('Adds an Answer Evaluation Grade', ()=>{
        cy.contains('Answer Evaluation Grades').click().wait(2000)
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').eq(1).type('Evaluation Answer1 DKA')
        cy.getByFormControlName('mappingReference').eq(1).type(faker.string.alphanumeric(13))

        // Color
        cy.get('dx-drop-down-box').eq(2).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td')
            .eq(0).click({force:true}).wait(500)

        // Regulation group
        cy.get('dx-drop-down-box').eq(3).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content').eq(1)
            .find('tr td').eq(0).click({force:true}).wait(500)

        cy.getByFormControlName('score').type('8')

        // Overall evaluation grade
        cy.get('dx-drop-down-box').eq(4).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td')
            .contains('DKA Evaluation Grade Updated').click({force:true}).wait(500)

        cy.get('#addAnswerEvaluationGradeForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button')
            .click().wait(1000)

        cy.contains('The answer evaluation grade has been added')
    })

    /**
     * @scenario Edit Answer Evaluation Grade
     * @steps Search for the answer evaluation grade by name
     * @steps Click edit, update the name
     * @steps Save the changes
     * @expectedResult Answer evaluation grade is successfully updated
     */
    it('Edits an Answer Evaluation Grade', () => {
        cy.contains('Answer Evaluation Grades').click().wait(2000)
        cy.get('#gridEvaluationGradesAnswers tr .dx-first-cell .dx-texteditor-input')
            .type('Evaluation Answer1 DKA', {force:true}).wait(2000)
        cy.get('#gridEvaluationGradesAnswers tr td').find('.dx-icon-edit').eq(0)
            .click({force:true}).wait(1000)

        cy.get('#gridEvaluationGradesAnswers .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input')
            .as('evaluationGradesAnswers')

        cy.get('@evaluationGradesAnswers').eq(7).clear().wait(1000)
            .type('DKA Evaluation Answer Updated', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`Evaluation grade has been updated.`).wait(1000)
    })

    /**
     * @scenario Delete Answer Evaluation Grade
     * @steps Search for the answer evaluation grade by name
     * @steps Click delete and confirm
     * @expectedResult Answer evaluation grade is successfully deleted
     */
    it('Deletes an Answer Evaluation Grade', () => {
        cy.contains('Answer Evaluation Grades').click().wait(2000)
        cy.get('#gridEvaluationGradesAnswers tr .dx-first-cell .dx-texteditor-input')
            .type('DKA Evaluation Answer Updated', {force:true}).wait(2000)
        cy.get('#gridEvaluationGradesAnswers tr td').find('.dx-icon-trash').eq(1)
            .click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000)

        cy.contains(`Evaluation grade has been deleted.`).wait(1000)
    })

    /**
     * @scenario Delete Overall Evaluation Grade
     * @steps Search for the overall evaluation grade by name
     * @steps Click delete and confirm
     * @expectedResult Overall evaluation grade is successfully deleted
     */
    it('Deletes an Evaluation Grade', () => {
        cy.get('#gridEvaluationGrades tr .dx-first-cell .dx-texteditor-input')
            .type('DKA Evaluation Grade Updated', {force:true}).wait(2000)
        cy.get('#gridEvaluationGrades tr td').find('.dx-icon-trash').eq(1)
            .click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000)

        cy.contains(`Evaluation grade has been deleted.`).wait(1000)
    })

})

