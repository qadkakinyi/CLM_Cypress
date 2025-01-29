
describe("User Management", ()=>{

    let data = [
        {index:0, route:"/administration/data-access-groups", assertion:"Data Access Groups"},
        {index:1, route:"/administration/roles", assertion:"Roles"},
        {index:2, route:"/administration/users", assertion:"Users"}
    ]

    beforeEach(()=>{
        cy.visit('/main/dashboard')
        cy.getByDataCy("administration-menu").should("be.visible").click()
        cy.getByDataCy("administration-menu").find("ul>li").eq(2).click().as("user-mgmt-menu")
        cy.get("@user-mgmt-menu").find("ul>li").as("user-menu-list")
    })

    it("Opens User Management Menus", ()=>{
        cy.get("@user-mgmt-menu").should("be.visible").find("ul>li").should("have.length", 3)
    })

    it("Accesses all pages in the menu list", ()=>{

        data.forEach((route, i)=>{
            cy.get("@user-menu-list").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(3000)
            cy.contains(route.assertion)

            if(i < data.length - 1){
                cy.visit('/main/dashboard')
                cy.getByDataCy("administration-menu").should("be.visible").click()
                cy.getByDataCy("administration-menu").find("ul>li").eq(2).click().as("user-mgmt-menu")
                cy.get("@user-mgmt-menu").find("ul>li").as("user-menu-list")
            }
        })

    })
})
