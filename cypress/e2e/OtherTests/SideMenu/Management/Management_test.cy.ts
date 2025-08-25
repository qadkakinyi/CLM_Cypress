// import {deleteFolder, images_folder} from "../../support/e2e";

/**
 * @testSuite Management Module - Navigation (Parametrized)
 * @description Verifies that each Management menu item navigates to the correct page and displays the expected section heading.
 * @priority Medium
 * @owner QA Team
 * @tags regression, navigation, management, ui
 * @dependencies cypress, getByDataCy
 * @fileDescription Iterates through Management routes, asserting correct URL and visible assertion text on each page.
 */

describe("Management Module", () => {

    // before(()=>{
    // images_folder.name =  'Management';
    // deleteFolder()
    // })

    let routes = [
        {index: 0, route: "/management/admin-tasks", assertion: "Active Workflow Tasks"},
        {index: 1, route: "/management/management", assertion: "Cases"},
        {index: 2, route: "/management/cases-workflow", assertion: "Cases Workflow"},
        {index: 3, route: "/management/rules-whitelisting", assertion: "Rules Whitelisting"},
        {index: 4, route: "/management/segmentation", assertion: "Segmentation"},
    ]

    /**
     * @suite Management Menu Access
     * @description Uses the Management menu to navigate to each target route.
     * @prerequisites User is logged in and has access to the Management menu. Sidebar may need pinning via the unpin icon.
     */

    routes.forEach((route) => {

        /**
         * @scenario Open Management Page
         * @description Opens a specific Management page and verifies URL and expected heading.
         * @priority Medium
         * @testData index = route.index, expectedPath = route.route, expectedText = route.assertion.
         * @steps Visit /main/dashboard and pin the sidebar if the unpin icon is present.
         * @steps Expand the Management menu and click the item by index.
         * @steps Verify the browser path equals the expected route and the page contains the expected assertion text.
         * @expectedResult Correct page loads with matching URL and visible heading text.
         */
        it(`opens ${route.assertion} page`, () => {

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


                cy.getByDataCy("management-menu").click().wait(300)
                cy.getByDataCy("management-menu").find("ul>li").eq(route.index)
                // cy.screenshot(`All/Management/click ${i+1}`, {capture: "runner", overwrite: true})
                cy.getByDataCy("management-menu").should("be.visible").find("ul>li").eq(route.index).click()

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

