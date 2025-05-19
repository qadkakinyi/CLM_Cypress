import {faker} from "@faker-js/faker";

describe('Integration Capacity', ()=>{
    it('Adds Integration Capability', ()=>{
        //add fatca CRS Categorization
        cy.visit('/settings/integration-capacities').wait(2000)
        
        cy.contains('sa-button','Add').click().wait(1000)
        cy.get('#addIntegrationCapacityForm')
        cy.getByFormControlName('name').type('Test Capacity')
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(10))
        cy.get('#addIntegrationCapacityForm  [icon="save"] > .sa-button').click().wait(2000)
        cy.contains('Integration capacity has been added.')
    })

    it('Edits Integration Capability', ()=>{
        cy.visit('/settings/integration-capacities').wait(2000)

        cy.get('#gridIntegrationCapacities tr .dx-first-cell .dx-texteditor-input').type('Test Capacity', {force:true}).wait(1000)
        cy.get('#gridIntegrationCapacities tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridIntegrationCapacities .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('integrationCapacities')
        cy.get('@integrationCapacities').eq(3).clear().wait(1000).type('Capacity Test '+faker.string.alphanumeric(3), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)
        cy.contains('Integration capacity has been updated')
    })

    it('Deletes Integration Capability', ()=>{
        cy.visit('/settings/integration-capacities').wait(2000)

        cy.get('#gridIntegrationCapacities tr .dx-first-cell .dx-texteditor-input').type('Capacity Test', {force:true}).wait(1000)
        cy.get('#gridIntegrationCapacities tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);
        cy.contains('Integration capacity has been deleted.')
    })
})