/**
 * @testSuite Client Authorized Person Management
 * @description Tests for adding, editing, and deleting client authorized persons with both existing and new profiles
 * @priority High
 * @owner QA Team
 * @tags regression, smoke, authorized-persons, client-management
 * @dependencies faker-js, dynamic client selector
 * @fileDescription This suite tests various interactions with client authorized persons for both profile types
 */

import { faker } from "@faker-js/faker";

function addAuthorizedPerson(existingProfile = false) {
  cy.getBySel('addAuthorizedPerson').should('be.visible').click();

  cy.getBySel('capacitiesList').should('be.visible').click();
  cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

  cy.get('#addAuthorizedPersonForm input[name="isNominee"]').check();
  cy.get('#addAuthorizedPersonForm input[name="isLegalRepresentative"]').check();
  cy.get('#addAuthorizedPersonForm input[name="isControllingPerson"]').check();

  cy.getBySel('controllingPersonTypesList').should('be.visible').click();
  cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });
  cy.get('#addAuthorizedPersonForm input[name="controllingPersonTypeOther"]').type(faker.string.alphanumeric(85));
  cy.get('#addAuthorizedPersonForm input[name="appointmentDate"]').type(faker.date.past().toISOString().slice(0, 10));

  if (existingProfile == true) {
    cy.getBySel('existingClientsList').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #clientsFilteringDataGrid .dx-datagrid-rowsview table tbody tr td').should('be.visible').as('existingClients');
    cy.get('@existingClients').first().click();
  } else {
    cy.get('#addAuthorizedPersonForm input[name="newProfileRadioButton"]').check();
    cy.get('#addAuthorizedPersonForm input[name="joinedDate"]').type(faker.date.past().toISOString().slice(0, 10));
    cy.getBySel('clientStatusesList').should('be.visible').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    let firstName = faker.person.firstName('male');
    cy.get('#addAuthorizedPersonForm input[name="firstName"]').type(firstName);
    cy.get('#addAuthorizedPersonForm input[name="lastName"]').type(faker.person.lastName('male'));
    cy.get('#addAuthorizedPersonForm input[name="middleName"]').type(faker.person.middleName('male'));
    cy.get('#addAuthorizedPersonForm input[name="externalReference"]').type(faker.string.alphanumeric(12));
    cy.get('#addAuthorizedPersonForm input[name="phone"]').type(faker.string.numeric(8));
    cy.get('#addAuthorizedPersonForm input[name="email"]').type(`${firstName}@gmail.com`);
    cy.getBySel('genderList').should('be.visible').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });
    cy.get('#addAuthorizedPersonForm input[name="ssn"]').type(faker.string.alphanumeric(8));
    cy.get('#addAuthorizedPersonForm input[name="taxIdentificationNumber"]').type(faker.string.alphanumeric(8));
    cy.getBySel('countriesList').should('be.visible').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });
    cy.get('#addAuthorizedPersonForm input[name="dateOfBirth"]').type(faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().slice(0, 10));
    cy.get('#addAuthorizedPersonForm textarea[name="notes"]').type(faker.lorem.text());
  }

  cy.getBySel('saveClientAuthorizedPerson').should('be.visible').click();
}

function deleteAuthorizedPerson() {
  cy.getBySel('gridClientAuthorizedPersons').should('be.visible');
  cy.get('#gridClientAuthorizedPersons .dx-link.dx-icon-trash').eq(0).click({ force: true });
  cy.get('.dx-dialog-buttons .dx-button-content').contains('span', 'Yes').click({ force: true });
}

// Skipped since it was removed from the menu of individual client
describe.skip('Add, Edit, Delete Client Authorized Person', () => {

  /**
   * @scenario Add Authorized Person (Existing Profile)
   * @description Adds an authorized person using an existing profile from client list
   * @priority High
   */
  it('Add Client Authorized Person existing profile', () => {
    cy.get('a[href*="main/clients"]').click();
    cy.get('#gridClients').should('be.visible');
    cy.get('#gridClients table tr td .dx-header-filter-indicator').eq(0).click();
    let gridClientsRows = cy.wrap('#gridClients table tbody tr');
    gridClientsRows.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });
    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Capacity').click();
    addAuthorizedPerson(true);
  });

  /**
   * @scenario Edit Authorized Person (Existing Profile)
   * @description Opens and updates capacity flags for the first authorized person
   * @priority High
   */
  it('Edit Authorized Person (Existing profile)', () => {
    let gridAuthorizedPersons = cy.wrap('#gridClientAuthorizedPersons table tbody tr');
    gridAuthorizedPersons.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });
    cy.getBySel('editClientAuthorizedPersonForm').should('be.visible');
    cy.get('#editClientAuthorizedPersonForm input[name="isNominee"]').check();
    cy.get('#editClientAuthorizedPersonForm input[name="isLegalRepresentative"]').check();
    cy.get('#editClientAuthorizedPersonForm input[name="isControllingPerson"]').check();
    cy.getBySel('saveAndCloseButton').click();
  });

  /**
   * @scenario Delete Authorized Person (Existing Profile)
   * @description Deletes the first authorized person from the grid
   * @priority High
   */
  it('Delete Authorized Person (Existing profile)', () => deleteAuthorizedPerson());

  /**
   * @scenario Add Authorized Person (New Profile)
   * @description Creates a completely new profile and adds as an authorized person
   * @priority High
   */
  it('Add Client Authorized Person as new profile', () => addAuthorizedPerson(false));

  /**
   * @scenario Edit Authorized Person (New Profile)
   * @description Updates capacity attributes for newly added profile
   * @priority High
   */
  it('Edit Authorized Person (New profile)', () => {
    let gridAuthorizedPersons = cy.wrap('#gridClientAuthorizedPersons table tbody tr');
    gridAuthorizedPersons.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });
    cy.getBySel('editClientAuthorizedPersonForm').should('be.visible');
    cy.get('#editClientAuthorizedPersonForm input[name="isNominee"]').check();
    cy.get('#editClientAuthorizedPersonForm input[name="isLegalRepresentative"]').check();
    cy.get('#editClientAuthorizedPersonForm input[name="isControllingPerson"]').check();
    cy.getBySel('saveAndCloseButton').click();
  });

  /**
   * @scenario Delete Authorized Person (New Profile)
   * @description Deletes a new profile authorized person entry
   * @priority High
   */
  it('Delete Authorized Person (New profile)', () => deleteAuthorizedPerson());

});

