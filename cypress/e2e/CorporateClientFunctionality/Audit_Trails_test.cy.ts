import {navigateToClientMenu} from "../../support/e2e";

describe('System logs', ()=>{
    it('Navigates to system logs', ()=>{
        // Navigate to specific client
        navigateToClientMenu('Corporate')
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Audit Trail').click().wait(1000);
        cy.get('#gridAuditLog')
        cy.contains('h1','Logs');
        cy.wait(1000)
        
        //view external audit trails
        cy.contains('External Audit Trails').click().wait(1000)
        
        //view onboarding audit trails
        cy.contains('Onboarding Audit Trails').click().wait(1000)
    })
})