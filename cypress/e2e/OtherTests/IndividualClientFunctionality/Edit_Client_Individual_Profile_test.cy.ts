/**
 * @testSuite Edit Client Individual Profile
 * @description Validates editing profile details and archiving flow for an individual client.
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, profile
 * @dependencies navigateToClientMenu, navigateToNewestClientMenu
 * @fileDescription Opens the newest individual client profile, edits middle name, saves, then archives the client.
 */

import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let client_id = '';

describe('Edit Client Individual Profile', () => {

  /**
   * @scenario Edit Individual Profile
   * @description Navigates to the newest client’s profile and updates the middle name.
   * @steps Load client from fixture
   * @steps Navigate to Profile section
   * @steps Type random middle name and Save
   * @steps Capture client_id from URL for subsequent tests
   * @expectedResult Profile is saved successfully and client_id is available for reuse
   */
  it('Edit Individual Profile', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
      clientName = data.individualClientName
      navigateToNewestClientMenu(clientName)
    })

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

  // /**
  //  * @scenario Archive Client
  //  * @description Opens the same client’s profile and archives the record.
  //  * @steps Visit profile using client_id
  //  * @steps Click Archive and confirm
  //  * @expectedResult Client is archived and confirmation is shown
  //  */
  // it('Archives a client', ()=>{
  //   cy.visit(`/main/client-individual/${client_id}/1/profile`).wait(2000)
  //
  //   cy.get('[icon="archive"] > .sa-button > .text').click();
  //   cy.get('#bot2-Msg1').click();
  // })
})

