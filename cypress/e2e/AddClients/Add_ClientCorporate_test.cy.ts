import { faker } from "@faker-js/faker";


describe('Add Client Corporate', () => {
  it('Add Client Corporate', () => {
    // Click on Know your Clients navigation item
    cy.get('a[href*="main/clients"]').click();
    cy.get('#addCorporate').should('be.visible').click();
    cy.wait(1500)

    let companyName = faker.company.name();

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
    cy.get('#saveClientCorporate').click().wait(6000);
    cy.contains('The Client Corporate has been added.')
  })
})
