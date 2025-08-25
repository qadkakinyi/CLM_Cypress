/**
 * @testSuite Settings - Template & Report Setup Navigation
 * @description Verifies that each submenu item under Settings → Templates navigates to the correct page, shows the expected heading, and finishes loading without a visible spinner.
 * @priority Medium
 * @owner QA Team
 * @tags regression, navigation, settings, templates, reports
 * @dependencies cypress, getByDataCy
 * @fileDescription Iterates through Template and Report Setup routes and asserts correct URL, heading text, and loader behavior.
 */

let routes = [
    {index: 0, route: "/settings/intro-endings", assertion:'Intro & Endings'},
    {index: 1, route: "/settings/email-templates", assertion:'Email Templates'},
    {index: 2, route: "/settings/external-notification-templates", assertion:'External Notification Templates'},
    {index: 3, route: "/settings/notification-templates", assertion:'Notification Templates'},
    {index: 4, route: "/settings/report-engine-setups", assertion:'Report Engine Setups'},
]

describe('Template and Report Setup', ()=>{

    /**
     * @suite Template & Report Setup Navigation
     * @description Parameterized checks for each Settings → Templates/Reports page.
     * @prerequisites User is logged in; Settings → Templates submenu is available; spinner selector is ".sk-ball-spin-clockwise".
     */

    routes.forEach((route) => {
        /**
         * @scenario Visit Template/Report Setup Page
         * @description Opens a specific Templates/Reports page and verifies URL, heading, and that the loader is not visible.
         * @priority Medium
         * @testData index = route.index, expectedPath = route.route, expectedText = route.assertion.
         * @steps Visit /main/dashboard and pin the sidebar if needed.
         * @steps Open Settings → Templates and click the item by index.
         * @steps Assert path equals expected route, spinner not visible, and page contains expected text.
         * @expectedResult Target page loads with correct URL and visible expected text; spinner is not visible.
         */
        it(`Visits ${route.assertion} page`, () => {
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
                cy.getByDataCy("templates-menu").scrollIntoView()
                cy.getByDataCy("templates-menu").click().as('templates-menu')
                cy.get("@templates-menu").find("ul>li").as("templates-links")
                cy.get("@templates-links").eq(route.index).click()

                //assertion
                cy.location("pathname").should("equal", route.route)
                cy.wait(2000)
                cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
                cy.contains(route.assertion)

            }else{
                cy.visit("/main/dashboard")
            }
        })
    })
})

