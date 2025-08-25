/**
 * @testSuite Countries - Country Category
 * @description Validates adding, editing, and deleting of country categories in the settings module
 * @priority Medium
 * @owner QA Team
 * @tags regression, countries, categories
 * @dependencies faker-js
 * @fileDescription Performs CRUD operations on the "Country Categories" section in settings
 */

import {faker} from "@faker-js/faker";

let name = 'DKA European State '+faker.number.int({min:0, max:10})

describe("Country Category", ()=>{

    /**
     * @scenario Add Country Category
     * @description Creates a new country category with a faker-generated name
     * @priority Medium
     * @testData Faker-generated name and mapping reference
     * @steps Navigate to Country Categories settings
     * @steps Click "Add", fill in name and mapping reference, click Save
     * @expectedResult New country category is saved and confirmation message is shown
     */
    it('Adds a Country Category', ()=>{
        cy.visit('/settings/country-categories').wait(1500)
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type(name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
        cy.get('#addCountryCategoryForm [icon="save"] > .sa-button').click().wait(2000)
        cy.contains('The country category has been added.')
    })

    /**
     * @scenario Edit Country Category
     * @description Updates the name of an existing country category
     * @priority Medium
     * @testData Existing country category name from previous add
     * @steps Search for the category
     * @steps Click details icon, clear and update name, click Save & Close
     * @expectedResult Country category name is updated successfully
     */
    it('Edits a Country Category', ()=>{
        cy.visit('/settings/country-categories').wait(2000)
        cy.get('#gridCountryCategories tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(2000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({force:true}).wait(1000)
        cy.get('#countryCategoryForm')
        cy.getByFormControlName('name').clear().type(name+faker.string.alphanumeric(1))
        cy.getBySel('saveAndCloseButton').click().wait(2000)
        cy.contains('The country category has been updated.')
    })

    /**
     * @scenario Delete Country Category
     * @description Removes an existing country category
     * @priority Medium
     * @testData Country category from previous tests
     * @steps Search for the category
     * @steps Click details icon, click Delete, confirm deletion
     * @expectedResult Country category is deleted and confirmation message is displayed
     */
    it('Deletes a Country Category', ()=>{
        cy.visit('/settings/country-categories').wait(2000)
        cy.get('#gridCountryCategories tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(2000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({force:true}).wait(1000)
        cy.get('sa-button').contains('Delete').click()
        cy.get('.MessageBoxButtonSection').contains('button', 'Yes').click()
        cy.contains('The country category has been deleted.')
    })
})

