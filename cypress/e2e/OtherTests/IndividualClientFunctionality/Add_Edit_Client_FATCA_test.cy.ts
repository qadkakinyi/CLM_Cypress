/**
 * @testSuite Individual Client FATCA
 * @description End-to-end validation of configuring FATCA prerequisites in Settings and assigning FATCA data to an individual client
 * @priority High
 * @owner QA Team
 * @tags regression, smoke, compliance, FATCA, individual
 * @dependencies faker-js, navigateToNewestClientMenu
 * @fileDescription Creates FATCA lookup data (Status, Entity Categorization, Document, CRS Categorization) then populates the client FATCA form and saves it
 */

/**
 * @setup FATCA Prerequisites in Settings
 * @description Ensures required reference data exists before client-level FATCA can be added
 * @steps Visit Settings → FATCA Setup
 * @steps Add FATCA Status with random mapping reference and save
 * @steps Add FATCA Entity Categorization (“Test Category”) and save
 * @steps Add FATCA Document (“Test Document”) and save
 * @steps Add FATCA CRS Entity Categorization (“Test CRS”) and save
 * @expectedResult All four reference records are present and selectable on the client FATCA form
 */

import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let tin = faker.string.alphanumeric(12);

describe('Add, Delete Client FATCA', () => {

  before(()=>{
    //add fatca status
    cy.visit('/settings/fatca-setup').wait(2000)
    cy.contains('sa-button','Add').click()
    cy.wait(1000)
    cy.get('#addFatcaStatusForm .status-name').type('Active')
    cy.get('#addFatcaStatusForm .status-ref').type(faker.string.alphanumeric(10))
    cy.getByDataCy('save-status').click()
    // cy.get("p:contains('Fatca Status already exists.')").then((el)=>{
    //   if(el.is(':visible')){
    //     cy.getByDataCy('close-status').click()
    //   }
    // })
    cy.wait(1000)

    //add fatca category
    cy.visit('/settings/fatca-setup').wait(2000)
    cy.contains('FATCA Entities Categorization').click()
    cy.contains('sa-button','Add').click()
    cy.wait(1000)
    cy.get('#addFatcaEntityCategorizationForm .category-name').type('Test Category')
    cy.get('#addFatcaEntityCategorizationForm .category-ref').type(faker.string.alphanumeric(10))
    cy.get('.save-category').click()
    // cy.get("p:contains('Fatca Entity Categorization already exists.')").then((el)=>{
    //   if(el.is(':visible')){
    //     cy.getByDataCy('close-category').click()
    //   }
    // })
    cy.wait(1000)

    //add fatca document
    cy.visit('/settings/fatca-setup').wait(2000)
    cy.contains('FATCA Documents').click()
    cy.contains('sa-button','Add').click()
    cy.wait(1000)
    cy.get('#addFatcaDocumentForm .document-name').type('Test Document')
    cy.get('#addFatcaDocumentForm .document-ref').type(faker.string.alphanumeric(10))
    cy.get('.save-document').click()
    // cy.get("p:contains('Fatca Document already exists.')").then((el)=>{
    //   if(el.is(':visible')){
    //     cy.getByDataCy('close-document').click()
    //   }
    // })
    cy.wait(1000)

    //add fatca CRS Categorization
    cy.visit('/settings/fatca-setup').wait(2000)
    cy.contains('FATCA CRS Entities Categorization').click()
    cy.contains('sa-button','Add').click()
    cy.wait(1000)
    cy.get('#addFatcaCrsEntityCategorizationForm .crs-name').type('Test CRS')
    cy.get('#addFatcaCrsEntityCategorizationForm .crs-ref').type(faker.string.alphanumeric(10))
    cy.get('.save-crs').click()
    // cy.get("p:contains('Fatca CRS Entity Categorization already exists.')").then((el)=>{
    //   if(el.is(':visible')){
    //     cy.getByDataCy('close-crs').click()
    //   }
    // })
    cy.wait(2000)

  })

  /**
   * @scenario Add Client FATCA
   * @description Populates FATCA details for an individual client using the previously created reference data
   * @priority High
   * @testData Faker for random GIIN and references; Settings records: Active, Test Category, Test Document, Test CRS
   * @steps Load individual client from fixture and navigate to profile
   * @steps Open FATCA section from left menu
   * @steps Select FATCA Status, Entity Categorization, Document(s), and CRS Entity Categorization
   * @steps Enter GIIN and toggle FATCA Indicia checkbox
   * @steps Click Save
   * @expectedResult Toast shows “Client FATCA has been updated.” and data is persisted
   */
  it('Add Client FATCA', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
      clientName = data.individualClientName
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

    cy.getBySel('saveFatca').click();
    //assert creation or edit
    cy.contains('Client FATCA has been updated.')
  });
})

