import {faker} from "@faker-js/faker";

/**
 * @testSuite Transaction Type Settings
 * @description Covers creation, modification, and deletion of transaction types
 * @priority Medium
 * @owner QA Team
 * @tags transactions, configuration
 */
describe('Transaction Types', ()=>{

    beforeEach(()=>{
        /**
         * @scenario Navigate to Transaction Types Page
         * @description Open the transaction setup section
         * @steps
         *  1. Visit transaction setup route
         * @expectedResult Page loads with grid
         */
        cy.visit('/settings/transactions-setup').wait(2000)
    })

    /**
     * @scenario Add Transaction Type
     * @description Adds a new transaction type
     * @steps
     *  1. Click Add
     *  2. Fill out name and mapping reference
     *  3. Click Save
     * @expectedResult Transaction type is added
     */
    it('Adds a Transaction Type', ()=>{
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').eq(1).type('Transfer DKA')
        cy.getByFormControlName('mappingReference').eq(1).type(faker.string.alphanumeric(13))

        cy.get('[data-test="saveTransactionType"] > .sa-button').click().wait(1000)
        cy.contains('Transaction type has been added')
    })

    /**
     * @scenario Edit Transaction Type
     * @description Edits an existing transaction type
     * @steps
     *  1. Search for existing transaction
     *  2. Click Edit icon
     *  3. Update name field
     *  4. Click Save
     * @expectedResult Transaction type is updated
     */
    it('Edits a Transaction Type', () => {
        cy.get('#gridTransactionTypes tr .dx-first-cell .dx-texteditor-input').type('Transfer DKA', {force:true}).wait(2000)
        cy.get('#gridTransactionTypes tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridTransactionTypes .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('transactionTypes')

        cy.get('@transactionTypes').eq(4).clear().wait(1000).type('DKA Transfer', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`Transaction type has been updated.`)
    })

    /**
     * @scenario Delete Transaction Type
     * @description Deletes a transaction type from the list
     * @steps
     *  1. Search and expand row
     *  2. Click delete icon and confirm
     * @expectedResult Transaction type is deleted
     */
    it('Deletes a Game Type', () => {
        cy.get('#gridTransactionTypes tr .dx-first-cell .dx-texteditor-input').type('DKA Transfer', {force:true}).wait(2000)
        cy.get('#gridTransactionTypes tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`Transaction type has been deleted.`)
    })
})


/**
 * @testSuite Transaction Methods
 * @description Covers creation, modification, and deletion of transaction methods
 * @priority Medium
 * @owner QA Team
 * @tags transactions, configuration
 */
describe('Transaction Methods', ()=>{

    beforeEach(()=>{
        /**
         * @scenario Navigate to Transaction Methods
         * @description Opens transaction methods tab
         * @steps
         *  1. Visit transaction setup
         *  2. Click "Transaction Methods"
         * @expectedResult Method grid is displayed
         */
        cy.visit('/settings/transactions-setup').wait(2000)
        cy.contains('Transaction Methods').click().wait(2000)
    })

    /**
     * @scenario Add Transaction Method
     * @description Adds a new transaction method
     * @steps
     *  1. Click Add
     *  2. Fill name and mappingReference
     *  3. Click Save
     * @expectedResult Method is added
     */
    it('Adds a Transaction Method', ()=>{
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('DKA B2B Transfer')
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13))

        cy.contains('button', 'Save').click().wait(1000)
        cy.contains('Transaction method has been added').wait(1000)
    })

    /**
     * @scenario Edit Transaction Method
     * @description Updates an existing method name
     * @steps
     *  1. Search method
     *  2. Edit and update name
     *  3. Save changes
     * @expectedResult Method is updated
     */
    it('Edits a Transaction Method', () => {
        cy.get('#gridTransactionMethods tr .dx-first-cell .dx-texteditor-input').type('DKA B2B Transfer', {force:true}).wait(2000)
        cy.get('#gridTransactionMethods tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridTransactionMethods .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('methods')

        cy.get('@methods').eq(3).clear().wait(1000).type('B2B DKA Transfer', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`Transaction method has been updated.`).wait(1000)
    })

    /**
     * @scenario Delete Transaction Method
     * @description Deletes the transaction method from the grid
     * @steps
     *  1. Search and click delete
     *  2. Confirm deletion
     * @expectedResult Method is deleted
     */
    it('Deletes a Transaction Method', () => {
        cy.get('#gridTransactionMethods tr .dx-first-cell .dx-texteditor-input').type('B2B DKA Transfer', {force:true}).wait(2000)
        cy.get('#gridTransactionMethods tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`Transaction method has been deleted.`)
    })
})


/**
 * @testSuite Execution Status Threshold
 * @description Handles updates to execution thresholds for transaction statuses
 * @priority Medium
 * @owner QA Team
 * @tags transactions, thresholds
 */
describe('Execution Status Threshold', ()=>{

    beforeEach(()=>{
        /**
         * @scenario Navigate to Execution Status Threshold
         * @description Loads threshold configuration grid
         * @steps
         *  1. Visit transaction setup
         *  2. Click Execution Status Threshold
         * @expectedResult Table is loaded
         */
        cy.visit('/settings/transactions-setup').wait(2000)
        cy.contains('Execution Status Threshold').click().wait(2000)
    })

    /**
     * @scenario Edit Execution Threshold
     * @description Changes the threshold value and reverts it
     * @steps
     *  1. Search by status
     *  2. Click edit, update threshold, and save
     *  3. Revert threshold back to original
     * @expectedResult Threshold is updated and reverted
     */
    it('Edits an Execution Status Threshold', () => {
        cy.get('#gridLiveTransactionStatusThreshold tr .dx-first-cell .dx-texteditor-input').type('Accepted', {force:true}).wait(2000)
        cy.get('#gridLiveTransactionStatusThreshold tr td').find('.dx-icon-edit').last().click({force:true}).wait(1000)

        cy.get('#gridLiveTransactionStatusThreshold .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('thresholds')

        cy.get('@thresholds').eq(3).clear().wait(1000).type('1', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(3000)

        //revert
        // cy.get('#gridLiveTransactionStatusThreshold tr .dx-first-cell .dx-texteditor-input').type('Accepted', {force:true}).wait(2000)
        cy.get('#gridLiveTransactionStatusThreshold tr td').find('.dx-icon-edit').last().click({force:true}).wait(1000)

        cy.get('#gridLiveTransactionStatusThreshold .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('thresholds')

        cy.get('@thresholds').eq(3).clear().wait(1000).type('0', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`Execution status threshold has been updated.`)
    })
})

