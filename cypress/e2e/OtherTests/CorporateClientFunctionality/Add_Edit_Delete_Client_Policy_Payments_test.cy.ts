import { faker } from "@faker-js/faker";
import { navigateToClientMenu, navigateToNewestClientMenu } from "../../../support/e2e";

let policyNumber = faker.number.int(8).toString();
let location = '';

/**
 * @testSuite AddClients - Corporate Client Management
 * @description Test suite for managing client policy payment collections and transactions
 * @priority High
 * @owner QA Team
 * @tags regression, policy-payments, client-management
 * @dependencies user-authentication, faker-js
 * @fileDescription Tests the full CRUD lifecycle for client policy payment collections and transactions
 */

/**
 * @suite Client Policy Payments
 * @description Tests for adding, editing, and deleting payment collections and transactions
 * @prerequisites Corporate client and associated policy must exist
 * @testData Faker-generated payment details
 */
describe('Add, Edit, Delete Client Policy Payments', () => {

  /**
   * @scenario Navigate to Policy Payments
   * @description Opens policy payments tab for a given corporate client
   * @priority Medium
   * @expectedResult Navigates to client policy payments section successfully
   */
  it('Go to Policy Payments detail line', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
      clientName = data.companyName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
        .contains('span', 'Policy Payments').click();
    cy.wait(500)

    cy.location('pathname').then((loc) => {
      location = loc
    })
  })

  /**
   * @scenario Add Policy Payment Collection
   * @description Adds a new policy payment collection
   * @priority High
   * @expectedResult Payment collection is added to the client policy record
   */
  it('Add Client Policy Payment Collection', () => {
    cy.visit(location).wait(3000)
    cy.getBySel('addContractCollection').click();
    cy.wait(1500)

    cy.getBySel('transactionPaymentMethods').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click();

    cy.get('#addClientContractCollectionForm input[name="paymentAmount"]').type(faker.finance.amount({ min: 1, max: 20 }));
    cy.get('#addClientContractCollectionForm input[name="paymentDate"]').type(faker.date.anytime().toISOString().slice(0, 10));
    cy.get('#addClientContractCollectionForm input[name="paymentDescription"]').type(faker.lorem.word());
    cy.get('#addClientContractCollectionForm input[name="reasonForTransaction"]').type(faker.lorem.word());

    cy.getBySel('savePaymentCollection').click().wait(10000);
  })

  /**
   * @scenario Edit Policy Payment Collection
   * @description Edits the payment description of a policy collection
   * @priority Medium
   * @expectedResult Description is updated and saved successfully
   */
  it('Edit client Policy collection', () => {
    cy.visit(location)
    cy.wait(3000)
    cy.get('#gridClientContractCollections table tbody tr td.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.get('#editClientContractCollectionForm').should('be.visible');
    cy.get('#editClientContractCollectionForm input[name="paymentDescription"]').clear().type(faker.lorem.sentence());
    cy.getBySel('saveAndCloseButton').click();
  })

  /**
   * @scenario Delete Policy Payment Collection
   * @description Deletes a policy payment collection entry
   * @priority Medium
   * @expectedResult Payment collection is removed from grid
   */
  it('Delete client policy collection', () => {
    cy.visit(location).wait(3000)
    cy.get('#gridClientContractCollections table tbody tr td.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(1500);
    cy.getBySel('deleteContractCollection').click();
    cy.get('#bot2-Msg1').contains('Yes').click().wait(2000);
  })

  /**
   * @scenario Add Policy Payment Transaction
   * @description Adds a transaction under the policy payment's transaction tab
   * @priority High
   * @expectedResult Transaction record is added successfully
   */
  it('Add Client Policy Payment Transaction', () => {
    cy.visit(location).wait(3000)
    cy.get('.dx-item.dx-tab .dx-template-wrapper.dx-item-content')
        .contains('span', 'Transactions').click();

    cy.getBySel('addContractTransaction').click().wait(1000);
    cy.getBySel('addClientContractTransactionForm').should('be.visible');

    cy.get('#addClientContractTransactionForm input[name="paymentAmount"]').type(faker.finance.amount({ min: 1, max: 19999 }));
    cy.get('#addClientContractTransactionForm input[name="paymentDate"]').type(faker.date.anytime().toISOString().slice(0, 10));
    cy.get('#addClientContractTransactionForm input[name="paymentDescription"]').type(faker.lorem.word());
    cy.get('#addClientContractTransactionForm input[name="reasonForTransaction"]').type(faker.lorem.word());

    cy.getBySel('saveContractTransaction').click();
  })

  /**
   * @scenario Edit Policy Transaction
   * @description Modifies the payment description of a policy transaction
   * @priority Medium
   * @expectedResult Description field reflects updated data
   */
  it('Edit client Policy payment transaction', () => {
    cy.visit(location).wait(3000)
    cy.get('.dx-item.dx-tab .dx-template-wrapper.dx-item-content').contains('span', 'Transactions').click();

    cy.get('#gridClientContractTransactions table tbody tr td.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(1500);
    cy.get('#editClientContractTransactionForm input[name="paymentDescription"]').clear().type(faker.lorem.sentence());
    cy.getBySel('saveAndCloseButton').click();
  })

  /**
   * @scenario Delete Policy Transaction
   * @description Removes a previously added transaction
   * @priority Medium
   * @expectedResult Transaction no longer appears in the transaction grid
   */
  it('Delete client policy transaction', () => {
    cy.visit(location).wait(3000)
    cy.get('.dx-item.dx-tab .dx-template-wrapper.dx-item-content').contains('span', 'Transactions').click();
    cy.get('#gridClientContractTransactions table tbody tr td.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(1000);
    cy.getBySel('deleteContractTransaction').click();
    cy.get('#bot2-Msg1').contains('Yes').click();
    cy.contains('Policy transaction has been deleted.');
  })
})

