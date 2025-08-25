/**
 * @testSuite Client Profiling - MID Types
 * @description Validates CRUD operations for MID Types in the Settings module.
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, mid-types
 * @dependencies faker-js
 * @fileDescription Covers adding, editing, and deleting of MID Types in system settings.
 */

import {faker} from "@faker-js/faker";

let name = 'Test dka ' + faker.number.int({min:0, max:10});

describe('MID Type', ()=>{

    /**
     * @scenario Add MID Type
     * @description Creates a new MID Type with a faker-generated mapping reference.
     * @priority Medium
     * @testData
     * - Name: Generated "Test dka X"
     * - Mapping Reference: faker-generated alphanumeric(13)
     * @steps
     * 1. Navigate to Settings → MID Types
     * 2. Click Add
     * 3. Enter name and mapping reference
     * 4. Save
     * @expectedResult "MID type has been added."
     */
    it('Adds a MID Type', ()=>{
        cy.visit('/settings/mid-types').wait(1500)
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type(name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
        cy.get('#addMidTypeForm  [icon="save"] > .sa-button').click().wait(2000)
        cy.contains('MID type has been added.')
    })

    /**
     * @scenario Edit MID Type
     * @description Updates the name of an existing MID Type.
     * @priority Medium
     * @steps
     * 1. Navigate to Settings → MID Types
     * 2. Search for previously created MID Type
     * 3. Click Edit icon
     * 4. Update the name
     * 5. Save
     * @expectedResult "The MID type has been updated."
     */
    it('Edits an MID Type', ()=>{
        cy.visit('/settings/mid-types').wait(2000)
        cy.get('#gridMidTypes tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(1000)
        cy.get('#gridMidTypes tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridMidTypes .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('MidTypes')
        cy.get('@MidTypes').eq(3).clear().wait(1000).type('DKA ' + name + faker.string.alphanumeric(1), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)

        cy.contains('The MID type has been updated.')
    })

    /**
     * @scenario Delete MID Type
     * @description Deletes an existing MID Type.
     * @priority Medium
     * @steps
     * 1. Navigate to Settings → MID Types
     * 2. Search for updated MID Type
     * 3. Click Delete icon
     * 4. Confirm deletion
     * @expectedResult "The MID type has been deleted."
     */
    it('Deletes an MID Type', ()=>{
        cy.visit('/settings/mid-types').wait(2000)
        cy.get('#gridMidTypes tr .dx-first-cell .dx-texteditor-input').type('DKA ' + name, {force:true}).wait(1000)
        cy.get('#gridMidTypes tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({ force: true }).wait(1000)
        cy.contains('The MID type has been deleted.')
    })
})

