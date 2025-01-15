describe("System Settings", ()=>{
    it("Click system settings menu and opens the submenus", ()=>{

        cy.getByDataCy("system-settings-menu").click().wait(2000).find("ul>li").should("have.length", 10)
    })
    
    it("Visits each page and asserts if it is visible", ()=>{
        
        cy.visit("/main/dashboard")
        
        let routes = [
            {index:0, route: '/system-settings/account'},
            {index:1, route: '/system-settings/case-statuses'},
            {index:2, route: '/system-settings/defaults'},
            {index:3, route: '/system-settings/id-verification-data-supports'},
            {index:4, route: '/system-settings/event-engines-setup'},
            {index:5, route: '/system-settings/languages-setup'},
            {index:6, route: '/system-settings/parameter-queries'},
            {index:7, route: '/system-settings/portal-setup'},
            {index:8, route: '/system-settings/system-logs'},
            {index:9, route: '/system-settings/hangfire-details'}
        ]
        
        // routes.forEach((route, i)=>{
            cy.getByDataCy("system-settings-menu").scrollIntoView().click()

            cy.get("[data-cy='system-settings-menu'] ul>li").each(el=>{
                cy.wrap(el).click();
                cy.wait(3000)
                cy.getByDataCy("system-settings-menu").scrollIntoView().click()
            })
        // })
    })
})