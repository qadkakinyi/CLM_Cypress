describe("Client Profiling", ()=> {

    it("Client Profiling Pages (submenus 8 to 15)", () => {

        let routes = [

            {index: 8, route: "/settings/default-addresses", assertion: "Default Addresses"},
            {index: 9, route: "/settings/document-categories", assertion: "Document Categories"},
            {index: 10, route: "/settings/documents", assertion: "Documents"},
            {index: 11, route: "/settings/fatca-setup", assertion: "FATCA Setup"},
            {index: 12, route: "/settings/integration-capacities", assertion: "Integration Capacities"},
            {index: 13, route: "/settings/keywords", assertion: "Keywords"},
            {index: 14, route: "/settings/mandatory-documents-categories", assertion: "Mandatory Documents Categories"},
            {index: 15, route: "/settings/mid-classes", assertion: "MID Classes"},

        ]

        routes.forEach((route, i) => {
            cy.getByDataCy("settings-menu").click().wait(2000)
            cy.getByDataCy("client-profiling-menu").should("be.visible")
            cy.getByDataCy("client-profiling-menu").click().as('client-profiling-menu')
            cy.get("@client-profiling-menu").find("ul>li").as("client-profiling-links")
            cy.get("@client-profiling-links").eq(route.index).click()
            // cy.wait(4000)
            cy.location("pathname").should("equal", route.route)
            cy.contains(route.assertion)
            // after this 4 seconds the data should have loaded and spinner should not be visible
            cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)

            if (i < routes.length - 1) {
                cy.visit("/main/dashboard").wait(2000)
            }

        })
    })
})