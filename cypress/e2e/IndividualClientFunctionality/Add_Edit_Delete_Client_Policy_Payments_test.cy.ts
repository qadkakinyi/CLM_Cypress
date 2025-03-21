import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../support/e2e";

let policyNumber = faker.number.int(8).toString()

let client_id = '';

describe('Add, Edit, Delete Client Policy Payments', () => {
  it('Go to Policy Payments detail line', () => {
    // Click on Know your Clients navigation item
    navigateToNewestClientMenu('Individual')

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Policy Payments').click();
    cy.wait(500)
    //get the current client id
    cy.location('pathname').then((pathname)=>{
      const pathSections = pathname.split('/');
      client_id = pathSections[3]
    })
    
  })

  it('Add Client Policy Payment Collection', () => {
    // Add new Client Policies
    cy.visit(`/main/client-individual/${client_id}/1/contract-payments`).wait(2000)
    cy.getBySel('addContractCollection').click();

    cy.getBySel('addClientContractCollectionForm').should('be.visible');

    cy.getBySel('clientContractPolicyNumbers').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.getBySel('transactionPaymentMethods').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.get('#addClientContractCollectionForm input[name="paymentAmount"]').type(faker.finance.amount({ min: 1, max: 19999 }));
    cy.get('#addClientContractCollectionForm input[name="paymentDate"]').type(faker.date.anytime().toISOString().slice(0, 10));
    cy.get('#addClientContractCollectionForm input[name="paymentDescription"]').type(faker.lorem.word());
    cy.get('#addClientContractCollectionForm input[name="reasonForTransaction"]').type(faker.lorem.word());

    cy.getBySel('savePaymentCollection').click().wait(1500);
  });

  it('Edit client Policy collection', () => {
    // Edit Policy contract collection
    cy.visit(`/main/client-individual/${client_id}/1/contract-payments`)
    cy.wait(3000)
    cy.getBySel('gridClientContractCollections').should('be.visible');
    cy.get('#gridClientContractCollections table tbody tr td.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(1000);

    cy.get('#editClientContractCollectionForm').should('be.visible');

    cy.get('#editClientContractCollectionForm input[name="paymentDescription"]').should('be.visible').clear();
    cy.get('#editClientContractCollectionForm input[name="paymentDescription"]').type(faker.lorem.sentence());

    cy.getBySel('saveAndCloseButton').click().wait(1500);
  })

  it('Delete client policy collection', () => {
    // Delete policy contract collection
    cy.visit(`/main/client-individual/${client_id}/1/contract-payments`)
    cy.wait(2000)
    cy.getBySel('gridClientContractCollections').should('be.visible');
    cy.get('#gridClientContractCollections table tbody tr td.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.getBySel('deleteContractCollection').should('be.visible').click();
    cy.get('#bot2-Msg1').contains('Yes').click().wait(1000);
  })

  it('Add Client Policy Payment Transaction', () => {
    // Add new Client Policies
    cy.visit(`/main/client-individual/${client_id}/1/contract-payments`)
    cy.wait(2000)
    cy.get('.dx-item.dx-tab .dx-template-wrapper.dx-item-content').contains('span', 'Transactions').should('be.visible').click();

    cy.getBySel('addContractTransaction').click();
    cy.wait(1000)

    cy.getBySel('addClientContractTransactionForm').should('be.visible');

    // cy.getBySel('policyNumbers').click();
    // cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.get('#addClientContractTransactionForm input[name="paymentAmount"]').type(faker.finance.amount({ min: 1, max: 19999 }));
    cy.get('#addClientContractTransactionForm input[name="paymentDate"]').type(faker.date.anytime().toISOString().slice(0, 10));
    cy.get('#addClientContractTransactionForm input[name="paymentDescription"]').type(faker.lorem.word());
    cy.get('#addClientContractTransactionForm input[name="reasonForTransaction"]').type(faker.lorem.word());

    cy.getBySel('saveContractTransaction').click().wait(1500);
  });

  it('Edit client Policy payment transaction', () => {
    // Edit Policy contract transaction
    cy.visit(`/main/client-individual/${client_id}/1/contract-payments`)
    cy.wait(2000)
    cy.get('.dx-item.dx-tab .dx-template-wrapper.dx-item-content').contains('span', 'Transactions').should('be.visible').click();
    cy.getBySel('gridClientContractTransactions').should('be.visible');
    cy.get('#gridClientContractTransactions table tbody tr td.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.get('#editClientContractTransactionForm').should('be.visible');

    cy.get('#editClientContractTransactionForm input[name="paymentDescription"]').should('be.visible').clear();
    cy.get('#editClientContractTransactionForm input[name="paymentDescription"]').type(faker.lorem.sentence());

    cy.getBySel('saveAndCloseButton').click().wait(1500);
  })

  it('Delete client policy transaction', () => {
    cy.visit(`/main/client-individual/${client_id}/1/contract-payments`)
    cy.wait(2000)
    cy.get('.dx-item.dx-tab .dx-template-wrapper.dx-item-content').contains('span', 'Transactions').should('be.visible').click();

    // Delete policy contract transaction
    cy.getBySel('gridClientContractTransactions').should('be.visible');
    cy.get('#gridClientContractTransactions table tbody tr td.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.getBySel('deleteContractTransaction').should('be.visible').click();
    cy.get('#bot2-Msg1').contains('Yes').click().wait(1000);
  })
})
