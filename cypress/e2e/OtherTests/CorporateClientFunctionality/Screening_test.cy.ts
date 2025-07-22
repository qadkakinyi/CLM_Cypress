import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

describe('Screening', ()=>{
    it('Navigates to Screening Page', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Screening').scrollIntoView().click();
        cy.wait(1000)
        cy.contains('h1','Negative Lists')
        cy.contains('Unexpected Error').should('not.exist')
    })
})