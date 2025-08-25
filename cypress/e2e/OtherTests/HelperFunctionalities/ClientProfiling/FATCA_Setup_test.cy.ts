/**
 * @testSuite Client Profiling - FATCA Management
 * @description CRUD operations for FATCA setup, entity categorizations, documents, and CRS categorizations.
 * @priority Medium
 * @owner QA Team
 * @tags regression, settings, fatca
 * @dependencies faker-js
 * @fileDescription Covers the end-to-end creation, modification, and deletion of FATCA-related configurations in the system.
 */

import {faker} from "@faker-js/faker";

describe('FATCA Setup', ()=>{

    /**
     * @scenario Add FATCA Status
     * @description Creates a new FATCA status with a name and mapping reference.
     * @priority Medium
     * @steps Navigate to Settings → FATCA Setup
     * @steps Click Add, fill name and reference, click Save
     * @expectedResult "Fatca Status has been added."
     */
    it('Adds FATCA Setup', ()=>{
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.contains('sa-button','Add').click()
        cy.wait(1000)
        cy.get('#addFatcaStatusForm .status-name').type('Test Active')
        cy.get('#addFatcaStatusForm .status-ref').type(faker.string.alphanumeric(10))
        cy.getByDataCy('save-status').click().wait(2000)
        cy.contains('Fatca Status has been added.')
    })

    /**
     * @scenario Edit FATCA Status
     * @description Updates an existing FATCA status name.
     * @priority Medium
     * @steps Filter FATCA statuses by name
     * @steps Click edit, change value, save
     * @expectedResult "Fatca Status has been updated"
     */
    it('Edits FATCA Status', ()=>{
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.get('#gridFatcaStatuses tr .dx-first-cell .dx-texteditor-input').type('Test Active', {force:true}).wait(2000)
        cy.get('tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)
        cy.get('#gridFatcaStatuses .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input')
            .eq(2).clear().wait(1000).type('Active Test '+faker.string.alphanumeric(3), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('Fatca Status has been updated')
    })

    /**
     * @scenario Delete FATCA Status
     * @description Removes an existing FATCA status.
     * @priority Medium
     * @steps Filter FATCA statuses by name
     * @steps Click delete, confirm
     * @expectedResult "Fatca Status has been deleted."
     */
    it('Deletes Fatca Status', ()=>{
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.get('#gridFatcaStatuses tr .dx-first-cell .dx-texteditor-input').type('Active Test', {force:true}).wait(2500)
        cy.get('tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('Fatca Status has been deleted.')
    })
})

describe('FATCA Entities Categorization', ()=>{

    /**
     * @scenario Add FATCA Entity Categorization
     * @description Creates a new FATCA entity category with faker-generated reference.
     * @priority Medium
     * @steps Navigate to FATCA Entities Categorization
     * @steps Click Add, fill in details, save
     * @expectedResult "Fatca Entity Categorization has been added."
     */
    it('Add FATCA Entities categorization', ()=>{
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.contains('FATCA Entities Categorization').click().wait(1000)
        cy.contains('sa-button','Add').click()
        cy.wait(1000)
        cy.get('#addFatcaEntityCategorizationForm .category-name').type('Test Entity Category')
        cy.get('#addFatcaEntityCategorizationForm .category-ref').type(faker.string.alphanumeric(10))
        cy.get('.save-category').click().wait(2000)
        cy.contains('Fatca Entity Categorization has been added.')
    })

    /**
     * @scenario Edit FATCA Entity Categorization
     * @description Updates an existing FATCA entity category.
     * @priority Medium
     * @steps Filter by name, edit, save
     * @expectedResult "Fatca Entity Categorization has been updated"
     */
    it('Edits FATCA Entities categorization', ()=>{
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.contains('FATCA Entities Categorization').click().wait(1000)
        cy.get('#gridFatcaEntitiesCategorization tr .dx-first-cell .dx-texteditor-input').type('Test Entity Category', {force:true}).wait(2000)
        cy.get('#gridFatcaEntitiesCategorization tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)
        cy.get('#gridFatcaEntitiesCategorization .dx-datagrid-table .dx-texteditor-input').eq(2)
            .clear().wait(1000).type('Entity Category Test '+faker.string.alphanumeric(3), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('Fatca Entity Categorization has been updated')
    })

    /**
     * @scenario Delete FATCA Entity Categorization
     * @description Deletes an entity categorization.
     * @priority Medium
     * @steps Filter by name, delete, confirm
     * @expectedResult "Fatca Entity Categorization has been deleted."
     */
    it('Deletes Fatca Entities categorization', ()=>{
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.contains('FATCA Entities Categorization').click().wait(1000)
        cy.get('#gridFatcaEntitiesCategorization tr .dx-first-cell .dx-texteditor-input').type('Entity Category Test', {force:true}).wait(2500)
        cy.get('#gridFatcaEntitiesCategorization tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('Fatca Entity Categorization has been deleted.')
    })
})

describe('FATCA Documents', ()=>{

    /**
     * @scenario Add FATCA Document
     * @description Adds a new FATCA document.
     * @priority Medium
     * @steps Navigate to FATCA Documents, click Add, fill in details, save
     * @expectedResult "Fatca Document has been added"
     */
    it('Adds Fatca Documents', ()=>{
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.contains('FATCA Documents').click()
        cy.contains('sa-button','Add').click()
        cy.wait(1000)
        cy.get('#addFatcaDocumentForm .document-name').type('Test Fatca Document')
        cy.get('#addFatcaDocumentForm .document-ref').type(faker.string.alphanumeric(10))
        cy.get('.save-document').click().wait(2000)
        cy.contains('Fatca Document has been added')
    })

    /**
     * @scenario Edit FATCA Document
     * @description Updates an existing FATCA document.
     * @priority Medium
     * @steps Filter by name, edit, save
     * @expectedResult "Fatca Document has been updated"
     */
    it('Edits FATCA Documents', ()=>{
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.contains('FATCA Documents').click().wait(1000)
        cy.get('#gridFatcaDocuments tr .dx-first-cell .dx-texteditor-input').type('Test Fatca Document', {force:true}).wait(2000)
        cy.get('#gridFatcaDocuments tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)
        cy.get('#gridFatcaDocuments .dx-datagrid-table .dx-texteditor-input').eq(2)
            .clear().wait(1000).type('Fatca Document Test '+faker.string.alphanumeric(3), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('Fatca Document has been updated')
    })

    /**
     * @scenario Delete FATCA Document
     * @description Deletes a FATCA document.
     * @priority Medim
     * @steps Filter by name, delete, confirm
     * @expectedResult "Fatca Document has been deleted."
     */
    it('Deletes Fatca Documents', ()=>{
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.contains('FATCA Documents').click().wait(1000)
        cy.get('#gridFatcaDocuments tr .dx-first-cell .dx-texteditor-input').type('Fatca Document Test', {force:true}).wait(2500)
        cy.get('#gridFatcaDocuments tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('Fatca Document has been deleted.')
    })
})

describe('FATCA CRS Entities Categorization', ()=>{

    /**
     * @scenario Add FATCA CRS Entity Categorization
     * @description Creates a new FATCA CRS categorization.
     * @priority Medium
     * @steps Navigate to FATCA CRS Entities Categorization, click Add, fill in details, save
     * @expectedResult "Fatca CRS Entity Categorization has been added."
     */
    it('Adds FATCA Entities Categorization', ()=>{
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.contains('FATCA CRS Entities Categorization').click()
        cy.contains('sa-button','Add').click()
        cy.wait(1000)
        cy.get('#addFatcaCrsEntityCategorizationForm .crs-name').type('Test Fatca CRS')
        cy.get('#addFatcaCrsEntityCategorizationForm .crs-ref').type(faker.string.alphanumeric(10))
        cy.get('.save-crs').click().wait(2000)
        cy.contains('Fatca CRS Entity Categorization has been added.')
    })

    /**
     * @scenario Edit FATCA CRS Entity Categorization
     * @description Updates an existing FATCA CRS categorization.
     * @priority Medium
     * @steps Filter by name, edit, save
     * @expectedResult "Fatca CRS Entity Categorization has been updated"
     */
    it('Edits FATCA CRS Entity Categorization', ()=>{
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.contains('FATCA CRS Entities Categorization').click()
        cy.get('#gridFatcaCrsEntitiesCategorization tr .dx-first-cell .dx-texteditor-input').type('Test Fatca CRS', {force:true}).wait(2000)
        cy.get('#gridFatcaCrsEntitiesCategorization tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)
        cy.get('#gridFatcaCrsEntitiesCategorization .dx-datagrid-table .dx-texteditor-input').eq(2)
            .clear().wait(1000).type('Fatca CRS Test '+faker.string.alphanumeric(3), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('Fatca CRS Entity Categorization has been updated')
    })

    /**
     * @scenario Delete FATCA CRS Entity Categorization
     * @description Deletes a FATCA CRS entity categorization.
     * @priority Medium
     * @steps Filter by name, delete, confirm
     * @expectedResult "Fatca CRS Entity Categorization has been deleted."
     */
    it('Deletes Fatca CRS Entity Categorization', ()=>{
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.contains('FATCA CRS Entities Categorization').click()
        cy.get('#gridFatcaCrsEntitiesCategorization tr .dx-first-cell .dx-texteditor-input').type('Fatca CRS Test', {force:true}).wait(3000)
        cy.get('#gridFatcaCrsEntitiesCategorization tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('Fatca CRS Entity Categorization has been deleted.')
    })
})

