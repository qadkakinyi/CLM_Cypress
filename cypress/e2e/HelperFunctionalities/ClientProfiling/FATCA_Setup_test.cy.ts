import {faker} from "@faker-js/faker";

describe('FATCA Setup', ()=>{
    it('Adds FATCA Setup', ()=>{
        //add fatca status
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.contains('Add').click()
        cy.wait(1000)
        cy.get('#addFatcaStatusForm .status-name').type('Test Active')
        cy.get('#addFatcaStatusForm .status-ref').type(faker.string.alphanumeric(10))
        cy.getByDataCy('save-status').click().wait(2000)
        cy.contains('Fatca Status has been added.')
    })
    
    it('Edits FATCA Status', ()=>{
        cy.visit('/settings/fatca-setup').wait(2000)

        cy.get('#gridFatcaStatuses tr .dx-first-cell .dx-texteditor-input').type('Test Active', {force:true}).wait(2000)
        cy.get('tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridFatcaStatuses .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('fatcaStatuses')
        cy.get('@fatcaStatuses').eq(2).clear().wait(1000).type('Active Test '+faker.string.alphanumeric(3), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('Fatca Status has been updated')
    })
    
    it('Deletes Fatca Status', ()=>{
        cy.visit('/settings/fatca-setup').wait(2000)
        
        cy.get('#gridFatcaStatuses tr .dx-first-cell .dx-texteditor-input').type('Active Test', {force:true}).wait(2500)
        cy.get('tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('Fatca Status has been deleted.')
    })
})

describe('FATCA Entities Categorization', ()=>{
    it('Add FATCA Entities categorization', ()=>{
        //add fatca category
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.contains('FATCA Entities Categorization').click().wait(1000)
        cy.contains('Add').click()
        cy.wait(1000)
        cy.get('#addFatcaEntityCategorizationForm .category-name').type('Test Entity Category')
        cy.get('#addFatcaEntityCategorizationForm .category-ref').type(faker.string.alphanumeric(10))
        cy.get('.save-category').click().wait(2000)
        cy.contains('Fatca Entity Categorization has been added.')
    })

    it('Edits FATCA Entities categorization', ()=>{
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.contains('FATCA Entities Categorization').click().wait(1000)

        cy.get('#gridFatcaEntitiesCategorization tr .dx-first-cell .dx-texteditor-input').type('Test Entity Category', {force:true}).wait(2000)
        cy.get('#gridFatcaEntitiesCategorization tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridFatcaEntitiesCategorization .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('fatcaCategories')
        cy.get('@fatcaCategories').eq(2).clear().wait(1000).type('Entity Category Test '+faker.string.alphanumeric(3), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('Fatca Entity Categorization has been updated')
    })

    it('Deletes Fatca Entities categorization', ()=>{
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.contains('FATCA Entities Categorization').click().wait(1000)

        cy.get('#gridFatcaEntitiesCategorization tr .dx-first-cell .dx-texteditor-input').type('Entity Category Test', {force:true}).wait(2500)
        cy.get('#gridFatcaEntitiesCategorization tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('Fatca Entity Categorization has been deleted.')
    })
})

describe('FATCA Documents', ()=>{
    it('Adds Fatca Documents', ()=>{
        //add fatca document
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.contains('FATCA Documents').click()
        cy.contains('Add').click()
        cy.wait(1000)
        cy.get('#addFatcaDocumentForm .document-name').type('Test Fatca Document')
        cy.get('#addFatcaDocumentForm .document-ref').type(faker.string.alphanumeric(10))
        cy.get('.save-document').click().wait(2000)
        cy.contains('Fatca Document has been added')
    })

    it('Edits FATCA Documents', ()=>{
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.contains('FATCA Documents').click().wait(1000)

        cy.get('#gridFatcaDocuments tr .dx-first-cell .dx-texteditor-input').type('Test Fatca Document', {force:true}).wait(2000)
        cy.get('#gridFatcaDocuments tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridFatcaDocuments .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('fatcaDocuments')
        cy.get('@fatcaDocuments').eq(2).clear().wait(1000).type('Fatca Document Test '+faker.string.alphanumeric(3), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('Fatca Document has been updated')
    })

    it('Deletes Fatca Documents', ()=>{
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.contains('FATCA Documents').click().wait(1000)
        cy.get('#gridFatcaDocuments tr .dx-first-cell .dx-texteditor-input').type('Fatca Document Test', {force:true}).wait(2500)
        cy.get('#gridFatcaDocuments tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('Fatca Document has been deleted.')
    })
})

describe('FATCA CRS Entities Categorization', ()=>{
    it('Adds FATCA Entities Categorization', ()=>{
        //add fatca CRS Categorization
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.contains('FATCA CRS Entities Categorization').click()
        cy.contains('Add').click()
        cy.wait(1000)
        cy.get('#addFatcaCrsEntityCategorizationForm .crs-name').type('Test Fatca CRS')
        cy.get('#addFatcaCrsEntityCategorizationForm .crs-ref').type(faker.string.alphanumeric(10))
        cy.get('.save-crs').click().wait(2000)
        cy.contains('Fatca CRS Entity Categorization has been added.')
    })

    it('Edits FATCA CRS Entity Categorization', ()=>{
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.contains('FATCA CRS Entities Categorization').click()

        cy.get('#gridFatcaCrsEntitiesCategorization tr .dx-first-cell .dx-texteditor-input').type('Test Fatca CRS', {force:true}).wait(2000)
        cy.get('#gridFatcaCrsEntitiesCategorization tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridFatcaCrsEntitiesCategorization .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('fatcaCrs')
        cy.get('@fatcaCrs').eq(2).clear().wait(1000).type('Fatca CRS Test '+faker.string.alphanumeric(3), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('Fatca CRS Entity Categorization has been updated')
    })

    it('Deletes Fatca CRS Entity Categorization', ()=>{
        cy.visit('/settings/fatca-setup').wait(2000)
        cy.contains('FATCA CRS Entities Categorization').click()
        
        cy.get('#gridFatcaCrsEntitiesCategorization tr .dx-first-cell .dx-texteditor-input').type('Fatca CRS Test', {force:true}).wait(3000)
        cy.get('#gridFatcaCrsEntitiesCategorization tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('Fatca CRS Entity Categorization has been deleted.')
    })
})