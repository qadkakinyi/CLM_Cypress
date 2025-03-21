import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../support/e2e";

let policyNumber = faker.number.int(8).toString()

let location = '';

describe('Add, Edit, Delete Client Policy Payments', () => {
  it('Go to Policy Payments detail line', () => {
    // Click on Know your Clients navigation item
    navigateToNewestClientMenu('Corporate')

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Policy Payments').click();
    cy.wait(500)
    //get the current client id
    cy.location('pathname').then((loc)=>{
      location = loc
    })
    
  })

  it('Add Client Policy Payment Collection', () => {
    // Add new Client Policies
    cy.visit(location).wait(3000)
    cy.getBySel('addContractCollection').click();

    // cy.getBySel('clientContractPolicyNumbers').click();
    // cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.getBySel('transactionPaymentMethods').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.get('#addClientContractCollectionForm input[name="paymentAmount"]').type(faker.finance.amount({ min: 1, max: 20 }));
    cy.get('#addClientContractCollectionForm input[name="paymentDate"]').type(faker.date.anytime().toISOString().slice(0, 10));
    cy.get('#addClientContractCollectionForm input[name="paymentDescription"]').type(faker.lorem.word());
    cy.get('#addClientContractCollectionForm input[name="reasonForTransaction"]').type(faker.lorem.word());

    cy.getBySel('savePaymentCollection').click().wait(10000);
  });

  it('Edit client Policy collection', () => {
    // Edit Policy contract collection
    cy.visit(location)
    cy.wait(3000)
    cy.get('#gridClientContractCollections table tbody tr td.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.get('#editClientContractCollectionForm').should('be.visible');

    cy.get('#editClientContractCollectionForm input[name="paymentDescription"]').should('be.visible').clear();
    cy.get('#editClientContractCollectionForm input[name="paymentDescription"]').type(faker.lorem.sentence());

    cy.getBySel('saveAndCloseButton').click();
  })

  it('Delete client policy collection', () => {
    // Delete policy contract collection
    cy.visit(location).wait(3000)
    
    cy.get('#gridClientContractCollections table tbody tr td.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(1500);

    cy.getBySel('deleteContractCollection').click();
    cy.get('#bot2-Msg1').contains('Yes').click().wait(2000);
  })

  it('Add Client Policy Payment Transaction', () => {
    // Add new Client Policies
    cy.visit(location).wait(3000)
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

    cy.getBySel('saveContractTransaction').click();
  });

  it('Edit client Policy payment transaction', () => {
    // Edit Policy contract transaction
    cy.visit(location).wait(3000)
    cy.get('.dx-item.dx-tab .dx-template-wrapper.dx-item-content').contains('span', 'Transactions').click();
    
    cy.get('#gridClientContractTransactions table tbody tr td.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(1500);

    cy.get('#editClientContractTransactionForm input[name="paymentDescription"]').clear().type(faker.lorem.sentence());

    cy.getBySel('saveAndCloseButton').click();
  })

  it('Delete client policy transaction', () => {
    cy.visit(location).wait(3000)
    cy.get('.dx-item.dx-tab .dx-template-wrapper.dx-item-content').contains('span', 'Transactions').click();

    // Delete policy contract transaction
    cy.get('#gridClientContractTransactions table tbody tr td.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(1000);

    cy.getBySel('deleteContractTransaction').click();
    cy.get('#bot2-Msg1').contains('Yes').click();
    cy.contains('Policy transaction has been deleted.')
  })
})
