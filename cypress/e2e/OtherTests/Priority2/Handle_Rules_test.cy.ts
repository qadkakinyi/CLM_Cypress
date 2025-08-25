import {faker} from "@faker-js/faker";

/**
 * @testSuite Handle Rules - Recurring Rules Management
 * @description Validates executing rules, updating rule status, editing schedules, and synchronizing rules via the Handle Rules page.
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, rules, scheduling, synchronization, processes
 * @dependencies user-authentication, cypress, faker-js
 * @fileDescription Covers end-to-end user flows on the Handle Rules screen: execute, update status, update schedule, and synchronize.
 */

describe('Handle Rules', ()=>{
    /**
     * @suite Handle Rules Operations
     * @description Common setup and scenarios for managing recurring rules.
     * @prerequisites User is logged in with access to Processes → Handle Rules.
     * @prerequisites Target rules exist and can be filtered using term "3A".
     * @testData Static filter value: "3A"; UI selections made via dropdowns and grid rows.
     */

    /**
     * @prerequisites Handle Rules page is reachable at /processes/handle-rules.
     * @steps Navigate to /processes/handle-rules.
     * @steps In the grid filter (col 4), type "3A".
     * @steps Select the checkbox in row 2 to target the rule(s).
     * @expectedResult The desired rule(s) are filtered and selected for subsequent actions.
     */
    beforeEach(()=>{
        cy.visit('/processes/handle-rules').wait(5000)
        cy.get('#gridHandleRules [aria-colindex="4"] .dx-texteditor-input-container > .dx-texteditor-input').type('3A').wait(3000)
        cy.get('[aria-rowindex="2"] > .dx-command-select > .dx-widget > .dx-checkbox-container > .dx-checkbox-icon').click().wait(1000)
    })

    /**
     * @scenario Execute Rule
     * @description Executes the selected recurring rule(s).
     * @priority Medium
     * @steps Click "Execute Rules".
     * @steps In the modal, click the Play button to start execution.
     * @expectedResult Confirmation toast containing "have been executed." is displayed.
     */
    it('Execute Rule', ()=>{
        cy.contains('sa-button', 'Execute Rules').click().wait(1000)
        cy.get('app-execute-recurring-rules > .sa-form > .custom-backround-transparent > .row > .col > [icon="play"] > .sa-button').click().wait(2000)
        cy.contains('have been executed.').wait(1000)
    })

    /**
     * @scenario Update Rule Status
     * @description Updates the status of the selected rule(s), then re-activates them.
     * @priority Medium
     * @steps Click "Update Status".
     * @steps Open the status dropdown and select the 5th row value.
     * @steps Click Save and verify success toast "has been updated".
     * @steps Repeat: Click "Update Status", open dropdown, choose "Active", and Save.
     * @expectedResult Rule status is updated successfully and then set to Active.
     */
    it('Update Rule Status', ()=>{
        cy.contains('sa-button', 'Update Status').click().wait(1000)
        cy.get('#updateRuleStatusForm dx-drop-down-box').click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-table tbody tr').eq(4).click().wait(500)
        cy.get('#updateRuleStatusForm [icon="save"] > .sa-button').click().wait(3000)
        cy.contains('has been updated').wait(1000)

        // activate the rule
        cy.contains('sa-button', 'Update Status').click().wait(1000)
        cy.get('#updateRuleStatusForm dx-drop-down-box').click().wait(500)
        cy.contains('#dynamicSelectBoxDropdownGrid .dx-datagrid-table tbody tr', 'Active').click().wait(500)
        cy.get('#updateRuleStatusForm [icon="save"] > .sa-button').click().wait(3000)

    })

    /**
     * @scenario Update Rule Schedule
     * @description Edits the job schedule for the selected rule(s).
     * @priority Medium
     * @testData Schedule value=1, interval=Day(s), time=08:30, startDate=2024-10-22.
     * @steps Click "Update Schedule".
     * @steps Enter schedule value, select interval "Day(s)", set time and start date.
     * @steps Click Save.
     * @expectedResult Toast "Rules schedules have been updated" is displayed and changes are saved.
     */
    it('Update Schedule', ()=>{
        cy.contains('sa-button', 'Update Schedule').click().wait(1000)
        cy.getByFormControlName('jobScheduleValue').type('1')
        cy.getByFormControlName('jobScheduleInterval').select('Day(s)').wait(500)
        cy.getByFormControlName('jobScheduleTime').type('08:30')
        cy.getByFormControlName('jobScheduleStartDate').type('2024-10-22')

        cy.get('#editRuleScheduleForm [icon="save"]').click().wait(3000)
        cy.contains('Rules schedules have been updated').wait(1000)
    })

    /**
     * @scenario Synchronize Rules
     * @description Synchronizes the selected rule(s) with the backend scheduler.
     * @priority Medium
     * @steps Click "Synchronize Rules".
     * @steps Click "Submit" to confirm synchronization.
     * @steps Close the dialog.
     * @expectedResult Toast "Updated successfully" is displayed and the form closes.
     */
    it('Synchronize Rule', ()=>{
        cy.contains('sa-button', 'Synchronize Rules').click().wait(1000)
        cy.contains('sa-button', 'Submit').click().wait(4500)
        cy.contains('Updated successfully').wait(1000)
        cy.get('#synchronizeRulesForm [icon="times"]').click().wait(1500)
    })
})

