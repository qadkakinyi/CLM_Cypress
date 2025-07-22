import {faker} from "@faker-js/faker";

describe('Documents', ()=>{
    it('Adds a document', ()=>{
        cy.visit('/settings/documents').wait(2000)
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.get('#addDocumentForm')

        cy.getByFormControlName('name').type('DKA Test Document '+faker.word.sample())
        cy.getByFormControlName('nameInPortal').clear().type('Test_Doc')
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(11))
        cy.getByDataCy('documentType').click().wait(500)
        cy.getBySel('dynamicSelectBoxDropdownGrid').find('[aria-rowindex="1"]').click().wait(500)
        cy.getByDataCy('clientType').click().wait(500)
        cy.getBySel('dynamicSelectBoxDropdownGrid').contains('Corporate').click().wait(500)
        cy.getByDataCy('regulationGroup').click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-content').eq(5).find('[aria-rowindex="1"] td').click()
        // cy.getBySel('dynamicSelectBoxDropdownGrid').contains('Default').click().wait(500)
        // cy.get('#documentCategory').click().wait(500)
        // cy.getBySel('dynamicSelectBoxDropdownGrid').contains('Test Category').click().wait(500)
        cy.getByDataCy('capacityList').click().wait(500)
        cy.get('.dropdown-list .item2 li').eq(0).click().wait(500)
        // cy.getByDataCy('clientCategory').click().wait(500)
        // cy.get('.dropdown-list > ul').contains('Test Client').click().wait(500)
        //close the popup
        // cy.getByDataCy('clientCategory').click().wait(500)
        cy.get('#addDocumentForm [icon="save"] > .sa-button').click().wait(2000);
        cy.contains('Document has been added.').wait(1000)
    })
    
    it('Edits a document', ()=>{
        cy.visit('/settings/documents').wait(2000)
        cy.get('#gridDocuments tr .dx-first-cell .dx-texteditor-input').type('DKA Test Document', {force:true}).wait(2000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({force:true}).wait(1000)

        cy.get('#editDocumentForm')
        cy.getByFormControlName('name').clear().type('DKA Document Test '+faker.word.sample())
        // un-populate capacity
        cy.getByFormControlName('capacities').click().wait(500)
        cy.get('.dropdown-list .item2 li').eq(0).click().wait(500)
        
        cy.getBySel('saveAndCloseButton').click().wait(1000)
        cy.contains('The document has been updated.').wait(1000)
    })

    it("Deletes a document", ()=>{
        cy.visit('/settings/documents').wait(3000)

        cy.get('#gridDocuments tr .dx-first-cell .dx-texteditor-input').type('DKA Document Test', {force:true}).wait(2000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({force:true}).wait(1000)
        
        //check that capacities is not populated
        cy.get('[formcontrolname="capacities"] span[class="dropdown-btn"] span').eq(0).invoke('text').then(capacity=>{
            expect(capacity).to.equal('Select')
        })
        cy.get('sa-button').contains('Delete').click()
        cy.get('.MessageBoxButtonSection').contains('button', 'Yes').click().wait(1000)

        cy.contains('The document has been deleted.').wait(1000)
    })
})