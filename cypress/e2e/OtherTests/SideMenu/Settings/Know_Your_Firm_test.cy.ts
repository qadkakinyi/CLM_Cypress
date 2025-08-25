/**
 * @testSuite Settings - Know Your Firm Navigation
 * @description Verifies that each submenu item under Settings → Know Your Firm navigates to the correct page, shows the expected heading, and finishes loading without a visible spinner.
 * @priority Medium
 * @owner QA Team
 * @tags regression, navigation, settings, kyf
 * @dependencies cypress, getByDataCy
 * @fileDescription Iterates through Know Your Firm settings routes and asserts correct URL, heading text, and loader behavior.
 */

let routes = [
    {index: 0, route: "/settings/firm-criteria", assertion:'Firm Criteria'},
    {index: 1, route: "/settings/firm-criteria-categories", assertion:'Firm Criteria Categories'},
    {index: 2, route: "/settings/firm-evaluation-grades", assertion:'Firm Evaluation Grades'},
    {index: 3, route: "/settings/firm-mitigation-measures", assertion:'Firm Mitigation Measures'},
    {index: 4, route: "/settings/firm-sanction-criteria", assertion:'Firm Sanction Criteria'},
    {index: 5, route: "/settings/firm-sanction-evaluation-grades", assertion:'Firm Sanction Evaluation Grades'},
    // {index: 6, route: "/settings/firm-sanction-mitigation-measures", assertion:'Firm Sanction Mitigation Measures'},
]

describe('Know Your Firm', ()=>{

    /**
     * @suite Know Your Firm Settings Navigation
     * @description Parameterized checks for each Know Your Firm settings page.
     * @prerequisites User is logged in; Settings → Know Your Firm submenu is available; spinner selector is ".sk-ball-spin-clockwise".
     */

    routes.forEach((route) => {
        /**
         * @scenario Visit Know Your Firm Settings Page
         * @description Opens a specific KYF settings page and verifies URL, heading, and that the loader is not visible.
         * @priority Medium
         * @testData index = route.index, expectedPath = route.route, expectedText = route.assertion.
         * @steps Visit /main/dashboard and pin the sidebar if needed.
         * @steps Open Settings → Know Your Firm and click the item by index.
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
                cy.getByDataCy("know-your-firm-menu").scrollIntoView()
                cy.getByDataCy("know-your-firm-menu").click().as('know-your-firm-menu')
                cy.get("@know-your-firm-menu").find("ul>li").as("know-your-firm-links")
                cy.get("@know-your-firm-links").eq(route.index).click()

                //assertion
                cy.location("pathname").should("equal", route.route)
                cy.wait(2000)
                cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
                cy.contains(route.assertion)

            }else{
                cy.visit("/main/dashboard").wait(2000)
            }
        })
    })
})

