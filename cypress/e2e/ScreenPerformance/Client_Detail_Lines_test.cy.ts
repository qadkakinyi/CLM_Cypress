import {navigateToClientMenu} from "../../support/e2e";

describe('Client Detail Lines Performance', ()=>{
    it('should navigate to each client detail line within 10 seconds', () => {
        // Click on Know your Clients navigation item
        navigateToClientMenu('Individual')

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').each((el, index, list)=>{
            cy.wrap(el).click();
            //expect loader to exist
            cy.get('.sk-ball-spin-clockwise')
            cy.wait(2000)
            // after this 2 seconds the data should have loades and spinner should not be visible
            cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
        })
    });
})