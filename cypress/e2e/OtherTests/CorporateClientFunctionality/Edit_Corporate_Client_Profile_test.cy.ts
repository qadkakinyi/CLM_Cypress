import { navigateToClientMenu, navigateToNewestClientMenu } from "../../../support/e2e";
import { faker } from "@faker-js/faker";

let corporate_id = '';

/**
 * @testSuite Client Profile - Corporate
 * @description Tests related to editing the corporate client profile
 * @priority Medium
 * @owner QA Team
 * @tags client-profile, corporate
 * @dependencies client_corporate.json
 */

describe('Edit Corporate Client Profile', () => {

  /**
   * @scenario Edit Corporate Profile
   * @description Updates the phone number on the corporate client profile and confirms page navigation
   * @expectedResult Phone number is updated and 'Tree Structure' section is visible
   */
  it('Edit Corporate Profile', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
      clientName = data.companyName;
      navigateToNewestClientMenu(clientName);
    });

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a>span').eq(1).contains('Profile');
    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').eq(1).click();

    cy.get('#editProfileForm input[name="phone"]').clear().type(faker.string.numeric(10));

    cy.contains('[sticky-buttons=""] > [icon="save"]', 'Save').click();

    // Capture client ID for future use
    cy.location('pathname').then((pathname) => {
      const pathSections = pathname.split('/');
      corporate_id = pathSections[3];
    });

    // Verify Tree Structure section is accessible
    cy.contains('Tree Structure').scrollIntoView();

    cy.wait(1000);
  });

  // /**
  //  * @scenario Archive Corporate Client
  //  * @description (Skipped) Archives a corporate client from their profile page
  //  * @expectedResult Client is archived successfully
  //  */
  // it.skip('Archives a client', () => {
  //   cy.visit(`/main/client-individual/${corporate_id}/1/profile`);
  //   cy.get('[icon="archive"] > .sa-button > .text').click();
  //   cy.get('#bot2-Msg1').click();
  // });

});

