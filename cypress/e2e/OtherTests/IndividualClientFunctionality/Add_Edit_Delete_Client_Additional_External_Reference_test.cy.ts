/**
 * @testSuite Individual Client Additional External Reference
 * @description Validates CRUD operations for Additional External References on an individual client profile
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, client-profile, external-references
 * @dependencies faker-js, navigateToNewestClientMenu
 * @fileDescription Adds, edits, and deletes entries in the 'Additional External References' section for an individual client
 */

import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let externalReference = faker.string.alphanumeric(16);

let client_id = '';

describe('Add, Delete Client additional external reference', () => {

  /**
   * @scenario Add Client Additional External Reference
   * @description Creates a new additional external reference for the selected individual client
   * @priority Medium
   * @testData Faker-generated 16-char alphanumeric reference
   * @steps Load individual client from fixture and navigate to newest client menu
   * @steps Open “Additional External References” from the left menu
   * @steps Capture client_id from the URL
   * @steps Click Add, enter external reference, click Save
   * @expectedResult Record is saved and visible in the grid
   */
  it('Add Client additional external reference', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
      clientName = data.individualClientName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Additional External References').click();

    //get the current client id
    cy.location('pathname').then((pathname)=>{
      const pathSections = pathname.split('/');
      client_id = pathSections[3]
    })

    // Add new Client Additional External Reference
    cy.getBySel('addAdditionalExternalReference').click();
    cy.wait(1000)

    cy.get('#addClientAdditionalExternalReferenceForm input[name="additionalExternalReference"]').type(externalReference);

    cy.getBySel('saveAdditionalExternalReference').click().wait(2000);
  });

  /**
   * @scenario Edit Client Additional External Reference
   * @description Updates the previously added external reference with a new randomly generated value
   * @priority Medium
   * @testData New faker-generated 16-char alphanumeric reference
   * @steps Visit the client’s Additional External References page
   * @steps Filter the grid by the existing reference and click Edit
   * @steps Replace the value and Save
   * @expectedResult Grid shows the updated reference value
   */
  it('Edit client additional external reference', () => {
    // Edit additional external reference
    cy.visit(`/main/client-individual/${client_id}/1/additional-external-references`)
    cy.wait(2000)
    cy.getBySel('gridClientAdditionalExternalReferences').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(externalReference).wait(2000);

    cy.getBySel('gridClientAdditionalExternalReferences').wait(2000).then(() => {
      cy.get('.dx-icon-edit').eq(0).click({ force: true });

      externalReference = faker.string.alphanumeric(16);

      cy.get('.dx-datagrid-rowsview .dx-texteditor-input-container').eq(0).clear();
      cy.get('.dx-datagrid-rowsview .dx-texteditor-input-container').eq(0).type(externalReference);
    });

    cy.get('#gridClientAdditionalExternalReferences .dx-link.dx-icon-save').eq(0).click({ force: true }).wait(2000);
  })

  /**
   * @scenario Delete Client Additional External Reference
   * @description Removes the first additional external reference in the grid and confirms deletion
   * @priority Medium
   * @steps Visit the client’s Additional External References page
   * @steps Click Delete icon on the first row, confirm with Yes
   * @expectedResult Toast/notification shows “The additional external reference has been deleted.”
   */
  it('Delete client additional external reference', () => {
    // Delete additional external reference
    cy.visit(`/main/client-individual/${client_id}/1/additional-external-references`)
    cy.wait(1500)
    cy.getBySel('gridClientAdditionalExternalReferences').should('be.visible');
    cy.get('#gridClientAdditionalExternalReferences .dx-link.dx-icon-trash').eq(0).click({ force: true });
    cy.get('.dx-dialog-buttons .dx-button-content').contains('span', 'Yes').click({ force: true }).wait(1000);
    cy.contains('The additional external reference has been deleted.');
  })
})

