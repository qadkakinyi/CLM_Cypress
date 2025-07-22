import {filterClientType, navigateToClientMenu, navigateToNewestClientMenu} from "../../support/e2e";

describe('Views the Individual Client Dashboard', ()=>{
    it('Checks if the dashboard loads correctly', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
            clientName = data.individualClientName
            navigateToNewestClientMenu(clientName)
        })
        
        cy.contains('Electronic Verification Statuses').should('be.visible')
        cy.contains('Client Behavior Summary').should('be.visible')
        cy.contains('Risk Results').should('be.visible')
        cy.contains('Risk & KYC Assessments').scrollIntoView()
        cy.contains('Client Behavior Summary').scrollIntoView()
        cy.contains('Case Statuses').scrollIntoView()
        cy.contains('Action Categorizations').scrollIntoView()
        cy.contains('Client Evaluations').scrollIntoView()
        cy.contains('Volume of Transactions & Trades').scrollIntoView()
        
    })
})