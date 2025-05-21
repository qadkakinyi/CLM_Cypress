let routes = [
    {index: 0, route: "/settings/intro-endings", assertion:'Intro & Endings'},
    {index: 1, route: "/settings/email-templates", assertion:'Email Templates'},
    {index: 2, route: "/settings/external-notification-templates", assertion:'External Notification Templates'},
    {index: 3, route: "/settings/notification-templates", assertion:'Notification Templates'},
    {index: 4, route: "/settings/report-engine-setups", assertion:'Report Engine Setups'},
]
describe('Template and Report Setup', ()=>{
   
        
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
                cy.getByDataCy("templates-menu").scrollIntoView()
                cy.getByDataCy("templates-menu").click().as('templates-menu')
                cy.get("@templates-menu").find("ul>li").as("templates-links")
                cy.get("@templates-links").eq(route.index).click()
                
                //assertion
                cy.location("pathname").should("equal", route.route)
                cy.wait(2000)
                cy.contains(route.assertion)

            }else{
                cy.visit("/main/dashboard")
            }
        })
    })
})