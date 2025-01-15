import {faker} from "@faker-js/faker";

describe('Client Categories', ()=>{
    it('Adds A Client Categorization', ()=>{
        //add client category
        cy.visit('/settings/client-categorizations').wait(1000)
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.get('#addClientCategorizationForm')
        cy.getByFormControlName('name').type('Client Categorization Test')
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(11))
        cy.get('sa-button').contains('Save').click().wait(2000);
        cy.contains('The client categorization has been added.')
    })

    it('Edits A Client Categorization', ()=>{
        cy.visit('/settings/client-categorizations').wait(2000)

        cy.get('#gridClientCategorizations tr .dx-first-cell .dx-texteditor-input').type('Client Categorization Test', {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-edit').eq(1).click({force:true}).wait(1000)

        cy.get('#gridClientCategorizations .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('clientCategorizations')
        cy.get('@clientCategorizations').eq(3).clear().wait(1000).type('Test Categorization '+faker.string.alphanumeric(3), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('The client categorization has been updated.')
    })

    it('Deletes A Client Categorization', ()=>{
        cy.visit('/settings/client-categorizations').wait(2000)

        cy.get('#gridClientCategorizations tr .dx-first-cell .dx-texteditor-input').type('Test Categorization', {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('The client categorization has been deleted.')
    })
})