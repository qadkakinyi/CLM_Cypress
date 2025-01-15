describe("Administration", ()=>{
    
    beforeEach(()=>{
        cy.visit('/main/dashboard')
        cy.getByDataCy("administration-menu").should("be.visible").click()
    })
    
    it("Opens the menu list under administration", ()=>{
        cy.getByDataCy("administration-menu").find("ul>li").should("be.visible")
    })
    
    it("Opens Account", ()=>{
        cy.getByDataCy("administration-menu").find("ul>li").eq(0).click()
        cy.location("pathname").should("equal", "/administration/account")
        cy.get('#activeUsers')
        cy.contains("Active Users")
    })
    
    it("Opens release notes", ()=>{
        cy.getByDataCy("administration-menu").find("ul>li").eq(1).click()
        cy.location("pathname").should("equal", "/administration/release-notes")
        cy.contains("Release Notes")
    })
    
})

describe("User Management", ()=>{
    
    let data = [
        {index:0, route:"/administration/data-access-groups", assertion:"Data Access Groups"},
        {index:1, route:"/administration/roles", assertion:"Roles"},
        {index:2, route:"/administration/users", assertion:"Users"}
    ]

    beforeEach(()=>{
        cy.visit('/main/dashboard')
        cy.getByDataCy("administration-menu").should("be.visible").click()
        cy.getByDataCy("administration-menu").find("ul>li").eq(2).click().as("user-mgmt-menu")
        cy.get("@user-mgmt-menu").find("ul>li").as("user-menu-list")
    })
    
    it("Opens User Management Menus", ()=>{
        cy.get("@user-mgmt-menu").should("be.visible").find("ul>li").should("have.length", 3)
    })
    
    it("Accesses all pages in the menu list", ()=>{
        
        data.forEach((route, i)=>{
            cy.get("@user-menu-list").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(3000)
            cy.contains(route.assertion)

            if(i < data.length - 1){
                cy.visit('/main/dashboard')
                cy.getByDataCy("administration-menu").should("be.visible").click()
                cy.getByDataCy("administration-menu").find("ul>li").eq(2).click().as("user-mgmt-menu")
                cy.get("@user-mgmt-menu").find("ul>li").as("user-menu-list")
            }
        })
        
    })
})

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
        cy.get("@audit-trail-menu").scrollIntoView().find("ul>li").should("have.length", 8)
    })
    
    it("Accesses all pages in the menu list", ()=>{
        
        data.forEach((route, i)=>{
            cy.get("@audit-trail-list").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(3000)
            cy.contains(route.assertion)

            if(i < data.length - 1){
                cy.visit('/main/dashboard')
                cy.getByDataCy("administration-menu").should("be.visible").click()
                cy.getByDataCy("administration-menu").find("ul>li").eq(3).click().as("audit-trail-menu")
                cy.get("@audit-trail-menu").find("ul>li").as("audit-trail-list")
            }
        })
        
    })
})


describe("Other Settings", ()=>{

    beforeEach(()=>{
        cy.visit('/main/dashboard')
        cy.getByDataCy("administration-menu").scrollIntoView().click()
        cy.getByDataCy("administration-menu").find("ul>li").eq(4).click().as("other-settings-menu")
        cy.get("@other-settings-menu").find("ul>li").as("other-settings-list")
    })

    it("Opens Other Settings Menus", ()=>{
        cy.get("@other-settings-menu").scrollIntoView().find("ul>li").should("have.length", 9)
    })

    it("Accesses all pages in the menu list", ()=>{

        let data = [
            {index:0, route:"/administration/check-transaction-screening", assertion:"Check Transaction Screening"},
            {index:1, route:"/administration/system-dynamic-reports", assertion:"Dynamic Reports"},
            {index:2, route:"/administration/event-engines", assertion:"Event Engines"},
            {index:3, route:"/administration/external-credentials-setups", assertion:"External Credentials Setups"},
            {index:4, route:"/administration/internal-blacklists-setup", assertion:"Internal Blacklists Setup"},
            {index:5, route:"/administration/query-templates", assertion:"Query Templates"},
            {index:6, route:"/administration/rules", assertion:"Rules"},
            {index:7, route:"/administration/task-scheduler", assertion:"Task Scheduler"},
            {index:8, route:"/administration/workflows", assertion:"Workflows"}
        ]

        data.forEach((route, i)=>{
            cy.get("@other-settings-list").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(3000)
            cy.contains(route.assertion)

            if(i < data.length - 1){
                cy.visit('/main/dashboard')
                cy.getByDataCy("administration-menu").scrollIntoView().click()
                cy.getByDataCy("administration-menu").find("ul>li").eq(4).click().as("other-settings-menu")
                cy.get("@other-settings-menu").find("ul>li").as("audit-trail-list")
            }
            
        })

    })
})