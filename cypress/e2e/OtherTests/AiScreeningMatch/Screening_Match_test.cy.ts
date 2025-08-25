import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let api_url = Cypress.env('api_baseUrl');

/**
 * @testSuite AI Screening butterfly screening processor
 * @description Performs person screening for individual client and triggers the Butterfly Screening scheduled job via Hangfire dashboard.
 * @priority Medium
 * @owner QA Team
 * @tags regression, screening, acuris, hangfire, scheduled-jobs
 * @dependencies client_individual.json, user-authentication, API access to /hangfire
 * @fileDescription Combines UI-based person screening test and backend processor validation via Hangfire job
 */

/**
 * @suite Acuris Screening and Butterfly Processor Job
 * @description Tests performing person search screening and ensures the scheduled job executes via the admin panel
 * @prerequisites Client individual should already exist and be saved to fixture
 * @testData Client name from fixture and search input for Acuris
 */
describe('Screening and Triggering butterfly screening processor Scheduled Job ', () => {

    /**
     * @scenario Perform Person Screening
     * @description Navigates to individual client's screening section and performs a person search through active provider
     * @priority Medium
     * @testData Reads individualClientName from cypress/fixtures/client_individual.json and uses 'William Ruto' for search
     * @steps Read client name from fixture
     * @steps Navigate to client's Screening tab
     * @steps Trigger screening process
     * @steps Conditionally interact with popups or forms if present
     * @expectedResult Person screening search is performed and confirmation message is shown
     */
    it('Performs Person Screening', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_individual.json').then((data) => {
            clientName = data.individualClientName;
            navigateToNewestClientMenu(clientName);
        });

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
            .contains('Screening').scrollIntoView().click();
        cy.wait(1000);

        cy.get('.screening-primary-buttons > [icon="search"]').click().wait(1500);

        cy.get('body').then($body => {
            if ($body.find('.MessageBoxMiddle').length > 0) {
                cy.get('#bot2-Msg1').click().wait(2000);
            }
        });

        cy.get('.modal-body').then($body => {
            if ($body.find('#performPersonSearchAcurisForm').length > 0) {
                cy.get('#performPersonSearchAcurisForm [formcontrolname="fullName"]').clear().type('William Ruto');
                cy.contains('#performPersonSearchAcurisForm sa-button', 'Search').click().wait(2000);
                cy.contains('The person search has been executed.');
            }
        });
    });

    /**
     * @scenario Trigger Butterfly Screening Job
     * @description Logs into Hangfire dashboard and triggers the Butterfly Screening Processor scheduled job
     * @priority Medium
     * @steps Visit the /hangfire/recurring endpoint
     * @steps Find and click on the Butterfly Screening Processor job
     * @steps Click 'Trigger now' and validate execution
     * @expectedResult Scheduled job is executed successfully with visual confirmation
     */
    it('should trigger Butterfly Screening Processor job', () => {
        cy.visit(`${api_url}/hangfire/recurring?from=0&count=100`).wait(2000);

        cy.origin('https://complytek-testing-hotfix-api.regtek.co', () => {
            cy.contains('Executor.RecurringButterflyScreeningProcessor').scrollIntoView().click().wait(500);
            cy.contains('button', 'Trigger now').scrollIntoView().click();
            cy.contains('a few seconds ago');
        });
    });

});

