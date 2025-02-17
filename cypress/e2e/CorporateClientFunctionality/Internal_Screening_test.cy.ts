import {navigateToClientMenu} from "../../support/e2e";

let location = ''
describe('Screening History', ()=>{
    it('Navigates to Screening Page', ()=>{
        // Navigate to specific client
        navigateToClientMenu('Corporate')
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('Internal Screening').scrollIntoView().click();
        cy.wait(2000)
        cy.contains('h1','Internal Screening').wait(1000)

        cy.location('pathname').then((loc)=>{
            location = loc
        })

    })
    
})