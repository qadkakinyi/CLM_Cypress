import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../support/e2e";

let transactionReference = faker.string.alphanumeric(12);
let client_id = '';

function goToTransactionByReference(transactionReference) {
  cy.visit(`/main/client-individual/${client_id}/1/transactions`).wait(2000)
  cy.getBySel('gridClientTransactions').should('be.visible');
  cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(1).type(transactionReference);

  cy.wait(2000);

  let gridTransactions = cy.wrap('#gridClientTransactions table tbody tr td');
  gridTransactions.get('.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(1500);
}

describe('Add, Edit, Delete Client Transactions - Individual', () => {
  it('Add Client Transactions', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
      clientName = data.individualClientName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Transactions').click();

    // Add new Client Transaction
    cy.getBySel('addClientTransaction').click();

    cy.location('pathname').then((pathname)=>{
      const pathSections = pathname.split('/');
      client_id = pathSections[3]
    })

    cy.get('#addClientTransactionForm .datetimeDevExtreme.transactionDate .dx-texteditor-input').type('03');
    cy.get('#addClientTransactionForm .datetimeDevExtreme.approvalDate .dx-texteditor-input').type('03');

    cy.get('#addClientTransactionForm input[name="baseAmount"]').type(faker.finance.amount({ min: 5, max: 10000 }));

    cy.getBySel('transactionTypesList').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.getBySel('transactionMethodsList').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.getBySel('countriesList').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.getBySel('outgoingCountryList').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.get('#addClientTransactionForm input[name="counterpartyName"]').type(faker.company.name());
    cy.get('#addClientTransactionForm input[name="counterpartyAccount"]').type(faker.finance.accountNumber(16));
    cy.get('#addClientTransactionForm input[name="externalReference"]').type(transactionReference);

    cy.getBySel('clientAccountsList').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.get('#addClientTransactionForm input[name="foreignAmount"]').type(faker.finance.amount({ min: 5, max: 10000 }));

    cy.getBySel('foreignCurrencyList').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.get('#addClientTransactionForm textarea[name="description"]').type(faker.lorem.sentence());

    // custom fields section
    // cy.get('app-add-transaction .fa-plus').eq(0).click()
    //
    // cy.get('#CustomField_Payment_Details').type('BankXYZ')
    // cy.get('#CustomField_Transaction_Update_Date').type(faker.date.past({refDate: 1}).toISOString().slice(0, 10));

    cy.getBySel('saveClientTransaction').click().wait(1000);
    cy.contains('The transaction has been added').wait(1500)
  });

  it('Edit client Transactions', () => {
    // Edit Transaction
    try {
      goToTransactionByReference(transactionReference);

      transactionReference = faker.string.alphanumeric(12);
      cy.get('#editClientTransactionForm input[name="externalReference"]').clear();
      cy.get('#editClientTransactionForm input[name="externalReference"]').type(transactionReference);
      cy.getBySel('saveAndCloseButton').click().wait(1000);
      cy.contains('The transaction has been updated').wait(1500)
    } catch (error) {
      cy.log(error);
    }
  })

  it('Delete client Transactions', () => {
    try {
      goToTransactionByReference(transactionReference);

      // Delete Transactions
      cy.getBySel('deleteTransaction').should('be.visible').click();
      cy.get('#bot2-Msg1').contains('Yes').click().wait(2000);
      cy.contains('Transaction has been deleted').wait(1500)
    } catch (error) {
      cy.log(error);
    }
  });
})
