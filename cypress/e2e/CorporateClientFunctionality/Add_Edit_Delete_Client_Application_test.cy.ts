import { faker } from "@faker-js/faker";
import {navigateToClientMenu} from "../../support/e2e";

let externalReference = faker.string.alphanumeric(12);

let location = ''

describe('Add, Edit, Delete Client Applications', () => {
  
  before(()=>{
    cy.visit('/settings/application-approval-setup')
    cy.contains('Add').click().wait(1000)
    cy.getByFormControlName('name').type('Money Transfer')
    cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(12))
    cy.contains('Save').click()
    cy.wait(1000)
  })
  
  it('Add Client Applications', () => {
    // Click on Know your Clients navigation item
    navigateToClientMenu('Corporate')

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Applications').click();

    // Add new Client Application
    cy.getBySel('addApplication').click();
    
    cy.location('pathname').then((loc)=>{
      location = loc
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

    cy.getBySel('saveApplication').click().wait(2000);
    
  });

  it('Edit client application', () => {
    cy.visit(location).wait(2000) 
    // Edit application
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

  it('Delete client applications', () => {
    cy.visit(location).wait(2000)
    // Delete applications
    cy.getBySel('gridClientApplications').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(1).type(externalReference);

    cy.wait(2000);

    let gridApplications = cy.wrap('#gridClientApplications table tbody tr td');
    gridApplications.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.getBySel('deleteApplication').should('be.visible').click();
    cy.get('#bot2-Msg1').contains('Yes').click().wait(2000);
    cy.contains('The application has been deleted.')
  })
})
