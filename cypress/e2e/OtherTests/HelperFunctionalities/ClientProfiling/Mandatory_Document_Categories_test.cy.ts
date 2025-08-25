/**
 * @testSuite Client Profiling - Mandatory Document Categories (MDC)
 * @description Validates CRUD operations for Mandatory Document Categories in the Settings module.
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, documents
 * @dependencies faker-js
 * @fileDescription Covers adding, editing, and deleting of mandatory document categories with different client types and regulation groups.
 */

import {faker} from "@faker-js/faker";

describe('Mandatory Document Categories (MDC)', ()=>{

    /**
     * @scenario Add MDC
     * @description Creates a new mandatory document category for the Corporate client type with a required number of documents.
     * @priority Medium
     * @testData
     * - Name: "Test Document 1"
     * - Mapping Reference: faker-generated alphanumeric(11)
     * - Client Type: Corporate
     * - Regulation Group: First available option
     * - Mandatory Document: First available checkbox selected
     * - Num of Mandatory Documents: 1
     * @steps
     * 1. Navigate to Settings → Mandatory Document Categories
     * 2. Click Add
     * 3. Fill in name, mapping reference
     * 4. Select Client Type, Regulation Group, and Mandatory Document
     * 5. Enter number of mandatory documents
     * 6. Save
     * @expectedResult "Mandatory documents category has been added."
     */
    it('Adds a MDC', ()=>{
        cy.visit('/settings/mandatory-documents-categories')
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.get('#addMandatoryDocumentsCategoryForm')

        cy.getByFormControlName('name').type('Test Document 1')
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(11))

        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.getBySel('dynamicSelectBoxDropdownGrid').contains('Corporate').click().wait(500)

        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.getBySel('dynamicSelectBoxDropdownGrid').find('[aria-rowindex="1"]').eq(1).click().wait(1000)

        cy.get('dx-drop-down-box').eq(2).click().wait(500)
        cy.get('.dx-datagrid-rowsview .dx-datagrid-table [aria-rowindex="1"] .dx-checkbox-icon').click().wait(500)

        cy.getByFormControlName('numOfMandatoryDocuments').type('1')

        cy.get('#addMandatoryDocumentsCategoryForm  [icon="save"] > .sa-button').click().wait(2000)
        cy.contains('Mandatory documents category has been added.')
    })

    /**
     * @scenario Edit MDC
     * @description Updates the name of an existing mandatory document category.
     * @priority Medium
     * @steps
     * 1. Navigate to Settings → Mandatory Document Categories
     * 2. Search for "Test Document 1"
     * 3. Click the expand icon
     * 4. Update the name to "Document Test 1"
     * 5. Save changes
     * @expectedResult "Mandatory documents category has been updated."
     */
    it('Edits a MDC', ()=>{
        cy.visit('/settings/mandatory-documents-categories').wait(2000)
        cy.get('#gridMandatoryDocumentsCategories tr .dx-first-cell .dx-texteditor-input').type('Test Document 1', {force:true}).wait(2000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({force:true}).wait(1000)

        cy.get('#editMandatoryDocumentsCategoryForm')
        cy.getByFormControlName('name').clear().type('Document Test 1 ')
        cy.getBySel('saveAndCloseButton').click().wait(2000)
        cy.contains('Mandatory documents category has been updated.')
    })

    /**
     * @scenario Delete MDC
     * @description Deletes an existing mandatory document category.
     * @priority Medium
     * @steps
     * 1. Navigate to Settings → Mandatory Document Categories
     * 2. Search for "Document Test 1"
     * 3. Click the expand icon
     * 4. Click Delete and confirm
     * @expectedResult "Mandatory documents category has been deleted."
     */
    it("Deletes a MDC", ()=>{
        cy.visit('/settings/mandatory-documents-categories').wait(3000)
        cy.get('#gridMandatoryDocumentsCategories tr .dx-first-cell .dx-texteditor-input').type('Document Test 1', {force:true}).wait(3000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({force:true}).wait(1000)
        cy.get('sa-button').contains('Delete').click()
        cy.get('.MessageBoxButtonSection').contains('button', 'Yes').click()
        cy.contains('Mandatory documents category has been deleted.')
    })
})

