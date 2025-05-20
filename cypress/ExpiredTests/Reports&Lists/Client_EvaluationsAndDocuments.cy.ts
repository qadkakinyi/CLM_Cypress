describe.skip("Client Evaluations & Documents", ()=>{
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

    routes.forEach((route)=>{

        it(`Accesses ${route.assertion} page`, ()=> {

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
               
                cy.getByDataCy("reports-menu").click().wait(1000)
                cy.getByDataCy("client-evaluations").click().as('client-evaluations-menu').wait(1000)
                cy.get("@client-evaluations-menu").find("ul>li").as("client-evaluations-links")
                cy.get("@client-evaluations-links").eq(route.index).click().wait(1000)

                //assertion
                cy.location("pathname").should("equal", route.route)
                cy.wait(2000)
                cy.contains(route.assertion)

            } else{
                cy.visit('/main/dashboard')
            }

        })
    })
})