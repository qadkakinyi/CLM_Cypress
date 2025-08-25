/**
 * @testSuite Restore Archived Client
 * @description Validates that an archived client can be restored via UI after being soft-deleted through the API, and that their dashboard becomes accessible again.
 * @priority Medium
 * @owner QA Team
 * @tags regression, api, processes, profiles, archive-restore
 * @dependencies cypress, navigateToNewestClientMenu, client_individual.json, env.api_baseUrl
 * @fileDescription Test flow: acquire API token → archive client via API → restore client through Handle Profiles → navigate to client dashboard and verify availability.
 */

//This baseUrl has to be from this environment. it does not work with the complytek hotfix
import {navigateToNewestClientMenu} from "../../../support/e2e";

let api_baseUrl = Cypress.env('api_baseUrl')
let token = ''
let archivedClient;

describe('Restore archived client', () => {

    /**
     * @scenario Authenticate for API Calls
     * @description Fetches an OAuth token to authorize subsequent API requests.
     * @priority Medium
     * @steps POST {api_baseUrl}/token with systemadmin credentials → store access_token in `token`.
     * @expectedResult Token is retrieved successfully for use in API requests.
     */
    before(() => {
        //get authorization token
        cy.request({
            method: "POST",
            url: `${api_baseUrl}/token`,
            body: {
                "grant_type": 'password',
                "username": 'systemadmin',
                "password": 'Password1!'
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res => {
            token = res.body.access_token
        })
    })

    /**
     * @scenario Archive Client via API
     * @description Soft-deletes the target client using the API and validates the response.
     * @priority Medium
     * @steps Read clientId from fixture → DELETE /api/clientCommon/{clientId}/soft with bearer token → assert 200 and body equals clientId.
     * @expectedResult Client is archived successfully.
     */
    it('Archives the client', () => {
        let client_id;
        cy.readFile('cypress/fixtures/client_individual.json').then((data) => {
            client_id = data.clientId

            cy.request({
                method: "DELETE",
                url: `${api_baseUrl}/api/clientCommon/${client_id}/soft`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                console.log(res)
                expect(res.status).to.eq(200)
                expect(res.body).to.eq(Number(client_id))
            })
        })

    })

    /**
     * @scenario Restore Archived Client and Open Dashboard
     * @description Restores the archived profile from the Handle Profiles page and navigates to the client’s dashboard to confirm access.
     * @priority Medium
     * @steps Visit /processes/handle-profiles → enable Advanced Filter and Include Archived → Search → select client row → Restore Profiles → confirm success → navigate to newest client → assert dashboard loads.
     * @expectedResult Restoration success message appears and client dashboard is accessible (no "Client not found").
     */
    it('Restores and archived client access their dashboard', () => {

        cy.visit('/processes/handle-profiles').wait(2000)
        let client_name;
        cy.readFile('cypress/fixtures/client_individual.json').then((data) => {
            client_name = data.individualClientName

            cy.contains('Advanced Filter').click().wait(1000);
            cy.getByFormControlName('includeArchived').check();
            cy.contains('.grid-advance-filters-footer sa-button', 'Search').click().wait(2000);
            cy.get('[aria-colindex="6"] .dx-texteditor-input-container > .dx-texteditor-input').click().clear().type(client_name).wait(3000);
            cy.get('.dx-data-row .dx-checkbox-container > .dx-checkbox-icon').eq(1).click();
            cy.contains('sa-button[icon="user-cog"]', 'Restore Profiles').click();
            cy.get('#restoreProfilesForm [icon="save"]').click().wait(1500);
            cy.contains('The selected profiles have been restored')
            navigateToNewestClientMenu(client_name)
            cy.get('body').should('not.contain', 'Client not found');
        })
    })
})

