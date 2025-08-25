/**
 * @testSuite Administration - User Management Navigation
 * @description Verifies that each menu item under "User Management" in the Administration menu navigates to the correct page, displays the expected content, and loads without visible loaders.
 * @priority Medium
 * @owner QA Team
 * @tags regression, navigation, administration, user-management
 * @dependencies cypress, getByDataCy
 * @fileDescription Iterates through the User Management submenu to validate route correctness, expected text, and loader behavior.
 */

describe("User Management", ()=>{

    let routes = [
        {index:0, route:"/administration/data-access-groups", assertion:"Data Access Groups"},
        {index:1, route:"/administration/roles", assertion:"Roles"},
        {index:2, route:"/administration/users", assertion:"Users"}
    ]

    /**
     * @suite User Management Menu Access
     * @description Confirms that the User Management submenu under Administration contains the expected number of menu items.
     * @prerequisites User is logged in and has access to the Administration menu.
     * @steps Visit /main/dashboard.
     * @steps Expand the Administration menu and click the 3rd item (User Management).
     * @expectedResult The User Management submenu is visible and contains exactly 3 items.
     * @priority Medium
     */
    it("Opens User Management Menus", ()=>{
        cy.visit('/main/dashboard')
        cy.getByDataCy("administration-menu").should("be.visible").click()
        cy.getByDataCy("administration-menu").find("ul>li").eq(2).click().as("user-mgmt-menu")
        cy.get("@user-mgmt-menu").should("be.visible").find("ul>li").should("have.length", 3)
    })

    routes.forEach((route)=>{

        /**
         * @scenario Access User Management Page
         * @description Opens a specific User Management page and verifies URL, page heading, and loader behavior.
         * @priority Medium
         * @testData index = route.index, expectedPath = route.route, expectedText = route.assertion.
         * @steps Visit /main/dashboard.
         * @steps Pin the sidebar if necessary.
         * @steps Expand the Administration menu and open the User Management submenu.
         * @steps Click the submenu item by index and verify the path matches expected route.
         * @steps Wait for page load, confirm loader ".sk-ball-spin-clockwise" is not visible, and assert presence of expected text.
         * @expectedResult Page loads correctly with matching URL and assertion text, and loader is not visible.
         */
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
                cy.wait(2000)
                cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
                cy.contains(route.assertion)
            } else {
                cy.visit('/main/dashboard')
            }
        })
    })
})

