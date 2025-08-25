import {faker} from "@faker-js/faker";

let name = 'DKA Test Category'

/**
 * @testSuite Actions Setup
 * @description Covers creation, modification, and deletion of Action Categories and Action Statuses.
 * @priority Medium
 * @owner QA Team
 * @tags settings, actions, categories, statuses
 */

describe("Actions Setup", ()=>{

    /**
     * @scenario Add Action Category
     * @description Creates a new action category with a random mapping reference.
     * @steps
     *  1. Navigate to Settings → Actions Setup.
     *  2. Click Add.
     *  3. Enter Category Name and Mapping Reference.
     *  4. Save the category.
     * @expectedResult Toast "Action category has been added." is displayed.
     */
    it('Adds an Action Category', ()=>{
        cy.visit('/settings/actions-setup')
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByDataCy('category-name').type(name)
        cy.getByDataCy('mapping-ref').type(faker.string.alphanumeric(20))
        cy.getByDataCy('save-category-btn').click().wait(1500)
        cy.contains('Action category has been added.')
    })

    /**
     * @scenario Edit Action Category
     * @description Edits the first matching category’s name (appends a random suffix).
     * @steps
     *  1. Open Actions Setup.
     *  2. Filter grid by category name.
     *  3. Click Edit on first row.
     *  4. Update the Name field and Save.
     * @expectedResult Toast "Action category has been updated." is displayed.
     */
    it('Edits an Action Category', ()=>{

        cy.visit('/settings/actions-setup').wait(2000)
        cy.get('#gridActionCategories tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(2000)
        cy.get('#gridActionCategories tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridActionCategories .dx-datagrid-table .dx-texteditor-input-container > .dx-texteditor-input').eq(4).clear().type(name+ faker.string.alphanumeric(1), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains('Action category has been updated.')
    })

    /**
     * @scenario Delete Action Category
     * @description Deletes the filtered action category.
     * @steps
     *  1. Open Actions Setup.
     *  2. Filter grid by the category name.
     *  3. Click Delete and confirm.
     * @expectedResult Toast "Action category has been deleted." is displayed.
     */
    it('Deletes an Action Category', ()=>{
        cy.visit('/settings/actions-setup').wait(2000)

        cy.get('#gridActionCategories tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(2500)
        cy.get('#gridActionCategories tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);

        cy.contains('Action category has been deleted.')
    })

    /**
     * @scenario Add Action Status
     * @description Adds a new action status under Action Statuses tab.
     * @steps
     *  1. Open Actions Setup → Action Statuses tab.
     *  2. Click Add.
     *  3. Fill in Name and Mapping Reference.
     *  4. Save the status.
     * @expectedResult Toast "The action status has been added." is displayed.
     */
    it('Adds a Status', ()=>{
        cy.visit('/settings/actions-setup')
        cy.get('span').contains('Action Statuses').click().wait(1000)
        cy.contains('sa-button','Add').click()
        cy.wait(1000)
        cy.getByDataCy('action-name').type("DKA Test Status")
        cy.getByDataCy('mapping-ref-action').type(faker.string.alphanumeric(30))
        cy.getByDataCy('create-action-btn').click().wait(1500)
        cy.contains('The action status has been added.')
    })

    /**
     * @scenario Edit Action Status
     * @description Edits the first matching action status name (appends a random suffix).
     * @steps
     *  1. Open Actions Setup → Action Statuses tab.
     *  2. Filter grid by status name.
     *  3. Click Edit on first row.
     *  4. Update the Name field and Save.
     * @expectedResult Toast "Action status has been updated." is displayed.
     */
    it('Edits a Status', ()=>{

        cy.visit('/settings/actions-setup').wait(2000)
        cy.get('span').contains('Action Statuses').click().wait(1000)
        cy.get('#gridActionStatuses tr .dx-first-cell .dx-texteditor-input').type("DKA Test Status", {force:true}).wait(2000)
        cy.get('#gridActionStatuses tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridActionStatuses .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('statuses')
        cy.get('@statuses').eq(4).clear().wait(1000).type("DKA Test Status "+ faker.string.alphanumeric(1), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains('Action status has been updated.')
    })

    /**
     * @scenario Delete Action Status
     * @description Deletes the filtered action status.
     * @steps
     *  1. Open Actions Setup → Action Statuses tab.
     *  2. Filter grid by status name.
     *  3. Click Delete and confirm.
     * @expectedResult Toast confirming deletion of the action status is displayed.
     */
    it('Deletes a Status', ()=>{
        cy.visit('/settings/actions-setup').wait(2000)
        cy.get('span').contains('Action Statuses').click().wait(1000)

        cy.get('#gridActionStatuses tr .dx-first-cell .dx-texteditor-input').type("DKA Test Status", {force:true}).wait(2500)
        cy.get('#gridActionStatuses tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);

        cy.contains('Action status has been ')
    })

})

