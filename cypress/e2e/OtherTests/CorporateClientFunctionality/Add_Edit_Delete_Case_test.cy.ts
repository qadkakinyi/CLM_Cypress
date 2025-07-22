import {navigateToNewestClientMenu} from "../../../support/e2e";
import {faker} from "@faker-js/faker";

let location = '';
describe('Cases - Corporate', ()=>{
    
    before(()=>{
        cy.visit('/administration/rules').wait(8000)
        
        cy.get('#gridRules .dx-datagrid-filter-row [aria-colindex="4"] input').type('3A - Document Expiration Notice').wait(3000)
        cy.get('#gridRules .dx-datagrid-rowsview .dx-datagrid-content tbody tr').then(el=>{
            if(el.length > 2){
                cy.log(`${el.length}`)
                //activate the rule for manual create cases
                cy.get('#gridRules table tbody tr .fa-angle-double-right').eq(0).click({force:true}).wait(2000)

                cy.get('#editRuleForm')
                cy.getByFormControlName('status').select('Active')

                cy.get('#clientCaseOptions-widget .fa-plus').click().wait(500)
                cy.getByFormControlName('manualCreateCases').check()

                cy.contains('[primary-buttons=""] > [icon="save"]', 'Save').click().wait(2000)
                cy.contains('Rule has been updated')
                return;
            }else{
                cy.log(`${el.length}`)
                cy.log('rule missing')
                cy.contains('sa-button','Import Rules').click().wait(1000)

                cy.getByDataCy('regulationGroup').click()
                cy.get('table [aria-rowindex="1"] .dx-checkbox-icon').eq(2).click().wait(500)
                cy.getByDataCy('regulationGroup').click().wait(500) // close the list
                cy.getByDataCy('rulesToAdd').click()
                cy.get('table [aria-rowindex="5"] .dx-checkbox-icon').click().wait(500)
                cy.getByDataCy('rulesToAdd').click().wait(500) // close the list

                cy.contains('#addPredefinedOrCustomizedRulesForm','Save').click().wait(2000)
                
                //activate the rule for manual create cases
                cy.get('#gridRules table tbody tr .fa-angle-double-right').last().click().wait(2000)

                cy.get('#editRuleForm')
                cy.getByFormControlName('status').select('Active')

                cy.get('#clientCaseOptions-widget .fa-plus').click().wait(500)
                cy.getByFormControlName('manualCreateCases').check()

                cy.contains('sa-button', 'Save').click().wait(2000)
                cy.contains('Rule has been updated')
                
            }
        })
    })
    
    it('Adds A Case', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Cases').click();
        cy.getByDataCy('addCaseBtn').click().wait(1000)
        
        cy.getByDataCy('caseRule').click().wait(2000)
        cy.get('#dynamicSelectBoxDropdownGrid table tbody [aria-rowindex="1"] [aria-colindex="1"]').click().wait(1000)
        cy.getByDataCy('status').click()
        cy.get('#dynamicSelectBoxDropdownGrid table tbody [aria-rowindex="1"] [aria-colindex="1"]').eq(1).click().wait(500)
        cy.getByDataCy('assignee').click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid table tbody [aria-rowindex="1"] [aria-colindex="1"]').eq(2).click().wait(500)
        
        // cy.get('select[required]').each((el)=>{
        //     if (el.is('select')){
        //         cy.wrap(el).select(0);
        //     }else if(el.is('input[type="checkbox"]') || el.is('input[type="radio"]')){
        //         cy.wrap(el).check();
        //     }
        // })
        
        // cy.get('#CustomField_Fraud_Status').select('False Positive')

        cy.get('#addClientCaseForm').contains('Save').click().wait(3000)
        cy.contains('The case has been added')

        cy.location('pathname').then((loc)=>{
            location = loc
        })
    })

    it('Edit A Case', ()=>{
        cy.visit(location).wait(2000)
        cy.get('#gridClientCases .fa-angle-double-right').should('be.visible').eq(0).click({force:true}).wait(2000)
        cy.get('#editClientCaseForm')
        cy.getByDataCy('caseStatus').click()
        cy.get('#dynamicSelectBoxDropdownGrid table tbody [aria-rowindex="2"] [aria-colindex="1"]').click().wait(500)
        cy.contains('div','Save & Close').click().wait(500)
        cy.contains('The case has been updated.')
    }) 
    
    it('Delete A Case', ()=>{
        cy.visit(location).wait(2000)
        cy.get('#gridClientCases .fa-angle-double-right').should('be.visible').eq(0).click({force:true}).wait(2000)
        cy.get('#editClientCaseForm')
        cy.contains('div','Delete').click().wait(500)
        cy.contains('Yes').click().wait(500)
        cy.contains('Case has been permanently deleted.')
    })
})