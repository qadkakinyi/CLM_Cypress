let routes = [
    {index: 0, route: "/settings/firm-criteria", assertion:'Firm Criteria'},
    {index: 1, route: "/settings/firm-criteria-categories", assertion:'Firm Criteria Categories'},
    {index: 2, route: "/settings/firm-evaluation-grades", assertion:'Firm Evaluation Grades'},
    {index: 3, route: "/settings/firm-mitigation-measures", assertion:'Firm Mitigation Measures'},
    {index: 4, route: "/settings/firm-sanction-criteria", assertion:'Firm Sanction Criteria'},
    {index: 5, route: "/settings/firm-sanction-evaluation-grades", assertion:'Firm Sanction Evaluation Grades'},
    {index: 6, route: "/settings/firm-sanction-mitigation-measures", assertion:'Firm Sanction Mitigation Measures'},
]
describe('Know Your Firm', ()=>{
    beforeEach(()=>{
        cy.visit("/main/dashboard").wait(2000)
        cy.getByDataCy("settings-menu").click().wait(1000)
        cy.getByDataCy("know-your-firm-menu").scrollIntoView()
        cy.getByDataCy("know-your-firm-menu").click().as('know-your-firm-menu')
        cy.get("@know-your-firm-menu").find("ul>li").as("know-your-firm-links")
    })
        
    routes.forEach((route) => {
        it(`Visits ${route.assertion} page`, () => {
            cy.get("@know-your-firm-links").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(2000)
            cy.contains(route.assertion)
    
            if( route.index < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
                cy.getByDataCy("settings-menu").click().wait(2000)
                cy.getByDataCy("know-your-firm-menu").scrollIntoView()
                cy.getByDataCy("know-your-firm-menu").click().as('know-your-firm-menu')
                cy.get("@know-your-firm-menu").find("ul>li").as("know-your-firm-links")
            }
        })
    })
})