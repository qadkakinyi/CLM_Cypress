import {navigateToClientMenu} from "../../../support/e2e";

describe('Navigate through Client individual detail lines', () => {
  it('Client Individual Detail Lines', () => {
    // Click on Know your Clients navigation item
    navigateToClientMenu('Individual')

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').each((el, index, list)=>{
      cy.wrap(el).click();
      cy.wait(2000)
    })

  })
})
