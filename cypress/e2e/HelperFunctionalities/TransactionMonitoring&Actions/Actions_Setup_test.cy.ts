import {faker} from "@faker-js/faker";

let name = 'DKA Test Category'
describe("Actions Setup", ()=>{
    it('Adds an Action Category', ()=>{
        cy.visit('/settings/actions-setup')
        cy.contains('Add').click().wait(1000)
        cy.getByDataCy('category-name').type(name)
        cy.getByDataCy('mapping-ref').type(faker.string.alphanumeric(20))
        cy.getByDataCy('save-category-btn').click().wait(1500)
        cy.contains('Action category has been added.')
    })

    it('Edits an Action Category', ()=>{

        cy.visit('/settings/actions-setup').wait(2000)
        cy.get('#gridActionCategories tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(2000)
        cy.get('#gridActionCategories tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridActionCategories .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('categories')
        cy.get('@categories').eq(4).clear().wait(1000).type(name+ faker.string.alphanumeric(1), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains('Action category has been updated.')
    })

    it('Deletes an Action Category', ()=>{
        cy.visit('/settings/actions-setup').wait(2000)

        cy.get('#gridActionCategories tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(2500)
        cy.get('#gridActionCategories tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);

        cy.contains('Action category has been deleted.')
    })

    it('Adds a Status', ()=>{
        cy.visit('/settings/actions-setup')
        cy.get('span').contains('Action Statuses').click().wait(1000)
        cy.contains('Add').click()
        cy.wait(1000)
        cy.getByDataCy('action-name').type("DKA Test Status")
        cy.getByDataCy('mapping-ref-action').type(faker.string.alphanumeric(30))
        cy.getByDataCy('create-action-btn').click().wait(1500)
        cy.contains('The action status has been added.')
    })

    it('Edits a Status', ()=>{

        cy.visit('/settings/actions-setup').wait(2000)
        cy.get('span').contains('Action Statuses').click().wait(1000)
        cy.get('#gridActionStatuses tr .dx-first-cell .dx-texteditor-input').type("DKA Test Status", {force:true}).wait(2000)
        cy.get('#gridActionStatuses tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridActionStatuses .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('statuses')
        cy.get('@statuses').eq(4).clear().wait(1000).type("DKA Test Status "+ faker.string.alphanumeric(1), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains('Action status has been updated.')
    })

    it('Deletes a Status', ()=>{
        cy.visit('/settings/actions-setup').wait(2000)
        cy.get('span').contains('Action Statuses').click().wait(1000)

        cy.get('#gridActionStatuses tr .dx-first-cell .dx-texteditor-input').type("DKA Test Status", {force:true}).wait(2500)
        cy.get('#gridActionStatuses tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);

        cy.contains('Action status has been ')
    })
})