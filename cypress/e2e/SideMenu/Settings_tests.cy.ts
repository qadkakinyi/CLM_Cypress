describe("Settings menu", () => {
    it("Logs in and open level on menu", () => {
        cy.wait(2000)
        cy.getByDataCy("settings-menu").scrollIntoView().click()
    })
})

describe("Client Profiling", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard").wait(2000)
        cy.getByDataCy("settings-menu").click().wait(2000)
        cy.getByDataCy("client-profiling-menu").click().as('client-profiling-menu')
        cy.get("@client-profiling-menu").find("ul>li").as("client-profiling-links")
    })
    afterEach(()=>{
        cy.wait(2000)
    })
    
    it("Client Profiling Pages first 8", () => {

        let routes = [
            {index: 0, route: "/settings/addressesTypes", assertion:"Addresses Types"},
            {index: 1, route: "/settings/banks", assertion:"Banks"},
            {index: 2, route: "/settings/capacities", assertion:"Capacities"},
            {index: 3, route: "/settings/checklists", assertion:"Checklists"},
            {index: 4, route: "/settings/client-categories", assertion:"Client Categories"},
            {index: 5, route: "/settings/client-categorizations", assertion:"Client Categorizations"},
            {index: 6, route: "/settings/client-statuses", assertion:"Client Statuses"},
            {index: 7, route: "/settings/custom-fields", assertion:"Custom Fields"},
            
        ]

        routes.forEach((route, i) => {
            cy.get("@client-profiling-links").eq(route.index).click()
            cy.wait(4000)
            cy.location("pathname").should("equal", route.route)
            cy.contains(route.assertion)
            
            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
                cy.getByDataCy("settings-menu").click().wait(2000)
                cy.getByDataCy("client-profiling-menu").click().as('client-profiling-menu')
                cy.get("@client-profiling-menu").find("ul>li").as("client-profiling-links")
            }

        })
    })

    it("Client Profiling Pages (submenus 8 to 15)", () => {

        let routes = [
           
            {index: 8, route: "/settings/default-addresses", assertion:"Default Addresses"},
            {index: 9, route: "/settings/document-categories", assertion:"Document Categories"},
            {index: 10, route: "/settings/documents", assertion:"Documents"},
            {index: 11, route: "/settings/fatca-setup", assertion:"FATCA Setup"},
            {index: 12, route: "/settings/integration-capacities", assertion:"Integration Capacities"},
            {index: 13, route: "/settings/keywords", assertion:"Keywords"},
            {index: 14, route: "/settings/mandatory-documents-categories", assertion:"Mandatory Documents Categories"},
            {index: 15, route: "/settings/mid-classes", assertion:"MID Classes"},
            
        ]

        routes.forEach((route, i) => {
            cy.get("@client-profiling-links").eq(route.index).click()
            cy.wait(4000)
            cy.location("pathname").should("equal", route.route)
            cy.contains(route.assertion)

            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
                cy.getByDataCy("settings-menu").click().wait(2000)
                cy.getByDataCy("client-profiling-menu").should("be.visible")
                cy.getByDataCy("client-profiling-menu").click().as('client-profiling-menu')
                cy.get("@client-profiling-menu").find("ul>li").as("client-profiling-links")
            }

        })
    })

    it("Client Profiling Pages (submenus 16 to 22)", () => {

        let routes = [
            {index: 16, route: "/settings/mid-types", assertion:"MID Types"},
            {index: 17, route: "/settings/monitoring-visit-type", assertion:"Monitoring Visit Type"},
            {index: 18, route: "/settings/reasonsForTin", assertion:"Reasons For TIN"},
            {index: 19, route: "/settings/regulation-groups", assertion:"Regulation Groups"},
            {index: 20, route: "/settings/related-website-types", assertion:"Related Website Types"},
            {index: 21, route: "/settings/sub-groups", assertion:"Sub-Groups"},
            {index: 22, route: "/settings/tags", assertion:"Tags"}
        ]

        routes.forEach((route, i) => {
            cy.get("@client-profiling-links").eq(route.index).click()
            cy.wait(4000)
            cy.location("pathname").should("equal", route.route)
            cy.contains(route.assertion)

            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
                cy.getByDataCy("settings-menu").click().wait(2000)
                cy.getByDataCy("client-profiling-menu").should("be.visible")
                cy.getByDataCy("client-profiling-menu").click().as('client-profiling-menu')
                cy.get("@client-profiling-menu").find("ul>li").as("client-profiling-links")
            }

        })
    })
})

describe("Countries", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard").wait(2000)
        cy.getByDataCy("settings-menu").click().wait(1000)
        cy.getByDataCy("country-menu").should("be.visible")
        cy.getByDataCy("country-menu").click().as('country-menu')
        cy.getByDataCy("country-links").as("country-links")
    })
    
    it("Countries Pages", () => {

        let routes = [
            {index: 0, route: "/settings/cities", assertions: "Cities & Ports"},
            {index: 1, route: "/settings/countries", assertions: "Countries"},
            {index: 2, route: "/settings/country-categories", assertions: "Country Categories"},
            {index: 3, route: "/settings/country-evaluation-grades", assertions: "Country Evaluation Grades"}
        ]

        routes.forEach((route, i) => {
            cy.get("@country-links").eq(route.index).click().wait(1000)
            cy.location("pathname").should("equal", route.route)
            cy.wait(2000)
            cy.contains(route.assertions)
            
            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
                cy.getByDataCy("settings-menu").click().wait(2000)
                cy.getByDataCy("country-menu").should("be.visible")
                cy.getByDataCy("country-menu").click().as('country-menu')
                cy.getByDataCy("country-links").as("country-links")
            }

        })
    })
})

describe('Transaction Monitoring & Actions', ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard").wait(2000)
        cy.getByDataCy("settings-menu").click().wait(1000)
        cy.getByDataCy("transaction-menu").should("be.visible")
        cy.getByDataCy("transaction-menu").click().as('transaction-menu')
        cy.getByDataCy("transaction-links").as("transaction-links")
    })
    
    it("Transaction Monitoring & Actions pages", () => {
        let routes = [
            {index: 0, route: "/settings/actions-setup", assertion: "Actions Setup"},
            {index: 1, route: "/settings/application-approval-setup", assertion: "Application Approval Setup"},
            {index: 2, route: "/settings/case-statuses-risk-points", assertion: "Case Statuses Risk Points"},
            {index: 3, route: "/settings/case-suspicion-levels-risk-points", assertion: "Case Suspicion Levels Risk Points"},
            {index: 4, route: "/settings/case-workflow-statuses", assertion: "Case Workflow Statuses"},
            {index: 5, route: "/settings/contracts-setup", assertion: "Contract Policy Categories"},
            {index: 6, route: "/settings/currency-informations", assertion: "Currency Information"},
            {index: 7, route: "/settings/currency-rates", assertion: "Currency Rates"},
            {index: 8, route: "/settings/dynamic-report-engine-setups", assertion: "Dynamic Report Engine Setups"},
            {index: 9, route: "/settings/gaming-setups", assertion: "Gaming Setups"},
            {index: 10, route: "/settings/investment-account-types", assertion: "Investment Account Types"},
            {index: 11, route: "/settings/payment-methods", assertion: "Payment Methods"},
            {index: 12, route: "/settings/rule-categories", assertion: "Rule Categories"},
            {index: 13, route: "/settings/trade-types", assertion: "Trade Types"},
            {index: 14, route: "/settings/transactions-setup", assertion: "Transactions Setup"},
        ]

        routes.forEach((route, i) => {
            cy.get("@transaction-links").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(2000)
            cy.contains(route.assertion)
            
            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
                cy.getByDataCy("settings-menu").click().wait(2000)
                cy.getByDataCy("transaction-menu").should("be.visible")
                cy.getByDataCy("transaction-menu").click().as('transaction-menu')
                cy.getByDataCy("transaction-links").as("transaction-links")
            }
        })
    })
})
describe("Opens level 2 menus", () => {
    let testCounter = 0
    beforeEach(()=>{
        cy.visit("/main/dashboard").wait(2000)
        cy.getByDataCy("settings-menu").click().wait(1000)
        if(testCounter == 0){
            cy.getByDataCy("evaluation-menu").scrollIntoView()
            cy.getByDataCy("evaluation-menu").click().as('evaluation-menu')
            cy.getByDataCy("evaluation-links").as("evaluation-links")
        }else if(testCounter == 1){
            cy.getByDataCy("know-your-firm-menu").scrollIntoView()
            cy.getByDataCy("know-your-firm-menu").click().as('know-your-firm-menu')
            cy.getByDataCy("know-your-firm-links").as("know-your-firm-links")
        }else if(testCounter == 2) {
            cy.getByDataCy("templates-menu").scrollIntoView()
            cy.getByDataCy("templates-menu").click().as('templates-menu')
            cy.getByDataCy("templates-links").as("templates-links")
        }
        
        testCounter++
    })
    
    it("Evaluation & Questionnaire", () => {
        let routes = [
            {index: 0, route: "/settings/evaluation-types", assertion: "Adhoc Evaluation Types"},
            {index: 1, route: "/settings/criteria", assertion: "Criteria"},
            {index: 2, route: "/settings/criteria-categories", assertion: "Criteria Categories"},
            {index: 3, route: "/settings/evaluation-grades", assertion: "Evaluation Grades"},
            {index: 4, route: "/settings/questionnaire-grades", assertion: "Questionnaire Grades"},
            {index: 5, route: "/settings/questionnaire-types", assertion: "Questionnaire Types"},
            {index: 6, route: "/settings/questions", assertion: "Questions"},
            {index: 7, route: "/settings/questions-categories", assertion: "Questionnaire Categories"},
        ]

        routes.forEach((route, i) => {
            
            cy.get("@evaluation-links").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(2000)
            cy.contains(route.assertion)

            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
                cy.getByDataCy("settings-menu").click().wait(2000)
                cy.getByDataCy("evaluation-menu").scrollIntoView()
                cy.getByDataCy("evaluation-menu").click().as('evaluation-menu')
                cy.getByDataCy("evaluation-links").as("evaluation-links")
            }
        })
    })

    it("Know Your Firm", () => {
        let routes = [
            {index: 0, route: "/settings/firm-criteria", assertion:'Firm Criteria'},
            {index: 1, route: "/settings/firm-criteria-categories", assertion:'Firm Criteria Categories'},
            {index: 2, route: "/settings/firm-evaluation-grades", assertion:'Firm Evaluation Grades'},
            {index: 3, route: "/settings/firm-mitigation-measures", assertion:'Firm Mitigation Measures'},
            {index: 4, route: "/settings/firm-sanction-criteria", assertion:'Firm Sanction Criteria'},
            {index: 5, route: "/settings/firm-sanction-evaluation-grades", assertion:'Firm Sanction Evaluation Grades'},
            {index: 6, route: "/settings/firm-sanction-mitigation-measures", assertion:'Firm Sanction Mitigation Measures'},
        ]
        routes.forEach((route, i) => {

            cy.get("@know-your-firm-links").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(2000)
            cy.contains(route.assertion)

            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
                cy.getByDataCy("settings-menu").click().wait(2000)
                cy.getByDataCy("know-your-firm-menu").scrollIntoView()
                cy.getByDataCy("know-your-firm-menu").click().as('know-your-firm-menu')
                cy.getByDataCy("know-your-firm-links").as("know-your-firm-links")
            }
        })

    })

    it("Templates & Report Setups", () => {
        let routes = [
            {index: 0, route: "/settings/intro-endings", assertion:'Intro & Endings'},
            {index: 1, route: "/settings/email-templates", assertion:'Email Templates'},
            {index: 2, route: "/settings/external-notification-templates", assertion:'External Notification Templates'},
            {index: 3, route: "/settings/notification-templates", assertion:'Notification Templates'},
            {index: 4, route: "/settings/report-engine-setups", assertion:'Report Engine Setups'},
        ]
        routes.forEach((route, i) => {

            cy.get("@templates-links").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(2000)
            cy.contains(route.assertion)
            
            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
                cy.getByDataCy("settings-menu").click().wait(2000)
                cy.getByDataCy("templates-menu").scrollIntoView()
                cy.getByDataCy("templates-menu").click().as('templates-menu')
                cy.getByDataCy("templates-links").as("templates-links")
            }
            
        })
    })
})