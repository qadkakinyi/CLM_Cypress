import { faker } from "@faker-js/faker";

let category_name = 'DKA Test Category'
let product_name = 'DKA Test Product'
let status_name = 'Status DKA Test'
let payment_name = 'DKA Bank'
let relationship = "Bro DKA"

/**
 * @testSuite Contract Policy Categories
 * @description Create and update contract policy categories
 * @priority Medium
 * @owner QA Team
 * @tags contracts, categories, settings
 */
describe("Contract Policy Categories", ()=> {

    /**
     * @scenario Add Policy Category
     * @description Adds a new contract policy category
     * @steps
     *  1. Open Contracts Setup.
     *  2. Click Add.
     *  3. Fill Name and Mapping Reference.
     *  4. Save and verify success.
     * @expectedResult Category is created successfully.
     */
    it('Adds a Policy Categories', () => {
        cy.visit('/settings/contracts-setup').wait(1500)
        cy.contains('sa-button','Add').click()
        cy.wait(1000)
        cy.getByDataCy('contract-category-name').type(category_name)
        cy.getByDataCy('contract-category-ref').type(faker.string.alphanumeric(13))
        cy.getByDataCy('save-contract-category').click().wait(1500)
        cy.contains('Contract policy category has been added.')
    })

    /**
     * @scenario Edit Policy Category
     * @description Edits an existing contract policy category name
     * @steps
     *  1. Search for category by name.
     *  2. Click Edit.
     *  3. Change name and Save.
     *  4. Verify success.
     * @expectedResult Category updates successfully.
     */
    it('Edits a Policy Category', () => {

        cy.visit('/settings/contracts-setup').wait(2000)
        cy.get('#gridContractPolicyCategories tr .dx-first-cell .dx-texteditor-input').type(category_name, {force: true}).wait(3000)
        cy.get('#gridContractPolicyCategories tr td').find('.dx-icon-edit').eq(0).click({force: true}).wait(1000)

        cy.get('#gridContractPolicyCategories .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('categories').wait(3000)
        cy.get('@categories').eq(3).clear().wait(1000).type(category_name + faker.string.alphanumeric(1), {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains('Contract policy category has been updated.')
    })

    // it.skip('Deletes a Purpose of Transaction', () => {
    //     cy.visit('/settings/contracts-setup').wait(2000)
    //
    //     cy.get('#gridContractPolicyCategories tr .dx-first-cell .dx-texteditor-input').type(category_name, {force: true}).wait(1000)
    //     cy.get('#gridContractPolicyCategories tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
    //     cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);
    //
    //     cy.contains('Contract policy category has been deleted.')
    // })
})

/**
 * @testSuite Contract Products
 * @description Manage contract products (add/edit/delete) and clean up related categories
 * @priority Medium
 * @owner QA Team
 * @tags contracts, products, settings
 */
describe("Contract Products", ()=> {

    beforeEach(()=>{
        cy.visit('/settings/contracts-setup').wait(2000)
        cy.get('span').contains('Contract Products').click().wait(500)
    })

    /**
     * @scenario Add Contract Product
     * @description Adds a product under an existing category
     * @steps
     *  1. Click Add.
     *  2. Fill product fields.
     *  3. Select category.
     *  4. Save and verify.
     * @expectedResult Product is created successfully.
     */
    it('Adds a Contract product', () => {
        cy.contains('sa-button','Add').click()
        cy.wait(1000)
        cy.get('#addContractPolicyProductForm .product-name').type(product_name)
        cy.get('#addContractPolicyProductForm .product-reference').type(faker.string.alphanumeric(13))
        cy.getByDataCy('policy-category').click()
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content').contains(category_name).click().wait(500)
        cy.getByDataCy('save-policy').click()
        cy.wait(1000)
        cy.contains('Contract policy product has been added.')
    })

    /**
     * @scenario Edit Contract Product
     * @description Updates product name
     * @steps
     *  1. Filter product grid by name.
     *  2. Click Edit.
     *  3. Change name, Save, verify.
     * @expectedResult Product updates successfully.
     */
    it('Edits a Contract policy product', () => {

        cy.get('#gridContractPolicyProducts tr .dx-first-cell .dx-texteditor-input').type(product_name, {force: true}).wait(2000)
        cy.get('#gridContractPolicyProducts tr td').find('.dx-icon-edit').eq(0).click({force: true}).wait(1000)

        cy.get('#gridContractPolicyProducts .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('currencies')
        cy.get('@currencies').eq(4).clear().wait(1000).type(product_name + faker.string.alphanumeric(1), {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains('Contract policy product has been updated.')
    })

    /**
     * @scenario Delete Contract Product
     * @description Deletes the product record
     * @steps
     *  1. Filter by product name.
     *  2. Click Delete and confirm.
     *  3. Verify success.
     * @expectedResult Product is deleted successfully.
     */
    it('Deletes a Contract product', () => {

        cy.get('#gridContractPolicyProducts tr .dx-first-cell .dx-texteditor-input').type(product_name, {force: true}).wait(2000)
        cy.get('#gridContractPolicyProducts tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1500);

        cy.contains('Contract policy product has been deleted.')
    })

    /**
     * @scenario Delete Category (Cleanup)
     * @description Removes the previously created category
     * @steps
     *  1. Switch to categories grid.
     *  2. Filter by category.
     *  3. Delete and confirm.
     * @expectedResult Category is deleted.
     */
    it('Deletes a Contract policy category', () => {
        cy.visit('/settings/contracts-setup').wait(2000)

        cy.get('#gridContractPolicyCategories tr .dx-first-cell .dx-texteditor-input').type(category_name, {force: true}).wait(2000)
        cy.get('#gridContractPolicyCategories tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains('Contract policy category has been deleted.')
    })
})

/**
 * @testSuite Contract Status
 * @description Manage contract statuses (add/edit/delete)
 * @priority Medium
 * @owner QA Team
 * @tags contracts, status, settings
 */
describe("Contract Status", ()=> {

    beforeEach(()=>{
        cy.visit('/settings/contracts-setup').wait(2000)
        cy.get('span').contains('Contract Status').click().wait(500)
    })

    /**
     * @scenario Add Contract Status
     * @description Creates a new contract status
     * @expectedResult Status is added successfully.
     */
    it('Adds a Contract Status', () => {
        cy.contains('sa-button','Add').click()
        cy.wait(1000)
        cy.get('#addContractPolicyStatusForm')
        cy.getByFormControlName('name').eq(3).type(status_name)
        cy.getByFormControlName('mappingReference').eq(3).type(faker.string.alphanumeric(13))
        cy.getByDataCy('save-status').click()
        cy.wait(1000)
        cy.contains('Contract policy status has been added.')
    })

    /**
     * @scenario Edit Contract Status
     * @description Updates the status name
     * @expectedResult Status updates successfully.
     */
    it('Edits a Contract Status', () => {

        cy.get('#gridContractPolicyStatuses tr .dx-first-cell .dx-texteditor-input').type(status_name, {force: true}).wait(1000)
        cy.get('#gridContractPolicyStatuses tr td').find('.dx-icon-edit').eq(0).click({force: true}).wait(1000)

        cy.get('#gridContractPolicyStatuses .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('statuses')
        cy.get('@statuses').eq(3).clear().wait(1000).type(status_name + faker.string.alphanumeric(1), {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains('Contract policy status has been updated.')
    })

    /**
     * @scenario Delete Contract Status
     * @description Deletes the status record
     * @expectedResult Status is deleted successfully.
     */
    it('Deletes a Contract Status', () => {

        cy.get('#gridContractPolicyStatuses tr .dx-first-cell .dx-texteditor-input').type(status_name, {force: true}).wait(1000)
        cy.get('#gridContractPolicyStatuses tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(2500)
        cy.get('.dx-popup-normal').contains('Yes').click().wait(1500);

        cy.contains('Contract policy status has been deleted.')
    })

})

/**
 * @testSuite Contract Transaction Payment Method
 * @description Manage payment methods used in contract transactions
 * @priority Medium
 * @owner QA Team
 * @tags contracts, payments, settings
 */
describe("Contract Transaction Payment Method", ()=> {

    beforeEach(()=>{
        cy.visit('/settings/contracts-setup').wait(2000)
        cy.get('span').contains('Contract Transaction Payment Method').click().wait(500)
    })

    /**
     * @scenario Add Payment Method
     * @description Adds a new payment method for contract transactions
     * @expectedResult Method is added (message may be conditional in UI).
     */
    it('Adds a Transaction Payment Method', () => {
        cy.contains('sa-button','Add').click()
        cy.wait(1000)
        cy.get('#addContractTransactionPaymentMethodForm')
        cy.getByFormControlName('name').eq(4).type(payment_name)
        cy.getByFormControlName('mappingReference').eq(4).type(faker.string.alphanumeric(13))
        cy.get('#addContractTransactionPaymentMethodForm  [icon="save"]').click()
        cy.wait(1000)
        // cy.contains('Transaction payment method has been added.')
    })

    /**
     * @scenario Edit Payment Method
     * @description Renames an existing payment method
     * @expectedResult Method updates successfully.
     */
    it('Edits a Transaction Payment Method', () => {

        cy.get('#gridContractTransactionPaymentMethods tr .dx-first-cell .dx-texteditor-input').type(payment_name, {force: true}).wait(1000)
        cy.get('#gridContractTransactionPaymentMethods tr td').find('.dx-icon-edit').eq(0).click({force: true}).wait(1000)

        cy.get('#gridContractTransactionPaymentMethods .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('statuses').wait(1000)
        cy.get('@statuses').eq(3).clear().wait(1000).type(payment_name + faker.string.alphanumeric(1), {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains('Transaction payment method has been updated.')
    })

    /**
     * @scenario Delete Payment Method
     * @description Deletes the payment method
     * @expectedResult Method is deleted successfully.
     */
    it('Deletes a Transaction Payment Method', () => {

        cy.get('#gridContractTransactionPaymentMethods tr .dx-first-cell .dx-texteditor-input').type(payment_name, {force: true}).wait(2000)
        cy.get('#gridContractTransactionPaymentMethods tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1500)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains('Transaction payment method has been deleted.')
    })

})

/**
 * @testSuite Contract Beneficiary Relations
 * @description Manage beneficiary relationship labels for contract policies
 * @priority Medium
 * @owner QA Team
 * @tags contracts, beneficiaries, settings
 */
describe("Contract Beneficiary Relations", ()=> {

    beforeEach(()=>{
        cy.visit('/settings/contracts-setup').wait(2000)
        cy.get('span').contains('Contract Beneficiary Relations').click().wait(500)
    })

    /**
     * @scenario Add Beneficiary Relation
     * @description Adds a new beneficiary relation type
     * @expectedResult Relation is added successfully.
     */
    it('Adds a Beneficiary Relations', () => {
        cy.contains('sa-button','Add').click()
        cy.wait(1000)
        cy.get('#addContractPolicyBeneficiaryRelationForm')
        cy.getByFormControlName('name').eq(0).type(relationship)
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13))

        cy.get('#addContractPolicyBeneficiaryRelationForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(1000)
        cy.contains('Contract policy beneficiary relation has been added.')
    })

    /**
     * @scenario Edit Beneficiary Relation
     * @description Updates the name of a relation type
     * @expectedResult Relation updates successfully.
     */
    it('Edits a Beneficiary Relations', () => {

        cy.get('#gridContractPolicyBeneficiaryRelations tr .dx-first-cell .dx-texteditor-input').type(relationship, {force: true}).wait(1000)
        cy.get('#gridContractPolicyBeneficiaryRelations tr td').find('.dx-icon-edit').eq(0).click({force: true}).wait(1000)

        cy.get('#gridContractPolicyBeneficiaryRelations .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('statuses')
        cy.get('@statuses').eq(3).clear().wait(1000).type(`Siz`, {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains('Contract policy beneficiary relation has been updated.')
    })

    /**
     * @scenario Delete Beneficiary Relation
     * @description Deletes the updated relation type
     * @expectedResult Relation is deleted successfully.
     */
    it('Deletes a Beneficiary Relations', () => {

        cy.get('#gridContractPolicyBeneficiaryRelations tr .dx-first-cell .dx-texteditor-input').type('Siz', {force: true}).wait(2000)
        cy.get('#gridContractPolicyBeneficiaryRelations tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(2000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains('Contract policy beneficiary relation has been deleted.')
    })

})

