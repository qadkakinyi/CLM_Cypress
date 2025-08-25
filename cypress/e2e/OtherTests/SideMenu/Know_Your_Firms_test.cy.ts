/**
 * @testSuite Know Your Firms
 * @description Verifies navigation to the Know Your Firms module, viewing firm details, and adding a Firm Wide Evaluation.
 * @priority Medium
 * @owner QA Team
 * @tags regression, ui, navigation, firm-evaluations
 * @dependencies cypress, @faker-js/faker
 * @fileDescription Tests include: open Know Your Firms list, view a single firm dashboard, and create a firm-wide evaluation via wizard.
 */

import {faker} from "@faker-js/faker";

let location ;

/**
 * @function executeStep2
 * @description Helper for the Add Firm Evaluation wizard Step 2 (inputs, mitigation measures, residual risk, proceed).
 * @steps Fill all numeric inputs with 30.
 * @steps For each mitigation dropdown, select the first row.
 * @steps For each residual risk select box, select the first option.
 * @steps Click the double-right arrow button to continue.
 * @note This helper is intentionally not invoked in the current flow (left for future extended coverage).
 */
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

    /**
     * @scenario Visit Know Your Firms Page
     * @description Clicks the "My Firms" entry and verifies the list page is shown.
     * @priority Medium
     * @steps Click data-cy="my-firms-btn".
     * @steps Assert path = "/know-your-firms/firms".
     * @steps Verify "Know your Firm" text.
     * @expectedResult Know Your Firms list is visible.
     */
    it("Visits know your firms page", ()=>{
        cy.getByDataCy("my-firms-btn").click()
        cy.location('pathname').should("equal", "/know-your-firms/firms")
        cy.contains("Know your Firm").wait(2000)
    })

    /**
     * @scenario View a Single Firm
     * @description Opens firm dashboard from the list and stores current URL path in `location`.
     * @priority Medium
     * @steps Optionally pin sidebar; click chevron in the grid; match dashboard URL pattern; store path in `location`.
     * @expectedResult Path matches /know-your-firms/firm/{id}/dashboard and is stored.
     */
    it("Can view a single firm", ()=>{
        cy.visit('main/dashboard')
        // pin the main sidebar
        cy.get('aside').then(el =>{
            let unpin_icon = el.find('.dx-icon-unpin')

            //check if unpin icon is visible
            if (unpin_icon.length > 0){
                cy.wrap(unpin_icon).click().wait(1000)
            }else{
                cy.log('Unpin icon missing')
            }
        })
        // select the right chevron icon
        cy.getByDataCy("my-firms-btn").click()
        cy.get('.dx-datagrid-content-fixed > .dx-datagrid-table > tbody > .dx-data-row > .dx-command-edit > .dx-link').eq(1).click()
        let url_pattern = /\/know-your-firms\/firm\/\d+\/dashboard/ //eg  /know-your-firms/firm/1/dashboard
        cy.location("pathname").should("match",url_pattern)

        cy.location('pathname').then(url=>{
            location = url
        })
    })

    /**
     * @scenario Add Firm Wide Evaluations
     * @description Starts the Add flow on the firm’s "Firm Wide Evaluations" page and saves Step 2.
     * @priority Medium
     * @steps Visit stored `location`; open "Firm Wide Evaluations"; click "Add"; fill Step 1 and proceed; save Step 2.
     * @expectedResult Evaluation flow progresses and saves without visible errors.
     * @note `executeStep2()` is present for full field population but intentionally left commented in your original code.
     */
    it('Add Firm Wide Evaluations', ()=>{
        cy.visit(location).wait(2500)

        cy.get('sa-menu-item[title="Firm Wide Evaluations"]').click().wait(3000)

        cy.contains('sa-button', 'Add').click().wait(2500)

        cy.get('app-firm-evaluations').filter(':visible').then(evaluation=>{

            // STEP 1
            if(evaluation.find('app-add-firm-evaluation-wizard-step-one').is(':visible')){
                cy.getByFormControlName('reasonForEvaluation').type('DKA Evaluation '+faker.string.alphanumeric(5))
                cy.contains('sa-button', 'Next').click().wait(4000)

                // executeStep2()
                cy.get('app-add-firm-evaluation-wizard-step-two [icon="save"]').click()
                // cy.contains('sa-button','Complete').click()
            }
            //STEP 2
            if(evaluation.find('app-add-firm-evaluation-wizard-step-two').is(':visible')){
                // executeStep2()
                cy.get('app-add-firm-evaluation-wizard-step-two [icon="save"]').click()
                // cy.contains('sa-button','Complete').click()
            }

        })
    })
}) 

