import { navigateToClientMenu, navigateToNewestClientMenu } from "../../../support/e2e";

/**
 * @testSuite Evaluation Status History - Corporate
 * @description Verifies navigation to the Evaluation Status History page for a corporate client
 * @priority Low
 * @owner QA Team
 * @tags evaluation-status-history, navigation, ui
 * @dependencies client_corporate.json
 */

describe('Evaluation Status History', () => {

    /**
     * @scenario Load Evaluation Status History
     * @description Navigates to the Evaluation Status History tab for a corporate client
     * @expectedResult Evaluation Status History page is loaded and header is visible
     */
    it('Navigates to Evaluation Status History Page', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
            clientName = data.companyName;
            navigateToNewestClientMenu(clientName);
        });

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
            .contains('Evaluation Status History')
            .click();

        cy.wait(1000);
        cy.contains('h1', 'Evaluation Status History');
    });

});

