describe("Processes Menu", ()=>{
    it("Toggles first level menu list items visibility", ()=>{
        
        cy.getByDataCy("processes").click()
        //check if the menu is visible
        cy.getByDataCy("processes-menu-level-1").find("li").should("be.visible").should("have.length.greaterThan", 4)

    })
    
})

describe("Client Profiling", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard")
        cy.getByDataCy("processes").click()
        cy.getByDataCy("client-profiling-menu").should("be.visible")
        cy.getByDataCy("client-profiling-menu").click().as('client-profiling-menu').wait(1000)
        cy.get("@client-profiling-menu").find("ul>li").as("client-profiling-list")
    })
    afterEach(()=>{
        cy.wait(2000)
    })
    
    it("Opens level 2 menu list under client profiling", ()=>{
        //opening level 2 menu
        cy.get("@client-profiling-menu").find("ul>li").should("have.length.greaterThan", 6).wait(1000)

    })
    
    it("opens Client profiling menu items and loads the right page", ()=>{
        // Array holding all routes I expect to navigate to on this layer
        let routes = [
            {index:0, route: '/processes/handle-client-documents', assertion: "Handle Client Documents"},
            {index:1, route: '/processes/handle-client-tags', assertion: "Handle Client Tags"},
            {index:2, route: '/processes/handle-clients-unified-scoring', assertion: 'Handle Clients Unified Scoring'},
            {index:3, route: '/processes/handle-documents', assertion: "Handle Documents"},
            {index:4, route: '/processes/handle-evaluations', assertion: "Handle Evaluations"},
            {index:5, route: '/processes/handle-profiles', assertion: "Handle Profiles"},
            {index:6, route: '/processes/handle-questionnaires', assertion: "Handle Questionnaires"}
        ]
        
        routes.forEach((route, i)=>{
            cy.get("@client-profiling-list").eq(route.index).scrollIntoView().click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(5000)
            cy.contains(route.assertion)
            // after this 5 seconds the data should have loades and spinner should not be visible
            cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
            
            if(i < routes.length - 1){
                cy.visit('/main/dashboard')
                cy.getByDataCy("processes").click()
                //opening level 2 menu again for the menu to be visible
                cy.getByDataCy("client-profiling-menu").should("be.visible")
                cy.getByDataCy("client-profiling-menu").click().as('client-profiling-menu').wait(1500)
                cy.get("@client-profiling-menu").find("ul>li").as("client-profiling-list")
            }   
            
        })
    })

})

describe("Transaction Monitoring and Actions", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard")
        cy.getByDataCy("processes").click()
        cy.getByDataCy("transaction-monitoring").should("be.visible")
        cy.getByDataCy("transaction-monitoring").click().as('transaction-monitoring-menu').wait(1500)
        cy.get("@transaction-monitoring-menu").find("ul>li").as("transaction-monitoring-list")
    })
    
    after(()=>{
        cy.wait(2000)
    })
    it("Opens Transaction Monitoring menu items clicks each and navigates to the required page", ()=>{
        
        let routes = [
            {index:0, route:'/processes/handle-actions', assertion: 'Handle Actions'},
            {index:1, route:'/processes/handle-cases', assertion: 'Handle Cases'},
            {index:2, route:'/processes/handle-rules', assertion: 'Handle Rules'}
        ]
        
        routes.forEach((route, i)=>{
            cy.get("@transaction-monitoring-list").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(5000)
            cy.contains(route.assertion)
            // after this 5 seconds the data should have loades and spinner should not be visible
            cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)

            if(i < routes.length - 1){
                cy.visit('/main/dashboard')
                cy.getByDataCy("processes").click()
                cy.getByDataCy("transaction-monitoring").should("be.visible")
                cy.getByDataCy("transaction-monitoring").click().as('transaction-monitoring-menu').wait(1500)
                cy.get("@transaction-monitoring-menu").find("ul>li").as("transaction-monitoring-list")
            }
            
        })
    })
})

describe("Screening & Electronic Identification", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard")
        cy.getByDataCy("processes").click()
        cy.getByDataCy("screening-and-identification").should("be.visible")
        cy.getByDataCy("screening-and-identification").click().as('screening-and-identification-menu').wait(1500)
        cy.get("@screening-and-identification-menu").find("ul>li").as("screening-and-identification-list")
    })

    after(()=>{
        cy.wait(2000)
    })
    
    it("Opens Screening & Electronic Identification menu items clicks each and navigates to the required page", ()=>{
        
        const routes =[
            {index:0, route: "/processes/handle-auto-ongoing-monitoring-clients", assertion:"Handle Auto Ongoing Monitoring Clients"},
            {index:1, route: "/processes/handle-electronic-identifications", assertion: "Handle Electronic Identifications Clients"},
            {index:2, route: "/processes/handle-screening", assertion: "Handle Screening Process"},
            {index:3, route: "/processes/handle-transaction-screening-cases", assertion: 'Handle Transaction Screening Cases'},
            {index:4, route: "/processes/handle-client-worldcheck-references", assertion: "Handle Clients World Check References"}
        ]

        routes.forEach((route, i)=>{
            cy.get("@screening-and-identification-list").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(5000)
            cy.contains(route.assertion)
            // after this 5 seconds the data should have loaded and spinner should not be visible
            cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
            
            if(i < routes.length - 1){
                cy.visit("/main/dashboard")
                cy.getByDataCy("processes").click()
                cy.getByDataCy("screening-and-identification").should("be.visible")
                cy.getByDataCy("screening-and-identification").click().as('screening-and-identification-menu').wait(1500)
                cy.get("@screening-and-identification-menu").find("ul>li").as("screening-and-identification-list")
            }
            
        })
    })
})

describe("Onboarding Portal", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard")
        cy.getByDataCy("processes").click()
        cy.getByDataCy("onboarding-portal").scrollIntoView().should("be.visible")
        cy.getByDataCy("onboarding-portal").click().as('onboarding-portal-menu').wait(1500)
        cy.get("@onboarding-portal-menu").find("ul>li").as("onboarding-portal-list")
    })
    
    after(()=>{
        cy.wait(2000)
    })
    
    it("Opens Onboarding portal menu items clicks each and navigates to the required page", ()=>{
        let routes = [
            {index:0, route:"/processes/handle-onboarding-clients", assertion:"Handle Onboarding Clients"},
            {index:1, route:"/processes/handle-onboarding-client-registrations", assertion: "Onboarding Portal"},
            {index:2, route:"/processes/handle-onboarding-users", assertion: 'Handle Onboarding Users'},
            {index:3, route:"/processes/handle-clients-portal-users", assertion: "Handle Portal Users of Clients"},
        ]

        routes.forEach((route, i)=>{
            cy.get("@onboarding-portal-list").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(5000)
            cy.contains(route.assertion)
            // after this 5 seconds the data should have loades and spinner should not be visible
            cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
            
            if(i < routes.length - 1){
                cy.visit("/main/dashboard")
                cy.getByDataCy("processes").click()
                cy.getByDataCy("onboarding-portal").scrollIntoView().should("be.visible")
                cy.getByDataCy("onboarding-portal").click().as('onboarding-portal-menu').wait(1500)
                cy.get("@onboarding-portal-menu").find("ul>li").as("onboarding-portal-list")
            }
            
        })
    })
})

describe("Other Menu", ()=>{


    beforeEach(()=>{
        cy.visit("/main/dashboard")
        cy.getByDataCy("processes").click()
        cy.getByDataCy("other-submenu").scrollIntoView().should("be.visible")
        cy.getByDataCy("other-submenu").click().as('other-submenu-menu').wait(1500)
        cy.get("@other-submenu-menu").find("ul>li").as("other-submenu-list")
    })
    
    it("clicks all links and navigates to the right pages", ()=>{
        let routes =[
            {index:0, route:'/processes/export-clients-xml', assertion:'Export Clients XML'},
            {index:1, route:'/processes/handle-eGOV-requests', assertion: 'Handle eGOV Requests'},
            {index:2, route:'/processes/handle-kyb-registry-failed-documents', assertion: 'Handle KYB Registry Failed Documents'},
            {index:3, route:'/processes/handle-pending-fraud-detection-checks', assertion: 'Handle Pending Fraud Detection Checks'},
            {index:4, route:'/processes/handle-translations', assertion: 'Handle Translations'},
            {index:5, route:'/processes/handle-workflow-processes', assertion: "Handle Workflow Processes"},
            {index:6, route:'/processes/proposed-updates', assertion: "Proposed Updates"},
            {index:7, route:'/processes/trigger-external-notifications', assertion: "Trigger External Notifications"},
        ]

        routes.forEach((route, i)=>{
            cy.get("@other-submenu-list").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(5000)
            cy.contains(route.assertion)
            // after this 5 seconds the data should have loades and spinner should not be visible
            cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)
            
            if(i < routes.length - 1){
                cy.visit("/main/dashboard")
                cy.getByDataCy("processes").click()
                cy.getByDataCy("other-submenu").scrollIntoView().should("be.visible")
                cy.getByDataCy("other-submenu").click().as('other-submenu-menu').wait(1500)
                cy.get("@other-submenu-menu").find("ul>li").as("other-submenu-list")
            }
        })
    })
})