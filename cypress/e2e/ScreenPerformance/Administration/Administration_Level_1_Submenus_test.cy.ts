describe("Administration Submenu Level 1", ()=>{

    beforeEach(()=>{
        cy.visit('/main/dashboard').wait(2000)
        cy.getByDataCy("administration-menu").should("be.visible").click()
    })
    
    it("Opens Account", ()=>{
        cy.getByDataCy("administration-menu").find("ul>li").eq(0).click()
        cy.location("pathname").should("equal", "/administration/account")
        cy.get('#activeUsers')
        cy.contains("Active Users")
        cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
    })

    it("Opens release notes", ()=>{
        cy.getByDataCy("administration-menu").find("ul>li").eq(1).click()
        cy.location("pathname").should("equal", "/administration/release-notes")
        cy.contains("Release Notes")
        cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
    })

})