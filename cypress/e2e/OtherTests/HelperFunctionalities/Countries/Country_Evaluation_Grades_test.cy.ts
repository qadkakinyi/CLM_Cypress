/**
 * @testSuite Country Evaluation Grades
 * @description Verifies editing of country evaluation grades, cross-checks with Criteria settings, and uploads grades via file
 * @priority High
 * @owner QA Team
 * @tags regression, settings, countries, evaluation-grades
 * @dependencies navigateToNewestClientMenu (fixture-driven nav), Cypress custom commands
 * @fileDescription Ensures country evaluation grade changes reflect in Criteria answers and supports bulk updates via file import
 */

describe('Country Evaluation Grades', ()=>{

    /**
     * @scenario Edit Country Evaluation Grade
     * @description Filters by regulation group, edits Kenya’s grade to High, saves, and verifies success toast
     * @priority High
     * @steps Open Country Evaluation Grades
     * @steps Filter by “Default” regulation group
     * @steps Filter grid by “Kenya” and click edit
     * @steps Change grade to “High” and save
     * @expectedResult “The country evaluation grade has been updated.” is shown
     */
    it('Edits A Evaluation Grade', ()=>{
        cy.visit('/settings/country-evaluation-grades').wait(3000)

        cy.get('.dx-header-filter').eq(0).click().wait(500)
        cy.contains('.dx-popup-content .dx-item', 'Default').click()
        cy.contains('.dx-button-content .dx-button-text', 'OK').click().wait(4500)

        cy.get('#gridCountryEvaluationGrades tr .dx-first-cell .dx-texteditor-input').type('Kenya').wait(3000)
        cy.get('#gridCountryEvaluationGrades tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridCountryEvaluationGrades .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('country-evaluation-grades')
        cy.get('@country-evaluation-grades').eq(2).click().wait(1000)
        cy.get('.dx-scrollview-content').contains('High' ).click().wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click()

        cy.poll('The country evaluation grade has been updated.')

        //reset the value back - moved to the next test case

        // cy.get('#gridCountryEvaluationGrades tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)
        //
        // cy.get('#gridCountryEvaluationGrades .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('country-evaluation-grades')
        // cy.get('@country-evaluation-grades').eq(2).click().wait(1000)
        // cy.get('.dx-scrollview-content').contains('Not to affect the client risk' ).click().wait(1000)
        // cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
    })

    /**
     * @scenario Cross-check Grade in Criteria
     * @description Confirms the updated grade appears under Criteria → Country answers, then resets Kenya’s grade back
     * @priority High
     * @steps Open Criteria and filter by “Country”
     * @steps Expand first row and filter answers by “Kenya”
     * @steps Assert the grade text equals “High”
     * @steps Return to Country Evaluation Grades and reset Kenya back to “Not to affect the client risk”
     * @expectedResult Grade is “High” in Criteria, then successfully reset
     */
    it('Ensures Evaluation grade also matches with what we have in settings >> evaluation&questionnaire >> criteria', ()=>{
        cy.visit('/settings/criteria').wait(3000)

        cy.poll('#gridCriteria tr .dx-first-cell .dx-texteditor-input').type('Country', {force:true}).wait(2000)
        cy.get('#gridCriteria tr td').find('.fa-angle-double-right').eq(0).click({force:true})

        cy.get('#gridCriterionAnswers .dx-datagrid-filter-row .dx-texteditor-container').eq(0).type('Kenya')
        cy.get('.dx-datagrid-rowsview tr td').eq(4).invoke('text').then(text=>{
            expect(text.trim()).to.eq('High')
        })

        //reset the value back
        cy.visit('/settings/country-evaluation-grades').wait(3000)
        cy.get('#gridCountryEvaluationGrades tr .dx-first-cell .dx-texteditor-input').type('Kenya').wait(3000)
        cy.get('#gridCountryEvaluationGrades tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridCountryEvaluationGrades .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('country-evaluation-grades')
        cy.get('@country-evaluation-grades').eq(2).click().wait(1000)
        cy.get('.dx-scrollview-content').contains('Not to affect the client risk' ).click().wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
    })

    /**
     * @scenario Upload Grades From File
     * @description Imports country evaluation grades via the provided template
     * @priority Medium
     * @steps Click “Upload Country Grades”, select template, click Import
     * @expectedResult “The country evaluation grades are now updated.” is shown
     */
    it('Upload Evaluation Grades from file', ()=>{
        cy.visit('/settings/country-evaluation-grades').wait(1000)
        cy.contains('sa-button','Upload Country Grades').click()
        cy.poll('#updateCountryEvaluationGradesFromFileForm')
        cy.getByFormControlName('fileTemplate').eq(0).selectFile("cypress/fixtures/Imports/Country_Evaluation__Grades_Template.xlsx")
        cy.get('#updateCountryEvaluationGradesFromFileForm').contains('sa-button', 'Import').click()
        cy.poll('The country evaluation grades are now updated.')
    })
})

