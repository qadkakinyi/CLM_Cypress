/**
 * @testSuite Specific Rules Execution
 * @description Validates that specific rules (Rule 55 and Rule 11) can be executed successfully through the administration panel.
 * @priority High
 * @owner QA Team
 * @tags rules, regression, admin
 * @dependencies cypress
 * @fileDescription Tests activation and execution of specific rules to ensure they run successfully.
 */

describe('Specific Rules Execution', ()=>{

    /**
     * @scenario Execute Rule 55
     * @description Navigates to the rules administration page, activates Rule 55, and executes a test run.
     * @priority High
     * @steps Visit `/administration/rules` → Search for Rule 55 → Activate the rule → Save → Test execution with result limit.
     * @expectedResult Rule 55 executes successfully and confirmation message is displayed.
     */
    it('Checks if Rule 55 execution is executed successfully', ()=>{
        cy.visit('/administration/rules').wait(5000)

        cy.get('[aria-colindex="4"] .dx-texteditor-input').eq(0).type('55 ').wait(6000)

        cy.get('#gridRules .fa-angle-double-right').eq(0).click({force:true}).wait(4000)
        //activate rule and save
        cy.getByFormControlName('status').select('Active')
        cy.get('[primary-buttons=""] > [icon="save"] > .sa-button').click().wait(3000)

        //Test executions
        cy.contains('sa-button', 'Test Execution').click().wait(3000)
        cy.getByFormControlName('resultLimit').clear().type('1').wait(1000)
        cy.contains("Run Test and Don't Create Cases").scrollIntoView().click().wait(45000)

        cy.contains('The rule was executed successfully')
    })

    /**
     * @scenario Execute Rule 11
     * @description Navigates to the rules administration page, activates Rule 11, and executes a test run.
     * @priority High
     * @steps Visit `/administration/rules` → Search for Rule 11 → Activate the rule → Save → Test execution.
     * @expectedResult Rule 11 executes successfully and confirmation message is displayed.
     */
    it('Checks if Rule 11 execution is executed successfully', ()=>{
        cy.visit('/administration/rules').wait(5000)

        cy.get('[aria-colindex="3"] .dx-texteditor-input').eq(0).type('11').wait(6000)

        cy.get('#gridRules .fa-angle-double-right').eq(0).click({force:true}).wait(4000)
        //activate rule and save
        cy.getByFormControlName('status').select('Active')
        cy.get('[primary-buttons=""] > [icon="save"] > .sa-button').click().wait(3000)

        //Test executions
        cy.contains('sa-button', 'Test Execution').click().wait(3000)
        cy.contains("Run Test and Don't Create Cases").scrollIntoView().click().wait(3000)

        cy.contains('The rule was executed successfully')
    })
})

