import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let api_url= Cypress.env('api_baseUrl')

describe('Screening and Triggering butterfly screening processor Scheduled Job ', ()=>{
    it('Performs Person  Screening', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
            clientName = data.individualClientName
            navigateToNewestClientMenu(clientName)
        })
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Screening').scrollIntoView().click();
        cy.wait(1000)

        cy.get('.screening-primary-buttons > [icon="search"]').click().wait(1500)

        cy.get('body').then($body=>{
            if ($body.find('.MessageBoxMiddle').length > 0){
                cy.get('#bot2-Msg1').click().wait(2000)
            }
        })
        
        cy.get('.modal-body').then($body=>{
            if ($body.find('#performPersonSearchAcurisForm').length > 0){
                cy.get('#performPersonSearchAcurisForm [formcontrolname="fullName"]').clear().type('William Ruto')
                cy.contains('#performPersonSearchAcurisForm sa-button', 'Search').click().wait(2000)
                cy.contains('The person search has been executed.')
            }
            
        })
    })

    it('should trigger Butterfly Screening Processor job', () => {
        cy.visit(`${api_url}/hangfire/recurring?from=0&count=100`).wait(2000)
        
        cy.origin('https://complytek-testing-hotfix-api.regtek.co', () => {
            cy.contains('Executor.RecurringButterflyScreeningProcessor').scrollIntoView().click().wait(500)
            cy.contains('button', 'Trigger now').scrollIntoView().click()
            cy.contains('a few seconds ago')
        })
    });
})