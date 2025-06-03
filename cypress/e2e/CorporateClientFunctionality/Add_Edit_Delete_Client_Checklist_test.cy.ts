import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../support/e2e";

let location = '';

describe('Add, Edit, Delete Client Checklist', () => {
  
  before(()=>{
    cy.visit('/settings/checklists')
    cy.contains('sa-button','Add').click()
    cy.wait(1000)
    cy.getByFormControlName('name').type('Test Checklist')
    cy.getByFormControlName('priority').type('5')
    cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(10))
    cy.getByDataCy('regulation-group').click().wait(500);
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-content tbody tr td').eq(2).click()
    cy.getByDataCy('save-checklist').click()
    cy.wait(2000)
  })
  
  afterEach(()=>{
    cy.wait(2000)
  })
  
  it('Add Client Checklist', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
      clientName = data.companyName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Checklists').click();

    //get the current client id
    cy.location('pathname').then((loc)=>{
      location = loc
    })

    // Add new Client Address
    cy.getBySel('addChecklist').click().wait(1000);

    cy.getBySel('addChecklistForm').should('be.visible');

    cy.getBySel('checklists').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tr td').eq(0).click();

    cy.getBySel('saveChecklist').click().wait(1000);
  });

  it('Edit client checklist', () => {
    // Edit Address
    cy.visit(location).wait(2000)
    cy.getBySel('gridClientChecklists').should('be.visible').then(() => {
      cy.get('#gridClientChecklists .dx-icon-edit').eq(0).click({ force: true });

      cy.get('.dx-datagrid-rowsview .dx-texteditor-input-container').eq(0).type(faker.string.numeric(1));
    });

    cy.get('#gridClientChecklists .dx-link.dx-icon-save').eq(0).click({ force: true }).wait(2000);
  })

  it('Delete client checklist', () => {
    // Delete Address
    cy.visit(location).wait(2000)
    cy.getBySel('gridClientChecklists').should('be.visible');
    cy.get('#gridClientChecklists .dx-link.dx-icon-trash').eq(0).click({ force: true });
    cy.get('.dx-dialog-buttons .dx-button-content').contains('span', 'Yes').click({ force: true });
    cy.contains('Checklist has been deleted.')
  })
})
