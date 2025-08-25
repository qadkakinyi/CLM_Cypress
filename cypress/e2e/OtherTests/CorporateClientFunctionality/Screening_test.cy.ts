import { navigateToClientMenu, navigateToNewestClientMenu } from "../../../support/e2e";

/**
 * @testSuite Screening - Corporate
 * @description Ensures navigation to the Screening (Negative Lists) page for corporate clients
 * @priority Medium
 * @owner QA Team
 * @tags screening, corporate, navigation
 * @dependencies client_corporate.json
 */

describe('Screening', () => {

    /**
     * @scenario Navigate to Screening Page
     * @description Navigates to the Screening page and ensures it loads without errors
     * @expectedResult The Negative Lists page is displayed and no error appears
     */
    it('Navigates to Screening Page', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
            .contains('Screening')
            .scrollIntoView()
            .click();

        cy.wait(1000);
        cy.contains('h1', 'Negative Lists');
        cy.contains('Unexpected Error').should('not.exist');
    })
})

