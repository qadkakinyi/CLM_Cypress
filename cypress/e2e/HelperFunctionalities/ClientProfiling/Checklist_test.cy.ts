import {faker} from "@faker-js/faker";

describe('Checklist', ()=>{
    it('Adds A Checklist', ()=>{
        cy.visit('/settings/checklists').wait(3000)
        cy.contains('sa-button','Add').click().wait(2000)
        cy.getByFormControlName('name').type('Test Checklist')
        cy.getByFormControlName('priority').type('5')
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(10))
        cy.getByDataCy('regulation-group').click().wait(500);
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-content').eq(1).find('[aria-rowindex="1"] td').click().wait(1000)
        cy.getByDataCy('save-checklist').click().wait(1000)
        cy.contains('New checklist has been added.').wait(2000)
    })
    
    it('Edits A Checklist', ()=>{
        cy.visit('/settings/checklists').wait(2000)

        cy.get('#gridChecklists tr .dx-first-cell .dx-texteditor-input').type('Test Checklist', {force:true}).wait(2000)
        cy.get('tr td').find('.dx-icon-edit').eq(1).click({force:true}).wait(1000)

        cy.get('#gridChecklists .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('checklistInputs')
        cy.get('@checklistInputs').eq(4).clear().wait(1000).type('Checklist Test '+faker.string.alphanumeric(3), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('Checklist has been updated')
    })
    
    it('Deletes A CheckList', ()=>{
        cy.visit('/settings/checklists').wait(2000)

        cy.get('#gridChecklists tr .dx-first-cell .dx-texteditor-input').type('Checklist Test', {force:true}).wait(2000)
        cy.get('tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('Checklist has been deleted.')
    })
})