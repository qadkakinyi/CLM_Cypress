import { faker } from "@faker-js/faker";

/**
 * @testSuite AddClients - Corporate Client Management
 * @description This test verifies the functionality of adding a corporate client by filling out a form with company details, including registered name, registration number, regulation group, client status, contact information, and capital amounts, then confirming successful submission with a success message.
 * @priority High
 * @owner QA Team
 * @tags regression, smoke, corporate-clients, client-management
 * @dependencies user-authentication, faker-js
 * @fileDescription Tests the complete workflow for adding corporate clients through the UI
 */

let companyName = faker.company.name();

/**
 * @suite Corporate Client Registration
 * @description Tests for registering new corporate clients with dynamically generated data
 * @prerequisites User must be logged in with appropriate privileges
 * @prerequisites System must have access to regulation groups and country data
 * @testData Dynamically generated using faker.js library
 */
describe('Add Client Corporate', () => {
  /**
   * @scenario Complete Corporate Client Creation
   * @description Successfully adds a corporate client with all required and optional fields populated
   * @priority High
   * @testData Dynamic faker data for company details, contact info, and financial data
   * @steps Navigate to Know Your Clients section
   * @steps Click Add Corporate Client button
   * @steps Fill in registered all required fields
   * @steps Submit the form by clicking save button
   * @steps Verify success message appears
   * @steps Save company name to fixtures file for future test reference
   * @expectedResult Corporate client is successfully created and added to the system
   * @expectedResult Success message "The Client Corporate has been added." is displayed
   * @expectedResult Client data is saved to fixtures file for reuse
   */
  it('Add Client Corporate', () => {
    // Click on Know your Clients navigation item
    cy.getByDataCy('know-clients-btn').click()
    cy.get('#addCorporate').click();
    cy.wait(1500)
    cy.get('#addClientCorporateForm input[name="registeredName"]').type(companyName);
    cy.get('#addClientCorporateForm input[name="registrationNumber"]').type(faker.string.numeric({ length: 8, allowLeadingZeros: false }));
    cy.get('#regulationGroupDropdown').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });
    cy.get('#defaultFullStructureEvaluationDropdown').click();
    cy.get('#dynamicSelectBoxDropdownGrid table').contains('td', 'Yes').click();
    cy.get('#clientStatusDropdown').click();
    cy.get('#dynamicSelectBoxDropdownGrid table').contains('td', 'Active').click();
    cy.get('#countriesListDropdown').click();
    cy.get('#dynamicSelectBoxDropdownGrid table').contains('td', 'Albania').click();
    cy.get('#addClientCorporateForm input[name="externalReference"]').type(faker.string.uuid());
    cy.get('#addClientCorporateForm input[name="phone"]').type(faker.string.numeric(8));
    cy.get('#addClientCorporateForm input[name="email"]').type(`${companyName}@gmail.com`);
    cy.get('#addClientCorporateForm input[name="authorisedCapital"]').clear().wait(500).type('10000');
    cy.get('#addClientCorporateForm input[name="issuedCapital"]').type(faker.string.numeric({ length: 4, allowLeadingZeros: false }));
    cy.get('#addClientCorporateForm input[name="ipAddress"]').type(faker.internet.ipv4());
    cy.get('#addClientCorporateForm textarea[name="notes"]').type(faker.lorem.paragraph(5));
    cy.get('#saveClientCorporate').click();
    cy.poll('The Client Corporate has been added.')
    cy.writeFile('cypress/fixtures/client_corporate.json', {companyName: companyName}).wait(2000)
  })
})
