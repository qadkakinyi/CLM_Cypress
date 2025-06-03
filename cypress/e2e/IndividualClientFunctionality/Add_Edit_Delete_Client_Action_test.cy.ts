import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../support/e2e";

let client_id = ''
describe('Add, Edit, Delete Client Action (Task)', () => {
  
  before(()=>{
    cy.visit('/settings/actions-setup').wait(3000)
    cy.contains('sa-button','Add').click()

    //Add Action Category
    cy.wait(1000)
    cy.getByDataCy('category-name').type('Action Category Test')
    cy.getByDataCy('mapping-ref').type(faker.string.alphanumeric(20))
    cy.getByDataCy('save-category-btn').click().wait(1000)

    // cy.get('p:contains("Action Category already exists.")').then(el=>{
    //   if(el.is(':visible')){
    //     cy.contains('sa-button', 'Close').click().wait(1000)
    //   }
    // })

    // add Action status
    cy.visit('/settings/actions-setup').wait(3000)
    cy.get('span').contains('Action Statuses').click()
    cy.contains('sa-button','Add').click()
    cy.wait(1000)
    cy.getByDataCy('action-name').type('Action Status Test')
    cy.getByDataCy('mapping-ref-action').type(faker.string.alphanumeric(30))
    cy.getByDataCy('create-action-btn').click().wait(2000)
  })
  

  it('Navigates to individual client', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
      clientName = data.individualClientName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Actions').click();

    cy.location('pathname').then((pathname)=>{
      const pathSections = pathname.split('/');
      client_id = pathSections[3]
    })
  })

  it('Add Client Action', () => {
    // Add new Client Action
    cy.visit(`/main/client-individual/${client_id}/1/actions`).wait(2000)
    
    cy.getBySel('addClientAction').should('be.visible').click().wait(1000);

    cy.getBySel('actionTypesList').should('be.visible').click();
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true })

    cy.getBySel('actionCategoriesList').should('be.visible').click();
    cy.get('#dynamicSelectBoxDropdownGrid table.dx-datagrid-table.dx-datagrid-table-fixed tbody tr td').eq(0).click({ force: true })

    cy.getBySel('prioritiesList').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true })

    cy.getBySel('actionStatusesList').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true })

    cy.getBySel('ownerUsersList').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true })

    cy.getBySel('assigneeUsersList').should('be.visible').click();
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true })

    cy.get('#addActionForm input[name="targetDate"]').type(faker.date.future().toISOString().slice(0, 10));

    cy.get('#addActionForm textarea[name="implementationPlan"]').type(faker.string.alphanumeric(120));
    cy.get('#addActionForm textarea[name="notes"]').type(faker.string.alphanumeric(120));

    cy.getBySel('saveClientAction').click();

    cy.wait(1000);
  })

  it('Edit Action', () => {
    cy.visit(`/main/client-individual/${client_id}/1/actions`).wait(2000)
    let gridActions = cy.wrap('#gridClientDocuments table tbody tr');
    gridActions.get('.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(1000);

    cy.getBySel('editActionForm').should('be.visible');

    cy.get('#editActionForm textarea[name="implementationPlan"]').type(faker.string.alphanumeric(120));
    cy.get('#editActionForm textarea[name="notes"]').type(faker.string.alphanumeric(120));

    cy.getBySel('saveAction').click();
  })

  it('Delete Action', () => {
    cy.visit(`/main/client-individual/${client_id}/1/actions`).wait(2000)
    let gridActions = cy.wrap('#gridClientDocuments table tbody tr');
    gridActions.get('.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(1000);
    cy.getBySel('deleteAction').click();
    cy.get('#bot2-Msg1').contains('Yes').click();
  })
})