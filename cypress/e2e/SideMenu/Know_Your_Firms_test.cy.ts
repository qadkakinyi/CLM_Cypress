import {faker} from "@faker-js/faker";

let location ;

function executeStep2(){
    cy.get('app-firm-evaluation-criterion .input-group input').each((input, index)=>{
        cy.wrap(input).clear().type('30').wait(200)
    })

    //fill all mitigation measures
    cy.get('dx-drop-down-box[valueexpr="firmMitigationActionId"]').as('dropdowns')
    cy.get('dx-drop-down-box[valueexpr="firmMitigationActionId"]').each((dropdown, index)=>{
        cy.get('@dropdowns').eq(index).click()
        cy.get('.dx-popup-content dx-data-grid .dx-datagrid-rowsview').filter(':visible').eq(0).find('tr td').eq(0).click().wait(200)
        cy.get('@dropdowns').eq(index).click()
    })

    //fill all residual risk
    cy.get('dx-select-box[fieldtemplate="residualRiskFieldTemplate"]').as('selectBoxes')
    cy.get('dx-select-box[fieldtemplate="residualRiskFieldTemplate"]').each((selectBox, index)=>{
        cy.wait(100)
        cy.get('@selectBoxes').eq(index).click()
        cy.get('.dx-scrollview-content').filter(':visible').eq(0).scrollIntoView().find('.dx-item').eq(0).click().wait(200)
        // cy.get('@selectBoxes').eq(index).click().wait(100)
    })

    cy.wait(1500)
    cy.get('sa-button[icon="angle-double-right"]').click().wait(2000)
}
describe("Know your firms", ()=>{
    
    it("Visits know your firms page", ()=>{
        cy.getByDataCy("my-firms-btn").click()
        cy.location('pathname').should("equal", "/know-your-firms/firms")
        cy.contains("Know your Firm").wait(2000)
    })
    
    it("Can view a single firm", ()=>{
        cy.visit('main/dashboard')
        // select the right chevron icon
        cy.getByDataCy("my-firms-btn").click()
        cy.get('.dx-datagrid-content-fixed > .dx-datagrid-table > tbody > .dx-data-row > .dx-command-edit > .dx-link').eq(1).click()      
        let url_pattern = /\/know-your-firms\/firm\/\d+\/dashboard/ //eg  /know-your-firms/firm/1/dashboard
        cy.location("pathname").should("match",url_pattern) 
        
        cy.location('pathname').then(url=>{
            location = url
        })
    })
    
    it('Add Firm Wide Evaluations', ()=>{
        cy.visit(location).wait(2500)
        
        cy.get('sa-menu-item[title="Firm Wide Evaluations"]').click().wait(3000)
        
        cy.contains('sa-button', 'Add').click().wait(2500)
        
        cy.get('app-firm-evaluations').filter(':visible').then(evaluation=>{
            
            // STEP 1
            if(evaluation.find('app-add-firm-evaluation-wizard-step-one').is(':visible')){
                cy.getByFormControlName('reasonForEvaluation').type('DKA Evaluation '+faker.string.alphanumeric(5))
                cy.contains('sa-button', 'Next').click().wait(4000)

                executeStep2()

                cy.contains('sa-button','Complete').click()
            }
            //STEP 2
            if(evaluation.find('app-add-firm-evaluation-wizard-step-two').is(':visible')){
                executeStep2()

                cy.contains('sa-button','Complete').click()
            }
 
        })
    })
})  