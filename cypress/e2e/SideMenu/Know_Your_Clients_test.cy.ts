describe("Know Your Clients", ()=>{

    it('Load the list of clients', ()=>{

        //clicks the know your clients button then confirms if we successfully navigated to the clients route
        cy.getByDataCy("know-clients-btn").click()
        cy.location("pathname").should('equal', "/main/clients")
        cy.contains("Know your Clients").should("be.visible")
    }) 
})  