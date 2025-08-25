/**
 * @testSuite Individual Client Gaming Accounts
 * @description Validates adding, editing, and deleting gaming accounts for an individual client
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, gaming-accounts
 * @dependencies faker-js, navigateToNewestClientMenu
 * @fileDescription Creates required setup (Gaming Account Status), then performs CRUD on the client's Gaming Accounts section.
 */

import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let accountExternalReference = faker.string.alphanumeric(16);

let client_id = '';

describe('Add, Edit, Delete Client Gaming Accounts', () => {

  /**
   * @scenario Precondition: Create Gaming Account Status
   * @description Ensures a Gaming Account Status exists so the account can be created
   * @priority Medium
   * @steps Go to Settings > Gaming Setups
   * @steps Open "Gaming Account Statuses" tab and click Add
   * @steps Enter status name and mapping reference, then Save
   * @expectedResult Status is created successfully
   */
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
   * @description Adds a new gaming account to the client with faker-generated details
   * @priority Medium
   * @testData Faker user agent, IPv4, comment; random external reference
   * @steps Load individual client from fixture and navigate to the newest client
   * @steps Open Gaming Accounts and click Add
   * @steps Fill form fields (device, external ref, IP, status, balance, comment)
   * @steps Save the gaming account
   * @expectedResult Gaming account is saved successfully
   */
  it('Add Client Gaming Accounts', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
      clientName = data.individualClientName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Gaming Accounts').click();

    cy.getBySel('addGamingAccount').should('be.visible').click();

    cy.location('pathname').then((pathname)=>{
      const pathSections = pathname.split('/');
      client_id = pathSections[3]
    })

    cy.get('#addClientGamingAccountForm input[name="signUpDevice"]').type(faker.internet.userAgent());
    cy.get('#addClientGamingAccountForm input[name="externalReference"]').type(accountExternalReference);
    cy.get('#addClientGamingAccountForm input[name="signUpIP"]').type(faker.internet.ipv4());

    cy.getBySel('gamingAccountsList').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.get('#addClientGamingAccountForm input[name="balance"]').type(faker.finance.amount({ min: 5, max: 999 }));

    cy.get('#addClientGamingAccountForm textarea[name="comment"]').type(faker.lorem.paragraph());

    cy.getBySel('saveGamingAccount').should('be.visible').click().wait(1000);
  });

  /**
   * @scenario Edit Gaming Account
   * @description Filters by external reference and edits the signup IP of the account
   * @priority Medium
   * @steps Visit client Gaming Accounts
   * @steps Filter grid by External Reference and open the first row in edit
   * @steps Update signup IP and Save & Close
   * @expectedResult Account is updated successfully
   */
  it('Edit client Gaming Accounts', () => {
    cy.visit(`/main/client-individual/${client_id}/1/gamingaccounts`).wait(2000)

    cy.getBySel('gridClientGamingAccounts').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(5).type(accountExternalReference);

    cy.wait(2000);

    let gridGamingAccounts = cy.wrap('#gridClientGamingAccounts table tbody tr td');
    gridGamingAccounts.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.get('#editClientGamingAccountForm input[name="signUpIP"]').clear();
    cy.get('#editClientGamingAccountForm input[name="signUpIP"]').type(faker.internet.ipv4());
    cy.getBySel('saveAndCloseButton').click().wait(1000);
  })

  /**
   * @scenario Delete Gaming Account
   * @description Deletes the previously created gaming account
   * @priority Medium
   * @steps Visit client Gaming Accounts
   * @steps Filter grid by External Reference and open the first row
   * @steps Click Delete and confirm Yes
   * @expectedResult Account is deleted and confirmation message appears
   */
  it('Delete client Gaming Accounts', () => {
    cy.visit(`/main/client-individual/${client_id}/1/gamingaccounts`)
    cy.wait(2000)
    cy.getBySel('gridClientGamingAccounts').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(5).type(accountExternalReference);

    cy.wait(2000);

    let gridGamingAccounts = cy.wrap('#gridClientGamingAccounts table tbody tr td');
    gridGamingAccounts.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.getBySel('deleteGamingAccount').should('be.visible').click();
    cy.get('#bot2-Msg1').contains('Yes').click().wait(1000);
    cy.contains('The gaming account has been deleted.')
  });
})

