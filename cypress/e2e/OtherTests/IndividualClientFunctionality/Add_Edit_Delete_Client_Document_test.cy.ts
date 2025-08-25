/**
 * @testSuite Individual Client Documents
 * @description Validates adding, editing, and deleting documents on an individual client profile
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, documents
 * @dependencies faker-js, navigateToNewestClientMenu
 * @fileDescription Selects a document template, fills metadata, saves it; then edits comment and finally deletes it.
 */

import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let documentNumber = faker.string.numeric(10);

let client_id = ''

describe('Add, Edit, Delete Client Document - Individual', () => {

  /**
   * @scenario Add Client Document
   * @description Adds a new document to the individual client using a predefined document template
   * @priority Medium
   * @testData Faker-generated document number and comment text
   * @steps Load client from fixture and navigate to newest client
   * @steps Open Documents section and click Add
   * @steps Pick document, collection status, country, form; fill document number and comment
   * @steps Pick certified/reviewed users and click Save
   * @expectedResult Document is saved and visible in the grid
   */
  it('Add Client Document', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
      clientName = data.individualClientName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Documents').click().wait(3000);
    //get the current client id
    cy.location('pathname').then((pathname)=>{
      const pathSections = pathname.split('/');
      client_id = pathSections[3]
    })

    cy.get('#addClientDocument').click();

    cy.get('#addDocumentForm').should('be.visible');

    cy.get('#documentsList').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tr td').eq(0).click({ force: true });

    cy.get('#collectionStatusesList').click();
    cy.get('#dynamicSelectBoxDropdownGrid table').contains('td', 'Not Required').click({ force: true });

    cy.get('#countriesList').click();
    cy.get('#dynamicSelectBoxDropdownGrid table').contains('td', 'Albania').click({ force: true });

    cy.get('#addDocumentForm input[name="documentNumber"]').type(documentNumber);

    cy.get('#documentFormsList').click();
    cy.get('#dynamicSelectBoxDropdownGrid table').contains('td', 'Copy').click({ force: true });

    cy.get('#addDocumentForm textarea[name="comment"]').type(faker.lorem.text());

    cy.get('#certifiedUsersList').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tr td').eq(0).click({ force: true });

    cy.get('#reviewedByUsersList').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tr td').eq(0).click({ force: true });

    cy.get('#saveClientDocument').click();

    cy.wait(1000);
  })

  /**
   * @scenario Edit Client Document
   * @description Opens the document details and appends a comment, then saves & closes
   * @priority Medium
   * @steps Visit Documents page for the client
   * @steps Filter grid by the generated document number
   * @steps Open details (chevron), type extra comment, Save & Close
   * @expectedResult Document is updated with the new comment
   */
  it('Edit Client Document', () => {
    // Edit Document
    cy.visit(`/main/client-individual/${client_id}/1/documents`)
    cy.wait(3000)
    cy.get('#gridClientDocuments').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(4).type(documentNumber);

    cy.get('#gridClientDocuments .fa-angle-double-right').eq(0).click({ force: true });

    cy.wait(2000);

    // cy.get('#editClientDocumentForm').should('be.visible');

    cy.get('#editClientDocumentForm textarea[name="comment"]').type(faker.lorem.text());

    cy.get('.btn.dropdown-toggle').click();
    cy.get('.save-and-close-link').click();
  })

  /**
   * @scenario Delete Client Document
   * @description Deletes the previously added client document from its details view
   * @priority Medium
   * @steps Visit Documents page, filter by the document number
   * @steps Open details (chevron), click Delete, confirm Yes
   * @expectedResult Document is removed and a deletion confirmation appears
   */
  it('Delete Client Document', () => {
    // Delete Document
    cy.visit(`/main/client-individual/${client_id}/1/documents`)
    cy.wait(3000)
    cy.get('#gridClientDocuments').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(4).type(documentNumber);

    cy.get('#gridClientDocuments .fa-angle-double-right').eq(0).click({ force: true });

    cy.wait(2000);
    cy.get('#deleteClientDocument').click();
    cy.get('#bot2-Msg1').contains('Yes').click();
  })
})

