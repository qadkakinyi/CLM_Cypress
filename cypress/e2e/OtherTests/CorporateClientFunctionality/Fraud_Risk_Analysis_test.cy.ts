import { navigateToClientMenu, navigateToNewestClientMenu } from "../../../support/e2e";

/**
 * @testSuite Fraud Risk Analysis - Corporate
 * @description Ensures navigation to the Fraud Risk Analysis and Pending Records sections for corporate clients
 * @priority Medium
 * @owner QA Team
 * @tags fraud-risk, navigation, ui
 * @dependencies client_corporate.json
 */

describe('Fraud Risk Analysis', () => {

    /**
     * @scenario Navigate to Fraud Risk Analysis
     * @description Opens the Fraud Risk Analysis section and verifies presence of grids and headers
     * @expectedResult Fraud Risk Analysis and Pending Records sections are loaded and headers are visible
     */
    it('Navigates to Fraud Risk Analysis', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
            clientName = data.companyName;
            navigateToNewestClientMenu(clientName);
        });

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
            .contains('Fraud Risk Analysis')
            .click()
            .wait(1000);

        cy.get('#gridClientFraudRiskAnalyzes');
        cy.contains('h1', 'Fraud Risk Analysis');

        cy.get('#gridClientFraudRiskAnalysisRecords');
        cy.contains('h1', 'Fraud Risk Analysis Pending Records');
    });

});

