import { faker } from "@faker-js/faker";
import { navigateToClientMenu, navigateToNewestClientMenu } from "../../../support/e2e";

let code = faker.string.numeric(16);
let location = '';

/**
 * @testSuite AddClients - Corporate Client Management
 * @description Test suite for managing related websites linked to corporate clients
 * @priority Medium
 * @owner QA Team
 * @tags regression, websites, client-profile
 * @dependencies user-authentication, faker-js
 * @fileDescription Validates the full lifecycle for related website records in client profiles
 */

/**
 * @suite Client Related Websites
 * @description Tests for adding, editing, and deleting related website entries
 * @prerequisites Corporate client must exist; Related Website Type must be configured
 * @testData Dynamically generated using faker.js
 */
describe('Add, Edit, Delete Client Related Website', () => {

  /**
   * @setup Related Website Type
   * @description Creates the required Related Website Type in system settings
   */
  before(() => {
    cy.visit('/settings/related-website-types')
    cy.contains('sa-button', 'Add').click()
    cy.wait(1000)
    cy.getByFormControlName('name').type('Business Website')
    cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
    cy.getByDataCy('related-website-type-save').click()
    cy.wait(1000)
  })

  /**
   * @scenario Add Related Website
   * @description Adds a new related website to a corporate client profile
   * @priority High
   * @expectedResult Website appears in the client’s related websites grid
   */
  it('Add Client Related Website', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
      clientName = data.companyName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
        .contains('span', 'Related Websites').click();
    cy.wait(1000)

    cy.location('pathname').then((loc) => {
      location = loc
    })

    cy.getBySel('addRelatedWebsite').click();
    cy.getBySel('addRelatedWebsiteForm').should('be.visible');

    cy.getBySel('relatedWebsiteTypes').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td')
        .eq(0).click({ force: true });

    cy.get('#addRelatedWebsiteForm input[name="website"]').type(faker.internet.url());
    cy.getBySel('saveRelatedWebsite').click();
  })

  /**
   * @scenario Edit Related Website
   * @description Edits the website URL for a related website entry
   * @priority Medium
   * @expectedResult Website is updated and saved
   */
  it('Edit Client Related website', () => {
    cy.visit(location)
    cy.wait(2000)
    cy.getBySel('gridClientRelatedWebsites').should('be.visible');
    cy.get('#gridClientRelatedWebsites table tbody tr td.dx-command-edit-with-icons a').eq(0).click({ force: true });
    cy.get('#editClientRelatedWebsiteForm').should('be.visible');

    cy.get('#editClientRelatedWebsiteForm input[name="website"]').clear();
    cy.get('#editClientRelatedWebsiteForm input[name="website"]').type(faker.internet.url());

    cy.getBySel('saveAndCloseButton').click();
  })

  /**
   * @scenario Delete Related Website
   * @description Removes a related website from the client profile
   * @priority Medium
   * @expectedResult Related website entry is deleted from the system
   */
  it('Delete client Related Website', () => {
    cy.visit(location)
    cy.wait(2000)
    cy.getBySel('gridClientRelatedWebsites').should('be.visible');
    cy.get('#gridClientRelatedWebsites table tbody tr td.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.getBySel('deleteRelatedWebsite').click();
    cy.get('#bot2-Msg1').contains('Yes').click();
  })
})

