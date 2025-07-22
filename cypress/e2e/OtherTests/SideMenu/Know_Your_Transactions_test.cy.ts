describe("Transaction Insights", ()=>{

    it("Visits know your transactions page", ()=>{
        cy.getByDataCy("know-your-transactions").click()
        cy.location('pathname').should("equal", "/know-your-transactions/transactions")
        cy.contains("Transaction Insights")
    })
    
}) 