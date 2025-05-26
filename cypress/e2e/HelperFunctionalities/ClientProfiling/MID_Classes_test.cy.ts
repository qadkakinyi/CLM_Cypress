import {faker} from "@faker-js/faker";

let name = 'Test dka '+faker.number.int({min:0, max:10})
describe('MID Classes', ()=>{
    it('Adds an MID Class', ()=>{
        cy.visit('/settings/mid-classes').wait(1500)
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type(name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
        cy.get('#addMidClassForm  [icon="save"] > .sa-button').click().wait(2000)
        cy.contains('MID class has been added.')
    })
    
    it('Edits an MID class', ()=>{

        cy.visit('/settings/mid-classes').wait(2000)
        cy.get('#gridMidClasses tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(1000)
        cy.get('#gridMidClasses tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridMidClasses .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('MidClasses')
        cy.get('@MidClasses').eq(3).clear().wait(1000).type('DKA '+name+ faker.string.alphanumeric(1), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        
        cy.contains('The MID class has been updated.')
    })
    
    it('Deletes an MID Class', ()=>{
        cy.visit('/settings/mid-classes').wait(2000)

        cy.get('#gridMidClasses tr .dx-first-cell .dx-texteditor-input').type('DKA '+name, {force:true}).wait(1000)
        cy.get('#gridMidClasses tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        
        cy.contains('The MID class has been deleted.')
    })
})