
const routes =[
    {index:0, route: "/processes/handle-auto-ongoing-monitoring-clients", assertion:"Handle Auto Ongoing Monitoring Clients"},
    {index:1, route: "/processes/handle-electronic-identifications", assertion: "Handle Electronic Identifications Clients"},
    {index:2, route: "/processes/handle-screening", assertion: "Handle Screening Process"},
    {index:3, route: "/processes/handle-transaction-screening-cases", assertion: 'Handle Transaction Screening Cases'},
    {index:4, route: "/processes/handle-client-worldcheck-references", assertion: "Handle Clients World Check References"}
]

describe("Screening & Electronic Identification", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard")
        cy.getByDataCy("processes").click()
        cy.getByDataCy("screening-and-identification").should("be.visible")
        cy.getByDataCy("screening-and-identification").click().as('screening-and-identification-menu')
        cy.get("@screening-and-identification-menu").find("ul>li").as("screening-and-identification-list")
    })

    routes.forEach((route, i)=>{
        it(`Opens  ${route.assertion} page`, ()=>{
            cy.get("@screening-and-identification-list").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(3000)
            cy.contains(route.assertion)
    
            if(i < routes.length - 1){
                cy.visit("/main/dashboard")
                cy.getByDataCy("processes").click()
                cy.getByDataCy("screening-and-identification").should("be.visible")
                cy.getByDataCy("screening-and-identification").click().as('screening-and-identification-menu')
                cy.get("@screening-and-identification-menu").find("ul>li").as("screening-and-identification-list")
            }
        })
    })
})