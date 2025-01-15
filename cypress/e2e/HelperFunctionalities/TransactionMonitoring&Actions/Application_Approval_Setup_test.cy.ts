import {faker} from "@faker-js/faker";

let name = 'DKA Test Transaction Approval'
describe("Application Approval Setup", ()=> {
    it('Adds a Purpose of Transaction', () => {
        cy.visit('/settings/application-approval-setup')
        cy.contains('Add').click().wait(1000)
        cy.getByFormControlName('name').type(name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(20))
        cy.contains('sa-button', 'Save').click().wait(1500)
        cy.contains('The purpose of transaction has been added.')
    })

    it('Edits a Purpose of Transaction', () => {

        cy.visit('/settings/application-approval-setup').wait(2000)
        cy.get('#gridPurposeOfTransactions tr .dx-first-cell .dx-texteditor-input').type(name, {force: true}).wait(2000)
        cy.get('#gridPurposeOfTransactions tr td').find('.dx-icon-edit').eq(0).click({force: true}).wait(1000)

        cy.get('#gridPurposeOfTransactions .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('pots')
        cy.get('@pots').eq(3).clear().wait(1000).type(name + faker.string.alphanumeric(1), {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains('The purpose of transaction has been updated.')
    })

    it('Deletes a Purpose of Transaction', () => {
        cy.visit('/settings/application-approval-setup').wait(2000)

        cy.get('#gridPurposeOfTransactions tr .dx-first-cell .dx-texteditor-input').type(name, {force: true}).wait(2500)
        cy.get('#gridPurposeOfTransactions tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains('has been ')
    })
})