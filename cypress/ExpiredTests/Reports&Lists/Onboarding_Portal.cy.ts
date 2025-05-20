describe("Onboarding Portal", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard").wait(2000)
        cy.getByDataCy("reports-menu").click()
        cy.contains("span", "Onboarding Portal").click().wait(1000)
    })

    it('Opens menu under the section and navigates to the expected pages',()=>{
        let routes = [
            {index:0, el: "Onboarding Client Registrations", route:"/reports/onboarding-client-registrations-report", assertion: "Onboarding Client Registrations"},
            {index:0, el: "Onboarding Client Registrations Application Progress Report", route:"/reports/onboarding-client-registrations-application-progress-report", assertion: "Onboarding Client Registrations Progress Report"}
        ]

        routes.forEach((route, i)=>{

            cy.contains("span", route.el).eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(2000)
            cy.contains(route.assertion)

            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
                cy.getByDataCy("reports-menu").click()
                cy.contains("span", "Onboarding Portal").click().wait(1000)
            }

        })
    })

})