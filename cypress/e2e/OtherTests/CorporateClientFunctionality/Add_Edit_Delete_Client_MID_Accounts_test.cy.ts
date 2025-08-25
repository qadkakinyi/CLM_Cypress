import { faker } from "@faker-js/faker";
import { navigateToClientMenu, navigateToNewestClientMenu } from "../../../support/e2e";

let code = faker.string.numeric(16);
let location = '';

/**
 * @suite Corporate Client MID Accounts
 * @description Tests for adding, editing, and deleting MID accounts for corporate clients
 * @priority High
 * @owner QA Team
 * @tags regression, MID, client-management
 * @dependencies user-authentication, faker-js
 * @testData Faker-generated account names and codes
 */
describe('Add, Edit, Delete Client MID Accounts - Corporate', () => {

  before(() => {
    cy.visit('/settings/mid-types')
    cy.contains('sa-button','Add').click().wait(1000)
    cy.getByFormControlName('name').type('Test MID type')
    cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
    cy.contains('#addMidTypeForm [icon="save"]','Save').click()
    cy.wait(1000)

    cy.visit('/settings/mid-classes')
    cy.contains('sa-button','Add').click().wait(1000)
    cy.getByFormControlName('name').type('Test MID class')
    cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
    cy.contains('#addMidClassForm [icon="save"]','Save').click()
    cy.wait(1000)
  })

  /**
   * @scenario Add MID Account
   * @description Adds a new MID account to a corporate client profile
   * @priority High
   * @expectedResult MID account appears in the grid with correct data
   */
  it('Add Client MID Accounts', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
      clientName = data.companyName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
        .contains('span', 'MID Accounts').click();

    cy.location('pathname').then((loc) => {
      location = loc
    })

    cy.getBySel('addMidAccounts').click();
    cy.getBySel('addMidAccountForm').should('be.visible');

    cy.getBySel('bankAccounts').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content>.dx-datagrid-table > tbody > .dx-data-row > td')
        .eq(0).click({ force: true });

    cy.get('#addMidAccountForm input[name="name"]').type(faker.finance.accountName());
    cy.wait(500)

    cy.getBySel('currencies').click();
    cy.get('[data-test="dynamicSelectBoxDropdownGrid"] > .dx-gridbase-container > .dx-datagrid-rowsview')
        .eq(1).find('tbody > .dx-data-row > td').eq(0).click();

    cy.getBySel('midTypes').click();
    cy.contains('Test MID type').click({ force: true });

    cy.get('#addMidAccountForm input[name="code"]').type(code);

    cy.getBySel('midClasses').click();
    cy.contains('Test MID class').click({ force: true });

    cy.getBySel('saveMidAccounts').click();
  });

  /**
   * @scenario Edit MID Account
   * @description Updates the code of an existing MID account
   * @priority Medium
   * @expectedResult MID account code is updated in the system
   */
  it('Edit Client MID Accounts', () => {
    cy.visit(location)
    cy.wait(4000)

    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(code, { force: true });
    cy.wait(3000);

    cy.get('#gridMidAccounts table tbody tr td.dx-command-edit-with-icons a').eq(0).click({ force: true });

    code = faker.string.numeric(16);
    cy.get('#editClientMidAccountForm input[name="code"]').clear().type(code);
    cy.getBySel('saveAndCloseButton').click();
  });

  /**
   * @scenario Delete MID Account
   * @description Deletes a previously added MID account
   * @priority Medium
   * @expectedResult MID account is removed from the client profile
   */
  it('Delete client MID Accounts', () => {
    cy.visit(location)
    cy.wait(3000)

    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(code, { force: true });
    cy.wait(2000);

    let gridMidAccounts = cy.wrap('#gridMidAccounts table tbody tr td');
    gridMidAccounts.get('.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(1500);

    cy.getBySel('deleteMidAccounts').click();
    cy.get('#bot2-Msg1').contains('Yes').click();
  });
});

