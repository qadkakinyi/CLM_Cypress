import { faker } from "@faker-js/faker";

let name = 'Test Workflow Status '

/**
 * @testSuite Case Workflow Statuses
 * @description Validates adding, editing, and deleting of case workflow statuses in the system.
 * @priority Medium
 * @owner QA Team
 * @tags settings, case, workflow-status
 */

describe("Case Workflow Statuses", () => {

    /**
     * @scenario Add Case Workflow Status
     * @description Creates a new case workflow status with a generated mapping reference.
     * @steps
     *  1. Navigate to Settings → Case Workflow Statuses.
     *  2. Click "Add".
     *  3. Fill in the name and mapping reference.
     *  4. Save the new workflow status.
     *  5. Verify that a success message appears.
     * @expectedResult The case workflow status is successfully created.
     */
    it('Adds a Case Workflow Status', () => {
        cy.visit('/settings/case-workflow-statuses').wait(1500)
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').type(name)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
        cy.get('#addCaseWorkflowStatusForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(1500)
        cy.contains('The Case Workflow Status has been added.')
    })

    /**
     * @scenario Edit Case Workflow Status
     * @description Updates an existing case workflow status with a new name value.
     * @steps
     *  1. Navigate to Settings → Case Workflow Statuses.
     *  2. Search for the workflow status by name.
     *  3. Click the edit icon.
     *  4. Modify the name field.
     *  5. Save the changes.
     *  6. Verify the success message.
     * @expectedResult The case workflow status name is updated successfully.
     */
    it('Edits a Case Workflow Status', () => {
        cy.visit('/settings/case-workflow-statuses').wait(2000)
        cy.get('#gridCaseWorkflowStatuses tr .dx-first-cell .dx-texteditor-input').type(name, { force: true }).wait(1000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({ force: true }).wait(1000)

        cy.get('#editCaseWorkflowStatusForm')
        cy.getByFormControlName('name').clear().type(name + faker.string.alphanumeric(1))
        cy.getBySel('saveAndCloseButton').click().wait(2000)

        cy.contains('The Case Workflow Status has been updated.')
    })

    /**
     * @scenario Delete Case Workflow Status
     * @description Removes an existing case workflow status from the system.
     * @steps
     *  1. Navigate to Settings → Case Workflow Statuses.
     *  2. Search for the workflow status by name.
     *  3. Click the delete button.
     *  4. Confirm the deletion.
     *  5. Verify the success message.
     * @expectedResult The case workflow status is deleted successfully.
     */
    it('Deletes a Case Workflow Status', () => {
        cy.visit('/settings/case-workflow-statuses').wait(2000)

        cy.get('#gridCaseWorkflowStatuses tr .dx-first-cell .dx-texteditor-input').type(name, { force: true }).wait(1000)
        cy.get('tr td').find('.fa-angle-double-right').eq(1).click({ force: true }).wait(1000)
        cy.get('sa-button').contains('Delete').click()
        cy.get('.MessageBoxButtonSection').contains('button', 'Yes').click()

        cy.contains('The case workflow status has been deleted.')
    })

})

