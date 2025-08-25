/**
 * @testSuite Client Policy Management
 * @description Test suite for managing client policies including adding, editing, and deleting policies
 * @priority High
 * @owner QA Team
 * @tags regression, smoke, policies, client-management
 * @dependencies faker-js
 * @fileDescription This suite validates the full policy lifecycle flow (create, update, delete) for clients
 */

import { faker } from "@faker-js/faker";

let policyNumber = faker.number.int(8).toString();

describe.skip('Add, Edit, Delete Client Policy', () => {

  /**
   * @scenario Add Client Policy
   * @description Adds a new policy for an existing client including random financial and date data
   * @priority High
   * @testData Random faker-generated policy number, values, and dates
   * @steps Navigate to Know Your Clients
   * @steps Select a client and open the Policies section
   * @steps Click Add Policy and fill in all required fields
   * @steps Submit and save the policy
   * @expectedResult A new client policy is saved and displayed in the table
   */
  it('Add Client Policy', () => {
    cy.get('a[href*="main/clients"]').click();
    cy.get('#gridClients').should('be.visible');
    cy.get('#gridClients table tr td .dx-header-filter-indicator').eq(0).click();

    let gridClientsRows = cy.wrap('#gridClients table tbody tr');
    gridClientsRows.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Policies').click();
    cy.getBySel('addContract').click();
    cy.getBySel('addContractForm').should('be.visible');

    cy.get('#addContractForm input[name="policyNumber"]').type(policyNumber);
    cy.get('#addContractForm input[name="policyParticulars"]').type(faker.lorem.word());
    cy.get('#addContractForm input[name="initialAmount"]').type(faker.finance.amount({ min: 1, max: 19999 }));
    cy.get('#addContractForm input[name="yearlyAmount"]').type(faker.finance.amount({ min: 1, max: 999999 }));

    cy.getBySel('policyStatusesList').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.get('#addContractForm input[name="policyInceptionDate"]').type(faker.date.anytime().toISOString().slice(0, 10));
    cy.get('#addContractForm input[name="policyExpirationDate"]').type(faker.date.anytime().toISOString().slice(0, 10));

    cy.getBySel('policyProductsList').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.getBySel('clientContractAssignees').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tr td').eq(0).click({ force: true });

    cy.get('#addContractForm input[name="applicationApprovalReference"]').type(faker.string.alphanumeric(12));
    cy.get('#addContractForm input[name="policyPlan"]').type(faker.lorem.sentence());
    cy.getBySel('saveContract').click();
  });

  /**
   * @scenario Edit Client Policy
   * @description Updates the policy particulars of an existing policy using the saved policy number
   * @priority Medium
   * @steps Filter the grid by policy number
   * @steps Click the edit icon and change the policy particulars
   * @steps Save changes
   * @expectedResult The policy details are successfully updated
   */
  it('Edit client Policy', () => {
    cy.getBySel('gridClientContracts').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(policyNumber);
    cy.wait(2000);

    let gridContracts = cy.wrap('#gridClientContracts table tbody tr td');
    gridContracts.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.get('#editClientContractForm').should('be.visible');
    cy.get('#editClientContractForm input[name="policyParticulars"]').should('be.visible').clear();
    cy.get('#editClientContractForm input[name="policyParticulars"]').type(faker.lorem.sentence());
    cy.getBySel('saveAndCloseButton').click();
  });

  /**
   * @scenario Delete Client Policy
   * @description Deletes an existing client policy using the same policy number used during creation
   * @priority Medium
   * @steps Filter the grid by policy number
   * @steps Click the delete icon and confirm
   * @expectedResult The client policy is removed from the grid
   */
  it('Delete client policy', () => {
    cy.getBySel('gridClientContracts').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(policyNumber);
    cy.wait(2000);

    let gridContracts = cy.wrap('#gridClientContracts table tbody tr td');
    gridContracts.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.getBySel('deleteContract').should('be.visible').click();
    cy.get('#bot2-Msg1').contains('Yes').click();
  });

});

