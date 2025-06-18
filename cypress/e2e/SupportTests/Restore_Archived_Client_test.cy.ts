//This baseUrl has to be from this environment. it does not work with the complytek hotfix
import {navigateToNewestClientMenu} from "../../support/e2e";

let api_baseUrl = Cypress.env('api_baseUrl')
let token = ''
let archivedClient;
describe('Restore archived client', () => {
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