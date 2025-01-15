import {faker} from "@faker-js/faker";

let name = 'Test Reason dka '+faker.number.int({min:0, max:10})
describe('Reasons for TIN', ()=>{
    it('Adds a Visit Type', ()=>{
        cy.visit('/settings/reasonsForTin').wait(1500)
        cy.contains('Add').click().wait(1000)
        cy.getByFormControlName('name').type(name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
        cy.contains('sa-button','Save').click().wait(1500)
        cy.contains('Reason For TIN has been added.')
    })

    it('Edits a Visit Type', ()=>{

        cy.visit('/settings/reasonsForTin').wait(2000)
        cy.get('#gridReasonsForTin tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(1000)
        cy.get('#gridReasonsForTin tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridReasonsForTin .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('TinReasons')
        cy.get('@TinReasons').eq(3).clear().wait(1000).type(name+ faker.string.alphanumeric(1), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)

        cy.contains('The Reason For TIN has been updated.')
    })

    it('Deletes a Visit Type', ()=>{
        cy.visit('/settings/reasonsForTin').wait(2000)

        cy.get('#gridReasonsForTin tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(1000)
        cy.get('#gridReasonsForTin tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);

        cy.contains('The Reason For TIN has been deleted.')
    })
})