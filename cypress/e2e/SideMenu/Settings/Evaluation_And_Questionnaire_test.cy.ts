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
describe('Evaluation And Questionnaire', ()=>{

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
                cy.getByDataCy("settings-menu").click().wait(2000)
                cy.getByDataCy("evaluation-menu").scrollIntoView()
                cy.getByDataCy("evaluation-menu").click().as('evaluation-menu')
                cy.get("@evaluation-menu").find("ul>li").as("evaluation-links")
                cy.get("@evaluation-links").eq(route.index).click()
                
                //assertion
                cy.location("pathname").should("equal", route.route)
                cy.wait(2000)
                cy.contains(route.assertion)

            }else{
                cy.visit("/main/dashboard").wait(2000)
            }
        })
    })
})
