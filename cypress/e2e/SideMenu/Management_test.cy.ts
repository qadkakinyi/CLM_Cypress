// import {deleteFolder, images_folder} from "../../support/e2e";

describe("Management Module", ()=>{
    
    // before(()=>{
        // images_folder.name =  'Management';
        // deleteFolder()
    // })
    
    it("Visits all links and loads the correct pages", ()=>{

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
            // cy.screenshot(`All/Management/click ${i+1}`, {capture: "runner", overwrite: true})
            cy.getByDataCy("management-menu").should("be.visible").find("ul>li").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(3000)
            // cy.screenshot(`All/Management/image ${i+1}`, {capture: "runner", overwrite: true})
            cy.contains(route.assertion)
            
            if(i < routes.length - 1){
                cy.visit("main/dashboard")
            }

        })
    })
})