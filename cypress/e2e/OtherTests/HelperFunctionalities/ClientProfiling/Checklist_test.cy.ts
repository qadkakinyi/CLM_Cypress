/**
 * @testSuite Client Profiling - Checklist Management
 * @description Validates adding, editing, and deleting checklists in system settings
 * @priority Medium
 * @owner QA Team
 * @tags regression, checklist-settings, smoke
 * @dependencies faker-js
 * @fileDescription Performs CRUD operations on the 'Checklists' settings page
 */

import {faker} from "@faker-js/faker";

describe('Checklist', ()=>{

    /**
     * @scenario Add Checklist
     * @description Adds a new checklist with name, priority, mapping reference, and regulation group
     * @priority High
     * @testData Faker-generated mapping reference
     * @steps Navigate to checklists settings
     * @steps Click 'Add', enter name, priority, mapping reference
     * @steps Select regulation group from dropdown
     * @steps Save checklist
     * @expectedResult Checklist is saved and confirmation message appears
     */
    it('Adds A Checklist', ()=>{
        cy.visit('/settings/checklists').wait(3000)
        cy.contains('sa-button','Add').click().wait(2000)
        cy.getByFormControlName('name').type('Test Checklist')
        cy.getByFormControlName('priority').type('5')
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(10))
        cy.getByDataCy('regulation-group').click().wait(500);
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-content')
            .eq(1).find('[aria-rowindex="1"] td').click().wait(1000)
        cy.getByDataCy('save-checklist').click().wait(1000)
        cy.contains('New checklist has been added.').wait(2000)
    })

    /**
     * @scenario Edit Checklist
     * @description Updates the name of an existing checklist
     * @priority Medium
     * @steps Search for checklist by name
     * @steps Click edit icon, update name, save
     * @expectedResult Checklist is updated and confirmation message appears
     */
    it('Edits A Checklist', ()=>{
        cy.visit('/settings/checklists').wait(2000)

        cy.get('#gridChecklists tr .dx-first-cell .dx-texteditor-input')
            .type('Test Checklist', {force:true}).wait(2000)
        cy.get('tr td').find('.dx-icon-edit').eq(1).click({force:true}).wait(1000)

        cy.get('#gridChecklists .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input')
            .as('checklistInputs')
        cy.get('@checklistInputs').eq(4).clear().wait(1000)
            .type('DKA Checklist Test '+faker.string.alphanumeric(3), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('Checklist has been updated')
    })

    /**
     * @scenario Delete Checklist
     * @description Deletes an existing checklist from the system
     * @priority Medium
     * @steps Search for checklist by name
     * @steps Click delete icon, confirm deletion
     * @expectedResult Checklist is deleted and confirmation message appears
     */
    it('Deletes A CheckList', ()=>{
        cy.visit('/settings/checklists').wait(2000)

        cy.get('#gridChecklists tr .dx-first-cell .dx-texteditor-input')
            .type('DKA Checklist Test', {force:true}).wait(2000)
        cy.get('tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({ force: true }).wait(1000);
        cy.contains('Checklist has been deleted.')
    })
})

