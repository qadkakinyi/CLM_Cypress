import {faker} from "@faker-js/faker";
/**
 * @testSuite Investment Account Types
 * @description Covers creation, modification, and deletion of investment account types
 * @priority Medium
 * @owner QA Team
 * @tags investment, accounts, configuration
 */

describe('Investment Account Types', () => {

    beforeEach(() => {
        cy.visit('/settings/investment-account-types').wait(2000);
    });

    /**
     * @scenario Add Investment Account Type
     * @description Adds a new investment account type with a generated mapping reference
     * @steps
     *  1. Navigate to Investment Account Types settings
     *  2. Click "Add"
     *  3. Fill in Name and Mapping Reference
     *  4. Save
     * @expectedResult Investment account type is added successfully
     */
    it('Adds an Investment Account Type', () => {
        cy.contains('sa-button', 'Add').click().wait(1000);
        cy.getByFormControlName('name').eq(0).type('Trust Account DKA');
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13));

        cy.get('#addInvestmentAccountTypeForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button')
            .click().wait(1000);
        cy.contains('Investment account type has been added');
    });

    /**
     * @scenario Edit Investment Account Type
     * @description Edits the name of an existing investment account type
     * @steps
     *  1. Search for an existing account type
     *  2. Click edit icon
     *  3. Change name
     *  4. Save changes
     * @expectedResult Investment account type is updated successfully
     */
    it('Edits an Investment Account Type', () => {
        cy.get('#gridInvestmentAccountTypes tr .dx-first-cell .dx-texteditor-input').type('Trust Account DKA', { force: true }).wait(2000);
        cy.get('#gridInvestmentAccountTypes tr td').find('.dx-icon-edit').eq(0).click({ force: true }).wait(1000);

        cy.get('#gridInvestmentAccountTypes .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('accounts');

        cy.get('@accounts').eq(3).clear().wait(1000).type('MMF DKA', { force: true }).wait(1000);
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500);

        cy.contains(`The investment account type has been updated.`);
    });

    /**
     * @scenario Delete Investment Account Type
     * @description Deletes the investment account type that was previously edited
     * @steps
     *  1. Search for the account type
     *  2. Click delete icon
     *  3. Confirm deletion
     * @expectedResult Investment account type is deleted successfully
     */
    it('Deletes an Investment Account Type', () => {
        cy.get('#gridInvestmentAccountTypes tr .dx-first-cell .dx-texteditor-input').type('MMF DKA', { force: true }).wait(2000);
        cy.get('#gridInvestmentAccountTypes tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000);
        cy.get('.dx-popup-normal').contains('Yes').click({ force: true }).wait(1000);

        cy.contains(`The investment account has been deleted.`);
    });

});

