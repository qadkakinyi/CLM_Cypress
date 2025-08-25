import { faker } from "@faker-js/faker";
import { navigateToNewestClientMenu } from "../../../support/e2e";

let transactionReference: string = faker.string.alphanumeric(12);
let location = '';

/**
 * @testSuite Client Transactions - Corporate
 * @description Test suite for managing client transactions in the corporate module
 * @priority High
 * @owner QA Team
 * @tags regression, transactions, client-management
 * @dependencies client_corporate.json, faker-js
 */

/**
 * Navigates to the transaction using its reference code
 * @param transactionReference string reference to filter and select transaction
 */
function goToTransactionByReference(transactionReference: string) {
  cy.visit(location).wait(3000)
  cy.get('[aria-colindex="2"] .dx-texteditor-input').type(transactionReference, { force: true })
  cy.wait(2000);
  let gridTransactions = cy.wrap('#gridClientTransactions table tbody tr td');
  gridTransactions.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });
}

describe('Add, Edit, Delete Client Transactions - Corporate', () => {

  /**
   * @scenario Add Transaction
   * @description Adds a new transaction for the selected corporate client
   * @expectedResult Transaction is successfully added and confirmed
   */
  it('Add Client Transactions', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
      clientName = data.companyName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
        .contains('span', 'Transactions').click();

    cy.getBySel('addClientTransaction').click().wait(2000);

    cy.location('pathname').then((loc) => {
      location = loc
    })

    cy.get('#addClientTransactionForm .datetimeDevExtreme.transactionDate .dx-texteditor-input').type('03');
    cy.get('#addClientTransactionForm .datetimeDevExtreme.approvalDate .dx-texteditor-input').type('03');

    cy.get('#addClientTransactionForm input[name="baseAmount"]').type(faker.finance.amount({ min: 5, max: 10000 }));

    cy.getBySel('transactionTypesList').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td')
        .eq(0).click({ force: true });

    cy.getBySel('transactionMethodsList').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td')
        .eq(0).click({ force: true });

    cy.getBySel('countriesList').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td')
        .eq(0).click({ force: true });

    cy.getBySel('outgoingCountryList').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td')
        .eq(0).click({ force: true });

    cy.get('#addClientTransactionForm input[name="counterpartyName"]').type(faker.company.name());
    cy.get('#addClientTransactionForm input[name="counterpartyAccount"]').type(faker.finance.accountNumber(16));
    cy.get('#addClientTransactionForm input[name="externalReference"]').type(transactionReference);

    cy.getBySel('clientAccountsList').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td')
        .eq(0).click({ force: true });

    cy.get('#addClientTransactionForm input[name="foreignAmount"]').type(faker.finance.amount({ min: 5, max: 10000 }));

    cy.getBySel('foreignCurrencyList').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td')
        .eq(0).click({ force: true });

    cy.get('#addClientTransactionForm textarea[name="description"]').type(faker.lorem.sentence());

    cy.get('app-add-transaction .fa-plus').eq(0).click()

    cy.getBySel('saveClientTransaction').click().wait(2000);
    cy.contains('The transaction has been added').wait(1000)
  });

  /**
   * @scenario Edit Transaction
   * @description Edits the external reference of a transaction
   * @expectedResult External reference value is updated successfully
   */
  it('Edit client Transactions', () => {
    try {
      goToTransactionByReference(transactionReference);

      transactionReference = faker.string.alphanumeric(12);
      cy.get('#editClientTransactionForm input[name="externalReference"]').clear();
      cy.get('#editClientTransactionForm input[name="externalReference"]').type(transactionReference);
      cy.getBySel('saveAndCloseButton').click().wait(2000);
      cy.contains('The transaction has been updated.').wait(1000)
    } catch (error) {
      cy.log(error);
    }
  })

  /**
   * @scenario Delete Transaction
   * @description Deletes an existing client transaction
   * @expectedResult Transaction is deleted and confirmation is shown
   */
  it('Delete client Transactions', () => {
    try {
      goToTransactionByReference(transactionReference);

      cy.getBySel('deleteTransaction').should('be.visible').click();
      cy.get('#bot2-Msg1').contains('Yes').click().wait(2000);
      cy.contains('Transaction has been deleted').wait(1500)
    } catch (error) {
      cy.log(error);
    }
  });
})

