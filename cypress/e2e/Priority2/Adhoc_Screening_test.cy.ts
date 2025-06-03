import {filterClientType, navigateToClientMenu, navigateToNewestClientMenu} from "../../support/e2e";
let api_baseUrl = Cypress.env('api_baseUrl')

let location = '';
let clientId = '';
let token = '';
let clientName = '';

describe('Adhoc Screening Individual Client', ()=>{
    before(()=>{
        //get authorization token
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
        // cy.getByFormControlName('fullName').clear().type('Putin')
        cy.getByFormControlName('dateOfBirth').eq(0).clear()
        cy.get('#performPersonSearchAcurisForm [icon="search"] > .sa-button').contains('Search').click().wait(6000);
        cy.contains('The person search has been executed.')
        cy.wait(2000)
    })
    
    it('Performs Person Monitoring and Refreshes Results', ()=>{
        cy.visit(location).wait(4000)
        cy.get('.screening-primary-buttons > [icon="list"] > .sa-button').contains('Person Monitoring').click().wait(1000);
        cy.get('#performPersonMonitoringAcurisForm [icon="save"] > .sa-button').contains('Submit').click().wait(2000);
        cy.contains('The person monitoring has been executed').wait(3500)
        cy.contains('sa-button', 'Refresh Results').click().wait(2000)
        // cy.contains('The monitoring results have been updated')
    })

    it('Removes Person Monitoring', ()=>{
        cy.visit(location).wait(3000)
        cy.get('[icon="times-circle"] > .sa-button').contains('Remove Person Monitoring').click().wait(2000);
        cy.get('#bot2-Msg1').contains('Yes').click().wait(2000);
        cy.contains('Client has been removed from monitoring list')
        // deactivate remove person monitoring button after the client is removed from monitoring
        // deactivate person monitoring when client is added to the monitoring list
    })
    
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

describe('Adhoc Screening Corporate Client', ()=>{

    it('Performs Business Search Using UI', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Screening').click().wait(2000)

        cy.get('.screening-primary-buttons > [icon="search"] > .sa-button').contains('Business Search').click().wait(1000);
        cy.location('pathname').then(path=>{
            location = path
            clientId = path.split('/')[3]
        })
        // cy.contains('button', 'I Understand').click().wait(2000)
        cy.get('.modal-body form [icon="search"] > .sa-button').contains('Search').click().wait(3000);
        cy.contains('The business search has been executed.')
        cy.wait(2000)
    })

    it('Performs Business Monitoring and Refreshes results', ()=>{
        cy.visit(location).wait(4000)
        cy.get('.screening-primary-buttons > [icon="list"] > .sa-button').contains('Business Monitoring').click().wait(1000);
        cy.get('form [icon="save"] > .sa-button').contains('Submit').click().wait(2000);
        cy.contains('The business monitoring has been executed').wait(3500) //some clients are already in the monitoring list and this assertion makes them error out
        cy.contains('sa-button', 'Refresh Results').click().wait(2000)
        cy.contains('The monitoring results have been updated')
    })

    it('Removes Business Monitoring', ()=>{
        cy.visit(location).wait(5000)
        cy.get('[icon="times-circle"] > .sa-button').contains('Remove Business Monitoring').click({force:true}).wait(1000);
        cy.get('#bot2-Msg1').contains('Yes').click().wait(2000);
        cy.contains('Client has been removed from monitoring list')
        // deactivate remove business monitoring button after the client is removed from monitoring
        // deactivate business monitoring when client is added to the monitoring list
    })

    it('Performs Business Search Using API - Acuris', ()=>{
        // navigateToClientMenu('Corporate')
        cy.visit(location).wait(5000)
        cy.wait(2000)
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Screening').click().wait(2000)
        cy.get('.client-name > h2').invoke('text').then((text)=>{
            clientName = text.trim()
        })
        cy.location('pathname').then(path=>{
            clientId = path.split('/')[3]
            if(clientId){
                cy.request({
                    method:'POST',
                    url: `${api_baseUrl}/api/clientCorporates/${clientId}/performBusinessSearch`,
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: {
                        "acuris": {
                            "businessName": clientName,
                            "address": "",
                            "city": "",
                            "country": "",
                            "postalCode": "",
                            "threshold": 90
                        }

                    }
                }).wait(2000)
                cy.reload()
            }
        }).wait(2000)

    })

    it('Performs Business Search Using API - Bridger', ()=>{
        // navigateToClientMenu('Corporate')
        cy.visit(location).wait(5000)
        cy.wait(2000)
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Screening').click().wait(2000)
        cy.get('.client-name > h2').invoke('text').then((text)=>{
            clientName = text.trim()
        })
        cy.location('pathname').then(path=>{
            clientId = path.split('/')[3]
            if(clientId){
                cy.request({
                    method:'POST',
                    url: `${api_baseUrl}/api/clientCorporates/${clientId}/performBusinessSearch`,
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: {
                        "bridger": {
                            "businessName": clientName,
                            "addressLIne1": "",
                            "addressLIne2": "",
                            "city": "",
                            "postalCode": "",
                            "country": "",
                            "idNUmber": "",
                            "threshold": 90
                        }

                    }
                }).wait(2000)
                cy.reload()
            }
        }).wait(2000)

    })
})