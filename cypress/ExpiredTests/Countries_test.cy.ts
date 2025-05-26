
describe("Countries", ()=>{

    it("Countries Pages", () => {

        let routes = [
            {index: 0, route: "/settings/cities", assertions: "Cities & Ports"},
            {index: 1, route: "/settings/countries", assertions: "Countries"},
            {index: 2, route: "/settings/country-categories", assertions: "Country Categories"},
            {index: 3, route: "/settings/country-evaluation-grades", assertions: "Country Evaluation Grades"}
        ]

        routes.forEach((route, i) => {
            cy.getByDataCy("settings-menu").click().wait(1000)
            cy.getByDataCy("country-menu").should("be.visible")
            cy.getByDataCy("country-menu").click().as('country-menu')
            cy.getByDataCy("country-links").as("country-links")
            cy.get("@country-links").eq(route.index).click().wait(1000)
            cy.location("pathname").should("equal", route.route)
            // cy.wait(2000)
            cy.contains(route.assertions)
            cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)

            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
            }

        })
    })
})