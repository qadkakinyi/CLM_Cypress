/**
 * @testSuite Client Tax Residency Management
 * @description Full suite to validate adding, editing, and deleting client tax residency records
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, client-tax, residency
 * @dependencies faker-js, navigateToClientMenu
 * @fileDescription Covers end-to-end CRUD operations for tax residency management of a corporate client
 */

import { faker } from "@faker-js/faker";
import { navigateToClientMenu } from "../../../support/e2e";

let tin = faker.string.alphanumeric(12);
let location = '';

describe('Add, Edit, Delete Client Tax Residency', () => {

  /**
   * @scenario Add Client Tax Residency
   * @description Adds a tax residency entry to a corporate client with random TIN and notes
   * @priority High
   * @testData Random country, TIN, notes, and explanation
   * @steps Navigate to corporate client dashboard
   * @steps Click "Tax Residency"
   * @steps Fill in the form and submit
   * @expectedResult Tax residency record is saved and visible in grid
   */
  it('Add Client Tax Residency', () => {
    navigateToClientMenu('Corporate');

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
        .contains('span', 'Tax Residency')
        .click().wait(2000);

    cy.getBySel('addTaxResidency').click();
    cy.location('pathname').then((loc) => {
      location = loc;
    });

    cy.getBySel('addTaxResidencyForm').should('be.visible');

    cy.getBySel('countriesList').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tr td')
        .eq(0).click({ force: true });

    cy.get('#addTaxResidencyForm input[name="tin"]').type(tin);
    cy.get('#addTaxResidencyForm textarea[name="notes"]').type(faker.lorem.paragraph());
    cy.get('#addTaxResidencyForm textarea[name="explanation"]').type(faker.lorem.sentence());

    cy.getBySel('saveTaxResidency').click().wait(2000);
    cy.contains('Tax residency has been added.');
  });

  /**
   * @scenario Edit Client Tax Residency
   * @description Updates existing tax residency notes and explanation using direct cell editing
   * @priority Medium
   * @testData Random sentences for updated notes
   * @steps Visit tax residency page, filter by TIN
   * @steps Click edit and modify text fields
   * @expectedResult Changes are saved and confirmation appears
   */
  it('Edit client tax residency', () => {
    cy.visit(location).wait(3000);
    cy.get('.ngx-overlay.foreground-closing', { timeout: 10000 }).should('not.exist');
    cy.getBySel('gridClientTaxResidencies').should('be.visible');

    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(1).type(tin);
    cy.wait(2000);

    cy.getBySel('gridClientTaxResidencies').then(() => {
      cy.get('#gridClientTaxResidencies .dx-icon-edit').eq(0).click({ force: true });

      cy.get('.dx-datagrid-rowsview .dx-texteditor-input-container').eq(2).type(faker.lorem.sentence());
      cy.get('.dx-datagrid-rowsview .dx-texteditor-input-container').eq(4).type(faker.lorem.sentence());
    });

    cy.get('#gridClientTaxResidencies .dx-link.dx-icon-save').eq(0).click({ force: true }).wait(2000);
    cy.contains('Tax residency has been updated.');
  });

  /**
   * @scenario Delete Client Tax Residency
   * @description Deletes the previously added tax residency row
   * @priority Medium
   * @steps Visit tax residency page
   * @steps Click delete icon and confirm
   * @expectedResult Tax residency record is removed from grid
   */
  it('Delete client tax residency', () => {
    cy.visit(location).wait(3000);
    cy.get('.ngx-overlay.foreground-closing', { timeout: 10000 }).should('not.exist');
    cy.getBySel('gridClientTaxResidencies').should('be.visible');

    cy.get('#gridClientTaxResidencies .dx-link.dx-icon-trash').eq(0).click({ force: true });
    cy.get('.dx-dialog-buttons .dx-button-content').contains('span', 'Yes').click({ force: true }).wait(2000);
    cy.contains('Tax residency has been deleted.');
  });

});

