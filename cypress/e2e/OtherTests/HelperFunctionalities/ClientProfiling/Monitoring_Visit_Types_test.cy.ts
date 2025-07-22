import {faker} from "@faker-js/faker";

let name = 'Test visit dka '+faker.number.int({min:0, max:10})
describe('Monitoring Visit Types', ()=>{
    it('Adds a Visit Type', ()=>{
        cy.visit('/settings/monitoring-visit-type').wait(1500)
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type(name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
        cy.get('#addMonitoringVisitTypeForm  [icon="save"] > .sa-button').click().wait(2000)
        cy.contains('Monitoring visit type has been added.')
    })

    it('Edits a Visit Type', ()=>{

        cy.visit('/settings/monitoring-visit-type').wait(2000)
        cy.get('#gridBanks tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(2000)
        cy.get('#gridBanks tr td').find('.dx-icon-edit').eq(0).click({force:true}).wait(1000)

        cy.get('#gridBanks .dx-datagrid-table .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').as('VisitTypes')
        cy.get('@VisitTypes').eq(2).clear().wait(1000).type(name+ faker.string.alphanumeric(1), {force:true}).wait(1000)
        cy.get('tr td').find('.dx-icon-save').eq(1).click().wait(1000)

        cy.contains('Monitoring Visit Type has been updated.')
    })

    it('Deletes a Visit Type', ()=>{
        cy.visit('/settings/monitoring-visit-type').wait(2000)

        cy.get('#gridBanks tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(2500)
        cy.get('#gridBanks tr td').find('.dx-icon-trash').eq(1).click({ force: true }).wait(1000)
        cy.get('.dx-popup-normal').contains( 'Yes').click({ force: true }).wait(1000);

        cy.contains('The Monitoring Visit Type has been deleted.')
    })
})