

describe("Client Profiling", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard")
        cy.getByDataCy("reports-menu").click()
        cy.getByDataCy("client-profiling").should("be.visible")
        cy.getByDataCy("client-profiling").click().as('client-profiling-menu').wait(2000)
        cy.get("@client-profiling-menu").find("ul>li").as("client-profiling-links")
    })

    it("Opens the client profiling menu - level 2 menu", ()=>{
        let routes = [
            {index:0, route: "/reports/clients-general-info-report", assertion: "Clients General Info"},
            {index:1, route: "/reports/clients-report", assertion: "Clients Report"},
            {index:2, route: "/reports/entity-position-report", assertion: "Entity Position Report"},
            {index:3, route: "/reports/profiles-report", assertion: "Profiles Report"},
            {index:4, route: "/reports/statutory-information-report", assertion: "Statutory Information Report"},
            {index:5, route: "/reports/ubo-of-clients-report", assertion: "Ubo of Clients Report"}
        ]

        routes.forEach((route, i)=>{
            cy.get("@client-profiling-links").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.contains(route.assertion)
            cy.wait(5000)
            // after this 5 seconds the data should have loades and spinner should not be visible
            cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)

            if(i < routes.length - 1){
                cy.visit("/main/dashboard")
                cy.getByDataCy("reports-menu").click()
                cy.getByDataCy("client-profiling").should("be.visible")
                cy.getByDataCy("client-profiling").click().as('client-profiling-menu').wait(1500)
                cy.get("@client-profiling-menu").find("ul>li").as("client-profiling-links")
            }

        })
    })
})
