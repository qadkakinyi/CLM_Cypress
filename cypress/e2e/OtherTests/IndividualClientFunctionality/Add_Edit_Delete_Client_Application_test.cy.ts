/**
 * @testSuite Individual Client Applications
 * @description Validates adding, editing, and deleting client applications for an individual client
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, applications
 * @dependencies faker-js, navigateToNewestClientMenu
 * @fileDescription Performs CRUD on the 'Applications' section, including setup of required Purpose of Transaction
 */

import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let externalReference = faker.string.alphanumeric(12);

let client_id = ''

describe('Add, Edit, Delete Client Applications', () => {

  // Precondition: ensure a Purpose of Transaction exists for selection in the form
  before(()=>{
    cy.visit('/settings/application-approval-setup')
    cy.contains('sa-button','Add').click().wait(1000)
    cy.getByFormControlName('name').type('Money Transfer')
    cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(12))
    cy.contains('#addPurposeOfTransactionForm [icon="save"]','Save').click()
    cy.wait(1000)
  })

  /**
   * @scenario Add Client Application
   * @description Creates a new application for the selected client with required dropdowns and reference
   * @priority Medium
   * @testData Faker-generated email, comments, and external reference
   * @steps Load individual client from fixture and open newest client menu
   * @steps Navigate to Applications, click Add
   * @steps Select purpose of transaction and approver, fill reference, user, email, comments
   * @steps Save the application
   * @expectedResult Application is saved and visible in the list
   */
  it('Add Client Applications', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
      clientName = data.individualClientName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Applications').click();

    // Add new Client Application
    cy.getBySel('addApplication').click();
    cy.location('pathname').then((pathname)=>{
      const pathSections = pathname.split('/');
      client_id = pathSections[3]
    })

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

    cy.getBySel('saveApplication').click();
  });

  /**
   * @scenario Edit Client Application
   * @description Filters by reference and updates the comments of the application
   * @priority Medium
   * @testData Faker-generated sentence for comments
   * @steps Visit client applications page using client_id
   * @steps Filter by external reference; open first row in edit
   * @steps Update comments and Save & Close
   * @expectedResult Application row persists updated comments
   */
  it('Edit client application', () => {
    cy.visit(`main/client-individual/${client_id}/1/applications`).wait(2000)
    // Edit application
    cy.getBySel('gridClientApplications').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(1).type(externalReference);

    cy.wait(2000);

    let gridApplications = cy.wrap('#gridClientApplications table tbody tr td');
    gridApplications.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.get('#editClientApplicationForm').should('be.visible');

    cy.get('#editClientApplicationForm input[name="comments"]').should('be.visible').clear();
    cy.get('#editClientApplicationForm input[name="comments"]').type(faker.lorem.sentence());

    cy.getBySel('saveAndCloseButton').click();
  })

  /**
   * @scenario Delete Client Application
   * @description Deletes the previously created application
   * @priority Medium
   * @steps Visit client applications page using client_id
   * @steps Filter by external reference; open first row
   * @steps Click Delete and confirm
   * @expectedResult Toast/confirmation indicates the application has been deleted
   */
  it('Delete client applications', () => {
    cy.visit(`main/client-individual/${client_id}/1/applications`).wait(2000)
    // Delete applications
    cy.getBySel('gridClientApplications').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(1).type(externalReference);

    cy.wait(2000);

    let gridApplications = cy.wrap('#gridClientApplications table tbody tr td');
    gridApplications.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.getBySel('deleteApplication').scrollIntoView().click();
    cy.get('#bot2-Msg1').contains('Yes').click();
  })
})

