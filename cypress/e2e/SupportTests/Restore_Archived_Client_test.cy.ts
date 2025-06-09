//This baseUrl has to be from this environment. it does not work with the complytek hotfix
import {navigateToNewestClientMenu} from "../../support/e2e";

let api_baseUrl = `https://complytek-testing-api.regtek.co`
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
            })
        })

    })

    it('Selects one archived corporate client via API', () => {

        let client_id;
        cy.readFile('cypress/fixtures/client_individual.json').then((data) => {
            client_id = data.clientId
            cy.request({
                method: "PUT",
                url: `${api_baseUrl}/api/staging/clientIndividual`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: {
                    "clientId": client_id,
                    "registeredName": "Test Archive Client ",
                    "registrationNumber": "ZTys0YdzlNcQ6",
                    "clientStatusId": 8, //active
                    "isClient": false,
                    "externalReference": "ZS0LDJb2G4wcE",
                    "ignoreAutoOngoingMonitoringStatus": true,
                    "defaultFullStructureEvaluation": 1,
                    "regulationGroupId": 1,
                    "isArchived": false,
                    "isDeleted": false,
                    "authorisedCapital": "50000"
                }
            }).then(res => {
                console.log(res)
            })
            cy.request({
                method: "POST",
                url: `${api_baseUrl}/api/paging/clients`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: {
                    'skip': 0,
                    'take': 50
                }
            }).then(res => {
                // console.log(res.body.data)
                archivedClient = res.body.data.find(client => client.clientType == 2 && client.id == 542)
                console.log(archivedClient)
            })
        })
    })

})