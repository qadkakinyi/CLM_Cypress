import {faker} from "@faker-js/faker";

let name = 'Test Website dka '+faker.number.int({min:0, max:10})
describe("Related Website Types", ()=>{
    it('Adds a Related Website Type', ()=>{
        cy.visit('/settings/related-website-types').wait(1500)
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type(name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
        cy.get('#addRelatedWebsiteTypeForm [icon="save"] > .sa-button').click().wait(2000)
        cy.contains('Related website type has been added.')
    })

    it('Edits a Related Website Type', ()=>{

        cy.visit('/settings/related-website-types').wait(2000)
        cy.get('#gridRelatedWebsiteTypes tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(2500)
        cy.get('#gridRelatedWebsiteTypes tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridRelatedWebsiteTypes .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('websiteTypes')
        cy.get('@websiteTypes').eq(3).clear().wait(1000).type(name+ faker.string.alphanumeric(1), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)

        cy.contains('The related website type has been updated.')
    })

    it('Deletes a Related Website Type', ()=>{
        cy.visit('/settings/related-website-types').wait(2000)

        cy.get('#gridRelatedWebsiteTypes tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(2500)
        cy.get('#gridRelatedWebsiteTypes tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);

        cy.contains('The related website type has been deleted.')
    })
})