/**
 * @testSuite Transaction Insights
 * @description Validates navigation to the "Know Your Transactions" page and confirms page content.
 * @priority Medium
 * @owner QA Team
 * @tags regression, ui, navigation, transactions
 * @fileDescription This test ensures that the Transaction Insights module is accessible and loads correctly.
 */

describe("Transaction Insights", ()=>{

    /**
     * @scenario Visit Know Your Transactions Page
     * @description Clicks the "Know Your Transactions" menu and verifies the correct route and heading are loaded.
     * @priority Medium
     * @steps Click element with data-cy="know-your-transactions".
     * @steps Assert that the pathname is "/know-your-transactions/transactions".
     * @steps Verify that the page contains "Transaction Insights".
     * @expectedResult The Transaction Insights page is loaded and visible.
     */
    it("Visits know your transactions page", ()=>{
        cy.getByDataCy("know-your-transactions").click()
        cy.location('pathname').should("equal", "/know-your-transactions/transactions")
        cy.contains("Transaction Insights")
    })

})

