describe("Machine Learning", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard").wait(2000)
        cy.getByDataCy("reports-menu").click()
        cy.getByDataCy("machine-learning-menu").should("be.visible")
        cy.getByDataCy("machine-learning-menu").click().as('machine-learning-menu')
        cy.getByDataCy("machine-learning-links").as("machine-learning-links")
    })

    it('Opens menu under the section and navigates to the expected pages',()=>{
        let routes = [
            {index:0, route:"/reports/classification-means-report", assertion: "Segmentation Values"}
        ]

        routes.forEach((route, i)=>{

            cy.get("@machine-learning-links").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(2000)
            cy.contains(route.assertion)

            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
                cy.getByDataCy("reports-menu").click()
                cy.getByDataCy("machine-learning-menu").should("be.visible")
                cy.getByDataCy("machine-learning-menu").click().as('machine-learning-menu')
                cy.getByDataCy("machine-learning-links").as("machine-learning-links")
            }

        })
    })

})