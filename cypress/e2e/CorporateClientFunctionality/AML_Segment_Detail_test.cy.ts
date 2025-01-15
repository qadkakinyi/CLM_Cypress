import {navigateToClientMenu} from "../../support/e2e";

describe('AML Segment Details', ()=>{
    it('Navigates to AML Segement Page', ()=>{
        // Navigate to specific client
        navigateToClientMenu('Corporate')
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('AML Segment Detail').click();
        cy.wait(1000)
        cy.contains('Aml Segment Details')
    })
})