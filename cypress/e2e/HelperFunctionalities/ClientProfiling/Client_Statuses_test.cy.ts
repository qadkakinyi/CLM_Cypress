import {faker} from "@faker-js/faker";

describe('Client Statuses', ()=>{
    it('Adds A Client Status', ()=>{
        cy.visit('/settings/client-statuses').wait(1000)
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.get('#addClientStatusForm')
        cy.getByFormControlName('name').eq(0).type('Status Test')
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(11))
        // cy.getByDataCy('colors').click().wait(500)
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid [aria-rowindex="1"]').eq(0).click().wait(500)
        // cy.getByDataCy('status').click().wait(500)
        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid [aria-rowindex="1"]').eq(1).click().wait(500)
        cy.get('sa-button').contains('Save').click().wait(2000);
        cy.contains('The client status has been added.')
    })
    
    it('Edits A Client Status', ()=>{
        cy.visit('/settings/client-statuses').wait(3000)

        cy.get('#gridClientStatuses tr .dx-first-cell .dx-texteditor-input').type('Status Test', {force:true}).wait(2000)
        cy.get('tr td').find('.dx-icon-edit').eq(1).click({force:true}).wait(2000)
        cy.get('#editClientStatusForm')
        cy.getByFormControlName('mappingReference').eq(1).type(faker.string.alphanumeric(11))
        cy.get('#editClientStatusForm sa-button').contains('Save').click().wait(2000);
        cy.contains('Client status modified successfully')
    })
    
    it('Deletes A Client Status', ()=>{
        cy.visit('/settings/client-statuses').wait(3000)

        cy.get('#gridClientStatuses tr .dx-first-cell .dx-texteditor-input').type('Status Test', {force:true}).wait(2000)
        cy.get('tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('Client status has been deleted.')
    })
})