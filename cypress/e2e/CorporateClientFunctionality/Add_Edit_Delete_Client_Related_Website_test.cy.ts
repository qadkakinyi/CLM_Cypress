import { faker } from "@faker-js/faker";
import {navigateToClientMenu} from "../../support/e2e";

let code = faker.string.numeric(16);

let location = '';

describe('Add, Edit, Delete Client Related Website', () => {
  
  before(()=>{
    cy.visit('/settings/related-website-types')
    cy.contains('sa-button','Add').click()
    cy.wait(1000)
    cy.getByFormControlName('name').type('Business Website')
    cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(13))
    cy.getByDataCy('related-website-type-save').click()
    cy.wait(1000)
  })
  
  it('Add Client Related Website', () => {
    // Click on Know your Clients navigation item
    navigateToClientMenu('Corporate')

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Related Websites').click();
    cy.wait(1000)
    
    cy.location('pathname').then((loc)=>{
      location = loc
    })
    
    // Add new Client Policies
    cy.getBySel('addRelatedWebsite').click();
    cy.getBySel('addRelatedWebsiteForm').should('be.visible');

    cy.getBySel('relatedWebsiteTypes').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true });

    cy.get('#addRelatedWebsiteForm input[name="website"]').type(faker.internet.url());

    cy.getBySel('saveRelatedWebsite').click();
  });

  it('Edit Client Related website', () => {
    // Edit Related Website
    cy.visit(location)
    cy.wait(2000)
    cy.getBySel('gridClientRelatedWebsites').should('be.visible');
    cy.get('#gridClientRelatedWebsites table tbody tr td.dx-command-edit-with-icons a').eq(0).click({ force: true });
    cy.get('#editClientRelatedWebsiteForm').should('be.visible');

    cy.get('#editClientRelatedWebsiteForm input[name="website"]').should('be.visible').clear();
    cy.get('#editClientRelatedWebsiteForm input[name="website"]').type(faker.internet.url());

    cy.getBySel('saveAndCloseButton').click();
  })

  it('Delete client Related Website', () => {
    // Delete Related Website
    cy.visit(location)
    cy.wait(2000)
    cy.getBySel('gridClientRelatedWebsites').should('be.visible');
    cy.get('#gridClientRelatedWebsites table tbody tr td.dx-command-edit-with-icons a').eq(0).click({ force: true });
    // Delete Related Website
    cy.getBySel('deleteRelatedWebsite').should('be.visible').click();
    cy.get('#bot2-Msg1').contains('Yes').click();
  })
})
