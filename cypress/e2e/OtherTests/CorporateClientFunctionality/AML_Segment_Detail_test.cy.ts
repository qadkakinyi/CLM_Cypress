import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

describe('AML Segment Details', ()=>{
    it('Navigates to AML Segement Page', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('AML Segment Detail').click();
        cy.wait(1000)
        cy.contains('Aml Segment Details')
    })
})