describe('Transaction Monitoring & Actions', ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard").wait(2000)
        cy.getByDataCy("settings-menu").click().wait(1000)
        cy.getByDataCy("transaction-menu").should("be.visible")
        cy.getByDataCy("transaction-menu").click().as('transaction-menu')
        cy.getByDataCy("transaction-links").as("transaction-links")
    })

    it("Transaction Monitoring & Actions pages", () => {
        let routes = [
            {index: 0, route: "/settings/actions-setup", assertion: "Actions Setup"},
            {index: 1, route: "/settings/application-approval-setup", assertion: "Application Approval Setup"},
            {index: 2, route: "/settings/case-statuses-risk-points", assertion: "Case Statuses Risk Points"},
            {index: 3, route: "/settings/case-suspicion-levels-risk-points", assertion: "Case Suspicion Levels Risk Points"},
            {index: 4, route: "/settings/case-workflow-statuses", assertion: "Case Workflow Statuses"},
            {index: 5, route: "/settings/contracts-setup", assertion: "Contract Policy Categories"},
            {index: 6, route: "/settings/currency-informations", assertion: "Currency Information"},
            {index: 7, route: "/settings/currency-rates", assertion: "Currency Rates"},
            {index: 8, route: "/settings/dynamic-report-engine-setups", assertion: "Dynamic Report Engine Setups"},
            {index: 9, route: "/settings/gaming-setups", assertion: "Gaming Setups"},
            {index: 10, route: "/settings/investment-account-types", assertion: "Investment Account Types"},
            {index: 11, route: "/settings/payment-methods", assertion: "Payment Methods"},
            {index: 12, route: "/settings/rule-categories", assertion: "Rule Categories"},
            {index: 13, route: "/settings/trade-types", assertion: "Trade Types"},
            {index: 14, route: "/settings/transactions-setup", assertion: "Transactions Setup"},
        ]

        routes.forEach((route, i) => {
            cy.get("@transaction-links").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(2000)
            cy.contains(route.assertion)

            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
                cy.getByDataCy("settings-menu").click().wait(2000)
                cy.getByDataCy("transaction-menu").should("be.visible")
                cy.getByDataCy("transaction-menu").click().as('transaction-menu')
                cy.getByDataCy("transaction-links").as("transaction-links")
            }
        })
    })
})