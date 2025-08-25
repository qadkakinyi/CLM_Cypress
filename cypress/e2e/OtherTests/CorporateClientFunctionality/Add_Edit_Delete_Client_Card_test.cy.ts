import { faker } from "@faker-js/faker";
import { add_bank_account } from "./Add_Edit_Delete_Client_Bank_Account_test.cy";
import { navigateToClientMenu, navigateToNewestClientMenu } from "../../../support/e2e";

/**
 * @testSuite ClientCards - Corporate Client Card Management
 * @description Covers the workflow for managing payment cards linked to corporate clients
 * @priority Medium
 * @owner QA Team
 * @tags client-profile, cards, payments
 * @dependencies bank-account-setup, faker-js, client-navigation
 * @fileDescription This test ensures that users can add, update, and delete client card records tied to bank accounts
 */

let cardNumberTest = faker.finance.creditCardNumber('visa');
let location: string = '';

describe('Add, Edit, Delete Client Cards - Corporate', () => {

  /**
   * @scenario Add Client Cards
   * @description Adds a new payment card to a corporate client’s profile and associates it with a bank account
   * @testData faker-generated credit card number and holder details
   * @expectedResult Card is successfully added and visible in the cards list
   */
  it('Add Client Cards', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
      clientName = data.companyName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Cards').click();

    cy.getBySel('addCard').click();

    cy.location('pathname').then((loc) => {
      location = loc
    })

    cy.wait(1000);

    cy.getBySel('addClientCardForm').should('be.visible').then(() => {
      cy.get('#addClientCardForm input[name="cardNumber"]').type(cardNumberTest);
      cy.get('#addClientCardForm input[name="cardholder"]').type(faker.person.fullName());
      cy.get('#addClientCardForm .datetimeDevExtreme .dx-texteditor-input').type('0128');
      cy.get('#addClientCardForm input[name="externalReference"]').type(faker.string.alphanumeric(12));

      cy.getBySel('accountsList').should('be.visible').click();
      cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true })

      cy.getBySel('saveClientCardForm').click().wait(2000);
    });
  });

  /**
   * @scenario Edit Client Cards
   * @description Updates the card number on an existing client card record
   * @testData faker-generated new credit card number
   * @expectedResult Card is updated and confirmation is shown
   */
  it('Edit client Cards', () => {
    cy.visit(location).wait(3000)

    cy.getBySel('gridClientCards').should('be.visible').then(() => {
      cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(2).type(cardNumberTest);

      cy.wait(2000);

      let gridCards = cy.wrap('#gridClientCards table tbody tr td');
      gridCards.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

      cy.get('#editClientCardForm').should('be.visible');

      cardNumberTest = faker.finance.creditCardNumber('visa');
      cy.get('#editClientCardForm input[name="cardNumber"]').should('be.visible').clear();
      cy.get('#editClientCardForm input[name="cardNumber"]').type(cardNumberTest);

      cy.getBySel('saveAndCloseButton').click().wait(2000);
      cy.contains('The card has been updated')
    });
  });

  /**
   * @scenario Delete Client Cards
   * @description Deletes an existing card from the client’s profile
   * @expectedResult Card is removed and confirmation message is displayed
   */
  it('Delete client Cards', () => {
    cy.visit(location).wait(3000)

    cy.getBySel('gridClientCards').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(2).type(cardNumberTest);

    cy.wait(2000);

    let gridCards = cy.wrap('#gridClientCards table tbody tr td');
    gridCards.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.getBySel('deleteCard').scrollIntoView().click();
    cy.get('#bot2-Msg1').contains('Yes').click().wait(2000);
    cy.contains('The card has been deleted')
  });

});

