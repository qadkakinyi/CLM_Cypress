let routes = [
    {index: 0, route: "/settings/cities", assertions: "Cities & Ports"},
    {index: 1, route: "/settings/countries", assertions: "Countries"},
    {index: 2, route: "/settings/country-categories", assertions: "Country Categories"},
    {index: 3, route: "/settings/country-evaluation-grades", assertions: "Country Evaluation Grades"}
]
describe("Countries", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard").wait(2000)
        cy.getByDataCy("settings-menu").click().wait(1000)
        cy.getByDataCy("country-menu").should("be.visible")
        cy.getByDataCy("country-menu").click().as('country-menu')
        cy.get("@country-menu").find("ul>li").as("country-links")
    })

        
    routes.forEach((route) => {
        it(`Visits ${route.assertions} Page`, () => {
            cy.get("@country-links").eq(route.index).click().wait(1000)
            cy.location("pathname").should("equal", route.route)
            cy.wait(2000)
            cy.contains(route.assertions)

            if(route.index < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
                cy.getByDataCy("settings-menu").click().wait(2000)
                cy.getByDataCy("country-menu").should("be.visible")
                cy.getByDataCy("country-menu").click().as('country-menu')
                cy.get("@country-menu").find("ul>li").as("country-links")
            }
        })
    })
})