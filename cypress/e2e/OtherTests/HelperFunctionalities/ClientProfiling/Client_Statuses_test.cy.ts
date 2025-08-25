/**
 * @testSuite Client Profiling - Client Statuses Settings
 * @description CRUD tests for Client Statuses in Settings
 * @priority Medium
 * @owner QA Team
 * @tags regression, settings, client-statuses
 * @dependencies faker-js
 * @fileDescription Verifies adding, editing, and deleting client statuses via the Settings UI
 */

import {faker} from "@faker-js/faker";

describe('Client Statuses', ()=>{

    /**
     * @scenario Add Client Status
     * @description Creates a new client status with a faker-generated mapping reference
     * @priority Medium
     * @testData Name: "Status Test"; Mapping Reference: faker string(11)
     * @steps Navigate to Settings → Client Statuses
     * @steps Click Add; fill Name & Mapping Reference
     * @steps Choose values for Color and Status dropdowns
     * @steps Click Save
     * @expectedResult Toast appears: "The client status has been added."
     */
    it('Adds A Client Status', ()=>{
        cy.visit('/settings/client-statuses').wait(1000)
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.get('#addClientStatusForm')
        cy.getByFormControlName('name').eq(0).type('Status Test')
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(11))
        // cy.getByDataCy('colors').click().wait(500)
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid [aria-rowindex="1"]').eq(0).click().wait(500)
        // cy.getByDataCy('status').click().wait(500)
        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid [aria-rowindex="1"]').eq(1).click().wait(500)
        cy.get('#addClientStatusForm [icon="save"] > .sa-button').contains('Save').click().wait(2000);
        cy.contains('The client status has been added.')
    })

    /**
     * @scenario Edit Client Status
     * @description Updates the mapping reference of an existing client status
     * @priority Medium
     * @testData New Mapping Reference: faker string(11)
     * @steps Open Settings → Client Statuses
     * @steps Filter by "Status Test", click edit icon
     * @steps Type new Mapping Reference, click Save
     * @expectedResult Toast appears: "Client status modified successfully"
     */
    it('Edits A Client Status', ()=>{
        cy.visit('/settings/client-statuses').wait(3000)

        cy.get('#gridClientStatuses tr .dx-first-cell .dx-texteditor-input').type('Status Test', {force:true}).wait(2000)
        cy.get('tr td').find('.dx-icon-edit').eq(1).click({force:true}).wait(2000)
        cy.get('#editClientStatusForm')
        cy.getByFormControlName('mappingReference').eq(1).type(faker.string.alphanumeric(11))
        cy.get('#editClientStatusForm sa-button').contains('Save').click().wait(2000);
        cy.contains('Client status modified successfully')
    })

    /**
     * @scenario Delete Client Status
     * @description Removes the created client status from the grid
     * @priority Medium
     * @steps Open Settings → Client Statuses
     * @steps Filter by "Status Test", click delete icon, confirm Yes
     * @expectedResult Toast appears: "Client status has been deleted."
     */
    it('Deletes A Client Status', ()=>{
        cy.visit('/settings/client-statuses').wait(3000)

        cy.get('#gridClientStatuses tr .dx-first-cell .dx-texteditor-input').type('Status Test', {force:true}).wait(2000)
        cy.get('tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('Client status has been deleted.')
    })
})

