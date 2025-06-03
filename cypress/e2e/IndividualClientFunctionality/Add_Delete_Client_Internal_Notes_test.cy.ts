import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../support/e2e";

let tin = faker.string.alphanumeric(12);

let client_id = ''

describe('Add, Delete Client Internal Notes', () => {
  it('Add Client Internal Notes', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
      clientName = data.individualClientName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Internal Notes').click();

    // Add new Client Internal Notes
    cy.location('pathname').then((pathname)=>{
      const pathSections = pathname.split('/');
      client_id = pathSections[3]
    })
    cy.get('.chat-footer textarea[name="chat-input"]').type(faker.lorem.sentence());
    cy.getBySel('saveChatText').click();
  });

  it('Delete client Internal Notes', () => {
    // delete tax Internal Notes
    cy.visit(`/main/client-individual/${client_id}/1/individual-internal-notes`).wait(2000)
    cy.getBySel('deleteInternalNote').last().should('be.visible').click({ force: true }).wait(1000);
    cy.get('#bot2-Msg1').contains('Yes').last().click();
  });
})
