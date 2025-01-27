describe("Administration", ()=>{
    
    beforeEach(()=>{
        cy.visit('/main/dashboard')
        cy.getByDataCy("administration-menu").should("be.visible").click()
    })
    
    it("Opens the menu list under administration", ()=>{
        cy.getByDataCy("administration-menu").find("ul>li").should("be.visible")
    })
    
    it("Opens Account", ()=>{
        cy.getByDataCy("administration-menu").find("ul>li").eq(0).click()
        cy.location("pathname").should("equal", "/administration/account")
        cy.get('#activeUsers')
        cy.contains("Active Users")
    })
    
    it("Opens release notes", ()=>{
        cy.getByDataCy("administration-menu").find("ul>li").eq(1).click()
        cy.location("pathname").should("equal", "/administration/release-notes")
        cy.contains("Release Notes")
    })
    
})
