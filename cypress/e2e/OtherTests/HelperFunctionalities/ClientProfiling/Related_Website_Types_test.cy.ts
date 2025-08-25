/**
 * @testSuite Client Profiling - Related Website Types
 * @description Validates the creation, editing, and deletion of Related Website Types in system settings
 * @priority Medium
 * @owner QA Team
 * @tags regression, settings, related-website-types
 * @dependencies faker-js
 * @fileDescription Performs CRUD operations on the "Related Website Types" settings page
 */

import {faker} from "@faker-js/faker";

let name = 'Test Website dka ' + faker.number.int({min:0, max:10})

describe("Related Website Types", ()=>{

    /**
     * @scenario Add Related Website Type
     * @description Adds a new Related Website Type entry in system settings
     * @priority Medium
     * @testData Faker-generated related website type name and mapping reference
     * @steps Navigate to Related Website Types settings
     * @steps Click "Add", enter name, mapping reference, and save
     * @expectedResult New Related Website Type is added and confirmation message is displayed
     */
    it('Adds a Related Website Type', ()=>{
        cy.visit('/settings/related-website-types').wait(1500)
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type(name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
        cy.get('#addRelatedWebsiteTypeForm [icon="save"] > .sa-button').click().wait(2000)
        cy.contains('Related website type has been added.')
    })

    /**
     * @scenario Edit Related Website Type
     * @description Edits an existing Related Website Type to update its name
     * @priority Medium
     * @testData Modified faker-generated name
     * @steps Search for created type, click edit, update name, save
     * @expectedResult Related Website Type is updated and confirmation message is displayed
     */
    it('Edits a Related Website Type', ()=>{
        cy.visit('/settings/related-website-types').wait(2000)
        cy.get('#gridRelatedWebsiteTypes tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(2500)
        cy.get('#gridRelatedWebsiteTypes tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)
        cy.get('#gridRelatedWebsiteTypes .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('websiteTypes')
        cy.get('@websiteTypes').eq(3).clear().wait(1000).type(name+ faker.string.alphanumeric(1), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('The related website type has been updated.')
    })

    /**
     * @scenario Delete Related Website Type
     * @description Deletes the previously created Related Website Type
     * @priority Medium
     * @steps Search for created type, click delete, confirm deletion
     * @expectedResult Related Website Type is removed and confirmation message is displayed
     */
    it('Deletes a Related Website Type', ()=>{
        cy.visit('/settings/related-website-types').wait(2000)
        cy.get('#gridRelatedWebsiteTypes tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(2500)
        cy.get('#gridRelatedWebsiteTypes tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('The related website type has been deleted.')
    })
})

