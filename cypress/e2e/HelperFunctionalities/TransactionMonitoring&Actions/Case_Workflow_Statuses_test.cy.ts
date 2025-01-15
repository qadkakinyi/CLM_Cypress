import {faker} from "@faker-js/faker";

let name = 'Test Workflow Status '
describe("Case Workflow Statuses", ()=>{
    it('Adds a Case Workflow Status', ()=>{
        cy.visit('/settings/case-workflow-statuses').wait(1500)
        cy.contains('Add').click().wait(1000)
        cy.getByFormControlName('name').type(name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
        cy.contains('sa-button','Save').click().wait(1500)
        cy.contains('The Case Workflow Status has been added.')
    })

    it('Edits a Tag', ()=>{

        cy.visit('/settings/case-workflow-statuses').wait(2000)
        cy.get('#gridCaseWorkflowStatuses tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(1000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({force:true}).wait(1000)

        cy.get('#editCaseWorkflowStatusForm')
        cy.getByFormControlName('name').clear().type(name+faker.string.alphanumeric(1))
        cy.getBySel('saveAndCloseButton').click().wait(2000)

        cy.contains('The Case Workflow Status has been updated.')
    })

    it('Deletes a Tag', ()=>{
        cy.visit('/settings/case-workflow-statuses').wait(2000)

        cy.get('#gridCaseWorkflowStatuses tr .dx-first-cell .dx-texteditor-input').type(name, {force:true}).wait(1000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({force:true}).wait(1000)
        cy.get('sa-button').contains('Delete').click()
        cy.get('.MessageBoxButtonSection').contains('button', 'Yes').click()

        cy.contains('The case workflow status has been deleted.')
    })
})