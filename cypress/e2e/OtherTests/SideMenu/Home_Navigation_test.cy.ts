/**
 * @testSuite Home Navigations
 * @description Validates navigation and content visibility on the home dashboard, including My Tasks, History, and task creation.
 * @priority High
 * @owner QA Team
 * @tags regression, navigation, dashboard
 * @dependencies cypress, getByDataCy
 * @fileDescription Ensures that the homepage loads correctly, all sections are visible, and user can navigate between sections and create a task.
 */

describe('Home Navigations', () => {

  /**
   * @scenario Visit Homepage and Various Sections
   * @description Loads the dashboard and verifies multiple sections (Tour, Pending Actions, My Tasks, Key Metrics, Token Balances) are accessible.
   * @priority High
   * @steps Visit dashboard.
   * @steps Confirm URL path is "/main/dashboard".
   * @steps Verify visibility of "Tour" and "Pending Actions".
   * @steps Navigate to "My Tasks" and verify "Add Task" button is present.
   * @steps Navigate to "Key Metrics" and verify "Transaction Volume".
   * @steps Navigate to "Token Balances" and verify "Account Token Balances".
   * @expectedResult All sections are visible and navigable.
   */
  it('Visit the homepage and various sections', () => {
    cy.wait(4000)
    cy.location("pathname").should("equal", "/main/dashboard")

    // Section checks
    cy.contains("Tour")
    cy.contains('Pending Actions').should("be.visible")

    // My Tasks
    cy.contains("My Tasks").click().wait(500)
    cy.contains('sa-button', 'Add Task')

    // Key Metrics
    cy.contains("Key Metrics").click().wait(500)
    cy.contains('Transaction Volume')

    // Token Balances
    cy.contains("Token Balances").click().wait(500)
    cy.contains('Account Token Balances')
  })

  /**
   * @scenario Visit My Tasks and History Page
   * @description Opens the My Tasks section and verifies the Tasks and Tasks History visibility.
   * @priority Medium
   * @steps Visit dashboard.
   * @steps Click "My Tasks".
   * @steps Verify "Tasks" heading is visible.
   * @steps Scroll to "Tasks History" heading.
   * @expectedResult Both "Tasks" and "Tasks History" headings are visible.
   */
  it("Visit my tasks and history page and tests visibility", () => {
    cy.visit('/main/dashboard')

    // My Tasks
    cy.contains('My Tasks').click().wait(500)
    cy.contains('h3', 'Tasks')

    // History
    cy.contains('h3', 'Tasks History').scrollIntoView()
  })

  /**
   * @scenario Add a New Task
   * @description Opens the Add Task modal from the My Tasks tab.
   * @priority High
   * @steps Visit dashboard.
   * @steps Click "My Tasks".
   * @steps Verify "Add Task" button is visible.
   * @steps Click button and verify modal is displayed.
   * @expectedResult Add Task modal is visible after clicking the button.
   */
  it("Can add a new task", () => {
    cy.visit('/main/dashboard')

    cy.contains("My Tasks").click().wait(500)
    cy.getByDataCy("add-task").should("be.visible").click()
    cy.getByDataCy("add-task-modal").should("be.visible")
  })
})

