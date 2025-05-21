let routes = [
    {index: 0, route: "/settings/cities", assertions: "Cities & Ports"},
    {index: 1, route: "/settings/countries", assertions: "Countries"},
    {index: 2, route: "/settings/country-categories", assertions: "Country Categories"},
    {index: 3, route: "/settings/country-evaluation-grades", assertions: "Country Evaluation Grades"}
]
describe("Countries", ()=>{
        
    routes.forEach((route) => {
        it(`Visits ${route.assertions} Page`, () => {
            if(route.index <= routes.length - 1) {
                cy.visit('/main/dashboard')
                // pin the main sidebar
                cy.get('aside').then(el => {
                    let unpin_icon = el.find('.dx-icon-unpin')

                    //check if unpin icon is visible
                    if (unpin_icon.length > 0) {
                        cy.wrap(unpin_icon).click().wait(1000)
                    } else {
                        cy.log('Unpin icon missing')
                    }
                })
                cy.getByDataCy("settings-menu").click().wait(2000)
                cy.getByDataCy("country-menu").should("be.visible")
                cy.getByDataCy("country-menu").click().as('country-menu')
                cy.get("@country-menu").find("ul>li").as("country-links")
                cy.get("@country-links").eq(route.index).click().wait(1000)
                
                //assertion
                cy.location("pathname").should("equal", route.route)
                cy.wait(2000)
                cy.contains(route.assertions)
            }else{
                cy.visit('/main/dashboard')
            }
        })
    })
})