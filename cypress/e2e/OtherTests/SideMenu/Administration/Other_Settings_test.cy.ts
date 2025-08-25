/**
 * @testSuite Administration - Other Settings Navigation
 * @description Verifies that each menu item under "Other Settings" in the Administration menu navigates to the correct page, displays the expected content, and loads without visible loaders.
 * @priority Medium
 * @owner QA Team
 * @tags regression, navigation, administration, other-settings
 * @dependencies cypress, getByDataCy
 * @fileDescription Iterates through the Other Settings submenu to validate route correctness, expected text, and loader behavior.
 */

let routes = [
    {index:0, route:"/administration/check-transaction-screening", assertion:"Check Transaction Screening"},
    {index:1, route:"/administration/system-dynamic-reports", assertion:"Dynamic Reports"},
    {index:2, route:"/administration/event-engines", assertion:"Event Engines"},
    {index:3, route:"/administration/external-credentials-setups", assertion:"External Credentials Setups"},
    {index:4, route:"/administration/internal-blacklists-setup", assertion:"Internal Blacklists Setup"},
    {index:5, route:"/administration/query-templates", assertion:"Query Templates"},
    {index:6, route:"/administration/rules", assertion:"Rules"},
    {index:7, route:"/administration/task-scheduler", assertion:"Task Scheduler"},
    {index:8, route:"/administration/workflows", assertion:"Workflows"}
]

describe("Other Settings", ()=>{

    /**
     * @suite Other Settings Menu Access
     * @description Confirms that the Other Settings submenu under Administration contains the expected number of menu items.
     * @prerequisites User is logged in and has access to the Administration menu.
     * @steps Visit /main/dashboard.
     * @steps Expand the Administration menu and click the 5th item (Other Settings).
     * @expectedResult The Other Settings submenu is visible and contains exactly routes.length items.
     * @priority Medium
     */
    it("Opens Other Settings Menus", ()=>{
        cy.visit('/main/dashboard')
        cy.getByDataCy("administration-menu").scrollIntoView().click()
        cy.getByDataCy("administration-menu").find("ul>li").eq(4).click().as("other-settings-menu")
        cy.get("@other-settings-menu").scrollIntoView().find("ul>li").should("have.length", routes.length)
    })

    routes.forEach((route)=>{

        /**
         * @scenario Access Other Settings Page
         * @description Opens a specific Other Settings page and verifies URL, page heading, and loader behavior.
         * @priority Medium
         * @testData index = route.index, expectedPath = route.route, expectedText = route.assertion.
         * @steps Visit /main/dashboard.
         * @steps Pin the sidebar if necessary.
         * @steps Expand the Administration menu and open the Other Settings submenu.
         * @steps Click the submenu item by index and verify the path matches expected route.
         * @steps Wait for page load, confirm loader ".sk-ball-spin-clockwise" is not visible, and assert presence of expected text.
         * @expectedResult Page loads correctly with matching URL and assertion text, and loader is not visible.
         */
        it(`Accesses ${route.assertion} page`, ()=> {
            if(route.index <= routes.length - 1){
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

                cy.getByDataCy("administration-menu").scrollIntoView().click()
                cy.getByDataCy("administration-menu").find("ul>li").eq(4).click().as("other-settings-menu")
                cy.get("@other-settings-menu").find("ul>li").as("other-settings-list")
                cy.get("@other-settings-list").eq(route.index).click()

                //assertion
                cy.location("pathname").should("equal", route.route)
                cy.wait(2000)
                cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
                cy.contains(route.assertion)

            }else{
                cy.visit('/main/dashboard')
            }
        })
    })
})

