describe("Client Profiling", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard").wait(2000)
        cy.getByDataCy("reports-menu").click()
        cy.getByDataCy("client-profiling").should("be.visible")
        cy.getByDataCy("client-profiling").click().as('client-profiling-menu')
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
            cy.wait(2000)
            cy.contains(route.assertion)

            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
                cy.getByDataCy("reports-menu").click()
                cy.getByDataCy("client-profiling").should("be.visible")
                cy.getByDataCy("client-profiling").click().as('client-profiling-menu')
                cy.get("@client-profiling-menu").find("ul>li").as("client-profiling-links")
            }

        })
    })
})