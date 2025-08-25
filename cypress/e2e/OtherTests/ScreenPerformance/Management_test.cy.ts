/**
 * @testSuite Management Module - Navigation
 * @description Verifies that all main links in the Management menu navigate to the correct pages, display expected content, and finish loading without visible spinners.
 * @priority Medium
 * @owner QA Team
 * @tags regression, navigation, management, ui
 * @dependencies cypress, getByDataCy
 * @fileDescription Iterates through Management module menu items, checking route correctness, page content, and loading indicators.
 */

describe("Management Module", ()=>{

    /**
     * @suite Management Module Navigation
     * @description Visits each Management menu link, validates URL, checks for expected page content, and ensures loaders are not visible after loading.
     * @prerequisites User is logged in and has access to Management module.
     * @prerequisites Management menu items are available via getByDataCy("management-menu") with correct indexing.
     */

    /**
     * @scenario Visit and Validate All Management Links
     * @description Sequentially clicks each Management link, verifies navigation and page content, and ensures UI loaders are hidden after load.
     * @priority Medium
     * @testData routes[] = {index, route, assertionText}.
     * @steps Scroll into view and click the Management menu.
     * @steps Click each menu item in routes[] and assert the browser path equals expected route.
     * @steps Verify page contains the expected assertion text.
     * @steps Confirm that spinner ".sk-ball-spin-clockwise" and ".dx-loadpanel" are not visible.
     * @steps Between navigations, return to main dashboard if more routes remain.
     * @expectedResult Each route loads the correct page with expected content and no visible loaders after load.
     */
    it("Visits all links and loads the correct pages", {
        defaultCommandTimeout: 4000
    },()=>{

        let routes = [
            {index:0, route:"/management/admin-tasks", assertion:"Active Workflow Tasks"},
            {index:1, route:"/management/management", assertion: "Cases"},
            {index:2, route:"/management/cases-workflow", assertion: "Cases Workflow"},
            {index:3, route:"/management/rules-whitelisting", assertion: "Rules Whitelisting"},
            {index:4, route:"/management/segmentation", assertion: "Segmentation"},
        ]

        routes.forEach((route,i)=>{
            //FAVorites menu was copied to share data-cy value
            cy.getByDataCy("management-menu").eq(1).scrollIntoView().click()
            cy.getByDataCy("management-menu").eq(1).scrollIntoView().should("be.visible").find("ul>li").eq(route.index)
            cy.getByDataCy("management-menu").eq(1).should("be.visible").find("ul>li").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)

            cy.contains(route.assertion)
            // after default 4 seconds the data should have loaded and spinner should not be visible
            cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
            cy.get('.dx-loadpanel').should(`not.be.visible`)

            if(i < routes.length - 1){
                cy.visit("main/dashboard").wait(2000)
            }

        })
    })
})

