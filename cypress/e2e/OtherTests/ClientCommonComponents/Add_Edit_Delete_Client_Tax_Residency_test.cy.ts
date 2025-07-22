import { faker } from "@faker-js/faker";
import {navigateToClientMenu} from "../../../support/e2e";

let tin = faker.string.alphanumeric(12);
let location = '';

describe('Add, Edit, Delete Client Tax Residency', () => {
  it('Add Client Tax Residency', () => {
    // Click on Know your Clients navigation item
    navigateToClientMenu('Corporate')

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Tax Residency').click().wait(2000);

    // Add new Client Tax Residency
    cy.getBySel('addTaxResidency').click();
    cy.location('pathname').then((loc)=>{
      location = loc
    })

    cy.getBySel('addTaxResidencyForm').should('be.visible');

    cy.getBySel('countriesList').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tr td').eq(0).click({ force: true });

    cy.get('#addTaxResidencyForm input[name="tin"]').type(tin);

    cy.get('#addTaxResidencyForm textarea[name="notes"]').type(faker.lorem.paragraph());
    cy.get('#addTaxResidencyForm textarea[name="explanation"]').type(faker.lorem.sentence());

    cy.getBySel('saveTaxResidency').click().wait(2000);
    cy.contains('Tax residency has been added.')
  });

  it('Edit client tax residency', () => {
    // Edit tax residency
    cy.visit(location).wait(3000)
    cy.get('.ngx-overlay.foreground-closing', {timeout: 10000}).should('not.exist')
    cy.getBySel('gridClientTaxResidencies').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(1).type(tin);
    cy.wait(2000)
    
    cy.getBySel('gridClientTaxResidencies').then(() => {
      cy.get('#gridClientTaxResidencies .dx-icon-edit').eq(0).click({ force: true });

      cy.get('.dx-datagrid-rowsview .dx-texteditor-input-container').eq(2).type(faker.lorem.sentence());
      cy.get('.dx-datagrid-rowsview .dx-texteditor-input-container').eq(4).type(faker.lorem.sentence());
    });

    cy.get('#gridClientTaxResidencies .dx-link.dx-icon-save').eq(0).click({ force: true }).wait(2000);
    cy.contains('Tax residency has been updated.')
  })

  it('Delete client tax residency', () => {
    // Delete tax residency
    cy.visit(location).wait(3000)
    cy.get('.ngx-overlay.foreground-closing', {timeout: 10000}).should('not.exist')
    cy.getBySel('gridClientTaxResidencies').should('be.visible');
    cy.get('#gridClientTaxResidencies .dx-link.dx-icon-trash').eq(0).click({ force: true });
    cy.get('.dx-dialog-buttons .dx-button-content').contains('span', 'Yes').click({ force: true }).wait(2000);
    cy.contains('Tax residency has been deleted.')
  })
})
