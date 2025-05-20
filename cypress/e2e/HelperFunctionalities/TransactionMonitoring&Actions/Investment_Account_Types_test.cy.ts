import {faker} from "@faker-js/faker";

describe('Investment Account Types', ()=>{
    beforeEach(()=>{
        cy.visit('/settings/investment-account-types').wait(2000)
    })

    it('Adds an Investment Account Type', ()=>{
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('Trust Account DKA')
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13))

        cy.get('#addInvestmentAccountTypeForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(1000)
        cy.contains('Investment account type has been added')
    })

    it('Edits an Investment Account Type', () => {

        cy.get('#gridInvestmentAccountTypes tr .dx-first-cell .dx-texteditor-input').type('Trust Account DKA', {force:true}).wait(2000)
        cy.get('#gridInvestmentAccountTypes tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridInvestmentAccountTypes .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('accounts')

        cy.get('@accounts').eq(3).clear().wait(1000).type('MMF DKA', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`The investment account type has been updated.`)
    })

    it('Deletes an Investment Account Type', () => {

        cy.get('#gridInvestmentAccountTypes tr .dx-first-cell .dx-texteditor-input').type('MMF DKA', {force:true}).wait(2000)
        cy.get('#gridInvestmentAccountTypes tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The investment account has been deleted.`)
    })
})