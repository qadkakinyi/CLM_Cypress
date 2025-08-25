/**
 * @testSuite Client Profiling - Document Categories
 * @description CRUD tests for managing document categories in the system
 * @priority Medium
 * @owner QA Team
 * @tags regression, settings, documents
 * @dependencies faker-js
 * @fileDescription Verifies adding, editing, and deleting document category records in the Settings module
 */

import {faker} from "@faker-js/faker";

describe('Document Categories', ()=>{

    /**
     * @scenario Add Document Category
     * @description Creates a new document category with a static name and faker-generated mapping reference
     * @priority Medium
     * @testData Name: "Test Ledger", Mapping Reference: faker-generated alphanumeric(11)
     * @steps Navigate to Settings → Document Categories
     * @steps Click Add to open the add form
     * @steps Fill in name and mapping reference
     * @steps Click Save
     * @expectedResult Toast: "Document category has been added."
     */
    it('Adds A Document Category', ()=>{
        cy.visit('/settings/document-categories')
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.get('#addDocumentCategoryForm')
        cy.getByFormControlName('name').type('Test Ledger')
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(11))
        cy.get('#addDocumentCategoryForm [icon="save"] > .sa-button').click().wait(2000);
        cy.contains('Document category has been added.')
    })

    /**
     * @scenario Edit Document Category
     * @description Updates the name of the previously added document category
     * @priority Medium
     * @steps Navigate to Settings → Document Categories
     * @steps Filter by "Test Ledger"
     * @steps Click Edit on the first matching row
     * @steps Change the name to "Ledger Test"
     * @steps Click Save
     * @expectedResult Toast: "Document Category has been updated."
     */
    it('Edits A Document Category', ()=>{
        cy.visit('/settings/document-categories').wait(3000)

        cy.get('#gridDocumentCategories tr .dx-first-cell .dx-texteditor-input').type('Test Ledger', {force:true}).wait(2000)
        cy.get('tr td').find('.dx-icon-edit').eq(1).click({force:true}).wait(1000)

        cy.get('#gridDocumentCategories .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('documentCategories')
        cy.get('@documentCategories').eq(3).clear().wait(1000).type('Ledger Test', {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('Document Category has been updated.')
    })

    /**
     * @scenario Delete Document Category
     * @description Deletes the "Ledger Test" document category
     * @priority Medium
     * @steps Navigate to Settings → Document Categories
     * @steps Filter by "Ledger Test"
     * @steps Click Trash icon on the first matching row
     * @steps Confirm deletion in the popup
     * @expectedResult Toast: "Document Category has been deleted."
     */
    it('Deletes A Document Category', ()=>{
        cy.visit('/settings/document-categories').wait(3000)

        cy.get('#gridDocumentCategories tr .dx-first-cell .dx-texteditor-input').type('Ledger Test', {force:true}).wait(2500)
        cy.get('tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('Document Category has been deleted.')
    })
})

