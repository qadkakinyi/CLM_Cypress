import { faker } from "@faker-js/faker";
import {navigateToClientMenu} from "../../support/e2e";

let location = ''
describe('Add, Edit, Delete Client Action (Task) - Corporate', () => {
  
  before(()=>{
    cy.visit('/settings/actions-setup').wait(3000)
    cy.contains('Add').click()
    
    //Add Action Category
    cy.wait(1000)
    cy.getByDataCy('category-name').type('Action Category Test')
    cy.getByDataCy('mapping-ref').type(faker.string.alphanumeric(20))
    cy.getByDataCy('save-category-btn').click().wait(1000)
    
    cy.get('p:contains("Action Category already exists.")').then(el=>{
      if(el.is(':visible')){
        cy.contains('sa-button', 'Close').click().wait(1000)
      }
    })
    
    // add Action status
    cy.get('span').contains('Action Statuses').click()
    cy.contains('Add').click()
    cy.wait(1000)
    cy.getByDataCy('action-name').type('Action Status Test')
    cy.getByDataCy('mapping-ref-action').type(faker.string.alphanumeric(30))
    cy.getByDataCy('create-action-btn').click().wait(2000)
  })

  it('Add Client Action', () => {
    // Click on Know your Clients navigation item
    navigateToClientMenu('Corporate')
    cy.wait(2000)

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Actions').wait(1500).click({force:true}).wait(2000);

    cy.location('pathname').then((loc)=>{
      location = loc
    })
    // Add new Client Action    
    cy.getBySel('addClientAction').should('be.visible').click().wait(2000);

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

    // cy.get('#addActionForm textarea[name="implementationPlan"]').type(faker.string.alphanumeric(120));
    cy.get('#addActionForm textarea[name="notes"]').type(faker.string.alphanumeric(120));

    cy.getBySel('saveClientAction').click().wait(2000);

  })

  it('Edit Action', () => {
     cy.visit(location).wait(2000)
    let gridActions = cy.wrap('#gridClientDocuments table tbody tr');
    gridActions.get('.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(1000);

    cy.getBySel('editActionForm').should('be.visible');

    cy.get('#editActionForm textarea[name="implementationPlan"]').type(faker.string.alphanumeric(120));
    cy.get('#editActionForm textarea[name="notes"]').type(faker.string.alphanumeric(120));

    cy.getBySel('saveAction').click().wait(2000);
  })

  it('Delete Action', () => {
     cy.visit(location).wait(2000)
    let gridActions = cy.wrap('#gridClientDocuments table tbody tr');
    gridActions.get('.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(1000);
    cy.getBySel('deleteAction').click();
    cy.get('#bot2-Msg1').contains('Yes').click();
  })
})