import { faker } from "@faker-js/faker";
import {navigateToClientMenu} from "../../support/e2e";

let tin = faker.string.alphanumeric(12);

let location = ''

describe('Add, Delete Client Internal Notes - Corporate', () => {
  it('Add Client Internal Notes', () => {
    navigateToClientMenu('Corporate')

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Internal Notes').click();

    // Add new Client Internal Notes
    cy.location('pathname').then((pathname)=>{
      location = pathname
    })
    cy.get('.chat-footer textarea[name="chat-input"]').type(faker.lorem.sentence());
    cy.getBySel('saveChatText').click().wait(1000);
  });

  it('Delete client Internal Notes', () => {
    // delete tax Internal Notes
    cy.visit(location).wait(2000)
    cy.getBySel('deleteInternalNote').should('be.visible').click({ force: true });
    cy.get('#bot2-Msg1').contains('Yes').last().click().wait(1000);
  });
})
