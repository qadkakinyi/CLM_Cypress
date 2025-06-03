import {navigateToClientMenu, navigateToNewestClientMenu} from "../../support/e2e";

describe('Certificates', ()=>{
    it('Navigates to Certificate Page', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Certificates').click();
        cy.wait(1000)
        cy.get('#gridClientCertificates')
        cy.contains('h1','Certificates')
    })
})