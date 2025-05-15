import { faker } from "@faker-js/faker";
import {navigateToClientMenu} from "../../support/e2e";

let accountExternalReference = faker.string.alphanumeric(16);

let location = '';

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
  
  it('Add Client Gaming Accounts', () => {
    // Click on Know your Clients navigation item
    navigateToClientMenu('Corporate')

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

  it('Edit client Gaming Accounts', () => {
    cy.visit(location)
    cy.wait(2000)
    cy.getBySel('gridClientGamingAccounts').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(5).type(accountExternalReference);

    cy.wait(2000);

    let gridGamingAccounts = cy.wrap('#gridClientGamingAccounts table tbody tr td');
    gridGamingAccounts.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.get('#editClientGamingAccountForm input[name="signUpIP"]').clear();
    cy.get('#editClientGamingAccountForm input[name="signUpIP"]').type(faker.internet.ipv4());
    cy.getBySel('saveAndCloseButton').click();
  })

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
