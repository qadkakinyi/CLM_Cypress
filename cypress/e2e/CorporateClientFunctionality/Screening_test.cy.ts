import {navigateToClientMenu} from "../../support/e2e";

describe('Screening', ()=>{
    it('Navigates to Screening Page', ()=>{
        // Navigate to specific client
        navigateToClientMenu('Corporate')
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Screening').scrollIntoView().click();
        cy.wait(1000)
        cy.contains('h1','Negative Lists')
        cy.contains('Unexpected Error').should('not.exist')
    })
})