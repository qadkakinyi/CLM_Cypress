/**
 * @testSuite Individual Client Internal Notes
 * @description Validates adding and deleting internal notes for an individual client profile
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, notes, individual
 * @dependencies faker-js, navigateToNewestClientMenu
 * @fileDescription Performs CRUD operations on the 'Internal Notes' section of an individual client profile
 */

import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let tin = faker.string.alphanumeric(12);

let client_id = ''

describe('Add, Delete Client Internal Notes', () => {

  /**
   * @scenario Add Client Internal Notes
   * @description Adds a new internal note to the individual client using a faker-generated sentence
   * @priority Medium
   * @testData Faker-generated lorem sentence
   * @steps Load individual client from fixture and navigate to their profile
   * @steps Open the Internal Notes section
   * @steps Type note in chat textarea and click Save
   * @expectedResult Note is added to the thread; save action completes successfully
   */
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

  /**
   * @scenario Delete Client Internal Notes
   * @description Deletes the most recent internal note from the client’s note thread
   * @priority Medium
   * @steps Visit the Internal Notes page for the captured client id
   * @steps Click the delete icon for the last note and confirm
   * @expectedResult The selected note is removed from the thread after confirmation
   */
  it('Delete client Internal Notes', () => {
    // delete tax Internal Notes
    cy.visit(`/main/client-individual/${client_id}/1/individual-internal-notes`).wait(2000)
    cy.getBySel('deleteInternalNote').last().should('be.visible').click({ force: true }).wait(1000);
    cy.get('#bot2-Msg1').contains('Yes').last().click();
  });
})

