import {faker} from "@faker-js/faker";

describe("Addresses Types", ()=>{
    it("Adds Address Types", ()=>{
        cy.visit('/settings/addressesTypes').wait(1000)
        
        cy.get('#addAddressTypeForm')
        
        cy.contains('sa-button','Add').click().wait(1000)

        //index 0 are for add form while 1 are for the edit form
        cy.getByFormControlName('name').eq(0).type('permanent test address') 
        cy.getByFormControlName('code').eq(0).type('P-T-A')
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13))
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid [aria-rowindex="1"]').click().wait(500)
        
        cy.get('#addAddressTypeForm sa-button').contains('Save').click().wait(1000)
        cy.contains('Address Type has been added.')
    })
    
    it("Edits Address type", ()=>{
        cy.visit('/settings/addressesTypes').wait(2000)

        cy.get('#gridAddressesTypes tr .dx-first-cell .dx-texteditor-input').type('permanent test address', {force:true}).wait(2500)
        cy.get('tr td').find('.fa-pencil').eq(0).click({force:true}).wait(1000)
        cy.get('#editAddressTypeForm')
        
        cy.getByFormControlName('code').eq(1).clear().type('p_t_address')
        cy.get('#editAddressTypeForm sa-button').contains('Save').click().wait(1000)
        cy.contains('Address Type has been edited.')
    })

    it("Deletes Address type", ()=>{
        cy.visit('/settings/addressesTypes').wait(2000)

        cy.get('#gridAddressesTypes tr .dx-first-cell .dx-texteditor-input').type('permanent test address', {force:true}).wait(2500)
        cy.get('tr td').find('.fa-trash').eq(0).click({force:true}).wait(1000)
        cy.get('.MessageBoxButtonSection').contains('button', 'Yes').click({ force: true }).wait(1000);
        cy.contains('Address type has been deleted.')
    })
})