import {faker} from "@faker-js/faker";

let name = 'DKA Test Transaction Approval'

/**
 * @testSuite Application Approval Setup
 * @description Validates CRUD operations for Purpose of Transaction setup.
 * @priority Medium
 * @owner QA Team
 * @tags settings, approval, transaction
 */

describe("Application Approval Setup", ()=> {

    /**
     * @scenario Add Purpose of Transaction
     * @description Creates a new Purpose of Transaction with a random mapping reference.
     * @steps
     *  1. Navigate to Settings → Application Approval Setup.
     *  2. Click Add.
     *  3. Fill in Name and Mapping Reference fields.
     *  4. Save the Purpose of Transaction.
     * @expectedResult Toast "The purpose of transaction has been added." is displayed.
     */
    it('Adds a Purpose of Transaction', () => {
        cy.visit('/settings/application-approval-setup')
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').type(name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(20))
        cy.get('#addPurposeOfTransactionForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(1500)
        cy.contains('The purpose of transaction has been added.')
    })

    /**
     * @scenario Edit Purpose of Transaction
     * @description Updates an existing Purpose of Transaction name by appending a random suffix.
     * @steps
     *  1. Navigate to Settings → Application Approval Setup.
     *  2. Filter by the target Purpose of Transaction name.
     *  3. Click Edit on the first result.
     *  4. Change the Name and Save.
     * @expectedResult Toast "The purpose of transaction has been updated." is displayed.
     */
    it('Edits a Purpose of Transaction', () => {

        cy.visit('/settings/application-approval-setup').wait(2000)
        cy.get('#gridPurposeOfTransactions tr .dx-first-cell .dx-texteditor-input').type(name, {force: true}).wait(2000)
        cy.get('#gridPurposeOfTransactions tr td').find('.dx-icon-edit').eq(0).click({force: true}).wait(1000)

        cy.get('#gridPurposeOfTransactions .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('pots')
        cy.get('@pots').eq(3).clear().wait(1000).type(name + faker.string.alphanumeric(1), {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains('The purpose of transaction has been updated.')
    })

    /**
     * @scenario Delete Purpose of Transaction
     * @description Removes an existing Purpose of Transaction from the grid.
     * @steps
     *  1. Navigate to Settings → Application Approval Setup.
     *  2. Filter by the target Purpose of Transaction name.
     *  3. Click Delete and confirm.
     * @expectedResult Toast "The purpose of transaction has been deleted" is displayed.
     */
    it('Deletes a Purpose of Transaction', () => {
        cy.visit('/settings/application-approval-setup').wait(2000)

        cy.get('#gridPurposeOfTransactions tr .dx-first-cell .dx-texteditor-input').type(name, {force: true}).wait(2500)
        cy.get('#gridPurposeOfTransactions tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains('The purpose of transaction has been deleted')
    })
})

