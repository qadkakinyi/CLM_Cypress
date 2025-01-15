import {navigateToClientMenu} from "../../support/e2e";

let client_id = '';

describe('Edit Client Individual Profile', () => {
  it('Edit Individual Profile', () => {
    // Click on Know your Clients navigation item
    navigateToClientMenu('Individual')

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a>span').eq(1).contains('Profile');
    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').eq(1).click();

    cy.get('#editProfileForm input[name="middleName"]').type(Cypress._.random(0, 1e6).toString());

    cy.get('#saveIndividualProfile').click();

    //get the current client id
    cy.location('pathname').then((pathname)=>{
      const pathSections = pathname.split('/');
      client_id = pathSections[3]
    })

    cy.wait(1000);
  })

  it('Archives a client', ()=>{
    cy.visit(`/main/client-individual/${client_id}/1/profile`).wait(2000)
    
    cy.get('[icon="archive"] > .sa-button > .text').click();
    cy.get('#bot2-Msg1').click();
  })
})
