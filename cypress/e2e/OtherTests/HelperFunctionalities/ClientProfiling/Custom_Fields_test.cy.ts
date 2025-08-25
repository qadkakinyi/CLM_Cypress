/**
 * @testSuite Client Profiling - Custom Fields
 * @description CRUD tests for managing Custom Fields in Settings
 * @priority Medium
 * @owner QA Team
 * @tags regression, settings, custom-fields
 * @dependencies faker-js
 * @fileDescription Verifies adding, editing, and deleting custom fields via the Settings UI
 */

import {faker} from "@faker-js/faker";

describe('Custom Fields', ()=>{

    /**
     * @scenario Add Custom Field
     * @description Creates a new custom field mapped to "Custom Fields" table
     * @priority Medium
     * @testData Name: "Test field"; Mapping Reference: faker string(12)
     * @steps Navigate to Settings → Custom Fields
     * @steps Click Add; fill Field Name, Mapping Reference, Order
     * @steps Select Reference Table = Custom Fields; Regulation Group; Field Type = Text
     * @steps Enable Nullable; click Save
     * @expectedResult Toast: "The custom field has been added."
     */
    it('Add a custom field to a form', ()=>{
        cy.visit('/settings/custom-fields').wait(1000)
        cy.contains('sa-button', 'Add').click().wait(1000)

        cy.get('#addCustomFieldForm')
        cy.getByFormControlName('fieldName').type('Test field')
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(12))
        cy.getByFormControlName('order').type('0')
        cy.getByFormControlName('referenceTable').select('Custom Fields')
        cy.getByFormControlName('regulationGroupId').select(1)
        cy.getByFormControlName('fieldType').select('Text')
        cy.getByFormControlName('isNullable').click()

        cy.get('#addCustomFieldForm [icon="save"] > .sa-button').click().wait(2000);
        cy.contains('The custom field has been added.')
    })

    /**
     * @scenario Edit Custom Field
     * @description Opens the field and updates the Field Name
     * @priority Medium
     * @testData New Name: "Test field edited"
     * @steps Navigate to Settings → Custom Fields
     * @steps Filter by "Test field"; open row details
     * @steps Update Field Name; click Save & Close
     * @expectedResult Toast: "Custom field has been updated."
     */
    it('Edits a custom field', ()=>{
        cy.visit('/settings/custom-fields').wait(3000)

        cy.get('#gridCustomFields tr [aria-colindex="3"] .dx-texteditor-input').type('Test field', {force:true}).wait(1000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({force:true}).wait(1000)
        cy.get('#editCustomFieldForm')
        cy.getByFormControlName('fieldName').clear().type('Test field edited')

        cy.getBySel('saveAndCloseButton').click().wait(2000)
        cy.contains('Custom field has been updated.')
    })

    /**
     * @scenario Delete Custom Field
     * @description Deletes the previously created custom field
     * @priority Medium
     * @steps Navigate to Settings → Custom Fields
     * @steps Filter by "Test field"; open row details
     * @steps Click Delete; confirm Yes
     * @expectedResult Toast: "Custom field has been deleted"
     */
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

