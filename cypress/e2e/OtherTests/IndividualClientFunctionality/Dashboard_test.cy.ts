/**
 * @testSuite Individual Client Dashboard
 * @description Verifies the main dashboard widgets render and can be scrolled into view for an individual client.
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, dashboard
 * @dependencies navigateToNewestClientMenu
 * @fileDescription Opens the newest individual client and asserts the visibility of key dashboard sections/widgets.
 */

import { navigateToNewestClientMenu} from "../../../support/e2e";

describe('Views the Individual Client Dashboard', ()=>{

    /**
     * @scenario Checks if the dashboard loads correctly
     * @description Navigates to the newest client and validates that core dashboard widgets are visible and reachable.
     * @steps Open client → assert presence of widgets → scroll through sections and confirm visibility
     * @expectedResult All listed dashboard sections are present and visible without errors.
     */
    it('Checks if the dashboard loads correctly', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
            clientName = data.individualClientName
            navigateToNewestClientMenu(clientName)
        })

        cy.contains('Electronic Verification Statuses').should('be.visible')
        cy.contains('Client Behavior Summary').should('be.visible')
        cy.contains('Risk Results').should('be.visible')
        cy.contains('Risk & KYC Assessments').scrollIntoView()
        cy.contains('Client Behavior Summary').scrollIntoView()
        cy.contains('Case Statuses').scrollIntoView()
        cy.contains('Action Categorizations').scrollIntoView()
        cy.contains('Client Evaluations').scrollIntoView()
        cy.contains('Volume of Transactions & Trades').scrollIntoView()

    })
})

