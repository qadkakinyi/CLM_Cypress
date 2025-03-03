let ApiBaseUrl = Cypress.env('api_baseUrl')

describe('Opens API Documentation', ()=>{
    it('successfully opens API Documentation', ()=>{
        cy.wait(2000)
        cy.get('sa-user-options sa-icon-button a[title="User"]').click().wait(500)
        cy.get('sa-logout').click()
        cy.get('#bot2-Msg1').click().wait(2500)

        cy.visit(`${ApiBaseUrl}/documentation/apidocumentation?`).wait(15000)

        cy.origin('https://complytek-testing-hotfix-api.regtek.co', () => {
            cy.contains('RegTek+ API Documentation')
            cy.contains('Authentication')
        })
    
    })
})