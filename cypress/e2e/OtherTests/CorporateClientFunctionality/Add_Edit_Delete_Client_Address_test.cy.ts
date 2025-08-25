import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

/**
 * @testSuite ClientAddresses - Corporate Client Address Management
 * @description Validates the complete lifecycle of client address management: add, edit, and delete
 * @priority High
 * @owner QA Team
 * @tags corporate, address, client-profile
 * @dependencies faker-js, client-corporate.json
 * @fileDescription Executes UI-based address handling scenarios on a corporate client
 */

let addressName = faker.location.streetAddress();
let client_id = ''
let location = ''

describe('Add, Edit, Delete Client Address', () => {

  /**
   * @scenario Add Corporate Client Address
   * @description Adds a new address for an existing corporate client using valid location details
   * @testData faker-generated street address, city, postal code, phone
   * @steps Navigate to corporate client, open Addresses tab
   * @steps Click Add Address, fill the form, and submit
   * @expectedResult Address is saved successfully and success message is shown
   */
  it('Add Client Address', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
      clientName = data.companyName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Addresses').click().wait(2000);

    cy.getBySel('addClientAddress').click().wait(2000);
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
    cy.location('pathname').then((loc)=> location = loc)
    cy.get('.MessageBoxButtonSection #bot2-Msg1').click()
    cy.contains('Address has been added.').wait(1000)
  });

  /**
   * @scenario Edit Corporate Client Address
   * @description Modifies city and phone number fields of the saved address
   * @testData faker city and numeric phone
   * @steps Open edit form for the address, update data, save
   * @expectedResult Updated values saved and confirmation message shown
   */
  it('Edit client address', () => {
    cy.visit(location).wait(2000)
    cy.getBySel('gridClientAddresses').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(addressName).wait(2000);

    cy.getBySel('gridClientAddresses').wait(2000).then(() => {
      cy.get('#gridClientAddresses .dx-icon-edit').eq(0).click({ force: true }).wait(500);
      cy.get('.dx-datagrid-rowsview .dx-texteditor-input-container').eq(2).clear().type(faker.location.city());
      cy.get('.dx-datagrid-rowsview .dx-texteditor-input-container').eq(4).clear().type(faker.string.numeric(8));
    });

    cy.get('#gridClientAddresses .dx-link.dx-icon-save').eq(0).click({ force: true }).wait(1000);
    cy.contains('The address has been updated.').wait(1000)
  });

  /**
   * @scenario Delete Corporate Client Address
   * @description Removes an existing address from a corporate client profile
   * @steps Filter to find the address, click delete, confirm
   * @expectedResult Address is deleted and user sees confirmation
   */
  it('Delete client address', () => {
    cy.visit(location).wait(2000)
    cy.getBySel('gridClientAddresses').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(0).type(addressName).wait(2000);
    cy.get('#gridClientAddresses .dx-link.dx-icon-trash').eq(0).click({ force: true }).wait(1000);
    cy.get('.dx-dialog-buttons .dx-button-content').contains('span', 'Yes').click({ force: true }).wait(1000);
    cy.contains('Address has been deleted.').wait(1000)
  });

});

