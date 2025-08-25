import { navigateToClientMenu, navigateToNewestClientMenu } from "../../../support/e2e";

/**
 * @testSuite AML Segment Details - Corporate
 * @description Validates access to the AML Segment Detail section for a corporate client
 * @priority Low
 * @owner QA Team
 * @tags aml, navigation, client-profile
 * @dependencies client_corporate.json
 */

describe('AML Segment Details', () => {

    /**
     * @scenario Navigate to AML Segment Detail
     * @description Navigates to the AML Segment Detail tab from the client profile
     * @expectedResult The page displays the heading "Aml Segment Details"
     */
    it('Navigates to AML Segment Page', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
            clientName = data.companyName;
            navigateToNewestClientMenu(clientName);
        });

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
            .contains('AML Segment Detail').click();
        cy.wait(1000);
        cy.contains('Aml Segment Details');
    });

});

