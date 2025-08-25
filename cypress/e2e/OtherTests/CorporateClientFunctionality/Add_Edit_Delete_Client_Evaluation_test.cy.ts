import {faker} from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

/**
 * @testSuite ClientEvaluation - Corporate Evaluation Process
 * @description End-to-end tests for corporate client evaluations including creation, edit, delete, and ignore re-evaluation logic
 * @priority High
 * @owner QA Team
 * @tags evaluation, risk-assessment, compliance, corporate
 * @dependencies criteria-setup, client-management, dashboard
 * @fileDescription Validates full evaluation flow for corporate clients
 */

let location = '';
let client_name = ''

describe('Add Corporate Client Evaluation', ()=>{

    /**
     * @scenario Add Client Evaluation
     * @description Adds a new evaluation with full flow steps
     * @expectedResult Evaluation is completed and status recorded
     */
    it('Adds an evaluation', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Evaluations').click().wait(2000);

        cy.location('pathname').then((loc)=>{
            location = loc
        })

        cy.get('[primary-buttons=""] > sa-button.ng-star-inserted > .sa-button > .text').click().wait(1000);

        cy.wait(1000)
        cy.getByDataCy('reasonForEvaluation').then((el)=>{
            if(el.is(':visible')){
                cy.wrap(el).type(faker.word.words(2))
                cy.wait(1000)
                cy.get('.col > [icon="arrow-right"] > .sa-button').click().wait(4000);
                cy.getByDataCy('criterion-dropdown')
            }

            cy.wait(3000)
            cy.getByDataCy('criterion-dropdown').then((el)=> {
                if(el.is(':visible')) {
                    cy.get('app-create-evaluation-wizard sa-tree-view span').as('company-members')

                    cy.get('app-create-evaluation-wizard sa-tree-view span').each((el, index) =>{
                        cy.get('@company-members').eq(index).click().then(el =>{
                            cy.getByDataCy('criterion-dropdown').each((el, index) => {
                                cy.getByDataCy('criterion-dropdown').eq(index).scrollIntoView().click({force:true}).as('list')
                                cy.wait(100)
                                cy.get('@list').find('.dropdown-btn span').eq(0).then((el)=>{
                                    cy.get('@list').find('.dropdown-list .item2>li>[type="checkbox"]').eq(0).check({force:true})
                                    cy.getByDataCy('criterion-dropdown').eq(index).click({force:true}).wait(50)
                                })
                            })
                        })
                    })
                }
            })

            cy.getByDataCy('evaluate-btn').click()
            cy.wait(10000)
            cy.get('sa-button').contains('Complete').scrollIntoView().click()
        })
    })

    /**
     * @scenario Add Another Evaluation
     * @description Adds another evaluation and completes it through all steps
     * @expectedResult Second evaluation successfully saved
     */
    it('Adds another evaluation', ()=>{
        cy.visit(location)
        cy.wait(2000)
        cy.get('[primary-buttons=""] > sa-button.ng-star-inserted > .sa-button > .text').click().wait(1000);
        cy.getByDataCy('reasonForEvaluation').then((el)=>{
            if(el.is(':visible')){
                cy.wrap(el).type(faker.word.words(2))
                cy.wait(1000)
                cy.contains('#initializeEvaluationForm sa-button', 'Next').click().wait(2500);
                cy.getByDataCy('criterion-dropdown').wait(1000)
            }

            cy.getByDataCy('criterion-dropdown').then((el)=> {
                if(el.is(':visible')) {
                    cy.wait(1000)
                }
            })
            cy.getByDataCy('evaluate-btn').click()
            cy.wait(5000)
            cy.get('sa-button').contains('Complete').scrollIntoView().click({force:true})
        })
    })

    /**
     * @scenario Edit Evaluation
     * @description Edits an existing evaluation and updates comment
     * @expectedResult Evaluation is updated with new comment
     */
    it('Edits an Evaluation', ()=>{
        cy.visit(location).wait(3000)
        cy.get('#gridClientEvaluations .fa-angle-double-right').first().click({force:true}).wait(1000)
        cy.get('#editEvaluationForm')
        cy.get('.client-name>h2').then(el=>{
            client_name = el.text().toString()
        })
        cy.getByFormControlName('complianceOfficerComment').type('Just a comment')
        cy.getBySel('saveAndCloseButton').click().wait(2000)
        cy.contains('Evaluation has been updated')
    })

    /**
     * @scenario Delete Evaluation
     * @description Deletes an existing evaluation
     * @expectedResult Evaluation is permanently deleted
     */
    it('Deletes an Evaluation', ()=>{
        cy.visit(location).wait(3000)
        cy.get('#gridClientEvaluations .fa-angle-double-right').first().click({force:true}).wait(1000)
        cy.get('#editEvaluationForm')
        cy.get('sa-button').contains('Delete').click()
        cy.get('#bot2-Msg1').contains('Yes').click()
        cy.contains('Client evaluation has been deleted')
    })

    /**
     * @scenario Ignore Need Re-Evaluation
     * @description Updates criteria, triggers re-evaluation need, then ignores it for a client
     * @expectedResult Client is marked as not needing re-evaluation
     */
    it('Ignores need re-evaluation', ()=>{
        cy.visit('/settings/criteria').wait(3000)
        cy.get(':nth-child(2) > .dx-column-indicators > .dx-header-filter').click().wait(2000)
        cy.get('.dx-item-content').contains('Corporate').click().wait(2000)
        cy.contains('.dx-item-content > .dx-widget > .dx-button-content', 'OK').click().wait(3000)
        cy.get('.dx-first-cell .dx-texteditor-input-container > .dx-texteditor-input').type('Adverse Media').wait(4000)
        cy.get('#gridCriteria .fa-angle-double-right').eq(1).click({force:true}).wait(2000)
        cy.get('#gridCriterionAnswers table').find(' tr>td> .dx-icon-edit ').eq(0).click({force:true})
        cy.get('[aria-rowindex="1"] > [aria-colindex="4"] .dx-texteditor-input').click()
        cy.get('.dx-scrollview-content>.dx-list-item').contains('Medium').click().wait(500)
        cy.get('table tr>td> .dx-icon-save ').eq(0).click({force:true}).wait(1000)
        cy.contains('The criterion answer has been updated')
        cy.getBySel('saveAndCloseButton').click().wait(2000)

        cy.visit('/main/dashboard').wait(2000)
        cy.get('app-dashboard-header-front-layer > .row > div').eq(4).find('sa-status-box').contains('Risk Assessment Overview').click().wait(2000)
        cy.get('.dx-first-cell .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').type(client_name).wait(2000)
        cy.get('[aria-colindex="1"]').contains(client_name).wait(2000)
        cy.visit(location).wait(3000)
        cy.get('sa-button').contains('Ignore Need Re-Evaluation').click({force:true}).wait(3000)
        cy.get('#ignoreReEvaluationForm').find('sa-button').contains('Save').click().wait(1000)
        cy.contains('Client Evaluation Status Changed.').wait(1000)

        cy.visit('/settings/criteria').wait(3000)
        cy.get(':nth-child(2) > .dx-column-indicators > .dx-header-filter').click().wait(2000)
        cy.get('.dx-item-content').contains('Corporate').click().wait(2000)
        cy.contains('.dx-item-content > .dx-widget > .dx-button-content', 'OK').click().wait(3000)
        cy.get('.dx-first-cell .dx-texteditor-input-container > .dx-texteditor-input').type('Adverse Media').wait(4000)
        cy.get('#gridCriteria .fa-angle-double-right').eq(1).click({force:true}).wait(2000)
        cy.get('#gridCriterionAnswers table').find(' tr>td> .dx-icon-edit ').eq(0).click({force:true})
        cy.get('[aria-rowindex="1"] > [aria-colindex="4"] .dx-texteditor-input').click()
        cy.get('.dx-scrollview-content>.dx-list-item').contains('Low').click().wait(500)
        cy.get('table tr>td> .dx-icon-save ').eq(0).click({force:true}).wait(1000)
    })

})

