describe("Audit Trail Extractions & Setups", ()=>{

    let routes = [
        {index:0, route:"/administration/audit-logs-report", assertion:"Audit Trail"},
        {index:1, route:"/administration/field-log-setups", assertion:"Audit Trail Setups"},
        {index:2, route:"/administration/auto-run-scripts", assertion:"Auto Run Scripts Trail"},
        {index:3, route:"/administration/custom-logs-report", assertion:"Custom Logs Trail"},
        {index:4, route:"/administration/emails-logs-report", assertion:"Email Audit Trail"},
        {index:5, route:"/administration/external-notifications-logs-report", assertion:"External Notifications Audit Trail"},
        {index:6, route:"/administration/hangfire-job-log-report", assertion:"Recurring Jobs Audit Trail"},
        {index:7, route:"/administration/login-log-report", assertion:"Login Audit Trail"}
    ]
    
    it("Opens Audit Trails Menus", ()=>{
        cy.visit('/main/dashboard')
        cy.getByDataCy("administration-menu").should("be.visible").click()
        cy.getByDataCy("administration-menu").find("ul>li").eq(3).click().as("audit-trail-menu")
        cy.get("@audit-trail-menu").find("ul>li").as("audit-trail-list")
        cy.get("@audit-trail-menu").scrollIntoView().find("ul>li").should("have.length", routes.length)
    })

    routes.forEach((route)=>{

        it(`Accesses ${route.assertion} page`, ()=>{

            if(route.index <= routes.length - 1){
                cy.visit('/main/dashboard')
                // pin the main sidebar
                cy.get('aside').then(el =>{
                    let unpin_icon = el.find('.dx-icon-unpin')

                    //check if unpin icon is visible
                    if (unpin_icon.length > 0){
                        cy.wrap(unpin_icon).click().wait(1000)
                    }else{
                        cy.log('Unpin icon missing')
                    }
                })
                
                cy.getByDataCy("administration-menu").scrollIntoView().click()
                cy.getByDataCy("administration-menu").find("ul>li").eq(3).click().as("audit-trail-menu")
                cy.get("@audit-trail-menu").find("ul>li").as("audit-trail-list")
                cy.get("@audit-trail-list").eq(route.index).scrollIntoView().click()
                
                //assertion
                cy.location("pathname").should("equal", route.route)
                cy.wait(2000)
                cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
                cy.contains(route.assertion)
                
            }else{
                cy.visit('/main/dashboard')
            }
        })

    })
})