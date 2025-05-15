let routes = [
    {index:0, route:"/processes/handle-onboarding-clients", assertion:"Handle Onboarding Clients"},
    {index:1, route:"/processes/handle-onboarding-client-registrations", assertion: "Onboarding Portal"},
    {index:2, route:"/processes/handle-onboarding-users", assertion: 'Handle Onboarding Users'},
    {index:3, route:"/processes/handle-clients-portal-users", assertion: "Handle Portal Users of Clients"},
]

describe("Onboarding Portal", ()=>{

    routes.forEach((route)=>{
        it(`Opens ${route.assertion} page`, ()=>{
            
            if(route.index <= routes.length - 1){
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
                cy.getByDataCy("onboarding-portal").scrollIntoView().should("be.visible")
                cy.getByDataCy("onboarding-portal").click().as('onboarding-portal-menu')
                cy.get("@onboarding-portal-menu").find("ul>li").as("onboarding-portal-list")
                
                //assertion
                cy.get("@onboarding-portal-list").eq(route.index).click()
                cy.location("pathname").should("equal", route.route)
                cy.wait(3000)
                cy.contains(route.assertion)
            }else{
                cy.visit('/main/dashboard')
            }
        })
    })
})