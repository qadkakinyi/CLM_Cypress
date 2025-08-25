/**
 * @testSuite Administrator Settings Update
 * @description Verifies that the 'Last Evaluation Grade based on' setting can be updated successfully to different values.
 * @priority High
 * @owner QA Team
 * @tags regression, administration, settings
 * @dependencies cypress
 * @fileDescription Ensures that admin users can change the evaluation grade basis between valid options and save without errors.
 */

describe('Administrator settings update settings', ()=>{
    /**
     * @scenario Update Last Evaluation Grade Based On
     * @description Updates the 'Last Evaluation Grade based on' field to multiple valid values and confirms save success.
     * @priority High
     * @steps
     * 1. Visit '/administration/account'.
     * 2. Open the 'Settings' tab.
     * 3. Change the value to 'System Grade' and save.
     * 4. Verify success message and absence of license error.
     * 5. Change the value to 'Compliance Officer Grade' and save again.
     * 6. Verify success message.
     * @expectedResult Setting updates successfully each time with no errors.
     */
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

