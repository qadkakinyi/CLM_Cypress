import {faker} from "@faker-js/faker";

describe('Firm Criteria Categories', ()=>{

    beforeEach(()=>{
        cy.visit('/settings/firm-criteria-categories').wait(2000)
    })

    it('Adds a Criteria Category', ()=>{

        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type('Test DKA')

        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid').find('.dx-datagrid-rowsview').find('tr > td').first().click().wait(500)

        cy.get('#addFirmCriteriaCategoryForm [icon="save"] > .sa-button').click().wait(1000)

        cy.contains('The Firm Criteria Category has been added').wait(1000)
    })

    it('Edits a Criteria Category', () => {

        cy.get('#gridFirmCriteriaCategories tr .dx-first-cell .dx-texteditor-input').type('Test DKA', {force:true}).wait(2000)
        cy.get('#gridFirmCriteriaCategories tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridFirmCriteriaCategories .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('criteria')

        cy.get('@criteria').eq(3).clear().wait(1000).type('DKA Test Criterion Category', {force: true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1500)

        cy.contains(`The firm criteria category has been updated.`).wait(1000)
    })

    it('Deletes a Criteria Category', () => {

        cy.get('#gridFirmCriteriaCategories tr .dx-first-cell .dx-texteditor-input').type('DKA Test Criterion Category', {force:true}).wait(2000)
        cy.get('#gridFirmCriteriaCategories tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The firm criteria category has been deleted.`).wait(1000)
    })

})