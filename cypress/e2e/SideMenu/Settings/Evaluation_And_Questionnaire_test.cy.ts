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
    beforeEach(()=>{
        cy.visit("/main/dashboard").wait(2000)
        cy.getByDataCy("settings-menu").click().wait(1000)
        cy.getByDataCy("evaluation-menu").scrollIntoView()
        cy.getByDataCy("evaluation-menu").click().as('evaluation-menu')
        cy.get("@evaluation-menu").find("ul>li").as("evaluation-links")
    })

    routes.forEach((route) => {
        it(`Visits ${route.assertion} page`, () => {
            cy.get("@evaluation-links").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.wait(2000)
            cy.contains(route.assertion)

            if(route.index < routes.length - 1){
                cy.visit("/main/dashboard").wait(2000)
                cy.getByDataCy("settings-menu").click().wait(2000)
                cy.getByDataCy("evaluation-menu").scrollIntoView()
                cy.getByDataCy("evaluation-menu").click().as('evaluation-menu')
                cy.get("@evaluation-menu").find("ul>li").as("evaluation-links")
            }
        })
    })
})
