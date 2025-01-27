let routes = [
    {index:0, route:'/processes/handle-actions', assertion: 'Handle Actions'},
    {index:1, route:'/processes/handle-cases', assertion: 'Handle Cases'},
    {index:2, route:'/processes/handle-rules', assertion: 'Handle Rules'}
]
describe("Transaction Monitoring and Actions", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard")
        cy.getByDataCy("processes").click()
        cy.getByDataCy("transaction-monitoring").should("be.visible")
        cy.getByDataCy("transaction-monitoring").click().as('transaction-monitoring-menu')
        cy.get("@transaction-monitoring-menu").find("ul>li").as("transaction-monitoring-list")
    })

    
        
    routes.forEach((route)=>{
        it(`Opens ${route.assertion} page`, ()=>{
            cy.get("@transaction-monitoring-list").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(3000)
            cy.contains(route.assertion)
    
            if(route.index < routes.length - 1){
                cy.visit('/main/dashboard')
                cy.getByDataCy("processes").click()
                cy.getByDataCy("transaction-monitoring").should("be.visible")
                cy.getByDataCy("transaction-monitoring").click().as('transaction-monitoring-menu')
                cy.get("@transaction-monitoring-menu").find("ul>li").as("transaction-monitoring-list")
            }
        })
    })
})