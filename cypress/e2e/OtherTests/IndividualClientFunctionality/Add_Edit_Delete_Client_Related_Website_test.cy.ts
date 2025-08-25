/**
 * @testSuite Client Related Website (Individual)
 * @description Creates a related website type (pre-req), then validates add/edit/delete of a client's Related Website.
 * @priority Medium
 * @owner QA
 * @tags individual, related-website, crud
 * @dependencies navigateToNewestClientMenu
 * @fileDescription Covers CRUD on Related Websites detail line for an individual client.
 */

import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let code = faker.string.numeric(16);

let client_id = '';

describe('Add, Edit, Delete Client Related Website - Individual', () => {

  /**
   * @scenario Seed Related Website Type
   * @description Adds a Related Website Type in Settings for use in the client flow.
   * @steps Visit settings → Related Website Types → Add → Fill name & mapping ref → Save
   * @expectedResult Type “Business Website” is created successfully.
   */
  before(()=>{
    cy.visit('/settings/related-website-types')
    cy.contains('sa-button','Add').click()
    cy.wait(1000)
    cy.getByFormControlName('name').type('Business Website')
    cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
    cy.getByDataCy('related-website-type-save').click()
    cy.wait(1000)
  })

  /**
   * @scenario Add Client Related Website
   * @description Adds a Related Website entry for the client using the seeded type.
   * @steps Load client from fixture → Navigate to Related Websites → Add → Select type → Enter URL → Save
   * @testData faker.internet.url()
   * @expectedResult Related Website is created successfully.
   */
  it('Add Client Related Website', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
      clientName = data.individualClientName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Related Websites').click();
    cy.wait(1000)

    cy.location('pathname').then((pathname)=>{
      const pathSections = pathname.split('/');
      client_id = pathSections[3]
    })

    // Add new Client Policies
    cy.getBySel('addRelatedWebsite').click();
    cy.getBySel('addRelatedWebsiteForm').should('be.visible');

    cy.getBySel('relatedWebsiteTypes').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.get('#addRelatedWebsiteForm input[name="website"]').type(faker.internet.url());

    cy.getBySel('saveRelatedWebsite').click().wait(1000);
  });

  /**
   * @scenario Edit Client Related Website
   * @description Opens the first related website and updates the URL.
   * @steps Visit client → Related Websites → Open first row → Update URL → Save & Close
   * @expectedResult Related Website is updated successfully.
   */
  it('Edit Client Related website', () => {
    // Edit Related Website
    cy.visit(`/main/client-individual/${client_id}/1/related-websites`).wait(3000)

    cy.get('#gridClientRelatedWebsites .fa-angle-double-right').eq(0).click({ force: true }).wait(1000);

    cy.get('#editClientRelatedWebsiteForm input[name="website"]').should('be.visible').clear();
    cy.get('#editClientRelatedWebsiteForm input[name="website"]').type(faker.internet.url());

    cy.getBySel('saveAndCloseButton').click().wait(1000);
  })

  /**
   * @scenario Delete Client Related Website
   * @description Deletes the first related website entry from the grid.
   * @steps Visit client → Related Websites → Open first row → Delete → Confirm
   * @expectedResult Related Website is deleted successfully.
   */
  it('Delete client Related Website', () => {
    // Delete Related Website
    cy.visit(`/main/client-individual/${client_id}/1/related-websites`).wait(3000)

    cy.get('#gridClientRelatedWebsites .fa-angle-double-right').eq(0).click({ force: true });
    // Delete Related Website
    cy.getBySel('deleteRelatedWebsite').should('be.visible').click();
    cy.get('#bot2-Msg1').contains('Yes').click().wait(1000);
  })
})

