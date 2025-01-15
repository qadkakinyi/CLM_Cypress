describe("Reports/Lists module", ()=>{
    it("Open reports level 1 menu", ()=>{
        
        cy.getByDataCy("reports-menu").click().wait(2000).find("ul>li").should("have.length", 7)
        
    })
})

describe("Onboarding Portal", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard").wait(2000)
        cy.getByDataCy("reports-menu").click()
        cy.contains("span", "Onboarding Portal").click().wait(1000)
    })

    it('Opens menu under the section and navigates to the expected pages',()=>{
        let routes = [
            {index:0, el: "Onboarding Client Registrations", route:"/reports/onboarding-client-registrations-report", assertion: "Onboarding Client Registrations"},
            {index:0, el: "Onboarding Client Registrations Application Progress Report", route:"/reports/onboarding-client-registrations-application-progress-report", assertion: "Onboarding Client Registrations Progress Report"}
        ]

        routes.forEach((route, i)=>{

            cy.contains("span", route.el).eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(2000)
            cy.contains(route.assertion)

            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
                cy.getByDataCy("reports-menu").click()
                cy.contains("span", "Onboarding Portal").click().wait(1000)
            }

        })
    })

})

describe("Client Profiling", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard").wait(2000)
        cy.getByDataCy("reports-menu").click()
        cy.getByDataCy("client-profiling").should("be.visible")
        cy.getByDataCy("client-profiling").click().as('client-profiling-menu')
        cy.get("@client-profiling-menu").find("ul>li").as("client-profiling-links")
    })
    
    it("Opens the client profiling menu - level 2 menu", ()=>{
        let routes = [
            {index:0, route: "/reports/clients-general-info-report", assertion: "Clients General Info"},
            {index:1, route: "/reports/clients-report", assertion: "Clients Report"},
            {index:2, route: "/reports/entity-position-report", assertion: "Entity Position Report"},
            {index:3, route: "/reports/profiles-report", assertion: "Profiles Report"},
            {index:4, route: "/reports/statutory-information-report", assertion: "Statutory Information Report"},
            {index:5, route: "/reports/ubo-of-clients-report", assertion: "Ubo of Clients Report"}
        ]
        
        routes.forEach((route, i)=>{
            cy.get("@client-profiling-links").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(2000)
            cy.contains(route.assertion)
            
            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
                cy.getByDataCy("reports-menu").click()
                cy.getByDataCy("client-profiling").should("be.visible")
                cy.getByDataCy("client-profiling").click().as('client-profiling-menu')
                cy.get("@client-profiling-menu").find("ul>li").as("client-profiling-links")
            }
            
        })
    })
})

describe("Client Evaluations & Documents", ()=>{
    
    beforeEach(()=>{
        cy.visit("/main/dashboard").wait(2000)
        cy.getByDataCy("reports-menu").click().wait(1000)
        cy.getByDataCy("client-evaluations").click().as('client-evaluations-menu').wait(1000)
        cy.get("@client-evaluations-menu").find("ul>li").as("client-evaluations-links")
    })
    
    it("Opens menu under the section and navigates to the expected pages", ()=>{
        let routes = [
            {index:0, route:'/reports/clients-old-evaluation-per-criterion-answer-report', assertion:"Clients old evaluation per criterion answer report"},
            {index:1, route:'/reports/clients-per-criterion-answer-report', assertion:"Clients per criterion answer report"},
            {index:2, route:'/reports/clients-per-question-answer-report', assertion:"Clients per Question Answer Report"},
            {index:3, route:'/reports/country-evaluation-grades-histories-report', assertion:"Country Evaluation Grades History Report"},
            {index:4, route:'/reports/documents-report', assertion:"Documents Report"},
            {index:5, route:'/reports/last-evaluation-analysis-report', assertion:"Last Evaluation Analysis Report"},
            {index:6, route:'/reports/last-evaluation-results-report', assertion:"Last Evaluation Results Report"},
            {index:7, route:'/reports/follow-up-evaluations-report', assertion:"Pending and expired evaluations report"},
            {index:8, route:'/reports/pending-compliance-officer-evaluation-review-report', assertion:"Pending Compliance Officer Evaluation Review Report"}
        ]

        routes.forEach((route, i)=>{
            
            cy.get("@client-evaluations-links").eq(route.index).click().wait(1000)
            cy.location("pathname").should("equal", route.route)
            cy.wait(2000)
            cy.contains(route.assertion)

            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
                cy.getByDataCy("reports-menu").click().wait(1000)
                cy.getByDataCy("client-evaluations").click().as('client-evaluations-menu').wait(1000)
                cy.get("@client-evaluations-menu").find("ul>li").as("client-evaluations-links")
            }
            
        })
    })
})

describe("Transaction Monitoring & Actions", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard").wait(2000)
        cy.getByDataCy("reports-menu").click()
        cy.getByDataCy("transaction-monitoring-menu").should("be.visible")
        cy.getByDataCy("transaction-monitoring-menu").click().as('transaction-monitoring-menu')
        cy.getByDataCy("transaction-links").as("transaction-links")
    })
    
    it("Opens menu under the section and navigates to the expected pages", ()=>{
        let routes = [
            {index:0, route:"/reports/actions-report", assertion: "Actions Report"},
            {index:1, route:"/reports/cases-overview-report", assertion: "Cases Overview"},
            {index:2, route:"/reports/cases-per-rule-report", assertion: "Cases Per Rule Report"},
            {index:3, route:"/reports/cases-report", assertion: "Cases Report"},
            {index:4, route:"/reports/customer-activity-per-scenario-report", assertion: "Customer activity per scenario report"},
            {index:5, route:"/reports/dynamic-reports", assertion: "Dynamic Reports"},
            {index:6, route:"/reports/transactions-evaluation-report", assertion: "Post Transactions"},
            {index:7, route:"/reports/scenario-activity-report", assertion: "Scenario Activity Report"},
        ]

        routes.forEach((route, i)=>{

            cy.get("@transaction-links").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(2000)
            cy.contains(route.assertion)

            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
                cy.getByDataCy("reports-menu").click()
                cy.getByDataCy("transaction-monitoring-menu").should("be.visible")
                cy.getByDataCy("transaction-monitoring-menu").click().as('transaction-monitoring-menu')
                cy.getByDataCy("transaction-links").as("transaction-links")
            }

        })
    })
})

describe("Screening & Electronic Identification", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard").wait(2000)
        cy.getByDataCy("reports-menu").click()
        cy.getByDataCy("screening-and-identification-menu").should("be.visible")
        cy.getByDataCy("screening-and-identification-menu").click().as('screening-and-identification-menu')
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
            cy.wait(3000)
            cy.contains(route.assertion)

            if(i < routes.length - 1){
                cy.visit("/main/dashboard")
                cy.getByDataCy("reports-menu").click().wait(2000)
                cy.getByDataCy("screening-and-identification-menu").should("be.visible")
                cy.getByDataCy("screening-and-identification-menu").click().as('screening-and-identification-menu')
                cy.getByDataCy("screening-links").as("screening-links")
            }
            
        })
    })

})

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

describe("Other", ()=>{

    beforeEach(()=>{
        cy.visit("/main/dashboard").wait(2000)
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
            
            if(i < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
                cy.getByDataCy("reports-menu").click()
                cy.getByDataCy("other-menu").should("be.visible")
                cy.getByDataCy("other-menu").click().as('other-menu')
                cy.getByDataCy("other-links").as("other-links")
            }

        })
    })

})