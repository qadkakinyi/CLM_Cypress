import { faker } from "@faker-js/faker";

/**
 * @testSuite AddClients - Individual Client Management
 * @description Comprehensive test suite for adding individual clients to the system
 * @priority High
 * @owner QA Team
 * @tags regression, smoke, individual-clients, client-management
 * @dependencies user-authentication, faker-js
 * @fileDescription Tests the workflow for adding individual clients via the UI
 */

let firstName = faker.person.firstName('male');
let middleName = faker.person.middleName('male')
let lastName = faker.person.lastName('male')
let clientId;

/**
 * @suite Individual Client Registration
 * @suiteDescription Tests for registering new individual clients with dynamically generated data
 * @prerequisites User must be logged in with appropriate privileges
 * @prerequisites System must have access to regulation groups and country data
 * @testData Dynamically generated using faker.js library
 */
describe('Add Client Individual', () => {

  /**
   * @scenario Complete Individual Client Creation
   * @description Successfully adds an individual client with all required and optional fields
   * @priority High
   * @testData Dynamic faker data for personal details and contact information
   * @steps Navigate to Know Your Clients section
   * @steps Click Add Individual Client button
   * @steps Fill in all required fields
   * @steps Submit the form by clicking save button
   * @steps Verify success message appears
   * @steps Save client name and ID to fixtures file for reuse in future tests
   * @expectedResult Individual client is successfully created
   * @expectedResult Success message "Client individual has been added" is displayed
   * @expectedResult Client name and ID are saved to cypress/fixtures/client_individual.json
   */
  it('Add Client Individual', () => {
    // Click on Know your Clients navigation item
    cy.getByDataCy('know-clients-btn').click();
    cy.poll('#addIndividual').click()
    cy.waitUntilLoaderDisappears()
    cy.wait(2000)
    cy.get('#addClientIndividualForm input[name="firstName"]').type(firstName);
    cy.get('#addClientIndividualForm input[name="lastName"]').type(lastName);
    cy.get('#addClientIndividualForm input[name="middleName"]').type(middleName);

    cy.get('#clientStatusesDropdown').click();
    cy.get('#dynamicSelectBoxDropdownGrid').eq(0).find('.dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true })

    cy.get('#regulationGroupsDropdown').should('be.visible').click()

    cy.wait(1000)

    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.get('#addClientIndividualForm input[name="externalReference"]').type(faker.string.alphanumeric(12));
    cy.get('#addClientIndividualForm input[name="phone"]').type(faker.string.numeric(8));
    cy.get('#addClientIndividualForm input[name="email"]').type(`${firstName}@gmail.com`);
    cy.get('#addClientIndividualForm input[name="ssn"]').type(faker.string.alphanumeric(10));
    cy.get('#addClientIndividualForm input[name="taxIdentificationNumber"]').type(faker.string.alphanumeric(10));
    cy.get('#addClientIndividualForm input[name="dateOfBirth"]').type(faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().slice(0, 10));

    cy.get('#countriesDropdown').click();
    cy.get('#dynamicSelectBoxDropdownGrid table tr').contains('td', 'Albania').click();

    cy.get('#addClientIndividualForm input[name="ipAddress"]').type(faker.internet.ipv4());
    cy.get('#addClientIndividualForm textarea[name="notes"]').type(faker.lorem.paragraph());

    cy.get('#saveClientIndividual').click();
    cy.poll('Client individual has been added').wait(1000)
    cy.location('pathname').then(path=>{
      const parts = path.split('/');
      clientId = parts[3];
      cy.writeFile('cypress/fixtures/client_individual.json', {individualClientName: `${firstName}`+' '+lastName, clientId: clientId}).wait(1000)
    })
  })
})

