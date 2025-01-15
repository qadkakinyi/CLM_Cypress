

describe("Evaluation & Questionnaire", () => {

    it("checks for performance test", () => {
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
            cy.getByDataCy("settings-menu").click().wait(1000)
            cy.getByDataCy("evaluation-menu").should("be.visible")
            cy.getByDataCy("evaluation-menu").click().as('evaluation-menu')
            cy.getByDataCy("evaluation-links").as("evaluation-links")
            cy.get("@evaluation-links").eq(route.index).click()
            cy.location("pathname").should("equal", route.route)
            cy.contains(route.assertion)
            cy.get('.sk-ball-spin-clockwise').should(`not.be.visible`)

            if (i < routes.length - 1) {
                cy.visit("/main/dashboard").wait(2000)
            }
        })
    })
})