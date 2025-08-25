/**
 * @testSuite Processes - Client Profiling Navigation
 * @description Verifies that each Client Profiling submenu item under Processes navigates to the correct page and displays the expected heading.
 * @priority Medium
 * @owner QA Team
 * @tags regression, navigation, processes, client-profiling
 * @dependencies cypress, getByDataCy
 * @fileDescription Iterates through Client Profiling routes, asserting correct URL and expected on-page assertion text.
 */

// Array holding all routes I expect to navigate to on this layer
let routes = [
    {index:0, route: '/processes/handle-client-documents', assertion: "Handle Client Documents"},
    {index:1, route: '/processes/handle-client-tags', assertion: "Handle Client Tags"},
    {index:2, route: '/processes/handle-clients-unified-scoring', assertion: 'Handle Clients Unified Scoring'},
    {index:3, route: '/processes/handle-documents', assertion: "Handle Documents"},
    {index:4, route: '/processes/handle-evaluations', assertion: "Handle Evaluations"},
    {index:5, route: '/processes/handle-profiles', assertion: "Handle Profiles"},
    {index:6, route: '/processes/handle-questionnaires', assertion: "Handle Questionnaires"}
]

describe("Client Profiling", ()=>{

    /**
     * @suite Client Profiling Menu Access
     * @description Ensures the Processes → Client Profiling submenu is visible before navigating to target pages.
     * @prerequisites User is logged in and can access the Processes menu. Sidebar may need pinning.
     */

    routes.forEach((route)=>{

        /**
         * @scenario Open Client Profiling Page
         * @description Opens a specific Client Profiling page and verifies URL and expected heading text.
         * @priority Medium
         * @testData index = route.index, expectedPath = route.route, expectedText = route.assertion.
         * @steps Visit /main/dashboard and pin the sidebar if the unpin icon is present.
         * @steps Click Processes → Client Profiling, then click the submenu item by index.
         * @steps Verify the browser path equals the expected route and the page contains the expected assertion text.
         * @expectedResult Page loads with the correct URL and displays the expected heading text.
         */
        it(`opens ${route.assertion} page`, ()=>{

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


                cy.getByDataCy("processes").click()
                //opening level 2 menu again for the menu to be visible
                cy.getByDataCy("client-profiling-menu").should("be.visible")
                cy.getByDataCy("client-profiling-menu").click().as('client-profiling-menu')
                cy.get("@client-profiling-menu").find("ul>li").as("client-profiling-list")
                cy.get("@client-profiling-list").eq(route.index).scrollIntoView().click()

                //assertion
                cy.location("pathname").should("equal", route.route)
                cy.wait(3000)
                cy.contains(route.assertion)
            }
            else{
                cy.visit('/main/dashboard')
            }


        })
    })

})

