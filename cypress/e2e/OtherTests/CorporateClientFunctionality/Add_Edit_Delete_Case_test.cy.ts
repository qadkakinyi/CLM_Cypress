import {navigateToNewestClientMenu} from "../../../support/e2e";
import {faker} from "@faker-js/faker";

/**
 * @testSuite ClientCases - Corporate Case Management
 * @description Handles end-to-end testing for managing client cases under corporate clients
 * @priority High
 * @owner QA Team
 * @tags corporate, cases, regression, rules
 * @dependencies faker-js, client-corporate
 * @fileDescription This suite covers rule activation, and case creation, editing, and deletion workflows
 */

let location = '';

describe('Cases - Corporate', () => {

    /**
     * @scenario Ensure Rule for Case Exists and Activate
     * @description Checks if the rule "3A - Document Expiration Notice" exists, if not imports and activates it
     * @steps Filter rules grid and check for the required rule
     * @steps If missing, import rules and activate the specific rule
     * @expectedResult Rule is present and set to Active with Manual Case Creation enabled
     */
    before(() => {
        cy.visit('/administration/rules').wait(8000)

        cy.get('#gridRules .dx-datagrid-filter-row [aria-colindex="4"] input').type('3A - Document Expiration Notice').wait(3000)
        cy.get('#gridRules .dx-datagrid-rowsview .dx-datagrid-content tbody tr').then(el => {
            if (el.length > 2) {
                cy.log(`${el.length}`)
                cy.get('#gridRules table tbody tr .fa-angle-double-right').eq(0).click({ force: true }).wait(2000)
                cy.get('#editRuleForm')
                cy.getByFormControlName('status').select('Active')
                cy.get('#clientCaseOptions-widget .fa-plus').click().wait(500)
                cy.getByFormControlName('manualCreateCases').check()
                cy.contains('[primary-buttons=""] > [icon="save"]', 'Save').click().wait(2000)
                cy.contains('Rule has been updated')
                return;
            } else {
                cy.log('rule missing')
                cy.contains('sa-button', 'Import Rules').click().wait(1000)
                cy.getByDataCy('regulationGroup').click()
                cy.get('table [aria-rowindex="1"] .dx-checkbox-icon').eq(2).click().wait(500)
                cy.getByDataCy('regulationGroup').click().wait(500)
                cy.getByDataCy('rulesToAdd').click()
                cy.get('table [aria-rowindex="5"] .dx-checkbox-icon').click().wait(500)
                cy.getByDataCy('rulesToAdd').click().wait(500)
                cy.contains('#addPredefinedOrCustomizedRulesForm', 'Save').click().wait(2000)
                cy.get('#gridRules table tbody tr .fa-angle-double-right').last().click().wait(2000)
                cy.get('#editRuleForm')
                cy.getByFormControlName('status').select('Active')
                cy.get('#clientCaseOptions-widget .fa-plus').click().wait(500)
                cy.getByFormControlName('manualCreateCases').check()
                cy.contains('sa-button', 'Save').click().wait(2000)
                cy.contains('Rule has been updated')
            }
        })
    })

    /**
     * @scenario Add a Case
     * @description Adds a new client case using the activated rule and fills required fields
     * @testData Pulls corporate client name from fixture
     * @steps Navigate to client dashboard, click Add Case
     * @steps Select rule, status, assignee and submit
     * @expectedResult Case is successfully created and confirmed with message
     */
    it('Adds A Case', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Cases').click();
        cy.getByDataCy('addCaseBtn').click().wait(1000)

        cy.getByDataCy('caseRule').click().wait(2000)
        cy.get('#dynamicSelectBoxDropdownGrid table tbody [aria-rowindex="1"] [aria-colindex="1"]').click().wait(1000)
        cy.getByDataCy('status').click()
        cy.get('#dynamicSelectBoxDropdownGrid table tbody [aria-rowindex="1"] [aria-colindex="1"]').eq(1).click().wait(500)
        cy.getByDataCy('assignee').click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid table tbody [aria-rowindex="1"] [aria-colindex="1"]').eq(2).click().wait(500)

        cy.get('#addClientCaseForm').contains('Save').click().wait(3000)
        cy.contains('The case has been added')

        cy.location('pathname').then((loc) => {
            location = loc
        })
    })

    /**
     * @scenario Edit a Case
     * @description Edits the case status for the first case in the grid
     * @steps Opens the first case for editing and updates the status
     * @expectedResult Case update is saved and confirmation message is shown
     */
    it('Edit A Case', () => {
        cy.visit(location).wait(2000)
        cy.get('#gridClientCases .fa-angle-double-right').should('be.visible').eq(0).click({ force: true }).wait(2000)
        cy.get('#editClientCaseForm')
        cy.getByDataCy('caseStatus').click()
        cy.get('#dynamicSelectBoxDropdownGrid table tbody [aria-rowindex="2"] [aria-colindex="1"]').click().wait(500)
        cy.contains('div', 'Save & Close').click().wait(500)
        cy.contains('The case has been updated.')
    })

    /**
     * @scenario Delete a Case
     * @description Deletes the first case found in the grid
     * @steps Clicks the delete option and confirms the modal
     * @expectedResult Case is removed from the system and confirmation is displayed
     */
    it('Delete A Case', () => {
        cy.visit(location).wait(2000)
        cy.get('#gridClientCases .fa-angle-double-right').should('be.visible').eq(0).click({ force: true }).wait(2000)
        cy.get('#editClientCaseForm')
        cy.contains('div', 'Delete').click().wait(500)
        cy.contains('Yes').click().wait(500)
        cy.contains('Case has been permanently deleted.')
    })

})

