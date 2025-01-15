import {faker} from "@faker-js/faker";

let name = 'Test SubGroups dka '+faker.number.int({min:0, max:10})
describe("Sub-groups", ()=>{
    it('Adds a Sub-group', ()=>{
        cy.visit('/settings/sub-groups').wait(1500)
        cy.contains('Add').click().wait(1000)
        cy.getByFormControlName('name').type(name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
        cy.contains('sa-button','Save').click().wait(1500)
        cy.contains('Sub-group has been added.')
    })

    it('Edits a Sub-group', ()=>{

        cy.visit('/settings/sub-groups').wait(2000)
        cy.get('#gridSubGroups tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(2500)
        cy.get('#gridSubGroups tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridSubGroups .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('subgroups')
        cy.get('@subgroups').eq(3).clear().wait(1000).type(name+ faker.string.alphanumeric(1), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)

        cy.contains('Sub-group has been updated.')
    })

    it('Deletes a Sub-group', ()=>{
        cy.visit('/settings/sub-groups').wait(2000)

        cy.get('#gridSubGroups tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(2500)
        cy.get('#gridSubGroups tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);

        cy.contains('Sub-group has been deleted.')
    })
})