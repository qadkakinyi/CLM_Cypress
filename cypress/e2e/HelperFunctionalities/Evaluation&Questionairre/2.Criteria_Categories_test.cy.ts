import {faker} from "@faker-js/faker";

describe('Criteria Categories', ()=>{
    beforeEach(()=>{
        cy.visit('/settings/criteria-categories').wait(2000)
    })

    it('Adds an Evaluation Type', ()=>{
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('Test Category DKA')
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13))

        cy.contains('sa-button', 'Save').click().wait(1000)
        cy.contains('Criteria category has been added')
    })

    it('Edits an Evaluation Type', () => {

        cy.get('#gridCriteriaCategories tr .dx-first-cell .dx-texteditor-input').type('Test Category DKA', {force:true}).wait(2000)
        cy.get('#gridCriteriaCategories tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridCriteriaCategories .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('categories')

        cy.get('@categories').eq(4).clear().wait(1000).type('DKA Test Category', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`The criteria category has been updated.`).wait(1000)
    })

    
})