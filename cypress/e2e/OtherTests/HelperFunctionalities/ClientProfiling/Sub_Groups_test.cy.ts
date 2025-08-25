/**
 * @testSuite Client Profiling - Sub-groups
 * @description Validates the creation, editing, and deletion of Sub-groups in system settings
 * @priority Medium
 * @owner QA Team
 * @tags regression, settings, sub-groups
 * @dependencies faker-js
 * @fileDescription Performs CRUD operations on the "Sub-groups" settings page
 */

import {faker} from "@faker-js/faker";

let name = 'Test SubGroups dka ' + faker.number.int({min:0, max:10})

describe("Sub-groups", ()=>{

    /**
     * @scenario Add Sub-group
     * @description Adds a new Sub-group entry in system settings
     * @priority Medium
     * @testData Faker-generated sub-group name and mapping reference
     * @steps Navigate to Sub-groups settings
     * @steps Click "Add", enter name and mapping reference, then save
     * @expectedResult New Sub-group is added and confirmation message is displayed
     */
    it('Adds a Sub-group', ()=>{
        cy.visit('/settings/sub-groups').wait(1500)
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type(name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
        cy.get('#addSubGroupForm [icon="save"] > .sa-button').click().wait(2000)
        cy.contains('Sub-group has been added.')
    })

    /**
     * @scenario Edit Sub-group
     * @description Edits an existing Sub-group to update its name
     * @priority Medium
     * @testData Modified faker-generated name
     * @steps Search for created Sub-group, click edit, update name, and save
     * @expectedResult Sub-group is updated and confirmation message is displayed
     */
    it('Edits a Sub-group', ()=>{
        cy.visit('/settings/sub-groups').wait(2000)
        cy.get('#gridSubGroups tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(2500)
        cy.get('#gridSubGroups tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)
        cy.get('#gridSubGroups .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('subgroups')
        cy.get('@subgroups').eq(3).clear().wait(1000).type(name+ faker.string.alphanumeric(1), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('Sub-group has been updated.')
    })

    /**
     * @scenario Delete Sub-group
     * @description Deletes the previously created Sub-group
     * @priority Medium
     * @steps Search for created Sub-group, click delete, confirm deletion
     * @expectedResult Sub-group is removed and confirmation message is displayed
     */
    it('Deletes a Sub-group', ()=>{
        cy.visit('/settings/sub-groups').wait(2000)
        cy.get('#gridSubGroups tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(2500)
        cy.get('#gridSubGroups tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('Sub-group has been deleted.')
    })
})

