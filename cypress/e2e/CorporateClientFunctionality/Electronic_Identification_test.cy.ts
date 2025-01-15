import {navigateToClientMenu} from "../../support/e2e";
describe('Electronic Identification', ()=>{
    it('Checks if the Identity verifications page loads', ()=>{
        
        cy.visit('/main/clients')
        
        cy.get('#gridClients table tr td .dx-header-filter-indicator').eq(0).click();
        
        //filter by corporate
        navigateToClientMenu('Corporate')

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Electronic Identification').click().wait(1000);
        
        cy.contains('h1','Electronic Identifications').should('be.visible')
        
    })
})