import { faker } from "@faker-js/faker";
import {navigateToClientMenu} from "../../support/e2e";

let accountNumberTest = faker.finance.accountNumber(12);
let location:string = ''

export function add_bank_account(){
  // Click on Know your Clients navigation item
  navigateToClientMenu('Corporate')

  cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Bank Accounts').click();

  // Add new Client Bank Account
  cy.getBySel('addBankAccount').click();

  cy.location('pathname').then((loc)=>{
    location = loc
  })

  cy.getBySel('addClientAccountForm').should('be.visible');
  cy.get('#addClientAccountForm input[name="swiftCode"]').type(faker.finance.bic());
  cy.get('#addClientAccountForm input[name="iban"]').type(faker.finance.iban());
  cy.get('#addClientAccountForm input[name="accountNumber"]').type(accountNumberTest);

  cy.getBySel('bankList').should('be.visible').click();
  cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

  cy.getBySel('countriesList').should('be.visible').click();
  cy.get('#dynamicSelectBoxDropdownGrid table').contains('td', 'Albania').click({ force: true });

  cy.get('#addClientAccountForm input[name="dateCreated"]').type(faker.date.past().toISOString().slice(0, 10));
  cy.get('#addClientAccountForm textarea[name="comment"]').type(faker.lorem.text());

  cy.getBySel('currenciesList').should('be.visible').click();
  cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

  cy.getBySel('saveClientBankAccount').click();
  cy.wait(1000)
}

describe('Add, Edit, Delete Client Bank Account', () => {
  
  before(()=>{
    cy.visit('/settings/banks')
    cy.contains('Add').click()
    cy.wait(1000)
    cy.getByDataCy("bank-name").type(`Test Bank`) 
    cy.getByDataCy("bank-code").type(faker.string.alphanumeric(20))
    cy.getByDataCy("bank-mapping-reference").type(faker.string.alphanumeric(20))
    cy.contains('Save').click()
    cy.wait(2000)
  })

  it('Add Client Bank Account', () => {
    add_bank_account()
  });

  it('Edit client Bank Account', () => {
    // Edit Bank Account
    cy.visit(location).wait(4000)
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(accountNumberTest);

    cy.wait(2000);

    let gridClientAccounts = cy.wrap('#gridClientAccounts table tbody tr');
    gridClientAccounts.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.get('#editClientAccountForm').should('be.visible');

    cy.get('#editClientAccountForm textarea[name="comment"]').type(faker.lorem.text());

    cy.getBySel('saveAndCloseButton').click().wait(2000);
    cy.contains('The bank account has been updated')
  })

  it.skip('Delete client Bank Account', () => {
    cy.visit(location).wait(4000)
    cy.getBySel('gridClientAccounts').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(accountNumberTest);

    cy.wait(2000);

    let gridClientAccounts = cy.wrap('#gridClientAccounts table tbody tr');
    gridClientAccounts.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.wait(2000);
    
    // Delete Bank Account
    cy.getBySel('deleteClientAccountButton').should('be.visible').click();
    cy.get('#bot2-Msg1').contains('Yes').click().wait(2000);
    cy.contains('The bank account has been deleted')
  })
})
