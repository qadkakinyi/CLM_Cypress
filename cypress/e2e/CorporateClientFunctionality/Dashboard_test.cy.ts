import {navigateToClientMenu} from "../../support/e2e";
describe('Views the Client Dashboard', ()=>{
    it('Checks if the dashboard loads correctly', ()=>{
        
        navigateToClientMenu('Corporate')
        
        cy.contains('Client Behavior Summary').should('be.visible')
        cy.contains('Required Risk Evaluation Profiles').should('be.visible')
        cy.contains('Required Due Diligence Profiles').should('be.visible')
        cy.contains('Case Statuses').scrollIntoView()
        cy.contains('Action Categorizations').scrollIntoView()
        cy.contains('Client Evaluations').scrollIntoView()
        cy.contains('Volume of Transactions & Trades').scrollIntoView()
        
    })
})