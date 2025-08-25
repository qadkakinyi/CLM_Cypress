/**
 * @testSuite Client Profiling - Monitoring Visit Types
 * @description Validates CRUD operations for Monitoring Visit Types in the Settings module.
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, monitoring-visit-types
 * @dependencies faker-js
 * @fileDescription Covers adding, editing, and deleting of Monitoring Visit Types in system settings.
 */

import {faker} from "@faker-js/faker";

let name = 'Test visit dka ' + faker.number.int({min:0, max:10});

describe('Monitoring Visit Types', ()=>{

    /**
     * @scenario Add Monitoring Visit Type
     * @description Creates a new Monitoring Visit Type with a faker-generated mapping reference.
     * @priority Medium
     * @testData
     * - Name: Generated "Test visit dka X"
     * - Mapping Reference: faker-generated alphanumeric(13)
     * @steps
     * 1. Navigate to Settings → Monitoring Visit Types
     * 2. Click Add
     * 3. Enter name and mapping reference
     * 4. Save
     * @expectedResult "Monitoring visit type has been added."
     */
    it('Adds a Visit Type', ()=>{
        cy.visit('/settings/monitoring-visit-type').wait(1500)
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type(name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
        cy.get('#addMonitoringVisitTypeForm  [icon="save"] > .sa-button').click().wait(2000)
        cy.contains('Monitoring visit type has been added.')
    })

    /**
     * @scenario Edit Monitoring Visit Type
     * @description Updates the name of an existing Monitoring Visit Type.
     * @priority Medium
     * @steps
     * 1. Navigate to Settings → Monitoring Visit Types
     * 2. Search for previously created visit type
     * 3. Click Edit icon
     * 4. Update the name
     * 5. Save
     * @expectedResult "Monitoring Visit Type has been updated."
     */
    it('Edits a Visit Type', ()=>{
        cy.visit('/settings/monitoring-visit-type').wait(2000)
        cy.get('#gridBanks tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(2000)
        cy.get('#gridBanks tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridBanks .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('VisitTypes')
        cy.get('@VisitTypes').eq(2).clear().wait(1000).type(name + faker.string.alphanumeric(1), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)

        cy.contains('Monitoring Visit Type has been updated.')
    })

    /**
     * @scenario Delete Monitoring Visit Type
     * @description Deletes an existing Monitoring Visit Type.
     * @priority Medium
     * @steps
     * 1. Navigate to Settings → Monitoring Visit Types
     * 2. Search for updated visit type
     * 3. Click Delete icon
     * 4. Confirm deletion
     * @expectedResult "The Monitoring Visit Type has been deleted."
     */
    it('Deletes a Visit Type', ()=>{
        cy.visit('/settings/monitoring-visit-type').wait(2000)
        cy.get('#gridBanks tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(2500)
        cy.get('#gridBanks tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({ force: true }).wait(1000)
        cy.contains('The Monitoring Visit Type has been deleted.')
    })
})

