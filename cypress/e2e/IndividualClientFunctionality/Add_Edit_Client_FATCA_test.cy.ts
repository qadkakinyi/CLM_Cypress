import { faker } from "@faker-js/faker";
import {navigateToClientMenu} from "../../support/e2e";

let tin = faker.string.alphanumeric(12);

describe('Add, Delete Client FATCA', () => {
  
  before(()=>{
    //add fatca status
    cy.visit('/settings/fatca-setup').wait(2000)
    cy.contains('Add').click()
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
    cy.contains('Add').click()
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
    cy.contains('Add').click()
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
    cy.contains('Add').click()
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
  
  it('Add Client FATCA', () => {
    // Click on Know your Clients navigation item
    navigateToClientMenu('Individual')

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
