import {navigateToClientMenu, navigateToNewestClientMenu} from "../../support/e2e";

describe('Adhoc Evaluations', ()=>{
    it('Navigates to Adhoc Evaluations Page', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })
        cy.wait(2000)
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Adhoc Evaluations').click();
        cy.wait(2000)
        cy.contains('h1','Adhoc Evaluations').wait(1000)
    })
})