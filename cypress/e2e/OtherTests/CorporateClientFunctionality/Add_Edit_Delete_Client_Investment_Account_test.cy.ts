import { faker } from "@faker-js/faker";
import { navigateToClientMenu, navigateToNewestClientMenu } from "../../../support/e2e";

let externalReference = faker.string.alphanumeric(12);
let accountNumber = faker.finance.accountNumber();
let location = '';

/**
 * @suite Corporate Client Investment Accounts
 * @description Tests for adding, editing, and deleting investment accounts for corporate clients
 * @priority High
 * @owner QA Team
 * @tags regression, investment, client-management
 * @dependencies user-authentication, faker-js
 * @testData Faker-generated financial details
 */
describe('Add, Edit, Delete Client Investment Account', () => {

  before(() => {
    cy.visit('/settings/investment-account-types')
    cy.contains('sa-button','Add').click()
    cy.wait(1000)

    cy.getByDataCy("investment-account-type-name").type('Fixed Account-test')
    cy.getByDataCy("investment-account-type-mapping-reference").type('fixed-acc-types')

    cy.contains('#addInvestmentAccountTypeForm [icon="save"]','Save').click()
    cy.wait(1000)
  })

  /**
   * @scenario Add Investment Account
   * @description Adds a new investment account for a corporate client
   * @priority High
   * @expectedResult Investment account appears in the grid and is associated with client
   */
  it('Add Client Investment Account', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
      clientName = data.companyName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Investment Accounts').click();
    cy.getBySel('addInvestmentAccount').click().wait(2000);

    cy.location('pathname').then((loc) => {
      location = loc
    })

    cy.getBySel('addClientInvestmentAccountForm').should('be.visible').then(() => {
      cy.get('#addClientInvestmentAccountForm input[name="accountName"]').type(faker.finance.accountName());
      cy.get('#addClientInvestmentAccountForm input[name="accountNumber"]').type(accountNumber);
      cy.get('#addClientInvestmentAccountForm input[name="tradingAccount"]').type(faker.finance.accountNumber(10));

      cy.getBySel('investmentAccountTypesList').click().wait(1000);
      cy.contains('Fixed Account Test').eq(0).click({ force: true }).wait(1000);

      cy.get('#addClientInvestmentAccountForm input[name="groupName"]').type(faker.lorem.word());
      cy.get('#addClientInvestmentAccountForm input[name="balance"]').type(faker.finance.amount({ min: 1, max: 9999999 }));
      cy.getBySel('currenciesList').click().wait(1000);
      cy.get('.dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true }).wait(1000);

      cy.get('#addClientInvestmentAccountForm input[name="previousDayEquity"]').type(faker.number.int().toString());
      cy.get('#addClientInvestmentAccountForm input[name="externalReference"]').type(externalReference);
      cy.get('#addClientInvestmentAccountForm textarea[name="comment"]').type(faker.lorem.sentence());

      cy.getBySel('saveInvestmentAccount').click().wait(2000);
    });
  });

  /**
   * @scenario Edit Investment Account
   * @description Updates account number of a client investment account
   * @priority Medium
   * @expectedResult New account number is saved and visible
   */
  it('Edit client investment account', () => {
    cy.visit(location).wait(2000)
    cy.getBySel('gridClientInvestmentAccounts').should('be.visible').then(() => {
      cy.get('[aria-colindex="2"] .dx-texteditor-input-container > .dx-texteditor-input').type(accountNumber, {force:true});
      cy.wait(2000);

      let gridInvestmentAccounts = cy.wrap('#gridClientInvestmentAccounts table tbody tr td');
      gridInvestmentAccounts.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

      cy.get('#editClientInvestmentAccountForm').should('be.visible');
      accountNumber = faker.finance.accountNumber();
      cy.get('#editClientInvestmentAccountForm input[name="accountNumber"]').clear().type(accountNumber);

      cy.getBySel('saveAndCloseButton').click().wait(2000);
    });
  })

  /**
   * @scenario Delete Investment Account
   * @description Deletes an existing client investment account
   * @priority Medium
   * @expectedResult Account is removed and confirmation message is shown
   */
  it('Delete client investment account', () => {
    cy.visit(location).wait(2000)
    cy.getBySel('gridClientInvestmentAccounts').should('be.visible');
    cy.get('[aria-colindex="2"] .dx-texteditor-input-container > .dx-texteditor-input').type(accountNumber, {force:true});
    cy.wait(2000);

    let gridWallets = cy.wrap('#gridClientInvestmentAccounts table tbody tr td');
    gridWallets.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.getBySel('deleteInvestmentAccount').scrollIntoView().click().wait(2000);
    cy.get('#bot2-Msg1').contains('Yes').click().wait(1000);
    cy.contains('Investment account has been deleted.')
  })
})

