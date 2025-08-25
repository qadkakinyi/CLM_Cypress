import { faker } from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

/**
 * @testSuite ClientActions - Corporate Tasks Management
 * @description Handles automation for creation, editing, and deletion of client-related actions (tasks)
 * @priority High
 * @owner QA Team
 * @tags corporate, actions, tasks, setup
 * @dependencies faker-js, client-corporate
 * @fileDescription Covers task-related interactions for corporate clients including dependencies like status & category
 */

let location = ''

describe('Add, Edit, Delete Client Action (Task) - Corporate', () => {

  /**
   * @scenario Setup Action Category and Status
   * @description Prepares required category and status data for action form dropdowns
   * @steps Navigates to Action Setup, creates category and status
   * @expectedResult Action category and status are saved successfully
   */
  before(() => {
    cy.visit('/settings/actions-setup').wait(3000)
    cy.contains('sa-button','Add').click()

    cy.wait(1000)
    cy.getByDataCy('category-name').type('Action Category Test')
    cy.getByDataCy('mapping-ref').type(faker.string.alphanumeric(20))
    cy.getByDataCy('save-category-btn').click().wait(1000)

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
   * @description Creates a new task/action for a corporate client
   * @testData Dynamic faker values for notes and target date
   * @steps Navigate to client Actions tab
   * @steps Select dropdown values for type, category, status, owner, etc.
   * @steps Submit and verify success message
   * @expectedResult Action is saved successfully
   */
  it('Add Client Action', () => {
    let clientName;
    cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
      clientName = data.companyName
      navigateToNewestClientMenu(clientName)
    })

    cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Actions').wait(2500).click({force:true}).wait(2000);

    cy.location('pathname').then((loc) => {
      location = loc
    })

    cy.getBySel('addClientAction').click().wait(2000);

    cy.getBySel('actionTypesList').should('be.visible').click().wait(500);
    cy.get('.dx-popup-content #dynamicSelectBoxDropdownGrid').eq(0).find(' .dx-datagrid-rowsview tr td').eq(0).click().wait(500)

    cy.getBySel('actionCategoriesList').should('be.visible').click().wait(500);
    cy.get('.dx-popup-content #dynamicSelectBoxDropdownGrid').eq(1).find(' .dx-datagrid-rowsview tr td').eq(0).click().wait(500)

    cy.getBySel('prioritiesList').should('be.visible').click().wait(500);
    cy.get('.dx-popup-content #dynamicSelectBoxDropdownGrid').eq(2).find(' .dx-datagrid-rowsview tr td').eq(0).click().wait(500)

    cy.getBySel('actionStatusesList').should('be.visible').click().wait(500);
    cy.get('.dx-popup-content #dynamicSelectBoxDropdownGrid').eq(3).find(' .dx-datagrid-rowsview tr td').eq(0).click().wait(500)

    cy.getBySel('ownerUsersList').should('be.visible').click().wait(500);
    cy.get('.dx-popup-content #dynamicSelectBoxDropdownGrid').eq(4).find(' .dx-datagrid-rowsview tr td').eq(0).click().wait(500)

    cy.getBySel('assigneeUsersList').should('be.visible').click().wait(500);
    cy.get('.dx-popup-content #dynamicSelectBoxDropdownGrid').eq(5).find(' .dx-datagrid-rowsview tr td').eq(0).click().wait(500)

    cy.get('#addActionForm input[name="targetDate"]').type(faker.date.future().toISOString().slice(0, 10));
    cy.get('#addActionForm textarea[name="notes"]').type(faker.string.alphanumeric(120)).wait(500);
    cy.getBySel('saveClientAction').click().wait(2000);
    cy.contains('Client action has been added.').wait(1000)
  })

  /**
   * @scenario Edit Client Action
   * @description Updates notes and implementation plan of a saved action
   * @testData Dynamic faker string
   * @steps Open first action row and update fields
   * @expectedResult Edits are saved successfully
   */
  it('Edit Action', () => {
    cy.visit(location).wait(2000)
    let gridActions = cy.wrap('#gridClientDocuments table tbody tr');
    gridActions.get('.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(1000);

    cy.getBySel('editActionForm').should('be.visible');
    cy.get('#editActionForm textarea[name="implementationPlan"]').type(faker.string.alphanumeric(120));
    cy.get('#editActionForm textarea[name="notes"]').type(faker.string.alphanumeric(120));
    cy.getBySel('saveAction').click().wait(2000);
  })

  /**
   * @scenario Delete Client Action
   * @description Deletes an existing action/task
   * @steps Open first action row and click delete
   * @expectedResult Action is removed from the system
   */
  it('Delete Action', () => {
    cy.visit(location).wait(2000)
    let gridActions = cy.wrap('#gridClientDocuments table tbody tr');
    gridActions.get('.dx-command-edit-with-icons a').eq(0).click({ force: true }).wait(1000);
    cy.getBySel('deleteAction').click();
    cy.get('#bot2-Msg1').contains('Yes').click();
  })
})

