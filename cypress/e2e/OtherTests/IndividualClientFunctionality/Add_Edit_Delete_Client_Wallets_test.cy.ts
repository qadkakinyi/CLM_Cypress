import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let walletName = faker.lorem.word(10);

let client_id = '';

describe('Add, Edit, Delete Client Wallets', () => {
  it('Add Client Wallet', () => {let clientName;
    cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
      clientName = data.individualClientName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Wallets').click();
    cy.wait(1000)
    
    cy.location('pathname').then((pathname)=>{
      const pathSections = pathname.split('/');
      client_id = pathSections[3]
    })
    // Add new Client Wallet
    cy.getBySel('addWallet').click();
    cy.wait(1000);

    cy.getBySel('addClientWalletForm').should('be.visible').then(() => {
      cy.get('#addClientWalletForm input[name="name"]').type(walletName);
      cy.get('#addClientWalletForm input[name="address"]').type(faker.finance.bitcoinAddress());
      cy.get('#addClientWalletForm ng-multiselect-dropdown[name="currencies"]').click();
      cy.get('#addClientWalletForm .item2').eq(0).click();

      cy.getBySel('saveClientWallet').click().wait(1000);
    });
  });

  it('Edit client Wallet', () => {
    // Edit Wallet
    cy.visit(`/main/client-individual/${client_id}/1/wallets`)
    cy.wait(2000)
    cy.getBySel('gridClientWallets').should('be.visible').then(() => {
      cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(walletName);

      cy.wait(2000);

      let gridWallets = cy.wrap('#gridClientCards table tbody tr td');
      gridWallets.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

      cy.get('#editClientWalletForm').scrollIntoView();

      walletName = faker.lorem.word(10);      
      cy.get('#editClientWalletForm input[name="name"]').scrollIntoView().clear().type(walletName);

      cy.getBySel('saveAndCloseButton').click().wait(1000);
    });
  })

  it('Delete client Wallet', () => {
    cy.visit(`/main/client-individual/${client_id}/1/wallets`)
    cy.wait(2000)
    cy.getBySel('gridClientWallets').scrollIntoView()
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(walletName);

    cy.wait(2000);

    let gridWallets = cy.wrap('#gridClientWallets table tbody tr td');
    gridWallets.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    // Delete Wallet
    cy.getBySel('deleteWallet').scrollIntoView().click();
    cy.get('#bot2-Msg1').contains('Yes').click().wait(1000);
  })
})
