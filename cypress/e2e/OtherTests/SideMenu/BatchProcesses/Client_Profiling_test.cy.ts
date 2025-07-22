// Array holding all routes I expect to navigate to on this layer
let routes = [
    {index:0, route: '/processes/handle-client-documents', assertion: "Handle Client Documents"},
    {index:1, route: '/processes/handle-client-tags', assertion: "Handle Client Tags"},
    {index:2, route: '/processes/handle-clients-unified-scoring', assertion: 'Handle Clients Unified Scoring'},
    {index:3, route: '/processes/handle-documents', assertion: "Handle Documents"},
    {index:4, route: '/processes/handle-evaluations', assertion: "Handle Evaluations"},
    {index:5, route: '/processes/handle-profiles', assertion: "Handle Profiles"},
    {index:6, route: '/processes/handle-questionnaires', assertion: "Handle Questionnaires"}
]

describe("Client Profiling", ()=>{
    
    routes.forEach((route)=>{
        
        it(`opens ${route.assertion} page`, ()=>{

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
                //opening level 2 menu again for the menu to be visible
                cy.getByDataCy("client-profiling-menu").should("be.visible")
                cy.getByDataCy("client-profiling-menu").click().as('client-profiling-menu')
                cy.get("@client-profiling-menu").find("ul>li").as("client-profiling-list")
                cy.get("@client-profiling-list").eq(route.index).scrollIntoView().click()

                //assertion
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
