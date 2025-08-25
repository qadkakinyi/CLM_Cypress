/**
 * @testSuite Individual Client Gaming Transactions
 * @description Validates adding, editing, and deleting gaming transactions for an individual client
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, gaming-transactions
 * @dependencies faker-js, navigateToNewestClientMenu
 * @fileDescription Performs CRUD on the 'Gaming Transactions' section for an individual client profile.
 */

import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let accountExternalReference = faker.string.alphanumeric(16);

let client_id = '';

describe('Add, Edit, Delete Client Gaming Transactions', () => {

  /**
   * @scenario Add Gaming Transaction
   * @description Creates a new gaming transaction using faker-generated values
   * @priority Medium
   * @testData Faker IPv4, userAgent, numeric fields, external reference
   * @steps Load individual client from fixture and navigate to newest client
   * @steps Open Gaming Transactions and click Add
   * @steps Fill required fields (date, IP, device, volume, play times, country, limits, ext ref, comments)
   * @steps Select game type and link to a gaming account
   * @steps Save the transaction
   * @expectedResult Transaction is created successfully
   */
  it('Add Client Gaming Transactions', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
      clientName = data.individualClientName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Gaming Transactions').click();

    cy.getBySel('addGamingTransaction').should('be.visible').click();

    cy.location('pathname').then((pathname)=>{
      const pathSections = pathname.split('/');
      client_id = pathSections[3]
    })

    cy.wait(1500)
    cy.get('.datetimeDevExtreme').type('01');

    cy.get('#addClientGamingTransactionForm input[name="ipAddress"]').type(faker.internet.ipv4());
    cy.get('#addClientGamingTransactionForm input[name="deviceUsed"]').type(faker.internet.userAgent());
    cy.get('#addClientGamingTransactionForm input[name="volume"]').type(faker.number.int({ min: 1, max: 100 }).toString());
    cy.get('#addClientGamingTransactionForm input[name="playTime"]').type(faker.number.int({ min: 1, max: 100 }).toString());

    cy.getBySel('countriesList').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.get('#addClientGamingTransactionForm input[name="totalPlayTimeSinceLast"]').type(faker.number.int({ min: 1, max: 100 }).toString());
    cy.get('#addClientGamingTransactionForm input[name="promotionAmount"]').type(faker.number.int({ min: 1, max: 100 }).toString());
    cy.get('#addClientGamingTransactionForm input[name="withdrawalLimit"]').type(faker.number.int({ min: 1, max: 100 }).toString());
    cy.get('#addClientGamingTransactionForm input[name="amountOnHold"]').type(faker.number.int({ min: 1, max: 100 }).toString());
    cy.get('#addClientGamingTransactionForm input[name="externalReference"]').type(accountExternalReference);
    cy.get('#addClientGamingTransactionForm textarea[name="comments"]').type(faker.lorem.paragraph());

    cy.getBySel('gameTypesList').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.get('#addClientGamingTransactionForm dx-drop-down-box[formControlName="clientGamingAccountId"]').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #accountListDataGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.getBySel('saveGamingTransaction').should('be.visible').click().wait(1000);
  });

  /**
   * @scenario Edit Gaming Transaction
   * @description Filters by external reference and updates the IP Address
   * @priority Medium
   * @steps Visit client Gaming Transactions
   * @steps Filter grid by External Reference and open first row in edit mode
   * @steps Update IP Address and Save & Close
   * @expectedResult Transaction is updated successfully
   */
  it('Edit client Gaming Transactions', () => {
    cy.visit(`/main/client-individual/${client_id}/1/gaming-transactions`)
    cy.wait(2000)
    cy.getBySel('gridClientGamingTransactions').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(7).type(accountExternalReference);

    cy.wait(2000);

    let gridGamingTransactions = cy.wrap('#gridClientGamingTransactions table tbody tr td');
    gridGamingTransactions.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.get('#editClientGamingTransactionForm input[name="ipAddress"]').clear();
    cy.get('#editClientGamingTransactionForm input[name="ipAddress"]').type(faker.internet.ipv4());
    cy.getBySel('saveAndCloseButton').click().wait(1000);
  })

  /**
   * @scenario Delete Gaming Transaction
   * @description Deletes the previously created gaming transaction
   * @priority Medium
   * @steps Visit client Gaming Transactions
   * @steps Filter by External Reference and open the first row
   * @steps Click Delete and confirm Yes
   * @expectedResult Transaction is deleted successfully
   */
  it('Delete client Gaming Transactions', () => {
    cy.visit(`/main/client-individual/${client_id}/1/gaming-transactions`).wait(2000)
    cy.getBySel('gridClientGamingTransactions').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(7).type(accountExternalReference);

    cy.wait(3000);

    let gridGamingTransactions = cy.wrap('#gridClientGamingTransactions table tbody tr td');
    gridGamingTransactions.get('.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(2000);

    cy.getBySel('deleteGamingTransaction').should('be.visible').click();
    cy.get('#bot2-Msg1').contains('Yes').click().wait(1000);
  });
})

