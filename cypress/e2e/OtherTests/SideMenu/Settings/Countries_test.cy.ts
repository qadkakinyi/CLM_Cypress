/**
 * @testSuite Settings - Countries Navigation
 * @description Verifies that each submenu item under Settings → Countries navigates to the correct page, displays the expected heading, and finishes loading without a visible spinner.
 * @priority Medium
 * @owner QA Team
 * @tags regression, navigation, settings, countries
 * @dependencies cypress, getByDataCy
 * @fileDescription Iterates through Countries-related settings routes and asserts correct URL, heading text, and loader behavior.
 */

let routes = [
    {index: 0, route: "/settings/cities", assertions: "Cities & Ports"},
    {index: 1, route: "/settings/countries", assertions: "Countries"},
    {index: 2, route: "/settings/country-categories", assertions: "Country Categories"},
    {index: 3, route: "/settings/country-evaluation-grades", assertions: "Country Evaluation Grades"}
]

describe("Countries", ()=>{

    /**
     * @suite Countries Settings Navigation
     * @description Parameterized checks for each Countries settings page under Settings.
     * @prerequisites User is logged in; Settings → Countries submenu is available; spinner selector is ".sk-ball-spin-clockwise".
     */

    routes.forEach((route) => {
        /**
         * @scenario Visit Countries Settings Page
         * @description Opens a specific Countries settings page and verifies URL, heading, and that the loader is not visible.
         * @priority Medium
         * @testData index = route.index, expectedPath = route.route, expectedText = route.assertions.
         * @steps Visit /main/dashboard and pin the sidebar if needed.
         * @steps Open Settings → Countries and click the item by index.
         * @steps Assert path equals expected route, spinner not visible, and page contains expected text.
         * @expectedResult Target page loads with correct URL and visible expected text; spinner is not visible.
         */
        it(`Visits ${route.assertions} Page`, () => {
            if(route.index <= routes.length - 1) {
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
                cy.getByDataCy("settings-menu").click().wait(2000)
                cy.getByDataCy("country-menu").should("be.visible")
                cy.getByDataCy("country-menu").click().as('country-menu')
                cy.get("@country-menu").find("ul>li").as("country-links")
                cy.get("@country-links").eq(route.index).click().wait(1000)

                //assertion
                cy.location("pathname").should("equal", route.route)
                cy.wait(2000)
                cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
                cy.contains(route.assertions)
            }else{
                cy.visit('/main/dashboard')
            }
        })
    })
})


