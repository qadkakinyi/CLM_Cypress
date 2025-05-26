
describe("Other", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard")
        cy.getByDataCy("reports-menu").click().wait(1500)
        cy.getByDataCy("other-menu").click().as('other-menu')
        cy.getByDataCy("other-links").as("other-links")
    })
    
    it('Opens menu under the section and navigates to the expected pages',()=>{
        let routes = [
            {index:0, route:"/reports/thresholds-per-segment-report", assertion: "Auto Calculated Thresholds Per Segment"},
            {index:1, route:"/reports/thresholds-performance-per-client-report", assertion: "Auto Calculated Thresholds Performance Per Client"},
            {index:2, route:"/reports/clients-gaming-account-history-report", assertion: "Clients Gaming Account History Report"},
            {index:3, route:"/reports/eGOV-requests-report", assertion: "eGOV Requests Report"}
        ]
        
        routes.forEach((route, i)=>{

            cy.get("@other-links").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(3000)
            cy.contains(route.assertion)
            // after this 5 seconds the data should have loades and spinner should not be visible
            cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
            
            if(i < routes.length - 1){
                cy.visit("/main/dashboard")
                cy.getByDataCy("reports-menu").click()
                cy.getByDataCy("other-menu").scrollIntoView()
                cy.getByDataCy("other-menu").click().as('other-menu')
                cy.getByDataCy("other-links").as("other-links")
            }

        })
    })

})