import { faker } from "@faker-js/faker";
import {navigateToClientMenu} from "../../support/e2e";

let code = faker.string.numeric(16);

let client_id = '';

describe('Add, Edit, Delete Client Related Website - Individual', () => {
  
  before(()=>{
    cy.visit('/settings/related-website-types')
    cy.contains('Add').click()
    cy.wait(1000)
    cy.getByFormControlName('name').type('Business Website')
    cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
    cy.getByDataCy('related-website-type-save').click()
    cy.wait(1000)
  })
  
  it('Add Client Related Website', () => {
    // Click on Know your Clients navigation item
    navigateToClientMenu('Individual')

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Related Websites').click();
    cy.wait(1000)

    cy.location('pathname').then((pathname)=>{
      const pathSections = pathname.split('/');
      client_id = pathSections[3]
    })
    
    // Add new Client Policies
    cy.getBySel('addRelatedWebsite').click();
    cy.getBySel('addRelatedWebsiteForm').should('be.visible');

    cy.getBySel('relatedWebsiteTypes').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.get('#addRelatedWebsiteForm input[name="website"]').type(faker.internet.url());

    cy.getBySel('saveRelatedWebsite').click().wait(1000);
  });

  it('Edit Client Related website', () => {
    // Edit Related Website
    cy.visit(`/main/client-individual/${client_id}/1/related-websites`)
    cy.wait(3000)
    cy.getBySel('gridClientRelatedWebsites').should('be.visible');
    cy.get('#gridClientRelatedWebsites .fa-angle-double-right').eq(0).click({ force: true });
    cy.get('#editClientRelatedWebsiteForm').should('be.visible');

    cy.get('#editClientRelatedWebsiteForm input[name="website"]').should('be.visible').clear();
    cy.get('#editClientRelatedWebsiteForm input[name="website"]').type(faker.internet.url());

    cy.getBySel('saveAndCloseButton').click().wait(1000);
  })

  it('Delete client Related Website', () => {
    // Delete Related Website
    cy.visit(`/main/client-individual/${client_id}/1/related-websites`)
    cy.wait(3000)
    cy.getBySel('gridClientRelatedWebsites').should('be.visible');
    cy.get('#gridClientRelatedWebsites .fa-angle-double-right').eq(0).click({ force: true });
    // Delete Related Website
    cy.getBySel('deleteRelatedWebsite').should('be.visible').click();
    cy.get('#bot2-Msg1').contains('Yes').click().wait(1000);
  })
})
