/**
 * @testSuite Client Profiling - MID Classes
 * @description Validates CRUD operations for MID Classes in the Settings module.
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, mid-classes
 * @dependencies faker-js
 * @fileDescription Covers adding, editing, and deleting of MID Classes in system settings.
 */

import {faker} from "@faker-js/faker";

let name = 'Test dka ' + faker.number.int({min:0, max:10});

describe('MID Classes', ()=>{

    /**
     * @scenario Add MID Class
     * @description Creates a new MID Class with a faker-generated mapping reference.
     * @priority Medium
     * @testData
     * - Name: Generated "Test dka X"
     * - Mapping Reference: faker-generated alphanumeric(13)
     * @steps
     * 1. Navigate to Settings → MID Classes
     * 2. Click Add
     * 3. Enter name and mapping reference
     * 4. Save
     * @expectedResult "MID class has been added."
     */
    it('Adds an MID Class', ()=>{
        cy.visit('/settings/mid-classes').wait(1500)
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type(name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
        cy.get('#addMidClassForm  [icon="save"] > .sa-button').click().wait(2000)
        cy.contains('MID class has been added.')
    })

    /**
     * @scenario Edit MID Class
     * @description Updates the name of an existing MID Class.
     * @priority Medium
     * @steps
     * 1. Navigate to Settings → MID Classes
     * 2. Search for previously created MID Class
     * 3. Click Edit icon
     * 4. Update the name
     * 5. Save
     * @expectedResult "The MID class has been updated."
     */
    it('Edits an MID class', ()=>{
        cy.visit('/settings/mid-classes').wait(2000)
        cy.get('#gridMidClasses tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(1000)
        cy.get('#gridMidClasses tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridMidClasses .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('MidClasses')
        cy.get('@MidClasses').eq(3).clear().wait(1000).type('DKA ' + name + faker.string.alphanumeric(1), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)

        cy.contains('The MID class has been updated.')
    })

    /**
     * @scenario Delete MID Class
     * @description Deletes an existing MID Class.
     * @priority Medium
     * @steps
     * 1. Navigate to Settings → MID Classes
     * 2. Search for updated MID Class
     * 3. Click Delete icon
     * 4. Confirm deletion
     * @expectedResult "The MID class has been deleted."
     */
    it('Deletes an MID Class', ()=>{
        cy.visit('/settings/mid-classes').wait(2000)
        cy.get('#gridMidClasses tr .dx-first-cell .dx-texteditor-input').type('DKA ' + name, {force:true}).wait(1000)
        cy.get('#gridMidClasses tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({ force: true }).wait(1000)
        cy.contains('The MID class has been deleted.')
    })
})

