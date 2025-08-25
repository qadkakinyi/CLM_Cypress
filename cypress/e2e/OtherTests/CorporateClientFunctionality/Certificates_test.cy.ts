import { navigateToClientMenu, navigateToNewestClientMenu } from "../../../support/e2e";

/**
 * @testSuite Certificates - Corporate
 * @description Verifies that the Certificates page is accessible for a corporate client
 * @priority Low
 * @owner QA Team
 * @tags certificates, navigation, client-profile
 * @dependencies client_corporate.json
 */

describe('Certificates', () => {

    /**
     * @scenario Navigate to Certificates Page
     * @description Navigates to the Certificates section of a corporate client profile
     * @expectedResult Certificates grid is displayed and page header is visible
     */
    it('Navigates to Certificate Page', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
            clientName = data.companyName;
            navigateToNewestClientMenu(clientName);
        });

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
            .contains('Certificates').click();
        cy.wait(1000);
        cy.get('#gridClientCertificates');
        cy.contains('h1', 'Certificates');
    });

});

