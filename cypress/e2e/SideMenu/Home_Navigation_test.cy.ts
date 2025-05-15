describe('Home Navigations', () => {
  it('Visit the homepage and various sections', () => {
    cy.wait(4000)
    cy.location("pathname").should("equal", "/main/dashboard")
    
    // Checking if all sections in the page load and are visible
    cy.contains("Tour")
    cy.contains('Pending Actions').should("be.visible")
    cy.contains("My Tasks").click().wait(500)
    cy.contains('sa-button', 'Add Task')

    cy.contains("Key Metrics").click().wait(500)
    cy.contains('Transaction Volume')

    cy.contains("Token Balances").click().wait(500)
    cy.contains('Account Token Balances')
  })
  
  it("Visit my tasks and history page and tests visibility", ()=>{
    cy.visit('/main/dashboard')
   
    cy.contains('My Tasks').click().wait(500)

    //check if my tasks page is visible
    cy.contains('h3', 'Tasks')

    //ensure history page is loaded and displayed
    cy.contains('h3', 'Tasks History').scrollIntoView()
  })

  it("Can add a new task", ()=>{
    //Switch back to tasks tab
    //check if add task button is visible and if when clicked the add task modal is visible
    cy.visit('/main/dashboard')

    cy.contains("My Tasks").click().wait(500)
    cy.getByDataCy("add-task").should("be.visible").click()
    cy.getByDataCy("add-task-modal").should("be.visible")
  })
})    