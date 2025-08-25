/**
 * @testSuite Individual Client Actions (Tasks)
 * @description Validates end-to-end CRUD for client Actions, including creating required Settings (Action Category, Action Status), then Add, Edit, and Delete on an individual client
 * @priority High
 * @owner QA Team
 * @tags regression, actions, tasks, individual
 * @dependencies faker-js, navigateToNewestClientMenu
 * @fileDescription Creates prerequisite Action metadata in Settings and performs client-level action lifecycle
 */



import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let client_id = ''
describe('Add, Edit, Delete Client Action (Task)', () => {
  
  /**
   * @setup Create Action metadata in Settings
   * @description Ensures an Action Category and an Action Status exist so they can be selected during client action creation
   * @steps Open Settings → Actions Setup
   * @steps Add Action Category “Action Category Test” with random mapping ref and save
   * @steps Navigate to Action Statuses and add “Action Status Test” with random mapping ref and save
   * @expectedResult Action Category and Action Status records are available in dropdowns on the client Actions form
   */
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

  /**
   * @scenario Add Client Action
   * @description Creates a new client Action with type, category, priority, status, owner, assignee, target date, and notes
   * @priority High
   * @testData Faker-generated dates and text; Settings: “Action Category Test”, “Action Status Test”
   * @steps Load individual client from fixture and navigate to client menu
   * @steps Open Actions page from left menu
   * @steps Click Add, select Action Type, Category, Priority, Status, Owner, Assignee
   * @steps Enter Target Date, Implementation Plan, Notes and Save
   * @expectedResult Toast shows “Client action has been added”
   */
  it('Add Client Action', () => {
    // Add new Client Action
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

    cy.getBySel('addClientAction').should('be.visible').click().wait(2000);

    cy.getBySel('actionTypesList').should('be.visible').click().wait(500);
    cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true })

    cy.getBySel('actionCategoriesList').should('be.visible').click().wait(500);
    cy.get('#dynamicSelectBoxDropdownGrid tr td').contains('Action Category Test').click({ force: true })

    cy.getBySel('prioritiesList').should('be.visible').click().wait(500);
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true })

    cy.getBySel('actionStatusesList').should('be.visible').click().wait(500);
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true })

    cy.getBySel('ownerUsersList').should('be.visible').click().wait(500);
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true })

    cy.getBySel('assigneeUsersList').should('be.visible').click().wait(500);
    cy.get('.dx-overlay-wrapper.dx-popup-wrapper.dx-dropdowneditor-overlay #dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview table tbody tr td').eq(0).click({ force: true })

    cy.get('#addActionForm input[name="targetDate"]').type(faker.date.future().toISOString().slice(0, 10));

    cy.get('#addActionForm textarea[name="implementationPlan"]').type(faker.string.alphanumeric(120));
    cy.get('#addActionForm textarea[name="notes"]').type(faker.string.alphanumeric(120));

    cy.getBySel('saveClientAction').click();
    cy.contains('Client action has been added')
    cy.wait(1000);
  })

  /**
   * @scenario Edit Client Action
   * @description Updates Implementation Plan and Notes for an existing Action
   * @priority Medium
   * @steps Navigate to client Actions page
   * @steps Open first row in edit mode
   * @steps Append new text to Implementation Plan and Notes, then Save
   * @expectedResult Toast shows “The action has been updated”
   */
  it('Edit Action', () => {
    cy.visit(`/main/client-individual/${client_id}/1/actions`).wait(2000)
    let gridActions = cy.wrap('#gridClientDocuments table tbody tr');
    gridActions.get('.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(1000);

    cy.getBySel('editActionForm').should('be.visible');

    cy.get('#editActionForm textarea[name="implementationPlan"]').type(faker.string.alphanumeric(120));
    cy.get('#editActionForm textarea[name="notes"]').type(faker.string.alphanumeric(120));

    cy.getBySel('saveAction').click();
    cy.contains('The action has been updated').wait(1500)
  })

  /**
   * @scenario Delete Client Action
   * @description Deletes the first Action in the grid and confirms the dialog
   * @priority Medium
   * @steps Navigate to client Actions page
   * @steps Open first row, click Delete, confirm Yes
   * @expectedResult Toast shows “The action has been deleted.”
   */
  it('Delete Action', () => {
    cy.visit(`/main/client-individual/${client_id}/1/actions`).wait(2000)
    let gridActions = cy.wrap('#gridClientDocuments table tbody tr');
    gridActions.get('.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(1000);
    cy.getBySel('deleteAction').click();
    cy.get('#bot2-Msg1').contains('Yes').click();
    cy.contains('The action has been deleted.').wait(1500)
  })
})

