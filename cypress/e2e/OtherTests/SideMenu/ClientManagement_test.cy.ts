describe("Client Management", ()=>{

    it('Load the list of clients', ()=>{

        //clicks the know your clients button then confirms if we successfully navigated to the clients route
        cy.getByDataCy("know-clients-btn").click()
        cy.location("pathname").should('equal', "/main/clients")
        cy.contains("Client Management").should("be.visible")
    }) 
})  