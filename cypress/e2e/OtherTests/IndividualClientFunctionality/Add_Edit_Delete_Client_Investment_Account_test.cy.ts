import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let externalReference = faker.string.alphanumeric(12);
let accountNumber = faker.finance.accountNumber();
let client_id = '';

/**
 * @testSuite Client Investment Account Management
 * @description Validates adding, editing, and deleting of client investment accounts.
 * @priority High
 * @owner QA
 * @tags investment, client
 * @expectedResult Users can add, update, and remove investment accounts successfully.
 */
describe('Add, Edit, Delete Client Investment Account', () => {

  before(()=>{
    cy.visit('/settings/investment-account-types')
    cy.contains('sa-button','Add').click().wait(1000)

    cy.getByDataCy("investment-account-type-name").type('Fixed Account-test')
    cy.getByDataCy("investment-account-type-mapping-reference").type('fixed-acc-types')

    cy.contains('#addInvestmentAccountTypeForm [icon="save"]','Save').click()
    cy.wait(1000)
  })

  /**
   * @scenario Add Client Investment Account
   * @description Adds a new investment account to a client profile.
   * @steps
   * 1. Navigate to a client’s profile.
   * 2. Open Investment Accounts.
   * 3. Fill in account details and save.
   * @expectedResult The new investment account is saved successfully.
   */
  it('Add Client Investment Account', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
      clientName = data.individualClientName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Investment Accounts').click();

    // Add new Client Card
    cy.getBySel('addInvestmentAccount').click();
    cy.wait(1000);
    cy.location('pathname').then((pathname)=>{
      const pathSections = pathname.split('/');
      client_id = pathSections[3]
    })

    cy.getBySel('addClientInvestmentAccountForm').should('be.visible').then(() => {
      cy.get('#addClientInvestmentAccountForm input[name="accountName"]').type(faker.finance.accountName());
      cy.get('#addClientInvestmentAccountForm input[name="accountNumber"]').type(accountNumber);
      cy.get('#addClientInvestmentAccountForm input[name="tradingAccount"]').type(faker.finance.accountNumber(10));

      cy.getBySel('investmentAccountTypesList').should('be.visible').click();
      cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

      cy.get('#addClientInvestmentAccountForm input[name="groupName"]').type(faker.lorem.word());
      cy.get('#addClientInvestmentAccountForm input[name="balance"]').type(faker.finance.amount({ min: 1, max: 9999999 }));

      cy.getBySel('currenciesList').should('be.visible').click();
      cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

      cy.get('#addClientInvestmentAccountForm input[name="previousDayEquity"]').type(faker.number.int().toString());
      cy.get('#addClientInvestmentAccountForm input[name="externalReference"]').type(externalReference);
      cy.get('#addClientInvestmentAccountForm textarea[name="comment"]').type(faker.lorem.sentence());

      cy.getBySel('saveInvestmentAccount').click();
    });
  });

  /**
   * @scenario Edit Client Investment Account
   * @description Updates the account number of an existing investment account.
   * @steps
   * 1. Navigate to Investment Accounts for the client.
   * 2. Search for the account by account number.
   * 3. Edit and update the account number.
   * @expectedResult The account number is updated successfully.
   */
  it('Edit client investment account', () => {
    cy.visit(`/main/client-individual/${client_id}/1/investmentaccounts`).wait(2000)
    cy.getBySel('gridClientInvestmentAccounts').should('be.visible').then(() => {
      cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(1).type(accountNumber);

      cy.wait(2000);

      let gridInvestmentAccounts = cy.wrap('#gridClientInvestmentAccounts table tbody tr td');
      gridInvestmentAccounts.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

      cy.get('#editClientInvestmentAccountForm').should('be.visible');

      accountNumber = faker.finance.accountNumber();
      cy.get('#editClientInvestmentAccountForm input[name="accountNumber"]').should('be.visible').clear();
      cy.get('#editClientInvestmentAccountForm input[name="accountNumber"]').type(accountNumber);

      cy.getBySel('saveAndCloseButton').click().wait(1000);
    });
  });

  /**
   * @scenario Delete Client Investment Account
   * @description Removes an existing investment account from a client profile.
   * @steps
   * 1. Navigate to Investment Accounts for the client.
   * 2. Search for the account by account number.
   * 3. Delete the account and confirm.
   * @expectedResult The investment account is deleted successfully.
   */
  it('Delete client investment account', () => {
    cy.visit(`/main/client-individual/${client_id}/1/investmentaccounts`).wait(2000)
    cy.getBySel('gridClientInvestmentAccounts').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(1).type(accountNumber);

    cy.wait(2000);

    let gridWallets = cy.wrap('#gridClientInvestmentAccounts table tbody tr td');
    gridWallets.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    // Delete Cards
    cy.getBySel('deleteInvestmentAccount').scrollIntoView().click();
    cy.get('#bot2-Msg1').contains('Yes').click().wait(1000);
  });
});

