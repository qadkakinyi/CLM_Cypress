/**
 * @testSuite Processes - Transaction Monitoring Navigation
 * @description Validates that each submenu item under Processes → Transaction Monitoring navigates to the correct page and displays the expected content.
 * @priority Medium
 * @owner QA Team
 * @tags regression, navigation, processes, transaction-monitoring
 * @dependencies cypress, getByDataCy
 * @fileDescription Iterates through Transaction Monitoring submenu items, verifying correct routing, visible headings, and page load completion.
 */

let routes = [
    {index:0, route:'/processes/handle-actions', assertion: 'Handle Actions'},
    {index:1, route:'/processes/handle-cases', assertion: 'Handle Cases'},
    {index:2, route:'/processes/handle-rules', assertion: 'Handle Rules'}
]

describe("Transaction Monitoring", ()=>{

    /**
     * @suite Transaction Monitoring Menu Access
     * @description Ensures the Transaction Monitoring submenu under Processes is accessible before navigating to each route.
     * @prerequisites User is logged in and has access to Processes menu. Sidebar may need pinning.
     */

    routes.forEach((route)=>{

        /**
         * @scenario Open Transaction Monitoring Page
         * @description Opens a Transaction Monitoring page and verifies correct URL, page heading, and successful page load.
         * @priority Medium
         * @testData index = route.index, expectedPath = route.route, expectedText = route.assertion.
         * @steps Visit /main/dashboard.
         * @steps Pin the sidebar if unpin icon is visible.
         * @steps Click Processes → Transaction Monitoring and select the submenu item by index.
         * @steps Verify browser path equals expected route and page contains expected assertion text.
         * @expectedResult Correct page loads with matching URL and visible heading.
         */
        it(`Opens ${route.assertion} page`, ()=>{

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
                cy.getByDataCy("transaction-monitoring").should("be.visible")
                cy.getByDataCy("transaction-monitoring").click().as('transaction-monitoring-menu')
                cy.get("@transaction-monitoring-menu").find("ul>li").as("transaction-monitoring-list")

                cy.get("@transaction-monitoring-list").eq(route.index).click()
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

