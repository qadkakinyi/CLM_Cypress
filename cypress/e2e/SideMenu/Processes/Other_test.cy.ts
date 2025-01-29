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

    beforeEach(()=>{
        cy.visit("/main/dashboard")
        cy.getByDataCy("processes").click()
        cy.getByDataCy("other-submenu").scrollIntoView().should("be.visible")
        cy.getByDataCy("other-submenu").click().as('other-submenu-menu')
        cy.get("@other-submenu-menu").find("ul>li").as("other-submenu-list")
    })

    

    routes.forEach((route)=>{
        it(`opens ${route.assertion} pages`, ()=>{
            cy.get("@other-submenu-list").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(3000)
            cy.contains(route.assertion)

            if(route.index < routes.length - 1){
                cy.visit("/main/dashboard")
                cy.getByDataCy("processes").click()
                cy.getByDataCy("other-submenu").scrollIntoView().should("be.visible")
                cy.getByDataCy("other-submenu").click().as('other-submenu-menu')
                cy.get("@other-submenu-menu").find("ul>li").as("other-submenu-list")
            }
        })
    })
})