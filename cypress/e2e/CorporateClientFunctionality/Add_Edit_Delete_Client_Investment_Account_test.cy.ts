import { faker } from "@faker-js/faker";
import {navigateToClientMenu} from "../../support/e2e";

let externalReference = faker.string.alphanumeric(12);
let accountNumber = faker.finance.accountNumber();
let location = '';

describe('Add, Edit, Delete Client Investment Account', () => {
  
  before(()=>{
    cy.visit('/settings/investment-account-types')
    cy.contains('sa-button','Add').click()
    cy.wait(1000)
    
    cy.getByDataCy("investment-account-type-name").type('Fixed Account-test')
    cy.getByDataCy("investment-account-type-mapping-reference").type('fixed-acc-types')
    
    cy.contains('#addInvestmentAccountTypeForm [icon="save"]','Save').click()
    cy.wait(1000)
    
  })
  
  it('Add Client Investment Account', () => {
    // Click on Know your Clients navigation item
    navigateToClientMenu('Corporate')

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Investment Accounts').click();

    // Add new Client Card
    cy.getBySel('addInvestmentAccount').click().wait(2000);
    
    cy.location('pathname').then((loc)=>{
      location = loc
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

      cy.getBySel('saveInvestmentAccount').click().wait(2000);
    });
  });

  it('Edit client investment account', () => {
    // Edit Cards
    cy.visit(location).wait(2000)
    cy.getBySel('gridClientInvestmentAccounts').should('be.visible').then(() => {
      cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(1).type(accountNumber);

      cy.wait(2000);

      let gridInvestmentAccounts = cy.wrap('#gridClientInvestmentAccounts table tbody tr td');
      gridInvestmentAccounts.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

      cy.get('#editClientInvestmentAccountForm').should('be.visible');

      accountNumber = faker.finance.accountNumber();
      cy.get('#editClientInvestmentAccountForm input[name="accountNumber"]').should('be.visible').clear();
      cy.get('#editClientInvestmentAccountForm input[name="accountNumber"]').type(accountNumber);

      cy.getBySel('saveAndCloseButton').click().wait(2000);
    });
  })

  it('Delete client investment account', () => {
    cy.visit(location).wait(2000)
    cy.getBySel('gridClientInvestmentAccounts').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(1).type(accountNumber);

    cy.wait(2000);

    let gridWallets = cy.wrap('#gridClientInvestmentAccounts table tbody tr td');
    gridWallets.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    // Delete Cards
    cy.getBySel('deleteInvestmentAccount').scrollIntoView().click().wait(2000);
    cy.get('#bot2-Msg1').contains('Yes').click().wait(1000);
    cy.contains('Investment account has been deleted.')
  })
})
