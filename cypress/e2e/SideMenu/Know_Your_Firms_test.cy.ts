describe("Know your firms", ()=>{
    
    it("Visits know your firms page", ()=>{
        cy.getByDataCy("my-firms-btn").click()
        cy.location('pathname').should("equal", "/know-your-firms/firms")
        cy.contains("Know your Firm").wait(2000)
    })
    
    it("Can view a single firm", ()=>{
        cy.visit('main/dashboard')
        // select the right chevron icon
        cy.getByDataCy("my-firms-btn").click()
        cy.get('.dx-datagrid-content-fixed > .dx-datagrid-table > tbody > .dx-data-row > .dx-command-edit > .dx-link').eq(0).click()      
        let url_pattern = /\/know-your-firms\/firm\/\d+\/dashboard/ //eg  /know-your-firms/firm/1/dashboard
        cy.location("pathname").should("match",url_pattern) 
    })
})  