/**
 * @testSuite Client MID Accounts (Individual)
 * @description Adds prerequisites (MID Type/Class), adds a bank account, then validates add/edit/delete flows for client MID Accounts; finally cleans up the bank account.
 * @priority High
 * @owner QA
 * @tags mid-accounts, bank-accounts, individual, crud
 * @dependencies navigateToNewestClientMenu, add_bank_account
 */

import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";
import {add_bank_account} from "./Add_Edit_Delete_Client_Bank_Account_test.cy";

let code = '';

let client_id = '';

describe('Add, Edit, Delete Client MID Accounts', () => {
  /**
   * @scenario Pre-setup for MID Accounts
   * @description Creates required MID Type and MID Class in Settings before running MID Account tests.
   * @steps
   * 1. Create MID Type in Settings.
   * 2. Create MID Class in Settings.
   * @expectedResult MID Type and MID Class exist and can be selected during MID Account creation.
   */
  before(()=>{

    cy.visit('/settings/mid-types').wait(2000)
    cy.contains('sa-button','Add').click().wait(1000)
    cy.getByFormControlName('name').type('Test MID type')
    cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
    cy.contains('#addMidTypeForm [icon="save"]','Save').click()
    cy.wait(1000)

    cy.visit('/settings/mid-classes').wait(2000)
    cy.contains('sa-button','Add').click().wait(1000)
    cy.getByFormControlName('name').type('Test MID class')
    cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
    cy.contains('#addMidClassForm [icon="save"]','Save').click()
    cy.wait(1000)
  })

  /**
   * @scenario Add prerequisite Bank Account
   * @description Adds a bank account for the client to be linked when creating a MID Account.
   * @steps
   * 1. Navigate to client.
   * 2. Add a bank account via helper.
   * @expectedResult Bank account is created and available in the MID Account form.
   */
  it('Adds a bank account', ()=>{
    add_bank_account()
  })

  /**
   * @scenario Add Client MID Account
   * @description Creates a MID Account linked to an existing bank account, selecting currency, type, class and code.
   * @steps
   * 1. Open client → MID Accounts → Add.
   * 2. Select bank account, currency, MID Type and Class.
   * 3. Enter name and code; save.
   * @expectedResult MID Account is added successfully.
   */
  it('Add Client MID Accounts', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
      clientName = data.individualClientName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'MID Accounts').click();
    cy.location('pathname').then((pathname)=>{
      const pathSections = pathname.split('/');
      client_id = pathSections[3]
    })
    // Add new Client Policies
    cy.getBySel('addMidAccounts').click();
    cy.getBySel('addMidAccountForm').should('be.visible');

    cy.getBySel('bankAccounts').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content>.dx-datagrid-table > tbody > .dx-data-row > td').eq(0).click({ force: true });

    cy.get('#addMidAccountForm input[name="name"]').type(faker.finance.accountName());

    cy.getBySel('currencies').click()
    cy.get('[data-test="dynamicSelectBoxDropdownGrid"] > .dx-gridbase-container > .dx-datagrid-rowsview').eq(1).find(' tbody > .dx-data-row > td').eq(0).click();

    cy.wait(500)

    cy.getBySel('midTypes').click();
    cy.wait(500)
    cy.contains('Test MID type').click({ force: true });

    code = faker.string.numeric(16);
    cy.get('#addMidAccountForm input[name="code"]').type(code);

    cy.getBySel('midClasses').click();
    cy.wait(500)
    cy.contains('Test MID class').click({ force: true });

    cy.getBySel('saveMidAccounts').click().wait(1000);
  });

  /**
   * @scenario Edit Client MID Account
   * @description Opens the first MID Account and updates its code.
   * @steps
   * 1. Navigate to client → MID Accounts.
   * 2. Edit first row; change code; save and close.
   * @expectedResult MID Account is updated successfully.
   */
  it('Edit Client MID Accounts', () => {
    cy.visit(`/main/client-individual/${client_id}/1/mid-accounts`)
    cy.wait(2000)
    // Edit Policy
    cy.getBySel('gridMidAccounts').should('be.visible');
    // cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(code);

    cy.wait(2000);

    cy.get('#gridMidAccounts table tbody tr td.dx-command-edit-with-icons a').eq(0).click({ force: true });
    cy.get('#editClientMidAccountForm').should('be.visible');

    code = faker.string.numeric(16);

    cy.get('#editClientMidAccountForm input[name="code"]').should('be.visible').clear();
    cy.get('#editClientMidAccountForm input[name="code"]').type(code);

    cy.getBySel('saveAndCloseButton').click().wait(1000);
  })

  /**
   * @scenario Delete Client MID Account
   * @description Deletes the first MID Account entry in the grid.
   * @steps
   * 1. Navigate to client → MID Accounts.
   * 2. Open first row; click Delete; confirm.
   * @expectedResult MID Account is deleted successfully.
   */
  it('Delete client MID Accounts', () => {
    cy.visit(`/main/client-individual/${client_id}/1/mid-accounts`)
    cy.wait(2000)
    // Delete MID Accounts
    cy.getBySel('gridMidAccounts').should('be.visible');
    // cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(code);

    cy.wait(2000);

    let gridMidAccounts = cy.wrap('#gridMidAccounts table tbody tr td');
    gridMidAccounts.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    // Delete MID Accounts
    cy.getBySel('deleteMidAccounts').should('be.visible').click();
    cy.get('#bot2-Msg1').contains('Yes').click().wait(1000);
    cy.contains('The MID account has been deleted.')
  })

  /**
   * @scenario Cleanup Bank Account
   * @description Removes the previously added bank account to leave the environment clean.
   * @steps
   * 1. Navigate to client → Bank Accounts.
   * 2. Open last row; Delete; confirm.
   * @expectedResult Bank account is deleted successfully.
   */
  it('should delete a bank account', () => {
    cy.visit(`/main/client-individual/${client_id}/1/bankaccounts`)
    cy.wait(2000)
    // Delete Bank Account
    cy.get('.dx-datagrid-table  .dx-link > .fa').last().scrollIntoView().click().wait(2000)
    cy.getBySel('deleteClientAccountButton').should('be.visible').click();
    cy.get('#bot2-Msg1').contains('Yes').click();
    cy.contains('The bank account has been deleted.')
  });
})

