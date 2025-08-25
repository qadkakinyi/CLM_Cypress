/**
 * @testSuite Countries
 * @description Validates editing, importing, and deleting country records in the settings module
 * @priority Medium
 * @owner QA Team
 * @tags regression, countries, import
 * @dependencies cypress-file-upload
 * @fileDescription Performs CRUD operations on the "Countries" section of settings, including file-based import
 */

describe('Countries', ()=>{

    /**
     * @scenario Edit Country
     * @description Updates an existing country name and reverts the change
     * @priority Medium
     * @testData Existing country "Kenya"
     * @steps Search for the country
     * @steps Click edit, change the name to "Kenia"
     * @steps Save and confirm update
     * @steps Revert the name back to "Kenya"
     * @expectedResult The country name is updated successfully and reverted with confirmation messages
     */
    it('Edits A Country', ()=>{
        cy.visit('/settings/countries').wait(2000)
        cy.get('#gridCountries tr .dx-first-cell .dx-texteditor-input').type('Kenya').wait(1000)
        cy.get('#gridCountries tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(2000)
        cy.get('#gridCountries .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('countries').wait(1000)
        cy.get('@countries').eq(9).clear().wait(1000).type('Kenia', {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(2000)

        // revert back from Kenia to Kenya
        cy.get('#gridCountries tr .dx-first-cell .dx-texteditor-input').clear().type('Kenia').wait(3000)
        cy.get('#gridCountries tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)
        cy.get('#gridCountries .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('countries').wait(2000)
        cy.get('@countries').eq(9).clear().wait(1000).type('Kenya', {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(2000)
        cy.contains('The country "Kenia" has been updated.')
    })

    /**
     * @scenario Import Countries from file
     * @description Uploads an Excel file to bulk import countries
     * @priority Medium
     * @testData Countries___Template.xlsx from fixtures
     * @steps Navigate to Countries settings
     * @steps Click "Import Countries From File"
     * @steps Select the provided Excel template
     * @steps Click "Import"
     * @expectedResult Countries from the file are imported and a confirmation message is shown
     */
    it('Imports Country from file', ()=>{
        cy.visit('/settings/countries').wait(1000)
        cy.contains('Import Countries From File').click().wait(1000)
        cy.get('#addCountriesFromFileForm')
        cy.getByFormControlName('fileTemplate').eq(0).selectFile("cypress/fixtures/Imports/Countries___Template.xlsx")
        cy.get('#addCountriesFromFileForm').contains('sa-button', 'Import').click().wait(1500)
        cy.contains('The countries have been imported.')
    })

    /**
     * @scenario Delete Country
     * @description Removes an existing country from the list
     * @priority Medium
     * @testData Country "DKA Test"
     * @steps Search for the country
     * @steps Click delete, confirm deletion
     * @expectedResult Country is deleted and a confirmation message is displayed
     */
    it('Deletes a Country', ()=>{
        cy.visit('/settings/countries').wait(2000)
        cy.get('#gridCountries tr .dx-first-cell .dx-texteditor-input').type('DKA').wait(3000)
        cy.get('#gridCountries tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(2000)
        cy.contains('The country DKA Test has been deleted.')
    })
})

