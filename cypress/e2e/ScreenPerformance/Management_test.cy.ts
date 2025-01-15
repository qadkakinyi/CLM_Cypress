describe("Management Module", ()=>{

    it("Visits all links and loads the correct pages", {
        defaultCommandTimeout: 4000
    },()=>{

        let routes = [
            {index:0, route:"/management/admin-tasks", assertion:"Active Workflow Tasks"},
            {index:1, route:"/management/management", assertion: "Cases"},
            {index:2, route:"/management/cases-workflow", assertion: "Cases Workflow"},
            {index:3, route:"/management/rules-whitelisting", assertion: "Rules Whitelisting"},
            {index:4, route:"/management/segmentation", assertion: "Segmentation"},
        ]

        routes.forEach((route,i)=>{
            cy.getByDataCy("management-menu").scrollIntoView().click()
            cy.getByDataCy("management-menu").scrollIntoView().should("be.visible").find("ul>li").eq(route.index)
            cy.getByDataCy("management-menu").should("be.visible").find("ul>li").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            
            cy.contains(route.assertion)
            // after default  4 seconds the data should have loaded and spinner should not be visible
            cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
            cy.get('.dx-loadpanel').should(`not.be.visible`)

            if(i < routes.length - 1){
                cy.visit("main/dashboard").wait(2000)
            }

        })
    })
})