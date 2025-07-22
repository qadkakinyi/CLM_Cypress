
const routes =[
    {index:0, route: "/processes/handle-auto-ongoing-monitoring-clients", assertion:"Handle Auto Ongoing Monitoring Clients"},
    {index:1, route: "/processes/handle-electronic-identifications", assertion: "Handle Electronic Identifications Clients"},
    {index:2, route: "/processes/handle-screening", assertion: "Handle Screening Process"},
    {index:3, route: "/processes/handle-transaction-screening-cases", assertion: 'Handle Transaction Screening Cases'},
    {index:4, route: "/processes/handle-client-worldcheck-references", assertion: "Handle Clients World Check References"}
]

describe("Screening Services", ()=>{

    routes.forEach((route, i)=>{
        it(`Opens  ${route.assertion} page`, ()=>{
            
            if(i <= routes.length - 1){
                cy.visit("/main/dashboard")
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
                cy.getByDataCy("screening-and-identification").should("be.visible")
                cy.getByDataCy("screening-and-identification").click().as('screening-and-identification-menu')
                cy.get("@screening-and-identification-menu").find("ul>li").as("screening-and-identification-list")

                //assertion
                cy.get("@screening-and-identification-list").eq(route.index).click()
                cy.location("pathname").should("equal", route.route)
                cy.wait(3000)
                cy.contains(route.assertion)
            }else{
                cy.visit('/main/dashboard')
            }
        })
    })
})