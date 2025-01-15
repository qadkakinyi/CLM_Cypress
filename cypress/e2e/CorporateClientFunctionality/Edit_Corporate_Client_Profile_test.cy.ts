import {navigateToClientMenu} from "../../support/e2e";
import {faker} from "@faker-js/faker";

let corporate_id = '';

describe('Edit Corporate Client Profile', () => {
  it('Edit Corporate Profile', () => {
    // Navigate to specific client
    navigateToClientMenu('Corporate')
    
    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a>span').eq(1).contains('Profile');
    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').eq(1).click();

    cy.get('#editProfileForm input[name="phone"]').clear().type(faker.string.numeric(10));

    cy.get('sa-button').contains('Save').click();

    //get the current client id
    cy.location('pathname').then((pathname)=>{
      const pathSections = pathname.split('/');
      corporate_id = pathSections[3]
    })
    
    // check if tree structure is visible
    cy.contains('Tree Structure').should('be.visible')

    cy.wait(1000);
  })

  it.skip('Archives a client', ()=>{
    cy.visit(`/main/client-individual/${corporate_id}/1/profile`)

    // cy.get('.dx-datagrid-content-fixed > .dx-datagrid-table > tbody > [aria-rowindex="1"] > .dx-command-edit > span > .dx-template-wrapper > .dx-link > .fa').click();
    // cy.get('a.ng-tns-c463-199 > .ng-trigger').click();
    cy.get('[icon="archive"] > .sa-button > .text').click();
    cy.get('#bot2-Msg1').click();
  })
  

})
