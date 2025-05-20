
describe("User Management", ()=>{

    let routes = [
        {index:0, route:"/administration/data-access-groups", assertion:"Data Access Groups"},
        {index:1, route:"/administration/roles", assertion:"Roles"},
        {index:2, route:"/administration/users", assertion:"Users"}
    ]

    it("Opens User Management Menus", ()=>{
        cy.visit('/main/dashboard')
        cy.getByDataCy("administration-menu").should("be.visible").click()
        cy.getByDataCy("administration-menu").find("ul>li").eq(2).click().as("user-mgmt-menu")
        cy.get("@user-mgmt-menu").should("be.visible").find("ul>li").should("have.length", 3)
    })

    routes.forEach((route)=>{

        it(`Accesses ${route.assertion} page`, ()=> {

            if (route.index <= routes.length - 1) {
                cy.visit('/main/dashboard')
                // pin the main sidebar
                cy.get('aside').then(el => {
                    let unpin_icon = el.find('.dx-icon-unpin')

                    //check if unpin icon is visible
                    if (unpin_icon.length > 0) {
                        cy.wrap(unpin_icon).click().wait(1000)
                    } else {
                        cy.log('Unpin icon missing')
                    }
                })
                cy.getByDataCy("administration-menu").should("be.visible").click()
                cy.getByDataCy("administration-menu").find("ul>li").eq(2).click().as("user-mgmt-menu")
                cy.get("@user-mgmt-menu").find("ul>li").as("user-menu-list")
                cy.get("@user-menu-list").eq(route.index).click()

                //assertion
                cy.location("pathname").should("equal", route.route)
                cy.wait(3000)
                cy.contains(route.assertion)
            } else {
                cy.visit('/main/dashboard')
            }
        })
    })
})
