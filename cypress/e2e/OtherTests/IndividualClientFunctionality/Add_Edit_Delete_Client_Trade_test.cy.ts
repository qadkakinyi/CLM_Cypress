/**
 * @testSuite Client Trades (Individual)
 * @description Validates add/edit/delete flows for a client's Trades detail line. Seeds a Trade Type prerequisite.
 * @priority Medium
 * @owner QA
 * @tags individual, trades, crud
 * @dependencies navigateToNewestClientMenu
 * @fileDescription Creates a trade, edits it, and then deletes it for an individual client.
 */

import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";
let externalReference = faker.string.alphanumeric(12);

let client_id = '';

describe('Add, Edit, Delete Client Trade', () => {

  /**
   * @scenario Seed Trade Type
   * @description Adds a Trade Type in Settings (e.g., “Day trading”) to be used during client trade creation.
   * @steps Visit Settings → Trade Types → Add → Enter name & mapping reference → Save
   * @expectedResult Trade type is created successfully.
   */
  before(()=>{
    cy.visit('/settings/trade-types')
    cy.contains('sa-button','Add').click()
    cy.wait(1000)
    cy.getByDataCy('trade-type-name').type('Day trading')
    cy.getByDataCy("trade-type-mapping-reference").type(faker.string.alphanumeric(20))

    cy.contains('#addTradeTypeForm [icon="save"]','Save').click()

    cy.wait(1000)
  })

  /**
   * @scenario Add Client Trade
   * @description Adds a new Trade for the client using the seeded Trade Type.
   * @testData Randomized dates, order reference, volumes, symbols, prices, profits via faker.
   * @steps Load client from fixture → Navigate to Trades → Add → Select frequency/type/currency/account → Fill numeric fields → Save
   * @expectedResult A toast appears confirming “New trade has been added”.
   */
  it('Add Client Trade', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
      clientName = data.individualClientName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Trades').click();

    // Add new Client Trade
    cy.getBySel('addTrade').click();
    cy.wait(1000);

    cy.location('pathname').then((pathname)=>{
      const pathSections = pathname.split('/');
      client_id = pathSections[3]
    })

    cy.getBySel('addClientTradeForm').should('be.visible').then(() => {
      cy.getBySel('tradeFrequenciesEnum').should('be.visible').click().wait(500);
      cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

      cy.getBySel('tradeTypes').should('be.visible').click().wait(500);
      cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

      cy.getBySel('currenciesList').should('be.visible').click().wait(500);
      cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

      cy.get('#addClientTradeForm input[name="createdOn"]').type(faker.date.anytime().toISOString().slice(0, 10));

      cy.getBySel('clientInvestmentAccountsList').should('be.visible').click().wait(500);
      cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });


      cy.get('#addClientTradeForm input[name="orderReference"]').type(faker.string.alphanumeric(12));
      cy.get('#addClientTradeForm input[name="volume"]').type(faker.string.numeric(5));
      cy.get('#addClientTradeForm input[name="symbol"]').type(faker.string.numeric(5));
      cy.get('#addClientTradeForm input[name="symbolGroup"]').type(faker.string.numeric(5));
      cy.get('#addClientTradeForm input[name="baseOpenPrice"]').type(faker.finance.amount({ min: 1, max: 999999 }));
      cy.get('#addClientTradeForm input[name="baseClosePrice"]').type(faker.finance.amount({ min: 1, max: 999999 }));
      cy.get('#addClientTradeForm input[name="foreignOpenPrice"]').type(faker.finance.amount({ min: 1, max: 999999 }));
      cy.get('#addClientTradeForm input[name="foreignClosePrice"]').type(faker.finance.amount({ min: 1, max: 999999 }));
      cy.get('#addClientTradeForm input[name="baseOpenPrice"]').type(faker.finance.amount({ min: 1, max: 999999 }));
      cy.get('#addClientTradeForm .openTime').type('07');
      cy.get('#addClientTradeForm .closeTime').type('07');

      cy.get('#addClientTradeForm input[name="baseProfit"]').type(faker.finance.amount({ min: 1, max: 999999 }));
      cy.get('#addClientTradeForm input[name="foreignProfit"]').type(faker.finance.amount({ min: 1, max: 999999 }));
      cy.get('#addClientTradeForm input[name="baseTradeAmount"]').type(faker.finance.amount({ min: 1, max: 999999 }));
      cy.get('#addClientTradeForm input[name="foreignTradeAmount"]').type(faker.finance.amount({ min: 1, max: 999999 }));

      cy.get('#addClientTradeForm input[name="externalReference"]').type(externalReference);

      cy.getBySel('saveTrade').click().wait(1500);
      cy.contains('New trade has been added')
    });
  });

  /**
   * @scenario Edit Client Trade
   * @description Opens the first trade row and updates the Order Reference.
   * @steps Visit client → Trades → Open first row → Update Order Reference → Save & Close
   * @expectedResult Trade is updated successfully.
   */
  it('Edit client trade', () => {
    // Edit Cards
    cy.visit(`/main/client-individual/${client_id}/1/trades`).wait(2000);
    cy.getBySel('gridClientTrades').scrollIntoView().then(() => {
      // cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(1).type(externalReference);
      //
      // cy.wait(2000);

      cy.get('#gridClientTrades .fa-angle-double-right').eq(0).click({ force: true });

      cy.get('#editClientTradeForm').scrollIntoView();

      cy.get('#editClientTradeForm input[name="orderReference"]').clear();
      cy.get('#editClientTradeForm input[name="orderReference"]').type(faker.string.alphanumeric(12));

      cy.getBySel('saveAndCloseButton').click();
    });
  })

  /**
   * @scenario Delete Client Trade
   * @description Deletes the first trade record from the client’s Trades grid.
   * @steps Visit client → Trades → Open first row → Delete → Confirm
   * @expectedResult Trade is deleted successfully.
   */
  it('Delete client trade', () => {
    cy.visit(`/main/client-individual/${client_id}/1/trades`).wait(2000);
    // cy.getBySel('gridClientTrades').scrollIntoView();
    // cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(1).type(externalReference);
    //
    // cy.wait(2000);

    cy.get('#gridClientTrades .fa-angle-double-right').eq(0).click({ force: true });

    // Delete Cards
    cy.getBySel('deleteTrade').scrollIntoView().click();
    cy.get('#bot2-Msg1').contains('Yes').click();
  })
})

