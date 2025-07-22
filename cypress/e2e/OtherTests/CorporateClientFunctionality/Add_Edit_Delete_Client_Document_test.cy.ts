import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let documentNumber = faker.string.numeric(10);

let location = ''

describe('Add, Edit, Delete Client Document', () => {
  
  before(()=>{
    //add document category
    cy.visit('/settings/document-categories')
    cy.contains('sa-button', 'Add').click().wait(1000)
    cy.get('#addDocumentCategoryForm')
    cy.getByFormControlName('name').type('Test Category')
    cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(11))
    cy.get('#addDocumentCategoryForm [icon="save"]').contains('Save').click().wait(2000);
    
    //add client category
    cy.visit('/settings/client-categories')
    cy.contains('sa-button', 'Add').click().wait(1000)
    cy.get('#addClientCategoryForm')
    cy.getByFormControlName('name').type('Test Client')
    cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(11))
    cy.get('#addClientCategoryForm [icon="save"]').contains('Save').click().wait(2000);
    
    //add document in settings
    cy.visit('/settings/documents')
    cy.contains('sa-button', 'Add').click().wait(1000)
    cy.get('#addDocumentForm')
    
    cy.getByFormControlName('name').type('Test Doc')
    cy.getByFormControlName('nameInPortal').clear().type('Test Doc')
    cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(11))
    cy.getByDataCy('documentType').click().wait(500)
    cy.getBySel('dynamicSelectBoxDropdownGrid').find('[aria-rowindex="2"]').click().wait(500)
    cy.getByDataCy('clientType').click().wait(500)
    cy.getBySel('dynamicSelectBoxDropdownGrid').contains('Corporate').click().wait(500)
    cy.getByDataCy('regulationGroup').click().wait(500)
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content').eq(2).find('tr td').eq(0).click().wait(500)
    // cy.get('#documentCategory').click().wait(500)
    // cy.getBySel('dynamicSelectBoxDropdownGrid').contains('Test Category').click().wait(500)
    // cy.getByDataCy('capacityList').click().wait(500)
    // cy.get('.dropdown-list > ul').eq(1).find('li').eq(0).click().wait(500)
    // cy.getByDataCy('clientCategory').click().wait(500)
    // cy.get('.dropdown-list > ul').contains('Test Client').click().wait(500)
    //close the popup
    // cy.getByDataCy('clientCategory').click().wait(500)
    cy.get('#addDocumentForm [icon="save"]').contains('Save').click().wait(2000);
  })

  it('Add Client Document', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
      clientName = data.companyName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Documents').click().wait(3000);
    
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
    
    //get current url
    cy.location('pathname').then((loc)=>{
      location = loc
    })

    cy.wait(1000);
  })

  it('Edit Client Document', () => {
    // Edit Document
    cy.visit(location).wait(3000)
 
    cy.get('#gridClientDocuments .dx-datagrid-filter-row .dx-texteditor-input-container input').eq(4).type(documentNumber, {force:true}).wait(2000);

    let gridDocumentRows = cy.wrap('#gridClientDocuments table tbody tr');
    
    gridDocumentRows.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });
    
    cy.wait(2000);

    // cy.get('#editClientDocumentForm').should('be.visible');

    cy.get('#editClientDocumentForm textarea[name="comment"]').type(faker.lorem.text());

    cy.get('.btn.dropdown-toggle').click();
    cy.get('.save-and-close-link').click().wait(1000);
    cy.contains('Client document has been updated.').wait(1000)
  })

  it('Delete Client Document', () => {
    // Delete Document
    cy.visit(location).wait(3000)

    cy.get('#gridClientDocuments .dx-datagrid-filter-row .dx-texteditor-input-container input').eq(4).type(documentNumber, {force:true}).wait(2000);
    
    let gridDocumentRows = cy.wrap('#gridClientDocuments table tbody tr');

    gridDocumentRows.get('.dx-command-edit-with-icons a').eq(0).click({ force: true });

    cy.wait(2000);
    cy.get('#deleteClientDocument').click();
    cy.get('#bot2-Msg1').contains('Yes').click().wait(1000);
    cy.contains('Document has been deleted.')
  });
})
