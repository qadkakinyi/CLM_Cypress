import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let documentNumber = faker.string.numeric(10);

let client_id = ''

describe('Add, Edit, Delete Client Document - Individual', () => {

  it('Add Client Document', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
      clientName = data.individualClientName
      navigateToNewestClientMenu(clientName)
    })
    
    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Documents').click().wait(3000);
    //get the current client id
    cy.location('pathname').then((pathname)=>{
      const pathSections = pathname.split('/');
      client_id = pathSections[3]
    })

    cy.get('#addClientDocument').click();

    cy.get('#addDocumentForm').should('be.visible');

    cy.get('#documentsList').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tr td').eq(0).click({ force: true });

    cy.get('#collectionStatusesList').click();
    cy.get('#dynamicSelectBoxDropdownGrid table').contains('td', 'Not Required').click({ force: true });

    cy.get('#countriesList').click();
    cy.get('#dynamicSelectBoxDropdownGrid table').contains('td', 'Albania').click({ force: true });

    cy.get('#addDocumentForm input[name="documentNumber"]').type(documentNumber);

    cy.get('#documentFormsList').click();
    cy.get('#dynamicSelectBoxDropdownGrid table').contains('td', 'Copy').click({ force: true });

    cy.get('#addDocumentForm textarea[name="comment"]').type(faker.lorem.text());

    cy.get('#certifiedUsersList').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tr td').eq(0).click({ force: true });

    cy.get('#reviewedByUsersList').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tr td').eq(0).click({ force: true });

    cy.get('#saveClientDocument').click();

    cy.wait(1000);
  })

  it('Edit Client Document', () => {
    // Edit Document
    cy.visit(`/main/client-individual/${client_id}/1/documents`)
    cy.wait(3000)
    cy.get('#gridClientDocuments').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(4).type(documentNumber);
    
    cy.get('#gridClientDocuments .fa-angle-double-right').eq(0).click({ force: true });
    
    cy.wait(2000);

    // cy.get('#editClientDocumentForm').should('be.visible');

    cy.get('#editClientDocumentForm textarea[name="comment"]').type(faker.lorem.text());

    cy.get('.btn.dropdown-toggle').click();
    cy.get('.save-and-close-link').click();
  })

  it('Delete Client Document', () => {
    // Delete Document
    cy.visit(`/main/client-individual/${client_id}/1/documents`)
    cy.wait(3000)
    cy.get('#gridClientDocuments').should('be.visible');
    cy.get('.dx-datagrid-filter-row .dx-texteditor-input-container input').eq(4).type(documentNumber);

    cy.get('#gridClientDocuments .fa-angle-double-right').eq(0).click({ force: true });

    cy.wait(2000);
    cy.get('#deleteClientDocument').click();
    cy.get('#bot2-Msg1').contains('Yes').click();
  });
})
