describe("Audit Trail Extractions & Setups", ()=>{

    let data = [
        {index:0, route:"/administration/audit-logs-report", assertion:"Audit Trail"},
        {index:1, route:"/administration/field-log-setups", assertion:"Audit Trail Setups"},
        {index:2, route:"/administration/auto-run-scripts", assertion:"Auto Run Scripts Trail"},
        {index:3, route:"/administration/custom-logs-report", assertion:"Custom Logs Trail"},
        {index:4, route:"/administration/emails-logs-report", assertion:"Email Audit Trail"},
        {index:5, route:"/administration/external-notifications-logs-report", assertion:"External Notifications Audit Trail"},
        {index:6, route:"/administration/hangfire-job-log-report", assertion:"Recurring Jobs Audit Trail"},
        {index:7, route:"/administration/login-log-report", assertion:"Login Audit Trail"}
    ]

    beforeEach(()=>{
        cy.visit('/main/dashboard')
        cy.getByDataCy("administration-menu").should("be.visible").click()
        cy.getByDataCy("administration-menu").find("ul>li").eq(3).click().as("audit-trail-menu")
        cy.get("@audit-trail-menu").find("ul>li").as("audit-trail-list")
    })

    it("Opens Audit Trails Menus", ()=>{
        cy.get("@audit-trail-menu").scrollIntoView().find("ul>li").should("have.length", data.length)
    })

    data.forEach((route)=>{

        it(`Accesses ${route.assertion} page`, ()=>{

            cy.get("@audit-trail-list").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(3000)
            cy.contains(route.assertion)

            if(route.index < data.length - 1){
                cy.visit('/main/dashboard')
                cy.getByDataCy("administration-menu").click()
                cy.getByDataCy("administration-menu").find("ul>li").eq(3).click().as("audit-trail-menu")
                cy.get("@audit-trail-menu").find("ul>li").as("audit-trail-list")
            }
        })

    })
})