import {faker} from "@faker-js/faker";

let rate = '123210'
let currency_name = `${faker.finance.currency().name} DKA`
describe('Currency Rate', ()=>{
    let new_rate= rate + faker.number.int(1);

    it('Adds a Currency Rate', ()=>{
        cy.visit('/settings/currency-rates').wait(2000)
        cy.contains('sa-button', 'Add').click().wait(1000)

        // cy.getByDataCy('fromCurrency').click().wait(500)
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').eq(2).click({force:true}).wait(500)
        // cy.getByDataCy('toCurrency').click().wait(500)
        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').eq(19).click({force:true}).wait(500)
        cy.getByFormControlName('date').type('2024-09-24')
        cy.getByFormControlName('rate').eq(0).type(rate)

        cy.contains('sa-button', 'Save').click().wait(1500)
        cy.contains('The currency rate has been added.')
    })

    it('Edits a Currency Rate', () => {
        cy.visit('/settings/currency-rates').wait(25000)
        cy.get('#gridCurrencyRates tr [aria-colindex="4"] .dx-texteditor-input').type(rate, {force:true}).wait(25000)
        cy.get('#gridCurrencyRates tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridCurrencyRates .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('rates')
        
        cy.get('@rates').eq(3).clear().wait(1000).type(new_rate, {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`Currency rate has been updated.`)
    })

    it('Deletes a Currency Rate', () => {
        cy.visit('/settings/currency-rates').wait(25000)
        cy.get('#gridCurrencyRates tr [aria-colindex="4"] .dx-texteditor-input').type(new_rate, {force:true}).wait(20000)
        cy.get('#gridCurrencyRates tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`Currency rate has been deleted.`)
    })
})