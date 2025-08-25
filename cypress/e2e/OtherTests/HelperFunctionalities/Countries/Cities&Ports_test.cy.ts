/**
 * @testSuite Countries - Cities and Ports
 * @description Validates importing, editing, and deleting city/port records in the settings module
 * @priority Medium
 * @owner QA Team
 * @tags regression, cities, ports, import
 * @dependencies cypress-file-upload
 * @fileDescription Performs CRUD operations on the "Cities/Ports" section of settings, including file-based import
 */

describe('Cities And Ports', ()=>{

    /**
     * @scenario Import Cities/Ports from file
     * @description Uploads an Excel file to import multiple cities/ports
     * @priority Medium
     * @testData CitiesPorts_Template.xlsx from fixtures
     * @steps Navigate to Cities/Ports settings
     * @steps Click "Import Cities/Ports From File"
     * @steps Select the provided Excel template
     * @steps Click "Import"
     * @expectedResult Cities/ports from the file are imported and a confirmation message is shown
     */
    it('Imports Cities/Ports from file', ()=>{
        cy.visit('/settings/cities').wait(1000)
        cy.contains('Import Cities/Ports From File').click().wait(1000)
        cy.get('#addCitiesFromFileForm')
        cy.getByFormControlName('fileTemplate').selectFile("cypress/fixtures/Imports/CitiesPorts_Template.xlsx")
        cy.get('#addCitiesFromFileForm').contains('sa-button', 'Import').click().wait(1500)
        cy.contains('The cities/ports have been imported.')
    })

    /**
     * @scenario Edit City/Port
     * @description Updates the name of an existing city/port
     * @priority Medium
     * @testData Existing city/port record "DKA_Nairobi"
     * @steps Search for the city/port
     * @steps Click edit, change the name, save
     * @expectedResult City/port record is updated and a confirmation message is displayed
     */
    it('Edits A City/Port', ()=>{
        cy.visit('/settings/cities').wait(2000)
        cy.get('#gridCities tr .dx-first-cell .dx-texteditor-input').type('DKA_Nairobi').wait(2500)
        cy.get('#gridCities tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)
        cy.get('#gridCities .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('cities')
        cy.get('@cities').eq(2).clear().wait(1000).type('Kanairo', {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(2000)
        cy.contains('DKA_Nairobi has been updated.')
    })

    /**
     * @scenario Delete City/Port
     * @description Removes an existing city/port from the list
     * @priority Medium
     * @testData City/port record "Kanairo"
     * @steps Search for the city/port
     * @steps Click delete, confirm deletion
     * @expectedResult City/port is deleted and a confirmation message is displayed
     */
    it('Deletes a City/Port', ()=>{
        cy.visit('/settings/cities').wait(2000)
        cy.get('#gridCities tr .dx-first-cell .dx-texteditor-input').type('Kanairo').wait(2500)
        cy.get('#gridCities tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(2000)
        cy.contains('Kanairo has been deleted.')
    })
})

