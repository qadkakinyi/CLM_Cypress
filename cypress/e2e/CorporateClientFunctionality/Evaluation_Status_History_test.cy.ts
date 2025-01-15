import {navigateToClientMenu} from "../../support/e2e";

describe('Evaluation Status History', ()=>{
    it('Navigates to Evaluation Status History Page', ()=>{
        // Navigate to specific client
        navigateToClientMenu('Corporate')
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Evaluation Status History').click();
        cy.wait(1000)
        cy.contains('h1','Evaluation Status History')
    })
})