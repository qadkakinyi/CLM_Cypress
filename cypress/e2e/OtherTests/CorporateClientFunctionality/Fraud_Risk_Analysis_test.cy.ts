import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

describe('Fraud Risk Analysis', ()=>{
    it('Navigates to Fraud Risk Analysis', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Fraud Risk Analysis').click().wait(1000);
        cy.get('#gridClientFraudRiskAnalyzes')
        cy.contains('h1','Fraud Risk Analysis');
        cy.get('#gridClientFraudRiskAnalysisRecords')
        cy.contains('h1','Fraud Risk Analysis Pending Records')
    })
})