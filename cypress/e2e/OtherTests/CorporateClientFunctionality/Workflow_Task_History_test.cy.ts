import { navigateToClientMenu, navigateToNewestClientMenu } from "../../../support/e2e";

/**
 * @testSuite Workflow Task History - Corporate
 * @description Validates that the Workflow Task History page loads correctly for corporate clients
 * @priority Low
 * @owner QA Team
 * @tags workflow, history, navigation
 * @dependencies client_corporate.json
 */

describe('Workflow Task History', () => {

    /**
     * @scenario Navigate to Workflow Task History
     * @description Navigates to the Workflow Task History page from a corporate client profile
     * @expectedResult The grid and header are visible on the page
     */
    it('Navigates to Workflow Task History', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
            .contains('Workflow Task History')
            .click()
            .wait(1000);

        cy.get('#gridTaskHistory')
        cy.contains('h1', 'Workflow Tasks History')
    })
})

