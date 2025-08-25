/**
 * @testSuite Client Profiling - Bank
 * @description Validates the ability to add, edit, and delete bank entries in the system settings
 * @priority Medium
 * @owner QA Team
 * @tags regression, bank-settings, smoke
 * @dependencies faker-js
 * @fileDescription Performs CRUD operations on the bank settings page
 */

import {faker} from "@faker-js/faker";

describe('Bank', ()=>{

    /**
     * @scenario Add Bank
     * @description Adds a new bank entry using dynamically generated data
     * @priority High
     * @testData Faker-generated bank code and mapping reference
     * @steps Navigate to banks settings page
     * @steps Click 'Add', fill in form, click 'Save'
     * @expectedResult Bank is saved and confirmation message appears
     */
    it('Add bank', ()=>{
        cy.visit('/settings/banks')
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByDataCy("bank-name").type(`Xyz Test Bank`)
        cy.getByDataCy("bank-code").type(faker.string.alphanumeric(20))
        cy.getByDataCy("bank-mapping-reference").type(faker.string.alphanumeric(20))
        cy.get('#addBankForm  [icon="save"] > .sa-button').click().wait(2000)
        cy.contains('The bank has been added').wait(1000)
    })

    /**
     * @scenario Edit Bank
     * @description Edits the name of an existing bank
     * @priority Medium
     * @steps Visit bank settings
     * @steps Search for bank, click edit, update name, save
     * @expectedResult Bank is updated and confirmation message appears
     */
    it("Edits Bank", ()=>{
        cy.visit('/settings/banks').wait(2000)

        cy.get('#gridBanks tr .dx-first-cell .dx-texteditor-input').type('Xyz Test', {force:true}).wait(2500)
        cy.get('tr td').find('.dx-icon-edit').eq(1).click({force:true}).wait(1000)

        cy.get('#gridBanks .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input')
            .eq(6).clear().wait(1000)
            .type('Xyz Bank Test '+faker.string.alphanumeric(3), {force:true}).wait(1000)

        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('The bank has been updated')
    })

    /**
     * @scenario Delete Bank
     * @description Deletes the previously added bank from the list
     * @priority Medium
     * @steps Visit bank settings
     * @steps Search bank, click delete icon, confirm
     * @expectedResult Bank is deleted and confirmation message appears
     */
    it("Deletes Bank", ()=>{
        cy.visit('/settings/banks').wait(2000)

        cy.get('#gridBanks tr .dx-first-cell .dx-texteditor-input').type('Xyz Bank', {force:true}).wait(2500)
        cy.get('tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({ force: true }).wait(1000);
        cy.contains('The bank has been deleted.')
    })
})

