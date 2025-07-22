describe('Administrator settings update settings', ()=>{
    it('updates `Last Evaluation Grade based on`, successfully', ()=>{
        // this field can accept `Compliance Officer Grade`, `System Grade` or `Manager Grade`
        
        cy.visit('/administration/account').wait(2500)
        cy.contains('ul >li >a', 'Settings').click().wait(1000)
        cy.getByFormControlName('lastEvaluationGradeType').select('System Grade')
        
        cy.get('sa-button[icon="save"]').eq(1).click().wait(2500)
        cy.contains('Administration account has been updated')
        cy.contains('Error - Missing License').should('not.exist')

        cy.getByFormControlName('lastEvaluationGradeType').select('Compliance Officer Grade')
        cy.get('sa-button[icon="save"]').eq(1).click().wait(2500)
        cy.contains('Administration account has been updated')
    })
})