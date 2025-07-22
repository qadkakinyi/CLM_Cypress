import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let location = ''
describe('Screening History', ()=>{
    it('Navigates to Screening Page', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Internal Screening').scrollIntoView().click();
        cy.wait(2000)
        cy.contains('h1','Internal Screening').wait(1000)

        cy.location('pathname').then((loc)=>{
            location = loc
        })

    })
    
})