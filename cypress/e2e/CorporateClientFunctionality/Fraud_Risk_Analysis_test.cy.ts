import {navigateToClientMenu} from "../../support/e2e";

describe('Fraud Risk Analysis', ()=>{
    it('Navigates to Fraud Risk Analysis', ()=>{
        // Navigate to specific client
        navigateToClientMenu('Corporate')
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Fraud Risk Analysis').click().wait(1000);
        cy.get('#gridClientFraudRiskAnalyzes')
        cy.contains('h1','Fraud Risk Analysis');
        cy.get('#gridClientFraudRiskAnalysisRecords')
        cy.contains('h1','Fraud Risk Analysis Pending Records')
    })
})