import {faker} from "@faker-js/faker";

let code = 'DKA'
let currency_name = `${faker.finance.currency().name} DKA`
describe('Currency Information', ()=>{
    beforeEach(()=>{
        cy.visit('/settings/currency-informations').wait(2000)
    })
    
    it('Adds a Currency Information', ()=>{

        cy.contains('sa-button', 'Add').click().wait(1000)
        
        cy.getByFormControlName('code').type(code)
        cy.getByFormControlName('name').eq(0).type(currency_name)
        // cy.getByDataCy('type').eq(0).click()
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content').contains('Fiat').click().wait(500)
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(11))
        // cy.getByDataCy('status').click()
        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content').contains('Enabled').click().wait(500)
        
        cy.contains('sa-button', 'Save').click().wait(1500)
        cy.contains('The currency information has been added.')
    })

    it('Edits a Currency Information', () => {

        //getting an error when saving after editing currency information
        cy.get('#gridCurrencyInformations tr .dx-first-cell .dx-texteditor-input').type(code, {force: true}).wait(2000)
        cy.get('#gridCurrencyInformations tr td').find('.dx-icon-edit').eq(0).click({force: true}).wait(1000)

        cy.get('#gridCurrencyInformations .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('currencies')
        cy.get('@currencies').eq(9).clear().wait(1000).type(faker.string.alphanumeric(11), {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`${currency_name} has been updated.`)
    })

    it('Deletes a Currency Information', () => {

        cy.get('#gridCurrencyInformations tr .dx-first-cell .dx-texteditor-input').type(code, {force: true}).wait(2500)
        cy.get('#gridCurrencyInformations tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`${currency_name} has been deleted.`)
    })
})