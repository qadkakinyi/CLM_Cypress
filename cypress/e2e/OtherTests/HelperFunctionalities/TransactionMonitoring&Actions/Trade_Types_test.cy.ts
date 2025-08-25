import {faker} from "@faker-js/faker";

/**
 * @testSuite Trade Types
 * @description Covers creation, editing, and deletion of trade types in the system
 * @priority Medium
 * @owner QA Team
 * @tags trade-types, configuration
 */

describe('Trade Types', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/trade-types').wait(2000)
    })

    /**
     * @scenario Add Trade Type
     * @description Adds a new trade type using a unique mapping reference
     * @steps
     *  1. Navigate to Trade Types page
     *  2. Click "Add"
     *  3. Type trade type name and mapping reference
     *  4. Save
     * @expectedResult Trade type is added successfully
     */
    it('Adds a Trade Type', ()=>{
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('Trade Type DKA')
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13))

        cy.get('#addTradeTypeForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(1000)
        cy.contains('Trade type has been added')
    })

    /**
     * @scenario Edit Trade Type
     * @description Updates an existing trade type’s name
     * @steps
     *  1. Search for "Trade Type DKA"
     *  2. Click the edit icon
     *  3. Update the name to "DKA Trade Type"
     *  4. Save changes
     * @expectedResult Trade type is updated successfully
     */
    it('Edits a Trade Type', () => {
        cy.get('#gridTradeTypes tr .dx-first-cell .dx-texteditor-input').type('Trade Type DKA', {force:true}).wait(2000)
        cy.get('#gridTradeTypes tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridTradeTypes .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('tradetypes')

        cy.get('@tradetypes').eq(3).clear().wait(1000).type('DKA Trade Type', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`The trade type has been updated.`).wait(1000)
    })

    /**
     * @scenario Delete Trade Type
     * @description Deletes a trade type based on its name
     * @steps
     *  1. Search for "DKA Trade Type"
     *  2. Click delete icon
     *  3. Confirm deletion
     * @expectedResult Trade type is deleted successfully
     */
    it('Deletes a Trade Type', () => {
        cy.get('#gridTradeTypes tr .dx-first-cell .dx-texteditor-input').type('DKA Trade Type', {force:true}).wait(2000)
        cy.get('#gridTradeTypes tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The trade type has been deleted.`).wait(1000)
    })
})

