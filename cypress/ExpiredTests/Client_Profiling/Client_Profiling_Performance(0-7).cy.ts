beforeEach(()=>{
    cy.visit("/main/dashboard").wait(2000)
})

describe("Client Profiling", ()=> {

    it("Client Profiling Pages first 8", () => {

        let routes = [
            {index: 0, route: "/settings/addressesTypes", assertion: "Addresses Types"},
            {index: 1, route: "/settings/banks", assertion: "Banks"},
            {index: 2, route: "/settings/capacities", assertion: "Capacities"},
            {index: 3, route: "/settings/checklists", assertion: "Checklists"},
            {index: 4, route: "/settings/client-categories", assertion: "Client Categories"},
            {index: 5, route: "/settings/client-categorizations", assertion: "Client Categorizations"},
            {index: 6, route: "/settings/client-statuses", assertion: "Client Statuses"},
            {index: 7, route: "/settings/custom-fields", assertion: "Custom Fields"},

        ]

        routes.forEach((route, i) => {
            cy.getByDataCy("settings-menu").click().wait(2000)
            cy.getByDataCy("client-profiling-menu").click().as('client-profiling-menu').wait(2000)
            cy.get("@client-profiling-menu").find("ul>li").as("client-profiling-links")
            cy.get("@client-profiling-links").eq(route.index).click()
            // cy.wait(4000)
            cy.location("pathname").should("equal", route.route)
            cy.contains(route.assertion)
            // after this 4 seconds the data should have loaded and spinner should not be visible
            cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
            cy.get('.dx-loadpanel').should(`not.be.visible`)

            if (i < routes.length - 1) {
                cy.visit("/main/dashboard").wait(2000)
            }

        })
    })
})
