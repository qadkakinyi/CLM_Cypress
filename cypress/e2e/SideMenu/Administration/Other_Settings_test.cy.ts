let routes = [
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


    it("Opens Other Settings Menus", ()=>{
        cy.visit('/main/dashboard')
        cy.getByDataCy("administration-menu").scrollIntoView().click()
        cy.getByDataCy("administration-menu").find("ul>li").eq(4).click().as("other-settings-menu")
        cy.get("@other-settings-menu").scrollIntoView().find("ul>li").should("have.length", routes.length)
    })

    routes.forEach((route)=>{
        
        it(`Accesses ${route.assertion} page`, ()=> {
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
                cy.getByDataCy("administration-menu").find("ul>li").eq(4).click().as("other-settings-menu")
                cy.get("@other-settings-menu").find("ul>li").as("other-settings-list")
                cy.get("@other-settings-list").eq(route.index).click()
    
                //assertion
                cy.location("pathname").should("equal", route.route)
                cy.wait(3000)
                cy.contains(route.assertion)
                
            }else{
                cy.visit('/main/dashboard')
            }
        })
    })
})