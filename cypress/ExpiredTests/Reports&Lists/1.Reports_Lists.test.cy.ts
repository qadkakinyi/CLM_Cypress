describe("Reports/Lists module", ()=>{
    it("Open reports page", ()=>{

        cy.getByDataCy("reports-menu").click().wait(2000)
        
        cy.contains('General Reports')
        cy.contains('Custom Reports')
            
    })
})