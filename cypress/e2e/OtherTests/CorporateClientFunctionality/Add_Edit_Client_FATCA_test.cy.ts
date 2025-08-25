import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

/**
 * @testSuite ClientFATCA - FATCA Setup and Client Assignment
 * @description End-to-end test suite for setting up FATCA metadata and assigning FATCA fields to a corporate client
 * @priority Medium
 * @owner QA Team
 * @tags compliance, fatca, corporate-clients
 * @dependencies FATCA-settings, client-navigation, faker-js
 * @fileDescription Creates required FATCA configuration entities and verifies client-level FATCA data is properly saved
 */

let tin = faker.string.alphanumeric(12);
let fatca_status = 'Active '+faker.string.alphanumeric(4)
let fatca_category = 'Test Category'+faker.string.alphanumeric(4)
let fatca_doc = 'Test Document'+faker.string.alphanumeric(4)
let fatca_crs = 'Test CRS'+faker.string.alphanumeric(4)

describe('Add, Edit Client FATCA - Corporate', () => {

  /**
   * @setup Creates FATCA setup values in system settings
   * @description Adds FATCA Status, Entity Categorization, Document, and CRS Categorization
   * @steps Navigate to each relevant FATCA settings tab
   * @steps Add entries using dynamically generated values
   * @expectedResult All setup entities are created successfully and selectable at client level
   */
  before(() => {
    //add fatca status
    cy.visit('/settings/fatca-setup')
    cy.contains('sa-button', 'Add').click()
    cy.wait(1000)
    cy.get('#addFatcaStatusForm .status-name').type(fatca_status)
    cy.get('#addFatcaStatusForm .status-ref').type(faker.string.alphanumeric(10))
    cy.getByDataCy('save-status').click()
    cy.wait(1000)

    //add fatca category
    cy.contains('FATCA Entities Categorization').click()
    cy.contains('sa-button', 'Add').click()
    cy.wait(1000)
    cy.get('#addFatcaEntityCategorizationForm .category-name').type(fatca_category)
    cy.get('#addFatcaEntityCategorizationForm .category-ref').type(faker.string.alphanumeric(10))
    cy.get('.save-category').click()
    cy.wait(1000)

    //add fatca document
    cy.contains('FATCA Documents').click()
    cy.contains('sa-button', 'Add').click()
    cy.wait(1000)
    cy.get('#addFatcaDocumentForm .document-name').type(fatca_doc)
    cy.get('#addFatcaDocumentForm .document-ref').type(faker.string.alphanumeric(10))
    cy.get('.save-document').click()
    cy.wait(1000)

    //add fatca CRS Categorization
    cy.contains('FATCA CRS Entities Categorization').click()
    cy.contains('sa-button', 'Add').click()
    cy.wait(1000)
    cy.get('#addFatcaCrsEntityCategorizationForm .crs-name').type(fatca_crs)
    cy.get('#addFatcaCrsEntityCategorizationForm .crs-ref').type(faker.string.alphanumeric(10))
    cy.get('.save-crs').click()
    cy.wait(2000)
  })

  /**
   * @scenario Add Client FATCA Details
   * @description Assigns FATCA status, category, document, and CRS details to an existing corporate client
   * @testData client is read from fixture file `client_corporate.json`
   * @steps Open client record using helper navigation
   * @steps Open FATCA section and fill all required fields
   * @steps Click save
   * @expectedResult Message `Client FATCA has been updated.` is displayed
   */
  it('Add Client FATCA', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
      clientName = data.companyName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'FATCA').click();
    cy.wait(1000)

    // SAVE FATCA
    cy.getBySel('fatcaStatuses').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tr td').eq(0).click();

    cy.getBySel('fatcaEntityCategorizations').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tr td').contains('Test Category').click();

    cy.get('ng-multiselect-dropdown[name="clientFatcaDocuments"]').click({ force: true });
    cy.get('.multiselect-item-checkbox').eq(0).click({ force: true });

    cy.getBySel('fatcaCrsEntityCategorizations').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tr td').contains('Test CRS').click();

    cy.get('#editClientFatcaForm input[name="fatcaGiin"]').type(faker.string.alphanumeric(12));

    cy.get('#editClientFatcaForm input[name="fatcaIndicia"]').click({ force: true });

    cy.getBySel('saveFatca').click().wait(1000);
    cy.contains('Client FATCA has been updated.').wait(1000)
  });
})

