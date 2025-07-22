import {faker} from "@faker-js/faker";

describe('Mandatory Document Categories (MDC)', ()=>{
    it('Adds a MDC', ()=>{
        cy.visit('/settings/mandatory-documents-categories')
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.get('#addMandatoryDocumentsCategoryForm')

        cy.getByFormControlName('name').type('Test Document 1')
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(11))

        // cy.getByDataCy('clientType').click().wait(500)
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.getBySel('dynamicSelectBoxDropdownGrid').contains('Corporate').click().wait(500)

        // cy.getByDataCy('regulationGroup').click().wait(500)
        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.getBySel('dynamicSelectBoxDropdownGrid').find('[aria-rowindex="1"]').eq(1).click().wait(1000)

        // cy.getByDataCy('mandatoryDocs').click().wait(500)
        cy.get('dx-drop-down-box').eq(2).click().wait(500)
        cy.get('.dx-datagrid-rowsview .dx-datagrid-table [aria-rowindex="1"] .dx-checkbox-icon').click().wait(500)

        cy.getByFormControlName('numOfMandatoryDocuments').type('1')

        cy.get('#addMandatoryDocumentsCategoryForm  [icon="save"] > .sa-button').click().wait(2000)
        cy.contains('Mandatory documents category has been added.')
    })

    it('Edits a MDC', ()=>{
        cy.visit('/settings/mandatory-documents-categories').wait(2000)
        cy.get('#gridMandatoryDocumentsCategories tr .dx-first-cell .dx-texteditor-input').type('Test Document 1', {force:true}).wait(2000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({force:true}).wait(1000)

        cy.get('#editMandatoryDocumentsCategoryForm')
        cy.getByFormControlName('name').clear().type('Document Test 1 ')
        cy.getBySel('saveAndCloseButton').click().wait(2000)
        cy.contains('Mandatory documents category has been updated.')
    })

    it("Deletes a MDC", ()=>{
        cy.visit('/settings/mandatory-documents-categories').wait(3000)

        cy.get('#gridMandatoryDocumentsCategories tr .dx-first-cell .dx-texteditor-input').type('Document Test 1', {force:true}).wait(3000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({force:true}).wait(1000)
        cy.get('sa-button').contains('Delete').click()
        cy.get('.MessageBoxButtonSection').contains('button', 'Yes').click()
        cy.contains('Mandatory documents category has been deleted.')
    })
})