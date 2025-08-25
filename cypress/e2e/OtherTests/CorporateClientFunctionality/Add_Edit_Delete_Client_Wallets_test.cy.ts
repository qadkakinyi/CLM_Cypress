import { faker } from "@faker-js/faker";
import { navigateToClientMenu, navigateToNewestClientMenu } from "../../../support/e2e";

let walletName = '';
let location = '';

/**
 * @testSuite Client Wallets - Corporate
 * @description Test suite for adding, editing, and deleting wallets linked to corporate clients
 * @priority High
 * @owner QA Team
 * @tags wallets, regression, client-management
 * @dependencies client_corporate.json, faker-js
 */

describe('Add, Edit, Delete Client Wallets', () => {

  /**
   * @scenario Add Wallet
   * @description Adds a new wallet to the selected corporate client
   * @expectedResult Wallet is saved and visible in the wallet grid
   */
  it('Add Client Cards', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
      clientName = data.companyName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
        .contains('span', 'Wallets').click();
    cy.wait(1000)

    cy.location('pathname').then((loc) => {
      location = loc
    })

    cy.getBySel('addWallet').click();
    cy.wait(1000);
    walletName = faker.lorem.word(10);

    cy.getBySel('addClientWalletForm').should('be.visible').then(() => {
      cy.get('#addClientWalletForm input[name="name"]').type(walletName);
      cy.get('#addClientWalletForm input[name="address"]').type(faker.finance.bitcoinAddress());
      cy.get('#addClientWalletForm ng-multiselect-dropdown[name="currencies"]').click();
      cy.get('#addClientWalletForm .item2').eq(0).click();

      cy.getBySel('saveClientWallet').click();
    });
  });

  /**
   * @scenario Edit Wallet
   * @description Updates the wallet name of an existing client wallet
   * @expectedResult Wallet name is updated and confirmation message is shown
   */
  it('Edit client Cards', () => {
    cy.visit(location).wait(2000)
    cy.getBySel('gridClientWallets').scrollIntoView().then(() => {
      cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(walletName);

      cy.wait(2000);

      let gridWallets = cy.wrap('#gridClientCards table tbody tr td');
      gridWallets.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

      cy.get('#editClientWalletForm').should('be.visible');

      walletName = faker.lorem.word(10);
      cy.get('#editClientWalletForm input[name="name"]').scrollIntoView().clear().type(walletName);

      cy.getBySel('saveAndCloseButton').click().wait(2000);
      cy.contains('Client wallet has been updated')
    });
  });

  /**
   * @scenario Delete Wallet
   * @description Deletes the selected client wallet from the profile
   * @expectedResult Wallet is removed and confirmation message is displayed
   */
  it('Delete client Cards', () => {
    cy.visit(location)
    cy.wait(2000)
    cy.getBySel('gridClientWallets').scrollIntoView()
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(walletName);

    cy.wait(2000);

    let gridWallets = cy.wrap('#gridClientWallets table tbody tr td');
    gridWallets.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.getBySel('deleteWallet').scrollIntoView().click();
    cy.get('#bot2-Msg1').contains('Yes').click().wait(2000);
    cy.contains('The wallet has been deleted')
  });
});

