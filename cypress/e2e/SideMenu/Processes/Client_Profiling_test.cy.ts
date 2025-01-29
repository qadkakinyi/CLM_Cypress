describe("Processes Menu", ()=>{
    it("Toggles first level menu list items visibility", ()=>{

        cy.getByDataCy("processes").click()
        //check if the menu is visible
        cy.getByDataCy("processes-menu-level-1").find("li").should("be.visible").should("have.length.greaterThan", 4)

    })

})
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

    beforeEach(()=>{
        cy.visit("/main/dashboard")
        cy.getByDataCy("processes").click()
        cy.getByDataCy("client-profiling-menu").should("be.visible")
        cy.getByDataCy("client-profiling-menu").click().as('client-profiling-menu')
        cy.get("@client-profiling-menu").find("ul>li").as("client-profiling-list")
    })

    it("Opens level 2 menu list under client profiling", ()=>{
        //opening level 2 menu
        cy.get("@client-profiling-menu").find("ul>li").should("have.length.greaterThan", 6)

    })
    
    routes.forEach((route)=>{
        it(`opens ${route.assertion} page`, ()=>{
            
            cy.get("@client-profiling-list").eq(route.index).scrollIntoView().click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(3000)
            cy.contains(route.assertion)

            if(route.index < routes.length - 1){
                cy.visit('/main/dashboard')
                cy.getByDataCy("processes").click()
                //opening level 2 menu again for the menu to be visible
                cy.getByDataCy("client-profiling-menu").should("be.visible")
                cy.getByDataCy("client-profiling-menu").click().as('client-profiling-menu')
                cy.get("@client-profiling-menu").find("ul>li").as("client-profiling-list")
            }

        })
    })

})
