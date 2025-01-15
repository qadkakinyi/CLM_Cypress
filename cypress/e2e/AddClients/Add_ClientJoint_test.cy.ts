import { faker } from "@faker-js/faker";

describe.skip('Add Client Joint', () => {
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
