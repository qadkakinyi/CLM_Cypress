/**
 * @testSuite Client Profiling - Integration Capacities
 * @description Validates the CRUD operations for Integration Capacity in the Settings module.
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, integration
 * @dependencies faker-js
 * @fileDescription Covers creation, update, and deletion of integration capacities.
 */

import {faker} from "@faker-js/faker";

describe('Integration Capacity', ()=>{

    /**
     * @scenario Add Integration Capacity
     * @description Creates a new integration capacity with a given name and mapping reference.
     * @priority Medium
     * @testData Name: 'Test Capacity', Mapping Reference: faker-generated alphanumeric string
     * @steps Navigate to Settings → Integration Capacities
     * @steps Click Add, fill in the form, click Save
     * @expectedResult "Integration capacity has been added."
     */
    it('Adds Integration Capability', ()=>{
        cy.visit('/settings/integration-capacities').wait(2000)
        cy.contains('sa-button','Add').click().wait(1000)
        cy.get('#addIntegrationCapacityForm')
        cy.getByFormControlName('name').type('Test Capacity')
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(10))
        cy.get('#addIntegrationCapacityForm  [icon="save"] > .sa-button').click().wait(2000)
        cy.contains('Integration capacity has been added.')
    })

    /**
     * @scenario Edit Integration Capacity
     * @description Modifies the name of an existing integration capacity.
     * @priority Medium
     * @steps Search for the created capacity
     * @steps Click Edit, update the name, click Save
     * @expectedResult "Integration capacity has been updated."
     */
    it('Edits Integration Capability', ()=>{
        cy.visit('/settings/integration-capacities').wait(2000)
        cy.get('#gridIntegrationCapacities tr .dx-first-cell .dx-texteditor-input').type('Test Capacity', {force:true}).wait(1000)
        cy.get('#gridIntegrationCapacities tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)
        cy.get('#gridIntegrationCapacities .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input')
            .as('integrationCapacities')
        cy.get('@integrationCapacities').eq(3).clear().wait(1000).type('DKA Capacity Test '+faker.string.alphanumeric(3), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('Integration capacity has been updated')
    })

    /**
     * @scenario Delete Integration Capacity
     * @description Deletes an existing integration capacity from the grid.
     * @priority Medium
     * @steps Search for the updated capacity
     * @steps Click Delete, confirm the action
     * @expectedResult "Integration capacity has been deleted."
     */
    it('Deletes Integration Capability', ()=>{
        cy.visit('/settings/integration-capacities').wait(2000)
        cy.get('#gridIntegrationCapacities tr .dx-first-cell .dx-texteditor-input').type('DKA Capacity Test', {force:true}).wait(1000)
        cy.get('#gridIntegrationCapacities tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('Integration capacity has been deleted.')
    })
})

