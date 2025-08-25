/**
 * @testSuite Processes - Other Menu Navigation
 * @description Verifies that each submenu item under Processes → Other navigates to the correct page and displays the expected heading.
 * @priority Medium
 * @owner QA Team
 * @tags regression, navigation, processes, other-menu
 * @dependencies cypress, getByDataCy
 * @fileDescription Iterates through all Other menu routes, asserting correct URL and expected page content.
 */

let routes =[
    {index:0, route:'/processes/export-clients-xml', assertion:'Export Clients XML'},
    {index:1, route:'/processes/handle-eGOV-requests', assertion: 'Handle eGOV Requests'},
    {index:2, route:'/processes/handle-kyb-registry-failed-documents', assertion: 'Handle KYB Registry Failed Documents'},
    {index:3, route:'/processes/handle-pending-fraud-detection-checks', assertion: 'Handle Pending Fraud Detection Checks'},
    {index:4, route:'/processes/handle-translations', assertion: 'Handle Translations'},
    {index:5, route:'/processes/handle-workflow-processes', assertion: "Handle Workflow Processes"},
    {index:6, route:'/processes/proposed-updates', assertion: "Proposed Updates"},
    {index:7, route:'/processes/trigger-external-notifications', assertion: "Trigger External Notifications"},
]

describe("Other Menu", ()=>{

    routes.forEach((route)=>{

        /**
         * @scenario Open Other Menu Page
         * @description Opens a specific Processes → Other submenu page and verifies the URL and expected heading.
         * @priority Medium
         * @testData index = route.index, expectedPath = route.route, expectedText = route.assertion.
         * @steps Visit /main/dashboard and pin the sidebar if the unpin icon is present.
         * @steps Expand Processes → Other menu.
         * @steps Click submenu item by index and verify URL matches expected route.
         * @steps Assert that the page contains the expected heading text.
         * @expectedResult Correct page is displayed with matching URL and heading text.
         */
        it(`opens ${route.assertion} pages`, ()=>{

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
                cy.getByDataCy("other-submenu").scrollIntoView().should("be.visible")
                cy.getByDataCy("other-submenu").click().as('other-submenu-menu')
                cy.get("@other-submenu-menu").find("ul>li").as("other-submenu-list")

                //assertion
                cy.get("@other-submenu-list").eq(route.index).click()
                cy.location("pathname").should("equal", route.route)
                cy.wait(3000)
                cy.contains(route.assertion)
            }else{
                cy.visit('/main/dashboard')
            }
        })
    })
})

