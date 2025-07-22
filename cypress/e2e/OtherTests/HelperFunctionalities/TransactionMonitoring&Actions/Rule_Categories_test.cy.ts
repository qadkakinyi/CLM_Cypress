import {faker} from "@faker-js/faker";

describe('Rule Categories', ()=>{
    beforeEach(()=>{
        cy.visit('/settings/rule-categories').wait(2000)
    })

    it('Adds an Rule Category', ()=>{
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('Rule Test DKA')
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13))

        cy.get('#addRuleCategoryForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(1000)
        cy.contains('Rule category has been added')
    })

    it('Edits an Rule Category', () => {

        cy.get('#gridRuleCategories tr .dx-first-cell .dx-texteditor-input').type('Rule Test DKA', {force:true}).wait(2000)
        cy.get('#gridRuleCategories tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridRuleCategories .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('categories')

        cy.get('@categories').eq(3).clear().wait(1000).type('DKA Test Rule', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`The rule category has been updated.`).wait(1000)
    })

    it('Deletes an Rule Category', () => {

        cy.get('#gridRuleCategories tr .dx-first-cell .dx-texteditor-input').type('DKA Test Rule', {force:true}).wait(2000)
        cy.get('#gridRuleCategories tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The rule category has been deleted.`).wait(1000)
    })
})