describe("Transaction Monitoring & Actions", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard").wait(2000)
        cy.getByDataCy("reports-menu").click()
        cy.getByDataCy("transaction-monitoring-menu").should("be.visible")
        cy.getByDataCy("transaction-monitoring-menu").click().as('transaction-monitoring-menu')
        cy.getByDataCy("transaction-links").as("transaction-links")
    })

    it("Opens menu under the section and navigates to the expected pages", ()=>{
        let routes = [
            {index:0, route:"/reports/actions-report", assertion: "Actions Report"},
            {index:1, route:"/reports/cases-overview-report", assertion: "Cases Overview"},
            {index:2, route:"/reports/cases-per-rule-report", assertion: "Cases Per Rule Report"},
            {index:3, route:"/reports/cases-report", assertion: "Cases Report"},
            {index:4, route:"/reports/customer-activity-per-scenario-report", assertion: "Customer activity per scenario report"},
            {index:5, route:"/reports/dynamic-reports", assertion: "Dynamic Reports"},
            {index:6, route:"/reports/transactions-evaluation-report", assertion: "Post Transactions"},
            {index:7, route:"/reports/scenario-activity-report", assertion: "Scenario Activity Report"},
        ]

        routes.forEach((route, i)=>{

            cy.get("@transaction-links").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(2000)
            cy.contains(route.assertion)

            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
                cy.getByDataCy("reports-menu").click()
                cy.getByDataCy("transaction-monitoring-menu").should("be.visible")
                cy.getByDataCy("transaction-monitoring-menu").click().as('transaction-monitoring-menu')
                cy.getByDataCy("transaction-links").as("transaction-links")
            }

        })
    })
})
