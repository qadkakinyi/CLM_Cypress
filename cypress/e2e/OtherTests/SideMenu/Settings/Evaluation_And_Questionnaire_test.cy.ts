/**
 * @testSuite Settings - Evaluation & Questionnaire Navigation
 * @description Verifies that each submenu item under Settings → Evaluation & Questionnaire navigates to the correct page, shows the expected heading, and finishes loading without a visible spinner.
 * @priority Medium
 * @owner QA Team
 * @tags regression, navigation, settings, evaluation, questionnaire
 * @dependencies cypress, getByDataCy
 * @fileDescription Iterates through Evaluation & Questionnaire settings routes and asserts correct URL, heading text, and loader behavior.
 */

let routes = [
    {index: 0, route: "/settings/evaluation-types", assertion: "Adhoc Evaluation Types"},
    {index: 1, route: "/settings/criteria", assertion: "Criteria"},
    {index: 2, route: "/settings/criteria-categories", assertion: "Criteria Categories"},
    {index: 3, route: "/settings/evaluation-grades", assertion: "Evaluation Grades"},
    {index: 4, route: "/settings/questionnaire-grades", assertion: "Questionnaire Grades"},
    {index: 5, route: "/settings/questionnaire-types", assertion: "Questionnaire Types"},
    {index: 6, route: "/settings/questions", assertion: "Questions"},
    {index: 7, route: "/settings/questions-categories", assertion: "Questionnaire Categories"},
]

describe('Evaluation And Questionnaire', ()=>{

    /**
     * @suite Evaluation & Questionnaire Settings Navigation
     * @description Parameterized checks for each Evaluation & Questionnaire settings page.
     * @prerequisites User is logged in; Settings → Evaluation & Questionnaire submenu is available; spinner selector is ".sk-ball-spin-clockwise".
     */

    routes.forEach((route) => {
        /**
         * @scenario Visit Evaluation/Questionnaire Settings Page
         * @description Opens a specific settings page and verifies URL, heading, and that the loader is not visible.
         * @priority Medium
         * @testData index = route.index, expectedPath = route.route, expectedText = route.assertion.
         * @steps Visit /main/dashboard and pin the sidebar if needed.
         * @steps Open Settings → Evaluation & Questionnaire and click the item by index.
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
                cy.getByDataCy("evaluation-menu").scrollIntoView()
                cy.getByDataCy("evaluation-menu").click().as('evaluation-menu')
                cy.get("@evaluation-menu").find("ul>li").as("evaluation-links")
                cy.get("@evaluation-links").eq(route.index).click()

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

