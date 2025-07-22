describe("Settings menu", () => {
    it("Logs in and open level on menu", () => {
        cy.wait(2000)
        cy.getByDataCy("settings-menu").scrollIntoView().click()
    })
})

describe("Client Profiling", ()=>{
    

    let routes = [
        {index: 0, route: "/settings/addressesTypes", assertion:"Addresses Types"},
        {index: 1, route: "/settings/banks", assertion:"Banks"},
        {index: 2, route: "/settings/capacities", assertion:"Capacities"},
        {index: 3, route: "/settings/checklists", assertion:"Checklists"},
        {index: 4, route: "/settings/client-categories", assertion:"Client Categories"},
        {index: 5, route: "/settings/client-categorizations", assertion:"Client Categorizations"},
        {index: 6, route: "/settings/client-statuses", assertion:"Client Statuses"},
        {index: 7, route: "/settings/custom-fields", assertion:"Custom Fields"},
        {index: 8, route: "/settings/default-addresses", assertion:"Default Addresses"},
        {index: 9, route: "/settings/document-categories", assertion:"Document Categories"},
        {index: 10, route: "/settings/documents", assertion:"Documents"},
        {index: 11, route: "/settings/fatca-setup", assertion:"FATCA Setup"},
        {index: 12, route: "/settings/integration-capacities", assertion:"Integration Capacities"},
        {index: 13, route: "/settings/keywords", assertion:"Keywords"},
        {index: 14, route: "/settings/mandatory-documents-categories", assertion:"Mandatory Documents Categories"},
        {index: 15, route: "/settings/mid-classes", assertion:"MID Classes"},
        {index: 16, route: "/settings/mid-types", assertion:"MID Types"},
        {index: 17, route: "/settings/monitoring-visit-type", assertion:"Monitoring Visit Type"},
        {index: 18, route: "/settings/reasonsForTin", assertion:"Reasons For TIN"},
        {index: 19, route: "/settings/regulation-groups", assertion:"Regulation Groups"},
        {index: 20, route: "/settings/related-website-types", assertion:"Related Website Types"},
        {index: 21, route: "/settings/sub-groups", assertion:"Sub-Groups"},
        {index: 22, route: "/settings/tags", assertion:"Tags"}
    ]

    routes.forEach((route) => {
        it(`Visits ${route.assertion} page`, () => {
            if(route.index <= routes.length - 1) {
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
                
                cy.getByDataCy("settings-menu").click().wait(500)
                cy.getByDataCy("client-profiling-menu").click().as('client-profiling-menu')
                cy.get("@client-profiling-menu").find("ul>li").as("client-profiling-links")
                cy.get("@client-profiling-links").eq(route.index).click()

                cy.wait(2000)
                cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
                cy.location("pathname").should("equal", route.route)
                cy.contains(route.assertion)
            }else{
                cy.visit('/main/dashboard')
            }
            
        })
    })

    // return;
    // let routes8_15 = [
    //
    //     {index: 8, route: "/settings/default-addresses", assertion:"Default Addresses"},
    //     {index: 9, route: "/settings/document-categories", assertion:"Document Categories"},
    //     {index: 10, route: "/settings/documents", assertion:"Documents"},
    //     {index: 11, route: "/settings/fatca-setup", assertion:"FATCA Setup"},
    //     {index: 12, route: "/settings/integration-capacities", assertion:"Integration Capacities"},
    //     {index: 13, route: "/settings/keywords", assertion:"Keywords"},
    //     {index: 14, route: "/settings/mandatory-documents-categories", assertion:"Mandatory Documents Categories"},
    //     {index: 15, route: "/settings/mid-classes", assertion:"MID Classes"},
    //
    // ]
    //
    // routes8_15.forEach((route) => {
    //     it(`Visits ${route.assertion} page`, () => {
    //         if(route.index <= routes8_15.length - 1) {
    //             cy.visit('/main/dashboard')
    //             // pin the main sidebar
    //             cy.get('aside').then(el => {
    //                 let unpin_icon = el.find('.dx-icon-unpin')
    //
    //                 //check if unpin icon is visible
    //                 if (unpin_icon.length > 0) {
    //                     cy.wrap(unpin_icon).click().wait(1000)
    //                 } else {
    //                     cy.log('Unpin icon missing')
    //                 }
    //             })
    //
    //             cy.getByDataCy("settings-menu").click().wait(500)
    //             cy.getByDataCy("client-profiling-menu").click().as('client-profiling-menu')
    //             cy.get("@client-profiling-menu").find("ul>li").as("client-profiling-links")
    //             cy.get("@client-profiling-links").eq(route.index).click()
    //
    //             cy.wait(2000)
    //             cy.location("pathname").should("equal", route.route)
    //             cy.contains(route.assertion)
    //         }else{
    //             cy.visit('/main/dashboard')
    //         }
    //     })
    // })
    //
    // let routes16_22 = [
    //     {index: 16, route: "/settings/mid-types", assertion:"MID Types"},
    //     {index: 17, route: "/settings/monitoring-visit-type", assertion:"Monitoring Visit Type"},
    //     {index: 18, route: "/settings/reasonsForTin", assertion:"Reasons For TIN"},
    //     {index: 19, route: "/settings/regulation-groups", assertion:"Regulation Groups"},
    //     {index: 20, route: "/settings/related-website-types", assertion:"Related Website Types"},
    //     {index: 21, route: "/settings/sub-groups", assertion:"Sub-Groups"},
    //     {index: 22, route: "/settings/tags", assertion:"Tags"}
    // ]
    //
    // routes16_22.forEach((route) => {
    //     it(`Visits ${route.assertion} page`, () => {
    //         if(route.index <= routes16_22.length - 1) {
    //             cy.visit('/main/dashboard')
    //             // pin the main sidebar
    //             cy.get('aside').then(el => {
    //                 let unpin_icon = el.find('.dx-icon-unpin')
    //
    //                 //check if unpin icon is visible
    //                 if (unpin_icon.length > 0) {
    //                     cy.wrap(unpin_icon).click().wait(1000)
    //                 } else {
    //                     cy.log('Unpin icon missing')
    //                 }
    //             })
    //
    //             cy.getByDataCy("settings-menu").click().wait(500)
    //             cy.getByDataCy("client-profiling-menu").click().as('client-profiling-menu')
    //             cy.get("@client-profiling-menu").find("ul>li").as("client-profiling-links")
    //             cy.get("@client-profiling-links").eq(route.index).click()
    //
    //             cy.wait(2000)
    //             cy.location("pathname").should("equal", route.route)
    //             cy.contains(route.assertion)
    //         }else{
    //             cy.visit('/main/dashboard')
    //         }
    //     })
    // })
})