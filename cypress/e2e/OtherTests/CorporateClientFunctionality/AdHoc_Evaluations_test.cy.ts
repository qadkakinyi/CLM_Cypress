import { navigateToClientMenu, navigateToNewestClientMenu } from "../../../support/e2e";

/**
 * @testSuite Adhoc Evaluations - Corporate
 * @description Validates navigation to the Adhoc Evaluations section for a corporate client
 * @priority Low
 * @owner QA Team
 * @tags evaluation, navigation, client-profile
 * @dependencies client_corporate.json
 */

describe('Adhoc Evaluations', () => {

    /**
     * @scenario Navigate to Adhoc Evaluations
     * @description Opens the Adhoc Evaluations tab from the corporate client profile
     * @expectedResult The page header "Adhoc Evaluations" is visible
     */
    it('Navigates to Adhoc Evaluations Page', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
            clientName = data.companyName;
            navigateToNewestClientMenu(clientName);
        });

        cy.wait(2000);
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
            .contains('Adhoc Evaluations').click();
        cy.wait(2000);
        cy.contains('h1', 'Adhoc Evaluations').wait(1000);
    });

});

