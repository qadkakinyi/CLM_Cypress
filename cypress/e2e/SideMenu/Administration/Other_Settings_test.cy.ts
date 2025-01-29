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

    data.forEach((route)=>{
        
        it(`Accesses ${route.assertion} page`, ()=>{
            cy.get("@other-settings-list").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(3000)
            cy.contains(route.assertion)
    
            if(route.index < data.length - 1){
                cy.visit('/main/dashboard')
                cy.getByDataCy("administration-menu").scrollIntoView().click()
                cy.getByDataCy("administration-menu").find("ul>li").eq(4).click().as("other-settings-menu")
                cy.get("@other-settings-menu").find("ul>li").as("audit-trail-list")
            }
        })
    })
})