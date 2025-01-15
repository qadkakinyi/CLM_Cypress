import {faker} from "@faker-js/faker";

describe('Document Categories', ()=>{
    it('Adds A Document Category', ()=>{
        //add document category
        cy.visit('/settings/document-categories')
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.get('#addDocumentCategoryForm')
        cy.getByFormControlName('name').type('Test Ledger')
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(11))
        cy.get('sa-button').contains('Save').click().wait(2000);
        cy.contains('Document category has been added.')
    })

    it('Edits A Document Category', ()=>{
        cy.visit('/settings/document-categories').wait(3000)

        cy.get('#gridDocumentCategories tr .dx-first-cell .dx-texteditor-input').type('Test Ledger', {force:true}).wait(2000)
        cy.get('tr td').find('.dx-icon-edit').eq(1).click({force:true}).wait(1000)

        cy.get('#gridDocumentCategories .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('documentCategories')
        cy.get('@documentCategories').eq(3).clear().wait(1000).type('Ledger Test', {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('Document Category has been updated.')
    })

    it('Deletes A Document Category', ()=>{
        cy.visit('/settings/document-categories').wait(3000)

        cy.get('#gridDocumentCategories tr .dx-first-cell .dx-texteditor-input').type('Ledger Test', {force:true}).wait(2500)
        cy.get('tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('Document Category has been deleted.')
    })
})