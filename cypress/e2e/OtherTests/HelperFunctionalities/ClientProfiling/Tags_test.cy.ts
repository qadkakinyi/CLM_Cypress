/**
 * @testSuite Client Profiling - Tags
 * @description Validates the creation, editing, and deletion of Tags in system settings
 * @priority Medium
 * @owner QA Team
 * @tags regression, settings, tags
 * @dependencies faker-js
 * @fileDescription Performs CRUD operations on the "Tags" settings page
 */

import {faker} from "@faker-js/faker";

let name = 'New Test Tags dka ' + faker.number.int({min:0, max:10})

describe("Tags", ()=>{

    /**
     * @scenario Add Tag
     * @description Adds a new Tag entry in system settings
     * @priority Medium
     * @testData Faker-generated tag name and mapping reference
     * @steps Navigate to Tags settings
     * @steps Click "Add", enter tag name and mapping reference, then save
     * @expectedResult New Tag is added and confirmation message is displayed
     */
    it('Adds a Tag', ()=>{
        cy.visit('/settings/tags').wait(1500)
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type(name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
        cy.get('#addTagForm [icon="save"] > .sa-button').click().wait(2000)
        cy.contains('Tag has been added.')
    })

    /**
     * @scenario Edit Tag
     * @description Edits an existing Tag to update its name
     * @priority Medium
     * @testData Modified faker-generated tag name
     * @steps Search for created Tag, click edit, update name, and save
     * @expectedResult Tag is updated and confirmation message is displayed
     */
    it('Edits a Tag', ()=>{
        cy.visit('/settings/tags').wait(2000)
        cy.get('#gridTags tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(1000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({force:true}).wait(1000)
        cy.get('#editTagForm')
        cy.getByFormControlName('name').clear().type('DKA '+name+faker.string.alphanumeric(1))
        cy.getBySel('saveAndCloseButton').click().wait(2000)
        cy.contains('Tag has been updated.')
    })

    /**
     * @scenario Delete Tag
     * @description Deletes the previously created Tag
     * @priority Medium
     * @steps Search for created Tag, click delete, confirm deletion
     * @expectedResult Tag is removed and confirmation message is displayed
     */
    it('Deletes a Tag', ()=>{
        cy.visit('/settings/tags').wait(2500)
        cy.get('#gridTags tr .dx-first-cell .dx-texteditor-input').type('DKA '+name, {force:true}).wait(2000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({force:true}).wait(2000)
        cy.get('sa-button').contains('Delete').click()
        cy.get('.MessageBoxButtonSection').contains('button', 'Yes').click()
        cy.contains('Tag has been deleted.')
    })
})

