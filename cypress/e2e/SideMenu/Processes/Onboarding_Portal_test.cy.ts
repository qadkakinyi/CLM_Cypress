let routes = [
    {index:0, route:"/processes/handle-onboarding-clients", assertion:"Handle Onboarding Clients"},
    {index:1, route:"/processes/handle-onboarding-client-registrations", assertion: "Onboarding Portal"},
    {index:2, route:"/processes/handle-onboarding-users", assertion: 'Handle Onboarding Users'},
    {index:3, route:"/processes/handle-clients-portal-users", assertion: "Handle Portal Users of Clients"},
]

describe("Onboarding Portal", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard")
        cy.getByDataCy("processes").click()
        cy.getByDataCy("onboarding-portal").scrollIntoView().should("be.visible")
        cy.getByDataCy("onboarding-portal").click().as('onboarding-portal-menu')
        cy.get("@onboarding-portal-menu").find("ul>li").as("onboarding-portal-list")
    })


    routes.forEach((route)=>{
        it(`Opens ${route.assertion} page`, ()=>{
            cy.get("@onboarding-portal-list").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(3000)
            cy.contains(route.assertion)

            if(route.index < routes.length - 1){
                cy.visit("/main/dashboard")
                cy.getByDataCy("processes").click()
                cy.getByDataCy("onboarding-portal").scrollIntoView().should("be.visible")
                cy.getByDataCy("onboarding-portal").click().as('onboarding-portal-menu')
                cy.get("@onboarding-portal-menu").find("ul>li").as("onboarding-portal-list")
            }
        })
    })
})