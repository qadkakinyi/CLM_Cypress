describe("Administration", ()=>{
    
    beforeEach(()=>{
        cy.visit('/main/dashboard')
        // pin the main sidebar
        cy.get('aside').then(el =>{
            let unpin_icon = el.find('.dx-icon-unpin')

            //check if unpin icon is visible
            if (unpin_icon.length > 0){
                cy.wrap(unpin_icon).click().wait(1000)
            }else{
                cy.log('Unpin icon missing')
            }
        })

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
