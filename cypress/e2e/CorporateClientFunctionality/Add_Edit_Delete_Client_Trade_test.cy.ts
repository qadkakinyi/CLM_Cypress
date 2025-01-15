import { faker } from "@faker-js/faker";
import {navigateToClientMenu} from "../../support/e2e";
let externalReference = faker.string.alphanumeric(12);

let location = '';
describe('Add, Edit, Delete Client Trade', () => {
  
  before(()=>{
    cy.visit('/settings/trade-types')
    cy.contains('Add').click()
    cy.wait(1000)
    cy.getByDataCy('trade-type-name').type('Day trading')
    cy.getByDataCy("trade-type-mapping-reference").type(faker.string.alphanumeric(20))
    
    cy.contains('Save').click()
    
    cy.wait(1000)
  })
  
  it('Add Client Trade', () => {
    // Click on Know your Clients navigation item
   navigateToClientMenu('Corporate')

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Trades').click();

    // Add new Client Trade
    cy.getBySel('addTrade').click();
    cy.wait(1000);

    cy.location('pathname').then((loc)=>{
      location = loc
    })

    cy.getBySel('addClientTradeForm').should('be.visible').then(() => {
      cy.getBySel('tradeFrequenciesEnum').should('be.visible').click();
      cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

      cy.getBySel('tradeTypes').should('be.visible').click();
      cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

      cy.getBySel('currenciesList').should('be.visible').click();
      cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

      cy.get('#addClientTradeForm input[name="createdOn"]').type(faker.date.anytime().toISOString().slice(0, 10));

      cy.getBySel('clientInvestmentAccountsList').should('be.visible').click();
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

      cy.getBySel('saveTrade').click();
    });
  });

  it('Edit client trade', () => {
    // Edit Cards
    cy.visit(location).wait(2000);
    cy.getBySel('gridClientTrades').should('be.visible').then(() => {
      cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(1).type(externalReference, {force:true});

      cy.wait(2000);

      let gridTrades = cy.wrap('#gridClientTrades table tbody tr td');
      gridTrades.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

      cy.get('#editClientTradeForm').should('be.visible');

      cy.get('#editClientTradeForm input[name="orderReference"]').clear();
      cy.get('#editClientTradeForm input[name="orderReference"]').type(faker.string.alphanumeric(12));

      cy.getBySel('saveAndCloseButton').click();
    });
  })

  it('Delete client trade', () => {
    cy.visit(location).wait(2000)
    cy.getBySel('gridClientTrades').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(1).type(externalReference, {force:true});

    cy.wait(2000);

    let gridWallets = cy.wrap('#gridClientTrades table tbody tr td');
    gridWallets.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    // Delete Cards
    cy.getBySel('deleteTrade').should('be.visible').click();
    cy.get('#bot2-Msg1').contains('Yes').click();
  })
})
