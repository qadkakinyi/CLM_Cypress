import { navigateToNewestClientMenu } from "../../../support/e2e";

/**
 * @testSuite Electronic Identification - Corporate
 * @description Tests the loading and visibility of the Electronic Identifications page for a corporate client
 * @priority Low
 * @owner QA Team
 * @tags electronic-identification, ui, navigation
 * @dependencies client_corporate.json
 */

describe('Electronic Identification', () => {

    /**
     * @scenario Load Electronic Identification Page
     * @description Navigates to the Electronic Identification tab of a corporate client and checks if it loads correctly
     * @expectedResult Electronic Identifications page is visible with header
     */
    it('Checks if the Identity verifications page loads', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
            clientName = data.companyName;
            navigateToNewestClientMenu(clientName);
        });

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
            .contains('span', 'Electronic Identification')
            .click()
            .wait(1000);

        cy.contains('h1', 'Electronic Identifications').scrollIntoView();
    });

});

