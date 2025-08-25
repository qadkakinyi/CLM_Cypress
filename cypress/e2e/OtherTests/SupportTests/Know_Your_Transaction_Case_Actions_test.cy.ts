/**
 * @testSuite Know Your Transactions - Support
 * @description Validates case actions functionality and save operations in Live transactions within the Know Your Transactions module.
 * @priority High
 * @owner QA Team
 * @tags regression, transactions, actions, save, UI
 * @dependencies cypress, faker
 * @fileDescription Covers adding case actions, verifying edit navigation, and differentiating between "Save" and "Save & Close" in live transaction cases.
 */

import {faker} from "@faker-js/faker";

describe('Know your transactions - Support', ()=>{

    beforeEach(()=>{
        /**
         * Pre-condition:
         * 1) Navigate to Know Your Transactions → Transactions.
         * 2) Filter by dateFrom = 2024-12-12 and transaction origin = Live.
         * 3) Click Search and open the first transaction's Live Cases tab.
         */
        cy.visit( "/know-your-transactions/transactions").wait(2500)
        cy.contains("Transaction Insights")

        cy.getByFormControlName('dateFrom').type('2024-12-12')
        cy.getByFormControlName('transactionOrigins').click().wait(1000)
        cy.contains('.multiselect-item-checkbox', 'Live').click().wait(500)

        cy.contains('sa-button', 'Search').click().wait(2000)

        cy.get('.dx-datagrid-table td .fa-angle-double-right').eq(0).click({force:true}).wait(2000)
        cy.contains('.dx-item', 'Live Cases').click().wait(3000)
    })

    /**
     * @scenario Drill into and Add a Single Case Action
     * @description Opens the Case Actions tab for a live case, adds a new case action with generated target date, and verifies navigation to the Edit Action page.
     * @priority High
     * @steps
     * 1) Navigate to the Actions → Case Actions tab.
     * 2) Click "Add Client Action".
     * 3) Select an action category and status.
     * 4) Enter a target date (faker-generated).
     * 5) Save and navigate into the newly added case action.
     * @expectedResult The new case action is created and the Edit Action page is displayed.
     */
    it('It drills into a single case action', ()=>{
        cy.contains('.nav-tabs li ', 'Actions').scrollIntoView().click().wait(1000)
        cy.contains('.dx-tabs span', 'Case Actions').click().wait(2000)

        cy.getBySel('addClientAction').click().wait(2000)
        cy.get('#addActionForm').scrollIntoView()

        cy.get('#addActionForm dx-drop-down-box').eq(1).click().wait(300)
        cy.get('#dynamicSelectBoxDropdownGrid').find('.dx-datagrid-rowsview').find('tr > td').first().click().wait(500)

        cy.get('#addActionForm dx-drop-down-box').eq(3).click().wait(300)
        cy.get('[data-test="dynamicSelectBoxDropdownGrid"] [aria-rowindex="1"] > td').eq(2).click().wait(500)

        cy.getByFormControlName('targetDate').type(faker.date.soon().toISOString().slice(0, 10))
        cy.get('[data-test="saveClientAction"] > .sa-button').click().wait(1500)

        cy.get('#gridCaseActions .fa-angle-double-right').eq(0).click({force:true}).wait(2000)
        cy.contains('.page-title > h1', 'Edit Action').wait(2000)
    })

    /**
     * @scenario Differentiate Save vs Save & Close
     * @description Ensures the Save button keeps the user on the case page, while Save & Close returns the user to the Live Transactions list.
     * @priority Medium
     * @steps
     * 1) Edit case status and use Save & Close dropdown → Save option.
     * 2) Confirm success message and that user remains on case page.
     * 3) Edit case status again and click Save & Close.
     * 4) Confirm success message and return to Advanced Filter list.
     * @expectedResult Save keeps user on the same case page; Save & Close navigates back to the list view.
     */
    it('Differentiates `Save` vs `Save & Close` in Live Transaction', ()=>{
        cy.get('dx-drop-down-box').eq(0).click().wait(1000)
        cy.get('.dx-popup-content dx-data-grid').should('be.visible').eq(0).find('tr').last().prev().click()

        cy.get('.dropdown-toggle').click()
        cy.get('.save-and-close-link').click()
        cy.contains('The case has been updated').wait(2000)
        cy.contains('Case Number')

        cy.get('dx-drop-down-box').eq(0).click().wait(1000)
        cy.get('.dx-popup-content dx-data-grid').should('be.visible').eq(0).find('tr').first().next().click()

        cy.getBySel('saveAndCloseButton').click()
        cy.contains('The case has been updated').wait(2000)
        cy.contains('Advanced Filter')
    })
})

