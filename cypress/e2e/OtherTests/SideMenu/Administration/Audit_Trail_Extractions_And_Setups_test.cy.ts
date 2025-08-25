/**
 * @testSuite Administration - Audit Trail Extractions & Setups
 * @description Verifies that all Audit Trail-related menu items under Administration navigate to the correct pages, display expected content, and load without visible loaders.
 * @priority Medium
 * @owner QA Team
 * @tags regression, navigation, audit-trail, administration
 * @dependencies cypress, getByDataCy
 * @fileDescription Iterates through the Audit Trails submenu, checking route correctness, page headings, and loader disappearance.
 */

describe("Audit Trail Extractions & Setups", ()=>{

    let routes = [
        {index:0, route:"/administration/audit-logs-report", assertion:"Audit Trail"},
        {index:1, route:"/administration/field-log-setups", assertion:"Audit Trail Setups"},
        {index:2, route:"/administration/auto-run-scripts", assertion:"Auto Run Scripts Trail"},
        {index:3, route:"/administration/custom-logs-report", assertion:"Custom Logs Trail"},
        {index:4, route:"/administration/emails-logs-report", assertion:"Email Audit Trail"},
        {index:5, route:"/administration/external-notifications-logs-report", assertion:"External Notifications Audit Trail"},
        {index:6, route:"/administration/hangfire-job-log-report", assertion:"Recurring Jobs Audit Trail"},
        {index:7, route:"/administration/login-log-report", assertion:"Login Audit Trail"}
    ]

    /**
     * @suite Audit Trails Menu Access
     * @description Ensures the Audit Trail menu expands and contains the expected number of submenu items.
     * @prerequisites User is logged in and can access the Administration menu.
     * @steps Visit /main/dashboard.
     * @steps Expand the Administration menu and click the 4th item (Audit Trails).
     * @steps Alias the Audit Trails submenu for later reference.
     * @expectedResult The submenu is visible and contains exactly routes.length items.
     * @priority Medium
     */
    it("Opens Audit Trails Menus", ()=>{
        cy.visit('/main/dashboard')
        cy.getByDataCy("administration-menu").should("be.visible").click()
        cy.getByDataCy("administration-menu").find("ul>li").eq(3).click().as("audit-trail-menu")
        cy.get("@audit-trail-menu").find("ul>li").as("audit-trail-list")
        cy.get("@audit-trail-menu").scrollIntoView().find("ul>li").should("have.length", routes.length)
    })

    routes.forEach((route)=>{

        /**
         * @scenario Access Audit Trail Page
         * @description Opens a specific Audit Trail page and verifies URL, page heading, and loader behavior.
         * @priority Medium
         * @testData index = route.index, expectedPath = route.route, expectedText = route.assertion.
         * @steps Visit /main/dashboard.
         * @steps Pin the sidebar if needed.
         * @steps Expand the Administration menu and open the Audit Trails submenu.
         * @steps Click the submenu item by index and verify path matches expected route.
         * @steps Wait for page load, confirm loader ".sk-ball-spin-clockwise" is not visible, and assert presence of expected text.
         * @expectedResult Page loads correctly with matching URL and assertion text, and loader is not visible.
         */
        it(`Accesses ${route.assertion} page`, ()=>{

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
                cy.getByDataCy("administration-menu").find("ul>li").eq(3).click().as("audit-trail-menu")
                cy.get("@audit-trail-menu").find("ul>li").as("audit-trail-list")
                cy.get("@audit-trail-list").eq(route.index).scrollIntoView().click()

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

