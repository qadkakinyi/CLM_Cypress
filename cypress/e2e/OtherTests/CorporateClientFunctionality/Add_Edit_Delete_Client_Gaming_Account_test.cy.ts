import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let accountExternalReference = faker.string.alphanumeric(16);
let location = '';

/**
 * @testSuite AddClients - Corporate Client Management
 * @description Test suite for managing client gaming accounts
 * @priority High
 * @owner QA Team
 * @tags regression, gaming, client-management
 * @dependencies user-authentication, faker-js
 * @fileDescription Tests the complete workflow for managing client gaming accounts
 */

/**
 * @suite Corporate Client Gaming Accounts
 * @description Tests for adding, editing, and deleting client gaming accounts
 * @prerequisites Corporate client must exist and be accessible
 * @prerequisites Gaming account statuses must be configured in system settings
 * @testData Dynamically generated using faker.js
 */
describe('Add, Edit, Delete Client Gaming Accounts', () => {

  before(()=>{
    cy.visit('/settings/gaming-setups')
    cy.get('span').contains('Gaming Account Statuses').click()
    cy.contains('sa-button','Add').click()
    cy.wait(1000)

    cy.getByDataCy('gaming-account-status').type('Active')
    cy.getByDataCy('gaming-account-mapping-reference').type(faker.string.alphanumeric(15))
    cy.getByDataCy("Save-client-gaming-status").click()
    cy.wait(1000)
  })

  /**
   * @scenario Add Gaming Account
   * @description Adds a new gaming account for a corporate client
   * @priority High
   * @expectedResult Gaming account is added and visible in the grid
   */
  it('Add Client Gaming Accounts', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
      clientName = data.companyName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Gaming Accounts').click();

    cy.getBySel('addGamingAccount').should('be.visible').click();

    cy.location('pathname').then((loc)=>{
      location = loc
    })

    cy.get('#addClientGamingAccountForm input[name="signUpDevice"]').type(faker.internet.userAgent());
    cy.get('#addClientGamingAccountForm input[name="externalReference"]').type(accountExternalReference);
    cy.get('#addClientGamingAccountForm input[name="signUpIP"]').type(faker.internet.ipv4());

    cy.getBySel('gamingAccountsList').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.get('#addClientGamingAccountForm input[name="balance"]').type(faker.finance.amount({ min: 5, max: 999 }));
    cy.get('#addClientGamingAccountForm textarea[name="comment"]').type(faker.lorem.paragraph());

    cy.getBySel('saveGamingAccount').should('be.visible').click();
  });

  /**
   * @scenario Edit Gaming Account
   * @description Edits the sign-up IP of a corporate client gaming account
   * @priority Medium
   * @expectedResult IP address is updated successfully
   */
  it('Edit client Gaming Accounts', () => {
    cy.visit(location)
    cy.wait(2000)
    cy.getBySel('gridClientGamingAccounts').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(5).type(accountExternalReference);

    cy.wait(2000);

    let gridGamingAccounts = cy.wrap('#gridClientGamingAccounts table tbody tr td');
    gridGamingAccounts.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.get('#editClientGamingAccountForm input[name="signUpIP"]').clear().type(faker.internet.ipv4());
    cy.getBySel('saveAndCloseButton').click();
  })

  /**
   * @scenario Delete Gaming Account
   * @description Deletes a previously added client gaming account
   * @priority Medium
   * @expectedResult Gaming account is removed from the client profile
   */
  it('Delete client Gaming Accounts', () => {
    cy.visit(location)
    cy.wait(2000)
    cy.getBySel('gridClientGamingAccounts').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(5).type(accountExternalReference);

    cy.wait(2000);

    let gridGamingAccounts = cy.wrap('#gridClientGamingAccounts table tbody tr td');
    gridGamingAccounts.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.getBySel('deleteGamingAccount').scrollIntoView().click();
    cy.get('#bot2-Msg1').contains('Yes').click();
    cy.contains('The gaming account has been deleted.')
  });
})

