import {faker} from "@faker-js/faker";

describe('Handle Rules', ()=>{
    beforeEach(()=>{
        cy.visit('/processes/handle-rules').wait(10000)
        cy.get('#gridHandleRules [aria-colindex="4"] .dx-texteditor-input-container > .dx-texteditor-input').type('3A').wait(6000)
        cy.get('[aria-rowindex="2"] > .dx-command-select > .dx-widget > .dx-checkbox-container > .dx-checkbox-icon').click().wait(1000)
    })
    
    it('Execute Rule', ()=>{
        cy.contains('sa-button', 'Execute Rules').click().wait(1000)
        cy.get('app-execute-recurring-rules > .sa-form > .custom-backround-transparent > .row > .col > [icon="play"] > .sa-button').click().wait(2000)
        cy.contains('have been executed.').wait(1000)
    })
    
    it('Update Rule Status', ()=>{
        cy.contains('sa-button', 'Update Status').click().wait(1000)
        cy.get('#updateRuleStatusForm dx-drop-down-box').click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-table tbody tr').eq(4).click().wait(500)
        cy.contains('sa-button', 'Save').click().wait(3000)
        cy.contains('The rules has been updated').wait(1000)
        
        // activate the rule
        cy.contains('sa-button', 'Update Status').click().wait(1000)
        cy.get('#updateRuleStatusForm dx-drop-down-box').click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-table tbody tr').eq(2).click().wait(500)
        cy.contains('sa-button', 'Save').click().wait(3000)
    })

    it('Update Schedule', ()=>{
        cy.contains('sa-button', 'Update Schedule').click().wait(1000)
        cy.getByFormControlName('jobScheduleValue').type('1')
        cy.getByFormControlName('jobScheduleInterval').select('Day(s)').wait(500)
        cy.getByFormControlName('jobScheduleTime').type('08:30')
        cy.getByFormControlName('jobScheduleStartDate').type('2024-10-22')

        cy.get('#editRuleScheduleForm [icon="save"]').click().wait(3000)
        cy.contains('Rules schedules have been updated').wait(1000)
    })

    it('Synchronize Rule', ()=>{
        cy.contains('sa-button', 'Synchronize Rules').click().wait(1000)
        cy.contains('sa-button', 'Submit').click().wait(4500)
        cy.contains('Updated successfully').wait(1000)
        cy.get('#synchronizeRulesForm [icon="times"]').click().wait(1500)
    })
})