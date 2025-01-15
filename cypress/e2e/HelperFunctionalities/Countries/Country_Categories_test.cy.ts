import {faker} from "@faker-js/faker";

let name = 'DKA European State '+faker.number.int({min:0, max:10})
describe("Country Category", ()=>{
    it('Adds a Country Category', ()=>{
        cy.visit('/settings/country-categories').wait(1500)
        cy.contains('Add').click().wait(1000)
        cy.getByFormControlName('name').type(name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
        cy.contains('sa-button','Save').click().wait(1500)
        cy.contains('The country category has been added.')
    })

    it('Edits a Country Category', ()=>{

        cy.visit('/settings/country-categories').wait(2000)
        cy.get('#gridCountryCategories tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(2000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({force:true}).wait(1000)

        cy.get('#countryCategoryForm')
        cy.getByFormControlName('name').clear().type(name+faker.string.alphanumeric(1))
        cy.getBySel('saveAndCloseButton').click().wait(2000)

        cy.contains('The country category has been updated.')
    })

    it('Deletes a Country Category', ()=>{
        cy.visit('/settings/country-categories').wait(2000)

        cy.get('#gridCountryCategories tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(2000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({force:true}).wait(1000)
        cy.get('sa-button').contains('Delete').click()
        cy.get('.MessageBoxButtonSection').contains('button', 'Yes').click()

        cy.contains('The country category has been deleted.')
    })
})