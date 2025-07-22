import { faker } from "@faker-js/faker";
import { navigateToNewestClientMenu} from "../../support/e2e";

let cardNumberTest = faker.finance.creditCardNumber('visa');
let client_id:string = ''

describe('Add, Edit, Delete Client Cards', () => {
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
