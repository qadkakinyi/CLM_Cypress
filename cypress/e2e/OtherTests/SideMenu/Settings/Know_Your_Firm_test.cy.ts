let routes = [
    {index: 0, route: "/settings/firm-criteria", assertion:'Firm Criteria'},
    {index: 1, route: "/settings/firm-criteria-categories", assertion:'Firm Criteria Categories'},
    {index: 2, route: "/settings/firm-evaluation-grades", assertion:'Firm Evaluation Grades'},
    {index: 3, route: "/settings/firm-mitigation-measures", assertion:'Firm Mitigation Measures'},
    {index: 4, route: "/settings/firm-sanction-criteria", assertion:'Firm Sanction Criteria'},
    {index: 5, route: "/settings/firm-sanction-evaluation-grades", assertion:'Firm Sanction Evaluation Grades'},
    // {index: 6, route: "/settings/firm-sanction-mitigation-measures", assertion:'Firm Sanction Mitigation Measures'},
]
describe('Know Your Firm', ()=>{
        
    routes.forEach((route) => {
        it(`Visits ${route.assertion} page`, () => {
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
                cy.getByDataCy("know-your-firm-menu").scrollIntoView()
                cy.getByDataCy("know-your-firm-menu").click().as('know-your-firm-menu')
                cy.get("@know-your-firm-menu").find("ul>li").as("know-your-firm-links")
                cy.get("@know-your-firm-links").eq(route.index).click()
                
                //assertion
                cy.location("pathname").should("equal", route.route)
                cy.wait(2000)
                cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
                cy.contains(route.assertion)

            }else{
                cy.visit("/main/dashboard").wait(2000)
            }
        })
    })
})