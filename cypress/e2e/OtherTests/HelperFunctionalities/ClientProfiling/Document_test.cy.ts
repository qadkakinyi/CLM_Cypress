/**
 * @testSuite Client Profiling - Documents
 * @description CRUD operations for managing document definitions in the system
 * @priority High
 * @owner QA Team
 * @tags regression, settings, documents
 * @dependencies faker-js
 * @fileDescription Validates adding, editing, and deleting documents, including capacity handling and dropdown selections.
 */

import {faker} from "@faker-js/faker";

describe('Documents', ()=>{

    /**
     * @scenario Add Document
     * @description Creates a new document with faker-generated name and mapping reference, assigning type, client type, regulation group, and capacity.
     * @priority High
     * @testData Name: "DKA Test Document <faker word>", Mapping Reference: faker-generated alphanumeric(11)
     * @steps Navigate to Settings → Documents
     * @steps Click Add to open the form
     * @steps Fill in name, name in portal, mapping reference
     * @steps Select document type, client type, regulation group, and capacity
     * @steps Click Save
     * @expectedResult Toast: "Document has been added."
     */
    it('Adds a document', ()=>{
        cy.visit('/settings/documents').wait(2000)
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.get('#addDocumentForm')

        cy.getByFormControlName('name').type('DKA Test Document '+faker.word.sample())
        cy.getByFormControlName('nameInPortal').clear().type('Test_Doc')
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(11))
        cy.getByDataCy('documentType').click().wait(500)
        cy.getBySel('dynamicSelectBoxDropdownGrid').find('[aria-rowindex="1"]').click().wait(500)
        cy.getByDataCy('clientType').click().wait(500)
        cy.getBySel('dynamicSelectBoxDropdownGrid').contains('Corporate').click().wait(500)
        cy.getByDataCy('regulationGroup').click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-content').eq(5).find('[aria-rowindex="1"] td').click()
        cy.getByDataCy('capacityList').click().wait(500)
        cy.get('.dropdown-list .item2 li').eq(0).click().wait(500)
        cy.get('#addDocumentForm [icon="save"] > .sa-button').click().wait(2000);
        cy.contains('Document has been added.').wait(1000)
    })

    /**
     * @scenario Edit Document
     * @description Updates the name of an existing document and clears its capacity selection.
     * @priority High
     * @steps Navigate to Settings → Documents
     * @steps Filter by "DKA Test Document"
     * @steps Open details via double-right arrow icon
     * @steps Change the name, unselect capacity
     * @steps Click Save & Close
     * @expectedResult Toast: "The document has been updated."
     */
    it('Edits a document', ()=>{
        cy.visit('/settings/documents').wait(2000)
        cy.get('#gridDocuments tr .dx-first-cell .dx-texteditor-input').type('DKA Test Document', {force:true}).wait(2000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({force:true}).wait(1000)

        cy.get('#editDocumentForm')
        cy.getByFormControlName('name').clear().type('DKA Document Test '+faker.word.sample())
        cy.getByFormControlName('capacities').click().wait(500)
        cy.get('.dropdown-list .item2 li').eq(0).click().wait(500)
        cy.getBySel('saveAndCloseButton').click().wait(1000)
        cy.contains('The document has been updated.').wait(1000)
    })

    /**
     * @scenario Delete Document
     * @description Deletes the "DKA Document Test" document and verifies capacity is unpopulated before deletion.
     * @priority High
     * @steps Navigate to Settings → Documents
     * @steps Filter by "DKA Document Test"
     * @steps Open details via double-right arrow icon
     * @steps Verify capacity dropdown shows "Select"
     * @steps Click Delete and confirm
     * @expectedResult Toast: "The document has been deleted."
     */
    it("Deletes a document", ()=>{
        cy.visit('/settings/documents').wait(3000)
        cy.get('#gridDocuments tr .dx-first-cell .dx-texteditor-input').type('DKA Document Test', {force:true}).wait(2000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({force:true}).wait(1000)

        cy.get('[formcontrolname="capacities"] span[class="dropdown-btn"] span').eq(0).invoke('text').then(capacity=>{
            expect(capacity).to.equal('Select')
        })
        cy.get('sa-button').contains('Delete').click()
        cy.get('.MessageBoxButtonSection').contains('button', 'Yes').click().wait(1000)
        cy.contains('The document has been deleted.').wait(1000)
    })
})

