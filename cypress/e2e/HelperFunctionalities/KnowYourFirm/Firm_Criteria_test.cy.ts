import {faker} from "@faker-js/faker";

describe('Firm Criteria', ()=>{
    
    beforeEach(()=>{
        cy.visit('/settings/firm-criteria').wait(2000)
    })

    it('Adds a Firm Criteria', ()=>{
        
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type('Test DKA')
        
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid').find('.dx-datagrid-rowsview').find('tr > td').first().click().wait(500)
        
        cy.getByFormControlName('firmCriterionCategoryId').select('Delivery Channel')

        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains('Audit Services').click({force:true}).wait(500)

        cy.get('#addFirmCriterionForm [icon="save"] > .sa-button').click().wait(1000)

        cy.contains('The firm criterion has been added').wait(1000)
    })

    it('Edits a Firm Criteria', () => {

        cy.get('#gridFirmCriteria tr .dx-first-cell .dx-texteditor-input').type('Test DKA', {force:true}).wait(2000)
        cy.get('#gridFirmCriteria tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridFirmCriteria .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('criteria')
        // cy.get('[aria-describedby="dx-col-8"] > .dx-show-invalid-badge > .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input')
        cy.get('@criteria').eq(6).clear().wait(1000).type('DKA Test Criterion', {force: true}).wait(1000)
        cy.get('.dx-datagrid-table > tbody > .dx-edit-row > .dx-command-edit > .dx-link-save').eq(1).click().wait(1500)

        cy.contains(`The firm criterion has been updated.`).wait(1000)
    })

    it('Deletes a Firm Criteria', () => {

        cy.get('#gridFirmCriteria tr .dx-first-cell .dx-texteditor-input').type('DKA Test Criterion', {force:true}).wait(2000)
        cy.get('#gridFirmCriteria tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The firm criterion has been deleted.`).wait(1000)
    })

})