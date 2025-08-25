import { navigateToClientMenu, navigateToNewestClientMenu } from "../../../support/e2e";

let location = ''

/**
 * @testSuite Screening History - Corporate
 * @description Verifies navigation to the Internal Screening page for corporate clients
 * @priority Medium
 * @owner QA Team
 * @tags screening, navigation, corporate
 * @dependencies client_corporate.json
 */

describe('Screening History', () => {

    /**
     * @scenario Navigate to Internal Screening
     * @description Navigates to the Internal Screening section of the corporate client profile
     * @expectedResult The Internal Screening page is displayed successfully
     */
    it('Navigates to Screening Page', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
            .contains('Internal Screening')
            .scrollIntoView()
            .click();

        cy.wait(2000);
        cy.contains('h1', 'Internal Screening').wait(1000);

        cy.location('pathname').then((loc) => {
            location = loc;
        })
    })

});

