describe('Country Evaluation Grades', ()=>{


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
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(2000)

        cy.contains('The country evaluation grade has been updated.').wait(2000)
        
        //reset the value back - moved to the next test case

        // cy.get('#gridCountryEvaluationGrades tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)
        //
        // cy.get('#gridCountryEvaluationGrades .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('country-evaluation-grades')
        // cy.get('@country-evaluation-grades').eq(2).click().wait(1000)
        // cy.get('.dx-scrollview-content').contains('Not to affect the client risk' ).click().wait(1000)
        // cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
    })
    
    it('Ensures Evaluation grade also matches with what we have in settings >> evaluation&questionnaire >> criteria', ()=>{
        cy.visit('/settings/criteria').wait(3000)

        cy.get('#gridCriteria tr .dx-first-cell .dx-texteditor-input').type('Country', {force:true}).wait(5000)
        cy.get('#gridCriteria tr td').find('.fa-angle-double-right').eq(0).click({force:true}).wait(3000)
        
        cy.get('#gridCriterionAnswers .dx-datagrid-filter-row .dx-texteditor-container').eq(0).type('Kenya').wait(5000)
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

    it('Upload Evaluation Grades from file', ()=>{
        cy.visit('/settings/country-evaluation-grades').wait(1000)
        cy.contains('Upload Country Grades').click().wait(1000)
        cy.get('#updateCountryEvaluationGradesFromFileForm')
        cy.getByFormControlName('fileTemplate').eq(0).selectFile("cypress/fixtures/Imports/Country_Evaluation__Grades_Template.xlsx")
        cy.get('#updateCountryEvaluationGradesFromFileForm').contains('sa-button', 'Import').click().wait(1500)
        cy.contains('The country evaluation grades are now updated.')
    })
})