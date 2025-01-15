describe('Countries', ()=>{


    it('Edits A Country', ()=>{
        cy.visit('/settings/countries').wait(2000)

        cy.get('#gridCountries tr .dx-first-cell .dx-texteditor-input').type('Kenya').wait(1000)
        cy.get('#gridCountries tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(2000)

        cy.get('#gridCountries .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('countries').wait(1000)
        cy.get('@countries').eq(9).clear().wait(1000).type('Kenia', {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(2000)

        //revert back from Kenia to Kenya
        cy.get('#gridCountries tr .dx-first-cell .dx-texteditor-input').clear().type('Kenia').wait(3000)
        cy.get('#gridCountries tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridCountries .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('countries').wait(100)
        cy.get('@countries').eq(9).clear().wait(1000).type('Kenya', {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(2000)

        cy.contains('The country "Kenia" has been updated.')
    })

    
    it('Imports Country from file', ()=>{
        cy.visit('/settings/countries').wait(1000)
        cy.contains('Import Countries From File').click().wait(1000)
        cy.get('#addCountriesFromFileForm')
        cy.getByFormControlName('fileTemplate').eq(0).selectFile("cypress/fixtures/Imports/Countries___Template.xlsx")
        cy.get('#addCountriesFromFileForm').contains('sa-button', 'Import').click().wait(1500)
        cy.contains('The countries have been imported.')
    })
    
    it('Deletes a Country', ()=>{
        cy.visit('/settings/countries').wait(2000)

        cy.get('#gridCountries tr .dx-first-cell .dx-texteditor-input').type('DKA').wait(3000)
        cy.get('#gridCountries tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(2000);

        cy.contains('The country DKA Test has been deleted.')
    })
    
})