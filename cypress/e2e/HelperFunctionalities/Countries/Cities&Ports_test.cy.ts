describe('Cities And Ports', ()=>{
    it('Imports Cities/Ports from file', ()=>{
        cy.visit('/settings/cities').wait(1000)
        cy.contains('Import Cities/Ports From File').click().wait(1000)
        cy.get('#addCitiesFromFileForm')
        cy.getByFormControlName('fileTemplate').selectFile("cypress/fixtures/Imports/CitiesPorts_Template.xlsx")
        cy.get('#addCitiesFromFileForm').contains('sa-button', 'Import').click().wait(1500)
        cy.contains('The cities/ports have been imported.')
    })
    
    it('Edits A City/Port', ()=>{
        cy.visit('/settings/cities').wait(2000)

        cy.get('#gridCities tr .dx-first-cell .dx-texteditor-input').type('DKA_Nairobi').wait(2500)
        cy.get('#gridCities tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridCities .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('cities')
        cy.get('@cities').eq(2).clear().wait(1000).type('Kanairo', {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(2000)

        cy.contains('DKA_Nairobi has been updated.')
    })

    it('Deletes a City/Port', ()=>{
        cy.visit('/settings/cities').wait(2000)

        cy.get('#gridCities tr .dx-first-cell .dx-texteditor-input').type('Kanairo').wait(2500)
        cy.get('#gridCities tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(2000);

        cy.contains('Kanairo has been deleted.')
    })
})