describe("Client Profiling", ()=> {

    it("Client Profiling Pages (submenus 16 to 22)", () => {

        let routes = [
            {index: 16, route: "/settings/mid-types", assertion:"MID Types"},
            {index: 17, route: "/settings/monitoring-visit-type", assertion:"Monitoring Visit Type"},
            {index: 18, route: "/settings/reasonsForTin", assertion:"Reasons For TIN"},
            {index: 19, route: "/settings/regulation-groups", assertion:"Regulation Groups"},
            {index: 20, route: "/settings/related-website-types", assertion:"Related Website Types"},
            {index: 21, route: "/settings/sub-groups", assertion:"Sub-Groups"},
            {index: 22, route: "/settings/tags", assertion:"Tags"}
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

            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
            }

        })
    })
})