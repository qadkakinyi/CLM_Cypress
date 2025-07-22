// import {deleteFolder, images_folder} from "../../support/e2e";

describe("Management Module", () => {

    // before(()=>{
    // images_folder.name =  'Management';
    // deleteFolder()
    // })
    let routes = [
        {index: 0, route: "/management/admin-tasks", assertion: "Active Workflow Tasks"},
        {index: 1, route: "/management/management", assertion: "Cases"},
        {index: 2, route: "/management/cases-workflow", assertion: "Cases Workflow"},
        {index: 3, route: "/management/rules-whitelisting", assertion: "Rules Whitelisting"},
        {index: 4, route: "/management/segmentation", assertion: "Segmentation"},
    ]

    routes.forEach((route) => {

        it(`opens ${route.assertion} page`, () => {

            if (route.index <= routes.length - 1) {
                cy.visit('/main/dashboard')
                // pin the main sidebar
                cy.get('aside').then(el => {
                    let unpin_icon = el.find('.dx-icon-unpin')

                    //check if unpin icon is visible
                    if (unpin_icon.length > 0) {
                        cy.wrap(unpin_icon).click().wait(1000)
                    } else {
                        cy.log('Unpin icon missing')
                    }
                })


                cy.getByDataCy("management-menu").click().wait(300)
                cy.getByDataCy("management-menu").find("ul>li").eq(route.index)
                // cy.screenshot(`All/Management/click ${i+1}`, {capture: "runner", overwrite: true})
                cy.getByDataCy("management-menu").should("be.visible").find("ul>li").eq(route.index).click()

                //assertion
                cy.location("pathname").should("equal", route.route)
                cy.wait(3000)
                cy.contains(route.assertion)
            } else {
                cy.visit('/main/dashboard')
            }


        })
    })
})