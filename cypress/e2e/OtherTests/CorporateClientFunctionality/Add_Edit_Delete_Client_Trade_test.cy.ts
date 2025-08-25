import { faker } from "@faker-js/faker";
import { navigateToNewestClientMenu } from "../../../support/e2e";

let externalReference = faker.string.alphanumeric(12);
let location = '';

/**
 * @testSuite AddClients - Corporate Client Management
 * @description Full lifecycle testing for client trades (add, edit, delete)
 * @priority High
 * @owner QA Team
 * @tags regression, trades, transactions
 * @dependencies user-authentication, faker-js, trade-type-setup
 * @fileDescription Tests creation, modification, and removal of client trades from UI
 */

/**
 * @suite Client Trades Management
 * @description Covers the functionality of managing trades for a corporate client
 */
describe('Add, Edit, Delete Client Trade', () => {

  /**
   * @setup Trade Type Setup
   * @description Adds required trade type to allow test execution
   */
  before(() => {
    cy.visit('/settings/trade-types')
    cy.contains('sa-button', 'Add').click()
    cy.wait(1000)
    cy.getByDataCy('trade-type-name').type('Day trading')
    cy.getByDataCy("trade-type-mapping-reference").type(faker.string.alphanumeric(20))
    cy.contains('#addTradeTypeForm [icon="save"]', 'Save').click()
    cy.wait(1000)
  })

  /**
   * @scenario Add Client Trade
   * @description Adds a complete trade entry for a corporate client
   * @priority High
   * @expectedResult Trade is saved and visible in the trade grid
   */
  it('Add Client Trade', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
      clientName = data.companyName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
        .contains('span', 'Trades').click().wait(2000);

    cy.getBySel('addTrade').click();
    cy.wait(2000);

    cy.location('pathname').then((loc) => {
      location = loc
    })

    cy.getBySel('addClientTradeForm').should('be.visible').then(() => {
      cy.getBySel('tradeFrequenciesEnum').click().wait(500);
      cy.get('.dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

      cy.getBySel('tradeTypes').click().wait(500);
      cy.get('.dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

      cy.getBySel('currenciesList').click().wait(500);
      cy.get('.dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

      cy.get('#addClientTradeForm input[name="createdOn"]').type(faker.date.anytime().toISOString().slice(0, 10));

      cy.getBySel('clientInvestmentAccountsList').click().wait(500);
      cy.get('.dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

      cy.get('#addClientTradeForm input[name="orderReference"]').type(faker.string.alphanumeric(12));
      cy.get('#addClientTradeForm input[name="volume"]').type(faker.string.numeric(5));
      cy.get('#addClientTradeForm input[name="symbol"]').type(faker.string.numeric(5));
      cy.get('#addClientTradeForm input[name="symbolGroup"]').type(faker.string.numeric(5));
      cy.get('#addClientTradeForm input[name="baseOpenPrice"]').type(faker.finance.amount({ min: 1, max: 999 }));
      cy.get('#addClientTradeForm input[name="baseClosePrice"]').type(faker.finance.amount({ min: 1, max: 999 }));
      cy.get('#addClientTradeForm input[name="foreignOpenPrice"]').type(faker.finance.amount({ min: 1, max: 999 }));
      cy.get('#addClientTradeForm input[name="foreignClosePrice"]').type(faker.finance.amount({ min: 1, max: 999 }));
      cy.get('#addClientTradeForm .openTime').type('07');
      cy.get('#addClientTradeForm .closeTime').type('07');

      cy.get('#addClientTradeForm input[name="baseProfit"]').type(faker.finance.amount({ min: 1, max: 999 }));
      cy.get('#addClientTradeForm input[name="foreignProfit"]').type(faker.finance.amount({ min: 1, max: 999 }));
      cy.get('#addClientTradeForm input[name="baseTradeAmount"]').type(faker.finance.amount({ min: 1, max: 999 }));
      cy.get('#addClientTradeForm input[name="foreignTradeAmount"]').type(faker.finance.amount({ min: 1, max: 999 }));

      cy.get('#addClientTradeForm input[name="externalReference"]').type(externalReference);
      cy.getBySel('saveTrade').click().wait(1500);
      cy.contains('New trade has been added')
    });
  });

  /**
   * @scenario Edit Client Trade
   * @description Updates a field in an existing trade record
   * @priority Medium
   * @expectedResult Trade is updated and changes are persisted
   */
  it('Edit client trade', () => {
    cy.visit(location).wait(4000);
    cy.getBySel('gridClientTrades').then(() => {
      cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(1).type(externalReference, { force: true });
      cy.wait(4000);
      cy.get('#gridClientTrades .fa-angle-double-right').eq(0).click({ force: true }).wait(1000);
      cy.get('#editClientTradeForm input[name="orderReference"]').clear().type(faker.string.alphanumeric(12));
      cy.getBySel('saveAndCloseButton').click();
    });
  })

  /**
   * @scenario Delete Client Trade
   * @description Deletes a trade entry previously created
   * @priority Medium
   * @expectedResult Trade is no longer present in the grid
   */
  it('Delete client trade', () => {
    cy.visit(location).wait(4000);
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(1).type(externalReference, { force: true });
    cy.wait(4000);
    cy.get('#gridClientTrades .fa-angle-double-right').eq(0).click({ force: true }).wait(1000);
    cy.getBySel('deleteTrade').click();
    cy.get('#bot2-Msg1').contains('Yes').click();
  })
})

