import { navigateToClientMenu, navigateToNewestClientMenu } from "../../../support/e2e";

/**
 * @testSuite Client Dashboard - Corporate
 * @description Verifies that the client dashboard loads correctly for corporate clients
 * @priority Medium
 * @owner QA Team
 * @tags dashboard, client-overview
 * @dependencies client_corporate.json
 */

describe('Views the Client Dashboard', () => {

    /**
     * @scenario Check Dashboard Widgets
     * @description Ensures all main dashboard widgets and sections load and are visible
     * @expectedResult All expected dashboard sections are displayed
     */
    it('Checks if the dashboard loads correctly', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
            clientName = data.companyName;
            navigateToNewestClientMenu(clientName);
        });

        cy.contains('Client Behavior Summary').should('be.visible');
        cy.contains('Required Risk Evaluation Profiles').should('be.visible');
        cy.contains('Required Due Diligence Profiles').should('be.visible');
        cy.contains('Case Statuses').scrollIntoView();
        cy.contains('Action Categorizations').scrollIntoView();
        cy.contains('Client Evaluations').scrollIntoView();
        cy.contains('Volume of Transactions & Trades').scrollIntoView();
    });

});

