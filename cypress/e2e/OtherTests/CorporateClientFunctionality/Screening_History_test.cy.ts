import { navigateToClientMenu, navigateToNewestClientMenu } from "../../../support/e2e";

/**
 * @testSuite Screening History - Corporate
 * @description Verifies navigation to the Screening History (Negative Lists History) section for corporate clients
 * @priority Medium
 * @owner QA Team
 * @tags screening, navigation, corporate
 * @dependencies client_corporate.json
 */

describe('Screening History', () => {

    /**
     * @scenario Navigate to Screening History
     * @description Navigates to the Screening History section of the corporate client profile
     * @expectedResult The Negative Lists History page is displayed successfully
     */
    it('Navigates to Screening Page', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
            .contains('Screening History')
            .scrollIntoView()
            .click();

        cy.wait(1000);
        cy.contains('h1', 'Negative Lists History')
    })
})

