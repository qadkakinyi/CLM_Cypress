/**
 * @testSuite Client Profiling - Reasons for TIN
 * @description Validates the creation, editing, and deletion of Reasons for TIN in the system settings
 * @priority Medium
 * @owner QA Team
 * @tags regression, settings, reasons-for-tin
 * @dependencies faker-js
 * @fileDescription Performs CRUD operations on the "Reasons for TIN" settings page
 */

import {faker} from "@faker-js/faker";

let name = 'Test Reason dka '+faker.number.int({min:0, max:10})

describe('Reasons for TIN', ()=>{

    /**
     * @scenario Add Reason for TIN
     * @description Adds a new Reason for TIN entry in system settings
     * @priority Medium
     * @testData Faker-generated reason name and mapping reference
     * @steps Navigate to Reasons for TIN settings
     * @steps Click "Add", enter name, mapping reference, and save
     * @expectedResult New Reason for TIN is added and confirmation message is displayed
     */
    it('Adds a Reason for TIN', ()=>{
        cy.visit('/settings/reasonsForTin').wait(1500)
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type(name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
        cy.get('#addReasonForTinForm  [icon="save"] > .sa-button').click().wait(2000)
        cy.contains('Reason For TIN has been added.')
    })

    /**
     * @scenario Edit Reason for TIN
     * @description Edits an existing Reason for TIN to update its name
     * @priority Medium
     * @testData Modified faker-generated name
     * @steps Search for created reason, click edit, update name, save
     * @expectedResult Reason for TIN is updated and confirmation message is displayed
     */
    it('Edits a Reason for TIN', ()=>{
        cy.visit('/settings/reasonsForTin').wait(2000)
        cy.get('#gridReasonsForTin tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(1000)
        cy.get('#gridReasonsForTin tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)
        cy.get('#gridReasonsForTin .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('TinReasons')
        cy.get('@TinReasons').eq(3).clear().wait(1000).type(name+ faker.string.alphanumeric(1), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('The Reason For TIN has been updated.')
    })

    /**
     * @scenario Delete Reason for TIN
     * @description Deletes the previously created Reason for TIN
     * @priority Medium
     * @steps Search for created reason, click delete, confirm deletion
     * @expectedResult Reason for TIN is removed and confirmation message is displayed
     */
    it('Deletes a Reason for TIN', ()=>{
        cy.visit('/settings/reasonsForTin').wait(2000)
        cy.get('#gridReasonsForTin tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(1000)
        cy.get('#gridReasonsForTin tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('The Reason For TIN has been deleted.')
    })
})

