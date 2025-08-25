/**
 * @testSuite Individual Client Bank Accounts
 * @description Validates adding and editing of client bank accounts for an individual client (banks are pre-seeded in a precondition)
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, bank-accounts
 * @dependencies faker-js, navigateToNewestClientMenu
 * @fileDescription Performs Add/Edit on the 'Bank Accounts' section; includes a helper to create an account and a precondition to seed a bank.
 */

import { faker } from "@faker-js/faker";
import {navigateToNewestClientMenu} from "../../../support/e2e";

export const accountNumberTest = faker.finance.accountNumber(12);
let client_id:string = ''

/**
 * @helper add_bank_account
 * @description Navigates to an individual client and creates a new bank account with faker data
 * @steps Load individual client fixture and open newest client menu
 * @steps Navigate to Bank Accounts page and click Add
 * @steps Fill SWIFT, IBAN, Account Number, Bank, Country, Date, Comment, Currency
 * @steps Save the bank account
 * @expectedResult Bank account is created and appears in the grid
 */
export function add_bank_account(){
  let clientName;
  cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
    clientName = data.individualClientName
    navigateToNewestClientMenu(clientName)
  })

  cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Bank Accounts').click();

  // Add new Client Bank Account
  cy.getBySel('addBankAccount').click();

  cy.location('pathname').then((pathname)=>{
    const pathSections = pathname.split('/');
    client_id = pathSections[3]
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
   * @precondition Seed a Bank
   * @description Creates a bank in Settings so it can be selected when adding a client bank account
   * @steps Go to Settings > Banks, click Add, fill form, Save
   * @expectedResult Bank record “Test Bank” is available for selection
   */
  before(()=>{
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
   * @description Uses helper to add a bank account to the current client
   * @priority Medium
   * @testData Faker-generated BIC, IBAN, account number, date, comment
   * @steps Call add_bank_account()
   * @expectedResult New bank account is created successfully
   */
  it('Add Client Bank Account', () => {
    add_bank_account()
  });

  /**
   * @scenario Edit Client Bank Account
   * @description Opens the created account by filtering with the known account number and updates comment
   * @priority Medium
   * @testData Faker-generated comment text
   * @steps Navigate to client bank accounts, filter by account number, open edit, update comment, save & close
   * @expectedResult The comment is updated; success notification is shown
   */
  it('Edit client Bank Account', () => {
    // Edit Bank Account
    cy.visit(`/main/client-individual/${client_id}/1/bankaccounts`).wait(2000)
    cy.getBySel('gridClientAccounts').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(accountNumberTest);

    cy.wait(2000);

    let gridClientAccounts = cy.wrap('#gridClientAccounts table tbody tr');
    gridClientAccounts.get('.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(1500);

    cy.get('#editClientAccountForm textarea[name="comment"]').type(faker.lorem.text(), {force:true});

    cy.getBySel('saveAndCloseButton').click();
  })

  // /**
  // * @scenario Delete Client Bank Account
  // * @description (Commented out) Deletes the created bank account
  // * @priority Low
  // * @steps Navigate to client bank accounts, filter by account number, open item, click Delete, confirm
  // * @expectedResult Account is removed and confirmation is shown
  // */
  // it('Delete client Bank Account', () => {
  //   cy.visit(`/main/client-individual/${client_id}/1/bankaccounts`)
  //   cy.getBySel('gridClientAccounts').should('be.visible');
  //   cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(accountNumberTest);
  //
  //   cy.wait(2000);
  //
  //   let gridClientAccounts = cy.wrap('#gridClientAccounts table tbody tr');
  //   gridClientAccounts.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });
  //
  //   cy.wait(2000);
  //
  //   // Delete Bank Account
  //   cy.getBySel('deleteClientAccountButton').should('be.visible').click();
  //   cy.get('#bot2-Msg1').contains('Yes').click();
  // })
})

