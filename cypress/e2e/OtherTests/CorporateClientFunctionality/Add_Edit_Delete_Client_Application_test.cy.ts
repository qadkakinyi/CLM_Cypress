import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

/**
 * @testSuite ClientApplications - Corporate Application Management
 * @description Covers adding, editing, and deleting applications for corporate clients
 * @priority High
 * @owner QA Team
 * @tags corporate, applications, client-profile
 * @dependencies faker-js, application-approval-setup
 * @fileDescription Ensures that client applications can be managed successfully through the UI
 */

let externalReference = faker.string.alphanumeric(12);
let location = ''

describe('Add, Edit, Delete Client Applications', () => {

  /**
   * @setup Adds a purpose of transaction entry required before adding applications
   */
  before(() => {
    cy.visit('/settings/application-approval-setup')
    cy.contains('sa-button','Add').click().wait(1000)
    cy.getByFormControlName('name').type('Money Transfer')
    cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(12))
    cy.contains('#addPurposeOfTransactionForm [icon="save"]','Save').click()
    cy.wait(1000)
  })

  /**
   * @scenario Add Client Application
   * @description Adds a client application linked to a purpose of transaction and assignee
   * @testData faker-generated reference, email, and comment
   * @steps Open Applications tab under corporate client
   * @steps Click Add, fill fields, submit
   * @expectedResult Application is created and saved successfully
   */
  it('Add Client Applications', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
      clientName = data.companyName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Applications').click();
    cy.getBySel('addApplication').click();

    cy.location('pathname').then((loc)=> location = loc)

    cy.getBySel('addApplicationForm').should('be.visible');

    cy.getBySel('purposeOfTransactions').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tr td').eq(0).click({ force: true });

    cy.getByDataCy('approvedBy').click()
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content>.dx-datagrid-table > tbody > .dx-data-row > td').eq(1).click({ force: true });

    cy.get('#addApplicationForm input[name="applicationReferenceNumber"]').type(externalReference);

    cy.getBySel('users').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tr td').eq(0).click({ force: true });

    cy.get('#addApplicationForm input[name="receiverEmail"]').should('be.visible').clear();
    cy.get('#addApplicationForm input[name="receiverEmail"]').type(faker.internet.email());
    cy.get('#addApplicationForm input[name="comments"]').type(faker.lorem.sentence());

    cy.getBySel('saveApplication').click().wait(2000);
  })

  /**
   * @scenario Edit Client Application
   * @description Modifies the comments field in an existing application
   * @testData faker-generated comment
   * @steps Filter by reference, open for edit, update and save
   * @expectedResult Comment updated and success message shown
   */
  it('Edit client application', () => {
    cy.visit(location).wait(2000)
    cy.getBySel('gridClientApplications').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(1).type(externalReference);
    cy.wait(2000);

    let gridApplications = cy.wrap('#gridClientApplications table tbody tr td');
    gridApplications.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.get('#editClientApplicationForm').should('be.visible');
    cy.get('#editClientApplicationForm input[name="comments"]').should('be.visible').clear();
    cy.get('#editClientApplicationForm input[name="comments"]').type(faker.lorem.sentence());

    cy.getBySel('saveAndCloseButton').click().wait(2000);
  })

  /**
   * @scenario Delete Client Application
   * @description Deletes a previously added client application
   * @steps Filter by reference, open, delete, confirm
   * @expectedResult Application deleted successfully
   */
  it('Delete client applications', () => {
    cy.visit(location).wait(2000)
    cy.getBySel('gridClientApplications').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(1).type(externalReference);
    cy.wait(2000);

    let gridApplications = cy.wrap('#gridClientApplications table tbody tr td');
    gridApplications.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.getBySel('deleteApplication').scrollIntoView().click();
    cy.get('#bot2-Msg1').contains('Yes').click().wait(2000);
    cy.contains('The application has been deleted.')
  })
});

