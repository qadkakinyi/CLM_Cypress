import {filterClientType, navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";
let api_baseUrl = Cypress.env('api_baseUrl')

let location = '';
let clientId = '';
let token = '';
let clientName = '';

/**
 * @testSuite Adhoc Screening - Individual Client
 * @description Tests screening, monitoring, and API interactions for individual clients
 * @priority High
 * @owner QA Team
 * @tags screening, individuals, monitoring
 */
describe('Adhoc Screening Individual Client', ()=>{
    before(()=>{
        // get authorization token
        cy.request({
            method:"POST",
            url:`${api_baseUrl}/token`,
            body:{
                "grant_type": 'password',
                "username": 'systemadmin',
                "password": 'Password1!'
            },
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            }}).then(res=>{
            token = res.body.access_token
        })
        cy.wait(2000)
    })

    /**
     * @scenario UI Person Search
     * @description Perform person search for individual via UI
     * @expectedResult Person search is executed successfully
     */
    it('Performs Person Search Using UI', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
            clientName = data.individualClientName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Screening').click().wait(2000)
        cy.get('.screening-primary-buttons > [icon="search"] > .sa-button').contains('Person Search').click().wait(1000);
        cy.location('pathname').then(path=>{
            location = path
            clientId = path.split('/')[3]
        })

        cy.get('.modal-body').then(body=>{
            if(body.find('#performPersonSearchAcurisForm').length>0){
                // cy.getByFormControlName('fullName').clear().type('Putin')
                cy.getByFormControlName('dateOfBirth').eq(0).clear()
                cy.get('#performPersonSearchAcurisForm [icon="search"] > .sa-button').contains('Search').click()
                cy.waitUntilLoaderDisappears().then(res=>{
                    cy.contains('The person search has been executed.')
                })
            }else if(body.find('#performPersonSearchBridgerForm')){
                cy.get('#performPersonSearchAcurisForm [icon="search"] > .sa-button').contains('Search').click()
                cy.waitUntilLoaderDisappears().then(res=>{
                    cy.contains('The person search has been executed.')
                })
            }
        })
    })

    /**
     * @scenario Enable Person Monitoring
     * @description Starts monitoring and refreshes results
     * @expectedResult Person is added to monitoring list and results refreshed
     */
    it('Performs Person Monitoring and Refreshes Results', ()=>{
        cy.visit(location).wait(4000)
        cy.get('.screening-primary-buttons > [icon="list"] > .sa-button').contains('Person Monitoring').click().wait(1000);
        cy.get('#performPersonMonitoringAcurisForm [icon="save"] > .sa-button').contains('Submit').click().wait(2000);
        cy.contains('The person monitoring has been executed').wait(3500)
        cy.contains('sa-button', 'Refresh Results').click().wait(2000)
        // cy.contains('The monitoring results have been updated')
    })

    /**
     * @scenario Disable Person Monitoring
     * @description Stops person monitoring
     * @expectedResult Client is removed from monitoring list
     */
    it('Removes Person Monitoring', ()=>{
        cy.visit(location).wait(3000)
        cy.get('[icon="times-circle"] > .sa-button').contains('Remove Person Monitoring').click().wait(2000);
        cy.get('#bot2-Msg1').contains('Yes').click().wait(2000);
        cy.contains('Client has been removed from monitoring list')
        // deactivate remove person monitoring button after the client is removed from monitoring
        // deactivate person monitoring when client is added to the monitoring list
    })

    /**
     * @scenario API Person Search - Acuris
     * @description Performs Acuris person search via API
     * @expectedResult Person search executed via API
     */
    it('Performs Person Search Using API - Acuris', ()=>{
        // navigateToClientMenu('Individual')
        cy.visit(location).wait(3000)
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Screening').click().wait(2000)
        cy.location('pathname').then(path=>{
            clientId = path.split('/')[3]
            if(clientId){
                cy.request({
                    method:'POST',
                    url: `${api_baseUrl}/api/clientIndividuals/${clientId}/performPersonSearch`,
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: {
                        "acuris": {
                            "fullName": "Michael King",
                            "dateOfBirth": "",
                            "address": "",
                            "city": "",
                            "country": "",
                            "postcode": "",
                            "threshold": 90
                        }
                    }
                }).wait(2000)
                cy.reload()
            }
        }).wait(2000)
    })

    /**
     * @scenario API Person Search - Bridger
     * @description Performs Bridger person search via API
     * @expectedResult Bridger person search executed via API
     */
    it('Performs Person Search Using API - Bridger', ()=>{
        cy.visit(location).wait(3000)
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Screening').click().wait(2000)
        cy.location('pathname').then(path=>{
            clientId = path.split('/')[3]
            if(clientId){
                cy.request({
                    method:'POST',
                    url: `${api_baseUrl}/api/clientIndividuals/${clientId}/performPersonSearch`,
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: {
                        "bridger": {
                            "firstname": "John",
                            "middlename": "Putin",
                            "lastname": "Doe",
                            "dateOfBirth": "",
                            "addressLine1": "",
                            "addressLine2": "",
                            "city": "",
                            "country": "",
                            "postalCode": "",
                            "idNumber": "12345678",
                            "gender": "",
                            "threshold": 90
                        }
                    }
                }).wait(2000)
                cy.reload()
            }
        }).wait(2000)
    })
})

