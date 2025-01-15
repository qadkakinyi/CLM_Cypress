import {navigateToClientMenu} from "../../support/e2e";

describe('Workflow Task History', ()=>{
    it('Navigates to Workflow Task History', ()=>{
        // Navigate to specific client
        navigateToClientMenu('Corporate')
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Workflow Task History').click().wait(1000);
        cy.get('#gridTaskHistory')
        cy.contains('h1','Workflow Tasks History')
    })
})