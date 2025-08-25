/**
 * @testSuite Individual Client Cards
 * @description Validates add, edit, and delete operations for client payment cards on an individual client profile
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, cards
 * @dependencies faker-js, navigateToNewestClientMenu
 * @fileDescription Performs CRUD on the 'Cards' section; filters by card number to locate the created record for edit/delete.
 */

import { faker } from "@faker-js/faker";
import { navigateToNewestClientMenu} from "../../../support/e2e";

let cardNumberTest = faker.finance.creditCardNumber('visa');
let client_id:string = ''

describe('Add, Edit, Delete Client Cards', () => {
  /**
   * @scenario Add Client Card
   * @description Creates a new card for an individual client with faker data
   * @priority Medium
   * @testData Faker card number (visa), full name, MMYY expiry, external reference
   * @steps Load individual client from fixture and navigate to newest client
   * @steps Open Cards page, click Add, fill form (cardNumber, cardholder, expiry, externalReference, account)
   * @steps Save the card
   * @expectedResult Card is saved successfully and appears in the grid
   */
  it('Add Client Cards', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
      clientName = data.individualClientName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Cards').click();

    // Add new Client Card
    cy.getBySel('addCard').click();
    cy.location('pathname').then((pathname)=>{
      const pathSections = pathname.split('/');
      client_id = pathSections[3]
    })
    cy.wait(1000);

    cy.getBySel('addClientCardForm').should('be.visible').then(() => {
      cy.get('#addClientCardForm input[name="cardNumber"]').type(cardNumberTest);
      cy.get('#addClientCardForm input[name="cardholder"]').type(faker.person.fullName());
      cy.get('#addClientCardForm .datetimeDevExtreme .dx-texteditor-input').type('0128');
      cy.get('#addClientCardForm input[name="externalReference"]').type(faker.string.alphanumeric(12));

      cy.getBySel('accountsList').should('be.visible').click();
      cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true })

      cy.getBySel('saveClientCardForm').click();
    });
  });

  /**
   * @scenario Edit Client Card
   * @description Filters by the original card number, opens edit, and updates the card number
   * @priority Medium
   * @testData New faker visa card number
   * @steps Visit client Cards, filter by card number, open edit form, change card number, save & close
   * @expectedResult Card number is updated and success message is shown
   */
  it('Edit client Cards', () => {

    cy.visit(`/main/client-individual/${client_id}/1/cards`).wait(2000)

    // Edit Cards
    cy.getBySel('gridClientCards').should('be.visible').then(() => {
      cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(2).type(cardNumberTest);

      cy.wait(2000);

      let gridCards = cy.wrap('#gridClientCards table tbody tr td');
      gridCards.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

      cy.get('#editClientCardForm').should('be.visible');

      cardNumberTest = faker.finance.creditCardNumber('visa');
      cy.get('#editClientCardForm input[name="cardNumber"]').should('be.visible').clear();
      cy.get('#editClientCardForm input[name="cardNumber"]').type(cardNumberTest);

      cy.getBySel('saveAndCloseButton').click();
    });

  })

  /**
   * @scenario Delete Client Card
   * @description Filters by the (possibly updated) card number and deletes the record
   * @priority Medium
   * @steps Visit client Cards, filter by card number, open row actions, click Delete, confirm Yes
   * @expectedResult Card is deleted and confirmation message is displayed
   */
  it('Delete client Cards', () => {

    cy.visit(`/main/client-individual/${client_id}/1/cards`).wait(2000)

    cy.getBySel('gridClientCards').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(2).type(cardNumberTest);

    cy.wait(2000);

    let gridCards = cy.wrap('#gridClientCards table tbody tr td');
    gridCards.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    // Delete Cards
    cy.getBySel('deleteCard').should('be.visible').click();
    cy.get('#bot2-Msg1').contains('Yes').click();
  })


})

