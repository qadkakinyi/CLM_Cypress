

describe("Screening & Electronic Identification", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard")
        cy.getByDataCy("reports-menu").click()
        cy.getByDataCy("screening-and-identification-menu").should("be.visible")
        cy.getByDataCy("screening-and-identification-menu").click().as('screening-and-identification-menu').wait(1500)
        cy.getByDataCy("screening-links").as("screening-links")
    })

    it('Opens menu under the section and navigates to the expected pages',()=>{
        let routes = [
            {index:0, route:"/reports/detailed-screening-list-report", assertion: "Detailed Screening List Report"},
            {index:1, route:"/reports/internal-blacklist-report", assertion: "Internal Black List Report"},
            {index:2, route:"/reports/internal-screen-notification-logs-report", assertion: "Internal Screen Notification Audit Trail Report"},
            {index:3, route:"/reports/kyb-registry-search-history-report", assertion: "KYB Registry Search History Report"},
            {index:4, route:"/reports/negative-list-search-history-report", assertion: "Negative Lists Search History Report"},
            {index:5, route:"/reports/ongoing-monitoring-search-history-report", assertion: "Ongoing Monitoring Search History Report"},
            {index:6, route:"/reports/pending-verifications-report", assertion: "Pending Verifications Report"},
            {index:7, route:"/reports/screening-list-report", assertion: "Screening List Report"}
        ]

        routes.forEach((route, i)=>{

            cy.get("@screening-links").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(5000)
            cy.contains(route.assertion)
            // after this 5 seconds the data should have loades and spinner should not be visible
            cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)

            if(i < routes.length - 1){
                cy.visit("/main/dashboard")
                cy.getByDataCy("reports-menu").click()
                cy.getByDataCy("screening-and-identification-menu").should("be.visible")
                cy.getByDataCy("screening-and-identification-menu").click().as('screening-and-identification-menu').wait(1500)
                cy.getByDataCy("screening-links").as("screening-links")
            }

        })
    })

})