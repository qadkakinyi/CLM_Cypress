let routes = [
    {index:0, route:'/processes/handle-actions', assertion: 'Handle Actions'},
    {index:1, route:'/processes/handle-cases', assertion: 'Handle Cases'},
    {index:2, route:'/processes/handle-rules', assertion: 'Handle Rules'}
]
describe("Transaction Monitoring", ()=>{
   
        
    routes.forEach((route)=>{
        it(`Opens ${route.assertion} page`, ()=>{
            
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
                
                cy.getByDataCy("processes").click()
                cy.getByDataCy("transaction-monitoring").should("be.visible")
                cy.getByDataCy("transaction-monitoring").click().as('transaction-monitoring-menu')
                cy.get("@transaction-monitoring-menu").find("ul>li").as("transaction-monitoring-list")

                cy.get("@transaction-monitoring-list").eq(route.index).click()
                cy.location("pathname").should("equal", route.route)
                cy.wait(3000)
                cy.contains(route.assertion)
            }
            else{
                cy.visit('/main/dashboard')
            }
        })
    })
})