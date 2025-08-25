/**
 * @testSuite Processes - Onboarding Portal Navigation
 * @description Verifies that each submenu item under Processes → Onboarding Portal navigates to the correct page and displays the expected heading.
 * @priority Medium
 * @owner QA Team
 * @tags regression, navigation, processes, onboarding-portal
 * @dependencies cypress, getByDataCy
 * @fileDescription Iterates through Onboarding Portal routes, asserting correct URL and expected on-page assertion text.
 */

let routes = [
    {index:0, route:"/processes/handle-onboarding-clients", assertion:"Handle Onboarding Clients"},
    {index:1, route:"/processes/handle-onboarding-client-registrations", assertion: "Onboarding Portal"},
    {index:2, route:"/processes/handle-onboarding-users", assertion: 'Handle Onboarding Users'},
    {index:3, route:"/processes/handle-clients-portal-users", assertion: "Handle Portal Users of Clients"},
]

describe("Onboarding Portal", ()=>{

    /**
     * @suite Onboarding Portal Menu Access
     * @description Ensures the Processes → Onboarding Portal submenu is visible before navigating to target pages.
     * @prerequisites User is logged in and can access the Processes menu. Sidebar may need pinning.
     */

    routes.forEach((route)=>{
        /**
         * @scenario Open Onboarding Portal Page
         * @description Opens a specific Onboarding Portal page and verifies URL and expected heading text.
         * @priority Medium
         * @testData index = route.index, expectedPath = route.route, expectedText = route.assertion.
         * @steps Visit /main/dashboard and pin the sidebar if the unpin icon is present.
         * @steps Click Processes → Onboarding Portal, then click the submenu item by index.
         * @steps Verify the browser path equals the expected route and the page contains the expected assertion text.
         * @expectedResult Page loads with the correct URL and displays the expected heading text.
         */
        it(`Opens ${route.assertion} page`, ()=>{

            if(route.index <= routes.length - 1){
                cy.visit("/main/dashboard")
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

                cy.getByDataCy("processes").click()
                cy.getByDataCy("onboarding-portal").scrollIntoView().should("be.visible")
                cy.getByDataCy("onboarding-portal").click().as('onboarding-portal-menu')
                cy.get("@onboarding-portal-menu").find("ul>li").as("onboarding-portal-list")

                //assertion
                cy.get("@onboarding-portal-list").eq(route.index).click()
                cy.location("pathname").should("equal", route.route)
                cy.wait(3000)
                cy.contains(route.assertion)
            }else{
                cy.visit('/main/dashboard')
            }
        })
    })
})

