
describe('Transaction Monitoring & Actions', ()=>{

    it("Transaction Monitoring & Actions pages", () => {
        let routes = [
            {index: 7, route: "/settings/currency-rates", assertion: "Currency Rates"},
            {index: 8, route: "/settings/dynamic-report-engine-setups", assertion: "Dynamic Report Engine Setups"},
            {index: 9, route: "/settings/gaming-setups", assertion: "Gaming Setups"},
            {index: 10, route: "/settings/investment-account-types", assertion: "Investment Account Types"},
            {index: 11, route: "/settings/payment-methods", assertion: "Payment Methods"},
            {index: 12, route: "/settings/rule-categories", assertion: "Rule Categories"},
            {index: 13, route: "/settings/trade-types", assertion: "Trade Types"},
            {index: 14, route: "/settings/transactions-setup", assertion: "Transactions Setup"}
        ]

        routes.forEach((route, i) => {
            cy.getByDataCy("settings-menu").click().wait(1000)
            cy.getByDataCy("transaction-menu").should("be.visible")
            cy.getByDataCy("transaction-menu").click().as('transaction-menu')
            cy.getByDataCy("transaction-links").as("transaction-links")
            cy.get("@transaction-links").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            // cy.wait(2000)
            cy.contains(route.assertion)
            // after 4 seconds the data should have loaded and spinner should not be visible
            cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)

            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
            }
        })
    })
})