describe('Templates and Reports', ()=>{
    it("Templates & Report Setups", () => {
        let routes = [
            {index: 0, route: "/settings/intro-endings", assertion:'Intro & Endings'},
            {index: 1, route: "/settings/email-templates", assertion:'Email Templates'},
            {index: 2, route: "/settings/external-notification-templates", assertion:'External Notification Templates'},
            {index: 3, route: "/settings/notification-templates", assertion:'Notification Templates'},
            {index: 4, route: "/settings/report-engine-setups", assertion:'Report Engine Setups'},
        ]
        routes.forEach((route, i) => {
            cy.getByDataCy("settings-menu").click().wait(1000)
            cy.getByDataCy("templates-menu").scrollIntoView()
            cy.getByDataCy("templates-menu").click().as('templates-menu')
            cy.getByDataCy("templates-links").as("templates-links")
            cy.get("@templates-links").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(2000)
            cy.contains(route.assertion)
            cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
            
            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
            }

        })
    })
})