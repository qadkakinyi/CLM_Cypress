import {navigateToClientMenu} from "../../support/e2e";

let location = '';
let clientId = '';
let token = '';
let clientName = '';

before(()=>{
    //get authorization token
    cy.request({
        method:"POST",
        url:'https://complytek-testing-api.regtek.co/token',
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
})

describe('Adhoc Screening Individual Client', ()=>{

    it('Performs Person Search Using UI', ()=>{
        navigateToClientMenu('Individual')
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Screening').click().wait(2000)
        
        cy.get('.screening-primary-buttons > [icon="search"] > .sa-button').contains('Person Search').click().wait(1000);
        cy.location('pathname').then(path=>{
            location = path
            clientId = path.split('/')[3]
        })
        cy.getByFormControlName('fullName').clear().type('Putin')
        cy.getByFormControlName('dateOfBirth').eq(0).clear()
        cy.get('#performPersonSearchAcurisForm [icon="search"] > .sa-button').contains('Search').click().wait(2000);
        cy.contains('The person search has been executed.')
        cy.wait(2000)
    })
    
    it('Performs Person Monitoring and Refreshes Results', ()=>{
        cy.visit(location).wait(2000)
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
    
    it('Performs Person Search Using API', ()=>{
        navigateToClientMenu('Individual')
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Screening').click().wait(2000)
        cy.location('pathname').then(path=>{
            clientId = path.split('/')[3]
            if(clientId){
                cy.request({
                    method:'POST',
                    url: `https://complytek-testing-api.regtek.co/api/clientIndividuals/${clientId}/performPersonSearch`,
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: {
                        "acuris": {
                            "fullName": "Putin",
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
})

describe('Adhoc Screening Corporate Client', ()=>{

    it('Performs Business Search Using UI', ()=>{
        navigateToClientMenu('Corporate')
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Screening').click().wait(2000)

        cy.get('.screening-primary-buttons > [icon="search"] > .sa-button').contains('Business Search').click().wait(1000);
        cy.location('pathname').then(path=>{
            location = path
            clientId = path.split('/')[3]
        })
        // cy.contains('button', 'I Understand').click().wait(2000)
        cy.get('form [icon="search"] > .sa-button').contains('Search').click().wait(2000);
        cy.contains('The business search has been executed.')
        cy.wait(2000)
    })

    it('Performs Business Monitoring and Refreshes results', ()=>{
        cy.visit(location).wait(2000)
        cy.get('.screening-primary-buttons > [icon="list"] > .sa-button').contains('Business Monitoring').click().wait(1000);
        cy.get('form [icon="save"] > .sa-button').contains('Submit').click().wait(2000);
        cy.contains('The business monitoring has been executed').wait(3500)
        cy.contains('sa-button', 'Refresh Results').click().wait(2000)
        cy.contains('The monitoring results have been updated')
    })

    it('Removes Business Monitoring', ()=>{
        cy.visit(location).wait(3000)
        cy.get('[icon="times-circle"] > .sa-button').contains('Remove Business Monitoring').click({force:true}).wait(1000);
        cy.get('#bot2-Msg1').contains('Yes').click().wait(2000);
        cy.contains('Client has been removed from monitoring list')
        // deactivate remove business monitoring button after the client is removed from monitoring
        // deactivate business monitoring when client is added to the monitoring list
    })

    it('Performs Business Search Using API', ()=>{
        navigateToClientMenu('Corporate')
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Screening').click().wait(2000)
        cy.get('.client-name > h2').invoke('text').then((text)=>{
            clientName = text.trim()
        })
        cy.location('pathname').then(path=>{
            clientId = path.split('/')[3]
            if(clientId){
                cy.request({
                    method:'POST',
                    url: `https://complytek-testing-api.regtek.co/api/clientCorporates/${clientId}/performBusinessSearch`,
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
})