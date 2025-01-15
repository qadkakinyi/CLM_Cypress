describe('Home Navigations', () => {
  it('Visit the homepage', () => {
    cy.wait(4000)
    cy.location("pathname").should("equal", "/main/dashboard")
    
    // Checking if all sections in the page load and are visible
    cy.getByDataCy('transaction-volume').should("be.visible")
    cy.getByDataCy("review-actions").should("be.visible")
    cy.getByDataCy("cases-created").scrollIntoView()
    cy.screenshot('All/Home Navigations/cases-created')
    cy.getByDataCy("view-cases").scrollIntoView()
    cy.getByDataCy("latest-live-alerts").scrollIntoView()
    cy.getByDataCy("client-eval-grades").scrollIntoView()
    cy.getByDataCy("active-per-status").scrollIntoView() 
    cy.getByDataCy("client-countries").scrollIntoView()
    cy.screenshot('All/Home Navigations/client-countries')
  })
})    