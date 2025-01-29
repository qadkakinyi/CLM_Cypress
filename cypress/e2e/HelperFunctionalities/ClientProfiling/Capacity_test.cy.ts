import {faker} from "@faker-js/faker";

describe('Capacity', ()=>{
    it('Add Capacity', ()=>{
        cy.visit('/settings/capacities').wait(2000)
        
        cy.contains('sa-button','Add').click().wait(1000)
        
        cy.getByFormControlName('name').type('Test CEO')
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric((10)))
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('.dx-overlay-content #dynamicSelectBoxDropdownGrid .dx-scrollable-wrapper .dx-datagrid-content tbody tr').eq(0).click().wait(500)
        
        cy.getByFormControlName('includeInEvaluation').click()
        cy.getByFormControlName('includePercentageOfShares').click()
        
        cy.get('#addCapacityForm').contains('Save').click().wait(2000)
        cy.contains('The capacity has been added.').wait(1000)
    })
    
    it('Edits A Capacity', ()=>{
        cy.visit('/settings/capacities').wait(2000)
        
        cy.get('#gridCapacities tr .dx-first-cell .dx-texteditor-input').type('Test CEO', {force:true}).wait(2000)
        cy.get('tr td').find('.dx-icon-edit').eq(1).click({force:true}).wait(1000)

        cy.get('#gridCapacities .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('capacityInputs')
        cy.get('@capacityInputs').eq(8).clear().wait(1000).type('CEO Test '+faker.string.alphanumeric(3), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('The capacity has been updated').wait(1000)
    })
    
    it('Delete A Capacity', ()=>{
        cy.visit('/settings/capacities').wait(2000)

        cy.get('#gridCapacities tr .dx-first-cell .dx-texteditor-input').type('CEO Test', {force:true}).wait(2000)
        cy.get('tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('The capacity has been deleted.')
    })
})