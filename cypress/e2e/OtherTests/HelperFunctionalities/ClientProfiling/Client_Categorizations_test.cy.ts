/**
 * @testSuite Client Profiling - Client Categorization Settings
 * @description CRUD tests for Client Categorizations in Settings
 * @priority Medium
 * @owner QA Team
 * @tags regression, settings, client-categorization
 * @dependencies faker-js
 * @fileDescription Verifies adding, editing, and deleting client categorizations via the Settings UI
 */

import {faker} from "@faker-js/faker";

describe('Client Categorization', ()=>{

    /**
     * @scenario Add Client Categorization
     * @description Creates a new client categorization entry in Settings
     * @priority Medium
     * @testData Faker-generated mapping reference
     * @steps Navigate to Settings → Client Categorizations
     * @steps Click Add, fill Name + Mapping Reference, pick Regulation Group (if required), Save
     * @expectedResult Success toast appears: "The client categorization has been added."
     */
    it('Adds A Client Categorization', ()=>{
        //add client category
        cy.visit('/settings/client-categorizations').wait(1000)
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.get('#addClientCategorizationForm')
        cy.getByFormControlName('name').type('Client Categorization Test')
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(11))
        cy.get('#addClientCategorizationForm [icon="save"] > .sa-button').contains('Save').click().wait(2000);
        cy.contains('The client categorization has been added.')
    })

    /**
     * @scenario Edit Client Categorization
     * @description Updates the name of an existing client categorization inline in the grid
     * @priority Medium
     * @steps Open Settings → Client Categorizations
     * @steps Filter by the created name, click edit icon, change Name, Save
     * @expectedResult Success toast appears: "The client categorization has been updated."
     */
    it('Edits A Client Categorization', ()=>{
        cy.visit('/settings/client-categorizations').wait(2000)

        cy.get('#gridClientCategorizations tr .dx-first-cell .dx-texteditor-input').type('Client Categorization Test', {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-edit').eq(1).click({force:true}).wait(1000)

        cy.get('#gridClientCategorizations .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('clientCategorizations')
        cy.get('@clientCategorizations').eq(3).clear().wait(1000).type('Test Categorization '+faker.string.alphanumeric(3), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('The client categorization has been updated.')
    })

    /**
     * @scenario Delete Client Categorization
     * @description Removes the client categorization from the list
     * @priority Medium
     * @steps Open Settings → Client Categorizations
     * @steps Filter by updated name, click delete icon, confirm Yes
     * @expectedResult Success toast appears: "The client categorization has been deleted."
     */
    it('Deletes A Client Categorization', ()=>{
        cy.visit('/settings/client-categorizations').wait(2000)

        cy.get('#gridClientCategorizations tr .dx-first-cell .dx-texteditor-input').type('Test Categorization', {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('The client categorization has been deleted.')
    })
})
