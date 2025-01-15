import {faker} from "@faker-js/faker";

describe('Custom Fields', ()=>{
    it('Add a custom field to a form', ()=>{
        cy.visit('/settings/custom-fields').wait(1000)
        cy.contains('sa-button', 'Add').click().wait(1000)
        
        cy.get('#addCustomFieldForm')
        cy.getByFormControlName('fieldName').type('Test field')
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(12))
        cy.getByFormControlName('order').type('0')
        cy.getByFormControlName('referenceTable').select('Custom Fields')
        cy.getByFormControlName('regulationGroupId').select('BERMUDA')
        cy.getByFormControlName('fieldType').select('Text')
        cy.getByFormControlName('isNullable').click()

        cy.get('sa-button').contains('Save').click().wait(2000);
        cy.contains('The custom field has been added.')
    })
    
    it('Edits a custom field', ()=>{
        cy.visit('/settings/custom-fields').wait(3000)

        cy.get('#gridCustomFields tr [aria-colindex="3"] .dx-texteditor-input').type('Test field', {force:true}).wait(1000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({force:true}).wait(1000)
        cy.get('#editCustomFieldForm')
        cy.getByFormControlName('fieldName').clear().type('Test field edited')
        
        cy.getBySel('saveAndCloseButton').click().wait(2000)
        cy.contains('Custom field has been updated.')
    })
    
    it("Deletes a custom field", ()=>{
        cy.visit('/settings/custom-fields').wait(3000)

        cy.get('#gridCustomFields tr [aria-colindex="3"] .dx-texteditor-input').type('Test field', {force:true}).wait(1000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({force:true}).wait(1000)
        cy.get('sa-button').contains('Delete').click()
        cy.get('.MessageBoxButtonSection').contains('button', 'Yes').click().wait(2000)
        //assertion
        cy.contains('Custom field has been deleted')
    })
})