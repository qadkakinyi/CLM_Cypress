import { faker } from "@faker-js/faker";
import {navigateToClientMenu} from "../../support/e2e";

let addressName = faker.location.streetAddress();

let client_id = ''

describe('Add, Edit, Delete Client Address', () => {
  
  it('Add Client Address', () => {
    // Click on Know your Clients navigation item
    navigateToClientMenu('Individual')

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Addresses').click();

    //get the current client id
    cy.location('pathname').then((pathname)=>{
      const pathSections = pathname.split('/');
      client_id = pathSections[3]
    })
    // Add new Client Address
    cy.getBySel('addClientAddress').click().wait(1500);

    cy.getBySel('addAddressForm').should('be.visible');
    cy.get('#addAddressForm input[name="address"]').type(addressName);

    cy.getBySel('countriesList').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tr td').eq(0).click();

    cy.get('#addAddressForm input[name="postalCode"]').type(faker.location.zipCode());
    cy.get('#addAddressForm input[name="locality"]').type(faker.location.city());
    cy.get('#addAddressForm input[name="province"]').type(faker.location.state());
    cy.get('#addAddressForm input[name="district"]').type(faker.location.street());
    cy.get('#addAddressForm input[name="phoneNumber"]').type(faker.string.numeric(8));

    cy.getBySel('addressTypesList').click();
    cy.get('#dynamicSelectBoxDropdownGrid table').contains('td', 'Correspondence').click();

    cy.getBySel('saveClientAddress').click().wait(1000);
    cy.contains('Address has been added.')
  });

  it('Edit client address', () => {
    // Edit Address
    cy.visit(`/main/client-individual/${client_id}/1/addresses`).wait(2000)
    cy.getBySel('gridClientAddresses').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(addressName).wait(2000);

    cy.getBySel('gridClientAddresses').wait(2000).then(() => {
      cy.get('#gridClientAddresses .dx-icon-edit').eq(0).click({ force: true }).wait(500);
      
      cy.get('.dx-datagrid-rowsview .dx-texteditor-input-container').eq(2).clear().type(faker.location.city());
      cy.get('.dx-datagrid-rowsview .dx-texteditor-input-container').eq(4).clear().type(faker.string.numeric(8));
     
    });

    cy.get('#gridClientAddresses .dx-link.dx-icon-save').eq(0).click({ force: true }).wait(1000);
    cy.contains('The address has been updated.')
  })

  it('Delete client address', () => {
    // Delete Address
    cy.visit(`/main/client-individual/${client_id}/1/addresses`).wait(2000)
    cy.getBySel('gridClientAddresses').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(addressName).wait(2000);
    cy.get('#gridClientAddresses .dx-link.dx-icon-trash').eq(0).click({ force: true }).wait(1000);
    cy.get('.dx-dialog-buttons .dx-button-content').contains('span', 'Yes').click({ force: true }).wait(1000);
    cy.contains('Address has been deleted.')
  })
})
