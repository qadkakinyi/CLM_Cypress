import {faker} from "@faker-js/faker";

let name = 'Test Tags dka '+faker.number.int({min:0, max:10})
describe("Tags", ()=>{
    it('Adds a Tag', ()=>{
        cy.visit('/settings/tags').wait(1500)
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type(name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
        cy.get('#addTagForm [icon="save"] > .sa-button').click().wait(2000)
        cy.contains('Tag has been added.')
    })

    it('Edits a Tag', ()=>{

        cy.visit('/settings/tags').wait(2000)
        cy.get('#gridTags tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(1000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({force:true}).wait(1000)

        cy.get('#editTagForm')
        cy.getByFormControlName('name').clear().type(name+faker.string.alphanumeric(1))
        cy.getBySel('saveAndCloseButton').click().wait(2000)

        cy.contains('Tag has been updated.')
    })

    it('Deletes a Tag', ()=>{
        cy.visit('/settings/tags').wait(2000)

        cy.get('#gridTags tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(1000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({force:true}).wait(1000)
        cy.get('sa-button').contains('Delete').click()
        cy.get('.MessageBoxButtonSection').contains('button', 'Yes').click()

        cy.contains('Tag has been deleted.')
    })
})