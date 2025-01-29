import {faker} from "@faker-js/faker";

let category_name = 'DKA Test Category'
let product_name = 'DKA Test Product'
let status_name = 'Status DKA Test'
let payment_name = 'DKA Bank'
let relationship = "Bro DKA"

describe("Contract Policy Categories", ()=> {
    it('Adds a Policy Categories', () => {
        cy.visit('/settings/contracts-setup').wait(1500)
        cy.contains('Add').should('be.visible').click()
        cy.wait(1000)
        cy.getByDataCy('contract-category-name').type(category_name)
        cy.getByDataCy('contract-category-ref').type(faker.string.alphanumeric(13))
        cy.getByDataCy('save-contract-category').click().wait(1500)
        cy.contains('Contract policy category has been added.')
    })

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

describe("Contract Products", ()=> {
    
    beforeEach(()=>{
        cy.visit('/settings/contracts-setup').wait(2000)
        cy.get('span').contains('Contract Products').click().wait(500)
    })
    
    it('Adds a Contract product', () => {
        cy.contains('Add').click()
        cy.wait(1000)
        cy.get('#addContractPolicyProductForm .product-name').type(product_name)
        cy.get('#addContractPolicyProductForm .product-reference').type(faker.string.alphanumeric(13))
        cy.getByDataCy('policy-category').click()
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content').contains(category_name).click().wait(500)
        cy.getByDataCy('save-policy').click()
        cy.wait(1000)
        cy.contains('Contract policy product has been added.')
    })

    it('Edits a Contract policy product', () => {
        
        cy.get('#gridContractPolicyProducts tr .dx-first-cell .dx-texteditor-input').type(product_name, {force: true}).wait(2000)
        cy.get('#gridContractPolicyProducts tr td').find('.dx-icon-edit').eq(0).click({force: true}).wait(1000)

        cy.get('#gridContractPolicyProducts .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('currencies')
        cy.get('@currencies').eq(4).clear().wait(1000).type(product_name + faker.string.alphanumeric(1), {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains('Contract policy product has been updated.')
    })

    it('Deletes a Contract product', () => {

        cy.get('#gridContractPolicyProducts tr .dx-first-cell .dx-texteditor-input').type(product_name, {force: true}).wait(2000)
        cy.get('#gridContractPolicyProducts tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1500);

        cy.contains('Contract policy product has been deleted.')
    })

    it('Deletes a Contract policy category', () => {
        cy.visit('/settings/contracts-setup').wait(2000)

        cy.get('#gridContractPolicyCategories tr .dx-first-cell .dx-texteditor-input').type(category_name, {force: true}).wait(2000)
        cy.get('#gridContractPolicyCategories tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains('Contract policy category has been deleted.')
    })
})

describe("Contract Status", ()=> {

    beforeEach(()=>{
        cy.visit('/settings/contracts-setup').wait(2000)
        cy.get('span').contains('Contract Status').click().wait(500)
    })

    it('Adds a Contract Status', () => {
        cy.contains('Add').click()
        cy.wait(1000)
        cy.get('#addContractPolicyStatusForm')
        cy.getByFormControlName('name').eq(3).type(status_name)
        cy.getByFormControlName('mappingReference').eq(3).type(faker.string.alphanumeric(13))
        cy.getByDataCy('save-status').click()
        cy.wait(1000)
        cy.contains('Contract policy status has been added.')
    })

    it('Edits a Contract Status', () => {

        cy.get('#gridContractPolicyStatuses tr .dx-first-cell .dx-texteditor-input').type(status_name, {force: true}).wait(1000)
        cy.get('#gridContractPolicyStatuses tr td').find('.dx-icon-edit').eq(0).click({force: true}).wait(1000)

        cy.get('#gridContractPolicyStatuses .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('statuses')
        cy.get('@statuses').eq(3).clear().wait(1000).type(status_name + faker.string.alphanumeric(1), {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains('Contract policy status has been updated.')
    })

    it('Deletes a Contract Status', () => {

        cy.get('#gridContractPolicyStatuses tr .dx-first-cell .dx-texteditor-input').type(status_name, {force: true}).wait(1000)
        cy.get('#gridContractPolicyStatuses tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1500)
        cy.get('.dx-popup-normal').contains('Yes').click().wait(1500);

        cy.contains('Contract policy status has been deleted.')
    })
    
})

describe("Contract Transaction Payment Method", ()=> {

    beforeEach(()=>{
        cy.visit('/settings/contracts-setup').wait(2000)
        cy.get('span').contains('Contract Transaction Payment Method').click().wait(500)
    })

    it('Adds a Transaction Payment Method', () => {
        cy.contains('Add').click()
        cy.wait(1000)
        cy.get('#addContractTransactionPaymentMethodForm')
        cy.getByFormControlName('name').eq(4).type(payment_name)
        cy.getByFormControlName('mappingReference').eq(4).type(faker.string.alphanumeric(13))
        cy.get('#addContractTransactionPaymentMethodForm  [icon="save"]').click()
        cy.wait(1000)
        // cy.contains('Transaction payment method has been added.')
    })

    it('Edits a Transaction Payment Method', () => {

        cy.get('#gridContractTransactionPaymentMethods tr .dx-first-cell .dx-texteditor-input').type(payment_name, {force: true}).wait(1000)
        cy.get('#gridContractTransactionPaymentMethods tr td').find('.dx-icon-edit').eq(0).click({force: true}).wait(1000)

        cy.get('#gridContractTransactionPaymentMethods .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('statuses').wait(1000)
        cy.get('@statuses').eq(3).clear().wait(1000).type(payment_name + faker.string.alphanumeric(1), {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains('Transaction payment method has been updated.')
    })

    it('Deletes a Transaction Payment Method', () => {

        cy.get('#gridContractTransactionPaymentMethods tr .dx-first-cell .dx-texteditor-input').type(payment_name, {force: true}).wait(2000)
        cy.get('#gridContractTransactionPaymentMethods tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1500)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains('Transaction payment method has been deleted.')
    })

})

describe("Contract Beneficiary Relations", ()=> {

    beforeEach(()=>{
        cy.visit('/settings/contracts-setup').wait(2000)
        cy.get('span').contains('Contract Beneficiary Relations').click().wait(500)
    })

    it('Adds a Beneficiary Relations', () => {
        cy.contains('Add').click()
        cy.wait(1000)
        cy.get('#addContractPolicyBeneficiaryRelationForm')
        cy.getByFormControlName('name').eq(0).type(relationship)
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13))
        
        cy.contains('sa-button', 'Save').should('be.visible').click()
        cy.wait(1000)
        cy.contains('Contract policy beneficiary relation has been added.')
    })

    it('Edits a Beneficiary Relations', () => {

        cy.get('#gridContractPolicyBeneficiaryRelations tr .dx-first-cell .dx-texteditor-input').type(relationship, {force: true}).wait(1000)
        cy.get('#gridContractPolicyBeneficiaryRelations tr td').find('.dx-icon-edit').eq(0).click({force: true}).wait(1000)

        cy.get('#gridContractPolicyBeneficiaryRelations .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('statuses')
        cy.get('@statuses').eq(3).clear().wait(1000).type(`Siz`, {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains('Contract policy beneficiary relation has been updated.')
    })

    it('Deletes a Beneficiary Relations', () => {

        cy.get('#gridContractPolicyBeneficiaryRelations tr .dx-first-cell .dx-texteditor-input').type('Siz', {force: true}).wait(2000)
        cy.get('#gridContractPolicyBeneficiaryRelations tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(2000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains('Contract policy beneficiary relation has been deleted.')
    })

})