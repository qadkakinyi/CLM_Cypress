import { faker } from "@faker-js/faker";

function addAuthorizedPerson(existingProfile = false) {
  cy.getBySel('addAuthorizedPerson').should('be.visible').click();

  cy.getBySel('capacitiesList').should('be.visible').click();
  cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true })

  cy.get('#addAuthorizedPersonForm input[name="isNominee"]').check();
  cy.get('#addAuthorizedPersonForm input[name="isLegalRepresentative"]').check();
  cy.get('#addAuthorizedPersonForm input[name="isControllingPerson"]').check();

  cy.getBySel('controllingPersonTypesList').should('be.visible').click();
  cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true })
  cy.get('#addAuthorizedPersonForm input[name="controllingPersonTypeOther"]').type(faker.string.alphanumeric(85));

  cy.get('#addAuthorizedPersonForm input[name="appointmentDate"]').type(faker.date.past().toISOString().slice(0, 10));

  if (existingProfile == true) {
    cy.getBySel('existingClientsList').should('be.visible').click();

    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #clientsFilteringDataGrid .dx-datagrid-rowsview table tbody tr td').should('be.visible').as('existingClients')
    cy.get('@existingClients').first().click();
  }
  else {
    cy.get('#addAuthorizedPersonForm input[name="newProfileRadioButton"]').check();

    cy.get('#addAuthorizedPersonForm input[name="joinedDate"]').type(faker.date.past().toISOString().slice(0, 10));

    cy.getBySel('clientStatusesList').should('be.visible').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true })

    let firstName = faker.person.firstName('male');
    cy.get('#addAuthorizedPersonForm input[name="firstName"]').type(firstName);
    cy.get('#addAuthorizedPersonForm input[name="lastName"]').type(faker.person.lastName('male'));
    cy.get('#addAuthorizedPersonForm input[name="middleName"]').type(faker.person.middleName('male'));
    cy.get('#addAuthorizedPersonForm input[name="externalReference"]').type(faker.string.alphanumeric(12));
    cy.get('#addAuthorizedPersonForm input[name="phone"]').type(faker.string.numeric(8));
    cy.get('#addAuthorizedPersonForm input[name="email"]').type(`${firstName}@gmail.com`);

    cy.getBySel('genderList').should('be.visible').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true })

    cy.get('#addAuthorizedPersonForm input[name="ssn"]').type(faker.string.alphanumeric(8));
    cy.get('#addAuthorizedPersonForm input[name="taxIdentificationNumber"]').type(faker.string.alphanumeric(8));

    cy.getBySel('countriesList').should('be.visible').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true })

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
//skipped since it was removed from the menu of individual client
describe.skip('Add, Edit, Delete Client Authorized Person', () => {
  it('Add Client Authorized Person existing profile', () => {
    // Click on Know your Clients navigation item
    cy.get('a[href*="main/clients"]').click();
    cy.get('#gridClients').should('be.visible');

    cy.get('#gridClients table tr td .dx-header-filter-indicator').eq(0).click();

    let gridClientsRows = cy.wrap('#gridClients table tbody tr');
    gridClientsRows.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Capacity').click();

    addAuthorizedPerson(true)
  })

  it('Edit Authorized Person (Existing profile)', () => {
    let gridAuthorizedPersons = cy.wrap('#gridClientAuthorizedPersons table tbody tr');
    gridAuthorizedPersons.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.getBySel('editClientAuthorizedPersonForm').should('be.visible');

    cy.get('#editClientAuthorizedPersonForm input[name="isNominee"]').check();
    cy.get('#editClientAuthorizedPersonForm input[name="isLegalRepresentative"]').check();
    cy.get('#editClientAuthorizedPersonForm input[name="isControllingPerson"]').check();

    cy.getBySel('saveAndCloseButton').click();
  })

  it('Delete Authorized Person (Existing profile)', () => deleteAuthorizedPerson())

  it('Add Client Authorized Person as new profile', () => addAuthorizedPerson(false))

  it('Edit Authorized Person (New profile)', () => {
    let gridAuthorizedPersons = cy.wrap('#gridClientAuthorizedPersons table tbody tr');
    gridAuthorizedPersons.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.getBySel('editClientAuthorizedPersonForm').should('be.visible');

    cy.get('#editClientAuthorizedPersonForm input[name="isNominee"]').check();
    cy.get('#editClientAuthorizedPersonForm input[name="isLegalRepresentative"]').check();
    cy.get('#editClientAuthorizedPersonForm input[name="isControllingPerson"]').check();

    cy.getBySel('saveAndCloseButton').click();
  })

  it('Delete Authorized Person (New profile)', () => deleteAuthorizedPerson())
})