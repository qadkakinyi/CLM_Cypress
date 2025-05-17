import {faker} from "@faker-js/faker";

let name = 'Test dka '+faker.number.int({min:0, max:10})
describe('MID Type', ()=>{
    it('Adds a MID Types', ()=>{
        cy.visit('/settings/mid-types').wait(1500)
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type(name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
        cy.get('#addMidTypeForm  [icon="save"] > .sa-button').click().wait(2000)
        cy.contains('MID type has been added.')
    })

    it('Edits an MID Type', ()=>{

        cy.visit('/settings/mid-types').wait(2000)
        cy.get('#gridMidTypes tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(1000)
        cy.get('#gridMidTypes tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridMidTypes .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('MidTypes')
        cy.get('@MidTypes').eq(3).clear().wait(1000).type(name+ faker.string.alphanumeric(1), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)

        cy.contains('The MID type has been updated.')
    })

    it('Deletes an MID Types', ()=>{
        cy.visit('/settings/mid-types').wait(2000)

        cy.get('#gridMidTypes tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(1000)
        cy.get('#gridMidTypes tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);

        cy.contains('The MID type has been deleted.')
    })
})