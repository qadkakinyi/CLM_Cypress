import {navigateToClientMenu} from "../../support/e2e";

describe('Adhoc Evaluations', ()=>{
    it('Navigates to Adhoc Evaluations Page', ()=>{
        // Navigate to specific client
        navigateToClientMenu('Corporate')
        cy.wait(2000)
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Adhoc Evaluations').click();
        cy.wait(2000)
        cy.contains('h1','Adhoc Evaluations').wait(1000)
    })
})