import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

/**
 * @testSuite ClientBankAccounts - Corporate Bank Account Management
 * @description Tests the full workflow for creating, editing, and deleting bank accounts for a corporate client
 * @priority High
 * @owner QA Team
 * @tags client-profile, bank-accounts, finance
 * @dependencies faker-js, bank-setup
 * @fileDescription Bank account setup and manipulation for corporate clients
 */

let accountNumberTest = faker.finance.accountNumber(12);
let location: string = '';

/**
 * @function add_bank_account
 * @description Shared function to add a bank account for a corporate client
 * @usedIn Add Client Bank Account
 */
export function add_bank_account() {
  let clientName;
  cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
    clientName = data.companyName
    navigateToNewestClientMenu(clientName)
  })

  cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Bank Accounts').click();

  cy.getBySel('addBankAccount').click().wait(1000);

  cy.location('pathname').then((loc) => {
    location = loc
  })

  cy.getBySel('addClientAccountForm').should('be.visible');
  cy.get('#addClientAccountForm input[name="swiftCode"]').type(faker.finance.bic());
  cy.get('#addClientAccountForm input[name="iban"]').type(faker.finance.iban());
  cy.get('#addClientAccountForm input[name="accountNumber"]').type(accountNumberTest);

  cy.getBySel('bankList').should('be.visible').click();
  cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

  cy.getBySel('countriesList').should('be.visible').click();
  cy.get('#dynamicSelectBoxDropdownGrid table').contains('td', 'Albania').click({ force: true });

  cy.get('#addClientAccountForm input[name="dateCreated"]').type(faker.date.past().toISOString().slice(0, 10));
  cy.get('#addClientAccountForm textarea[name="comment"]').type(faker.lorem.text());

  cy.getBySel('currenciesList').should('be.visible').click();
  cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

  cy.getBySel('saveClientBankAccount').click();
  cy.wait(1000)
}

describe('Add, Edit, Delete Client Bank Account', () => {

  /**
   * @setup Adds a test bank under system settings for association with a client account
   */
  before(() => {
    cy.visit('/settings/banks')
    cy.contains('sa-button','Add').click()
    cy.wait(1000)
    cy.getByDataCy("bank-name").type(`Test Bank`)
    cy.getByDataCy("bank-code").type(faker.string.alphanumeric(20))
    cy.getByDataCy("bank-mapping-reference").type(faker.string.alphanumeric(20))
    cy.contains('#addBankForm [icon="save"]','Save').click()
    cy.wait(2000)
  })

  /**
   * @scenario Add Client Bank Account
   * @description Adds a bank account for a corporate client and associates it with a country, currency and bank
   * @testData faker-generated SWIFT, IBAN, account number
   * @expectedResult Bank account is successfully added
   */
  it('Add Client Bank Account', () => {
    add_bank_account()
  });

  /**
   * @scenario Edit Client Bank Account
   * @description Updates the comment field of an existing bank account
   * @testData faker-generated comment
   * @expectedResult Bank account is successfully updated
   */
  it('Edit client Bank Account', () => {
    cy.visit(location).wait(4000)
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(accountNumberTest);
    cy.wait(2000);

    let gridClientAccounts = cy.wrap('#gridClientAccounts table tbody tr');
    gridClientAccounts.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.get('#editClientAccountForm').should('be.visible');
    cy.get('#editClientAccountForm textarea[name="comment"]').type(faker.lorem.text());

    cy.getBySel('saveAndCloseButton').click().wait(2000);
    cy.contains('The bank account has been updated')
  });

  /**
   * @scenario Delete Client Bank Account
   * @description Deletes an existing bank account for a corporate client
   * @expectedResult Bank account is removed from the client profile
   */
  // it.skip('Delete client Bank Account', () => {
  //   cy.visit(location).wait(4000)
  //   cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(accountNumberTest);
  //   cy.wait(2000);
  //   let gridClientAccounts = cy.wrap('#gridClientAccounts table tbody tr');
  //   gridClientAccounts.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });
  //   cy.wait(2000);
  //   cy.getBySel('deleteClientAccountButton').should('be.visible').click();
  //   cy.get('#bot2-Msg1').contains('Yes').click().wait(2000);
  //   cy.contains('The bank account has been deleted')
  // })

});

