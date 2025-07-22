import {faker} from "@faker-js/faker";

describe('Default Address', ()=>{
    it('Adds A Default Address', ()=>{
        cy.visit('/settings/default-addresses').wait(1000)
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.get('#addDefaultAddressForm')
        cy.getByFormControlName('address').eq(0).type('Nairobi')
        // cy.getByDataCy('countries').click().wait(500)
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid [aria-rowindex="1"]').eq(0).click().wait(500)
        // cy.getByDataCy('addressTypes').click().wait(500)
        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid [aria-rowindex="1"]').eq(1).click().wait(500)

        cy.getByFormControlName('postalCode').eq(0).type('90402')
        cy.getByFormControlName('locality').eq(0).type('Nyeri - Kenya')
        cy.getByFormControlName('province').eq(0).type('Central')
        cy.getByFormControlName('district').eq(0).type('NYeri Central')

        cy.get('#addDefaultAddressForm [icon="save"] > .sa-button').click().wait(2000);
        cy.contains('Default address has been added.')
    })

    it('Edits A Default Address', ()=>{
        cy.visit('/settings/default-addresses').wait(3000)

        cy.get('#gridDefaultAddresses tr .dx-first-cell .dx-texteditor-input').type('Nairobi', {force:true}).wait(2000)
        cy.get('tr td').find('.dx-icon-edit').eq(1).click({force:true}).wait(1000)

        cy.get('#gridDefaultAddresses .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('defaultAddresses')
        cy.get('@defaultAddresses').eq(7).clear().wait(1000).type('Mombasa', {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('Default address has been updated.')
    })

    it('Deletes A Default Address', ()=>{
        cy.visit('/settings/default-addresses').wait(3000)

        cy.get('#gridDefaultAddresses tr .dx-first-cell .dx-texteditor-input').type('Mombasa', {force:true}).wait(2000)
        cy.get('tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('Default address has been deleted.')
    })
})