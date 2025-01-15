describe("Reports/Lists module", ()=>{
    it("Open reports level 1 menu", ()=>{

        cy.getByDataCy("reports-menu").click().wait(2000).find("ul>li").should("have.length", 7).wait(2000)

    })
})

describe("Onboarding Portal", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard")
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
            cy.contains(route.assertion)
            cy.wait(5000)
            // after this 5 seconds the data should have loades and spinner should not be visible
            cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)

            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(1000)
                cy.getByDataCy("reports-menu").click()
                cy.contains("span", "Onboarding Portal").click().wait(1500)
            }

        })
    })

})