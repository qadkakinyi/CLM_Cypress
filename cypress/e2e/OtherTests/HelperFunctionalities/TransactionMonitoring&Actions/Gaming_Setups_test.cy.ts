import { faker } from "@faker-js/faker";

/**
 * @testSuite Game Types
 * @description Covers creation, modification, and deletion of game types
 * @priority Medium
 * @owner QA Team
 * @tags gaming, configuration, setup
 */
describe('Game Types', () => {
    beforeEach(() => {
        cy.visit('/settings/gaming-setups').wait(2000);
    });

    /**
     * @scenario Add Game Type
     * @description Adds a new game type
     * @steps
     *  1. Navigate to Gaming Setups
     *  2. Click Add
     *  3. Fill name and mapping reference
     *  4. Save the record
     * @expectedResult Game type is added and a confirmation message is shown
     */
    it('Adds a Game Type', () => {
        cy.contains('sa-button', 'Add').click().wait(1000);
        cy.getByFormControlName('name').eq(0).type('Action Games');
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13));

        cy.get('#addGameTypeForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button')
            .click().wait(1000);
        cy.contains('Game type has been added');
    });

    /**
     * @scenario Edit Game Type
     * @description Edits an existing game type from "Action Games" to "Adventure Games"
     * @steps
     *  1. Search for "Action Games"
     *  2. Click Edit
     *  3. Update the name
     *  4. Save
     * @expectedResult Game type is updated and a confirmation message is shown
     */
    it('Edits a Game Type', () => {
        cy.get('#gridGameTypes tr .dx-first-cell .dx-texteditor-input').type('Action Games', { force: true }).wait(2000);
        cy.get('#gridGameTypes tr td').find('.dx-icon-edit').eq(0).click({ force: true }).wait(1000);

        cy.get('#gridGameTypes .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input')
            .as('gameTypes');

        cy.get('@gameTypes').eq(3).clear().wait(1000).type('Adventure Games', { force: true }).wait(1000);
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500);

        cy.contains(`Game type has been updated.`);
    });

    /**
     * @scenario Delete Game Type
     * @description Deletes the "Adventure Games" game type
     * @steps
     *  1. Search for "Adventure Games"
     *  2. Click Delete
     *  3. Confirm deletion
     * @expectedResult Game type is deleted and a confirmation message is shown
     */
    it('Deletes a Game Type', () => {
        cy.get('#gridGameTypes tr .dx-first-cell .dx-texteditor-input').type('Adventure Games', { force: true }).wait(2000);
        cy.get('#gridGameTypes tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000);
        cy.get('.dx-popup-normal').contains('Yes').click({ force: true }).wait(1000);

        cy.contains(`Game type has been deleted.`);
    });
});

/**
 * @testSuite Gaming Account Statuses
 * @description Covers creation, modification, and deletion of gaming account statuses
 * @priority Medium
 * @owner QA Team
 * @tags gaming, configuration, statuses
 */
describe('Gaming Account Statuses', () => {
    beforeEach(() => {
        cy.visit('/settings/gaming-setups').wait(2000);
        cy.contains('Gaming Account Statuses').click().wait(2000);
    });

    /**
     * @scenario Add Gaming Account Status
     * @description Adds a new gaming account status "Blocked"
     * @steps
     *  1. Navigate to Gaming Account Statuses
     *  2. Click Add
     *  3. Fill name and mapping reference
     *  4. Save
     * @expectedResult Gaming account status is added and a confirmation message is shown
     */
    it('Adds a Gaming Account Status', () => {
        cy.contains('sa-button', 'Add').click().wait(1000);
        cy.getByFormControlName('name').eq(1).type('Blocked');
        cy.getByFormControlName('mappingReference').eq(1).type(faker.string.alphanumeric(13));

        cy.getByDataCy('Save-client-gaming-status').click().wait(1000);
        cy.contains('Gaming account status has been added');
    });

    /**
     * @scenario Edit Gaming Account Status
     * @description Edits "Blocked" status to "Unblocked"
     * @steps
     *  1. Filter by "Blocked"
     *  2. Click Edit
     *  3. Update name to "Unblocked"
     *  4. Save
     * @expectedResult Gaming account status is updated and a confirmation message is shown
     */
    it('Edits a Gaming Account Status', () => {
        cy.get('#gridGamingAccountStatuses tr .dx-first-cell .dx-texteditor-input').type('Blocked', { force: true }).wait(2000);
        cy.get('#gridGamingAccountStatuses tr td').find('.dx-icon-edit').eq(0).click({ force: true }).wait(1000);

        cy.get('#gridGamingAccountStatuses .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input')
            .as('statuses');

        cy.get('@statuses').eq(3).clear().wait(1000).type('Unblocked', { force: true }).wait(1000);
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500);

        cy.contains(`Gaming account status has been updated.`);
    });

    /**
     * @scenario Delete Gaming Account Status
     * @description Deletes the "Unblocked" gaming account status
     * @steps
     *  1. Filter by "Unblocked"
     *  2. Click Delete
     *  3. Confirm deletion
     * @expectedResult Gaming account status is deleted and a confirmation message is shown
     */
    it('Deletes a Gaming Account Status', () => {
        cy.get('#gridGamingAccountStatuses tr .dx-first-cell .dx-texteditor-input').type('Unblocked', { force: true }).wait(2000);
        cy.get('#gridGamingAccountStatuses tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000);
        cy.get('.dx-popup-normal').contains('Yes').click({ force: true }).wait(1000);

        cy.contains(`Gaming account status has been deleted.`);
    });
});

/**
 * @testSuite Gaming Transaction Types
 * @description Covers creation, modification, and deletion of gaming transaction types
 * @priority Medium
 * @owner QA Team
 * @tags gaming, configuration, transaction-types
 */
describe('Gaming Transaction Types', () => {
    beforeEach(() => {
        cy.visit('/settings/gaming-setups').wait(2000);
        cy.contains('Gaming Transaction Types').click().wait(2000);
    });

    /**
     * @scenario Add Gaming Transaction Type
     * @description Adds a new gaming transaction type "DKA Type"
     * @steps
     *  1. Navigate to Gaming Transaction Types
     *  2. Click Add
     *  3. Fill name and mapping reference
     *  4. Save
     * @expectedResult Gaming transaction type is added and a confirmation message is shown
     */
    it('Adds a Gaming Transaction Type', () => {
        cy.contains('sa-button', 'Add').click().wait(1000);
        cy.getByFormControlName('name').eq(2).type('DKA Type');
        cy.getByFormControlName('mappingReference').eq(2).type(faker.string.alphanumeric(13));

        cy.get('#addGamingTransactionTypeForm [icon="save"]').click().wait(1000);
        cy.contains('Gaming transaction type has been added');
    });

    /**
     * @scenario Edit Gaming Transaction Type
     * @description Edits "DKA Type" to "Type DKA"
     * @steps
     *  1. Filter by "DKA Type"
     *  2. Click Edit
     *  3. Update name to "Type DKA"
     *  4. Save
     * @expectedResult Gaming transaction type is updated and a confirmation message is shown
     */
    it('Edits a Gaming Transaction Type', () => {
        cy.get('#gridGamingTransactionType tr .dx-first-cell .dx-texteditor-input').type('DKA Type', { force: true }).wait(2000);
        cy.get('#gridGamingTransactionType tr td').find('.dx-icon-edit').eq(0).click({ force: true }).wait(1000);

        cy.get('#gridGamingTransactionType .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input')
            .as('transactionTypes');

        cy.get('@transactionTypes').eq(3).clear().wait(1000).type('Type DKA', { force: true }).wait(1000);
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500);

        cy.contains(`Gaming transaction type has been updated.`);
    });

    /**
     * @scenario Delete Gaming Transaction Type
     * @description Deletes the "Type DKA" transaction type
     * @steps
     *  1. Filter by "Type DKA"
     *  2. Click Delete
     *  3. Confirm deletion
     * @expectedResult Gaming transaction type is deleted and a confirmation message is shown
     */
    it('Deletes a Gaming Transaction Type', () => {
        cy.get('#gridGamingTransactionType tr .dx-first-cell .dx-texteditor-input').type('Type DKA', { force: true }).wait(2000);
        cy.get('#gridGamingTransactionType tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000);
        cy.get('.dx-popup-normal').contains('Yes').click({ force: true }).wait(1000);

        cy.contains(`Gaming transaction type has been deleted.`);
    });
});

