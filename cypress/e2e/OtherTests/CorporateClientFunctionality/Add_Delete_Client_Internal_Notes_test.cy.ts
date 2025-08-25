import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

/**
 * @testSuite AddDeleteClientInternalNotes - Corporate Internal Notes
 * @description Tests for adding and deleting internal notes for a corporate client
 * @priority Medium
 * @owner QA Team
 * @tags regression, internal-notes, corporate
 * @dependencies client-navigation, faker-js
 * @fileDescription Validates the internal notes functionality in corporate client context
 */

let tin = faker.string.alphanumeric(12);
let location = ''

describe('Add, Delete Client Internal Notes - Corporate', () => {

  /**
   * @scenario Add Internal Note
   * @description Adds an internal note to a corporate client from the Internal Notes menu
   * @testData Random sentence generated via faker
   * @steps Read corporate client name from fixture
   * @steps Navigate to client profile
   * @steps Click on 'Internal Notes' tab
   * @steps Type internal note and click save
   * @expectedResult Note is successfully added and visible in the UI
   */
  it('Add Client Internal Notes', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
      clientName = data.companyName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Internal Notes').click();

    // Add new Client Internal Notes
    cy.location('pathname').then((pathname)=>{
      location = pathname
    })
    cy.get('.chat-footer textarea[name="chat-input"]').type(faker.lorem.sentence());
    cy.getBySel('saveChatText').click().wait(1000);
  });

  /**
   * @scenario Delete Internal Note
   * @description Deletes an internal note previously added to a corporate client
   * @steps Visit stored client URL
   * @steps Click delete icon on first note
   * @steps Confirm deletion from dialog
   * @expectedResult Note is deleted successfully and no longer appears in the list
   */
  it('Delete client Internal Notes', () => {
    // delete tax Internal Notes
    cy.visit(location).wait(2000)
    cy.getBySel('deleteInternalNote').should('be.visible').click({ force: true });
    cy.get('#bot2-Msg1').contains('Yes').last().click().wait(1000);
  });
});

