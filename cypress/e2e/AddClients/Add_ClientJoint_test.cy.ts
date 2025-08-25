import { faker } from "@faker-js/faker";

/**
 * @testSuite AddClients - Joint Client Management
 * @description Test suite for adding joint clients to the system
 * @priority Low
 * @owner QA Team
 * @tags regression, joint-clients, client-management
 * @dependencies user-authentication, faker-js
 * @fileDescription Validates that joint clients can be successfully created through the UI
 */

/**
 * @suite Joint Client Registration
 * @description Tests for registering joint clients by combining multiple existing clients
 * @prerequisites User must be logged in with appropriate privileges
 * @prerequisites At least two individual/corporate clients must exist in the system
 * @testData Dynamically generated joint client name and contact information using faker.js
 */
describe.skip('Add Client Joint', () => {
  /**
   * @scenario Complete Joint Client Creation
   * @description Adds a joint client by selecting existing clients and filling required form fields
   * @priority Medium
   * @testData Faker-generated joint client name, reference number, phone and notes
   * @steps Navigate to Know Your Clients section
   * @steps Click Add Joint button
   * @steps Select a regulation group
   * @steps Choose at least two clients to form a joint client
   * @steps Fill in all required fields including status, evaluation, phone and notes
   * @steps Submit the form
   * @expectedResult Joint client is successfully added
   */
  it('Start add client joint...', () => {
    // Click on Know your Clients navigation item
    cy.get('a[href*="main/clients"]').click();
    // Ensure that the button Add Joint is visible and then click on it
    cy.get('#addJoint').should('be.visible').click();

    // Start filling the Client joint form   
    cy.get('#regulationGroupList').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.get('#clientsFilterComponent').click();
    cy.get('table tbody tr td .dx-select-checkbox').eq(1).click();
    cy.get('table tbody tr td .dx-select-checkbox').eq(2).click();
    cy.get('#clientsFilterComponent').click();

    cy.get('#addClientJointForm input[name="name"]').type(`${faker.person.fullName()} && ${faker.person.fullName()}`);

    cy.get('#clientStatusesList').click();
    cy.get('#dynamicSelectBoxDropdownGrid table').contains('td', 'Active').click();

    cy.get('#addClientJointForm input[name="externalReference"]').type(faker.string.numeric(8));

    cy.get('#addClientJointForm #defaultFullStructureEvaluationDropdown').click();
    cy.get('#dynamicSelectBoxDropdownGrid table').contains('td', 'Yes').click();

    cy.get('#addClientJointForm input[name="phone"]').type(faker.string.numeric(8));

    cy.get('#addClientJointForm textarea[name="notes"]').type(faker.lorem.text());

    cy.get('#saveClientJoint').click();

    cy.wait(1000);
  })
})

