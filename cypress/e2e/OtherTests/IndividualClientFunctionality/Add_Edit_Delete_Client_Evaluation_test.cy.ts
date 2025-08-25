/**
 * @testSuite Individual Client Evaluations
 * @description Validates creating an evaluation for an individual client through the multi‑step flow
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, evaluations
 * @dependencies faker-js, navigateToNewestClientMenu
 * @fileDescription Opens Evaluations, starts a new evaluation, completes step 1 (reason), toggles criteria selections in step 2, evaluates and completes.
 */

import {faker} from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

describe('Add Client Evaluation', ()=>{
    /**
     * @scenario Add an Evaluation
     * @description Creates a new evaluation for an individual client and completes all steps
     * @priority Medium
     * @testData Faker-generated reason text
     * @steps Load client from fixture and navigate to newest client
     * @steps Open Evaluations and click Add
     * @steps Step 1: enter reason for evaluation and proceed
     * @steps Step 2: iterate each criteria dropdown, select first option, and close the dropdown
     * @steps Step 3: click Evaluate, then Complete
     * @expectedResult Evaluation is processed and completed without errors
     */
    it('Adds an evaluation', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
            clientName = data.individualClientName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Evaluations').click();
        cy.get('[primary-buttons=""] > sa-button.ng-star-inserted > .sa-button > .text').click();
        cy.wait(1000)
        cy.getByDataCy('reasonForEvaluation').then((el)=>{
            //step 1
            if(el.is(':visible')){
                cy.wrap(el).type(faker.word.words(2))
                cy.wait(1000)
                cy.getByDataCy('next-eval-step')
                cy.get('[data-cy="next-eval-step"] > .sa-button').click().wait(2000);
                cy.getByDataCy('criteria-dropdowns')
            }

            //step 2
            cy.getByDataCy('criteria-dropdowns').then((el)=> {
                if(el.is(':visible')) {
                    cy.getByDataCy('criteria-dropdowns').each((el, index) => {

                        cy.getByDataCy('criteria-dropdowns').eq(index).click().as('list')
                        cy.wait(200)

                        cy.get('@list').find('.dropdown-btn span').eq(0).then((el)=>{
                            cy.get('@list').find('.dropdown-list .item2>li>[type="checkbox"]').eq(0).scrollIntoView().check({force:true})
                            cy.getByDataCy('criteria-dropdowns').eq(index).click({force: true}).wait(200)//closing the opened options
                        })

                        //cy.wait(500)

                    })
                }
            })
            //step 3
            cy.contains('Evaluate').click().wait(5000)
            cy.get('sa-button').contains('Complete').click().wait(1000)

        })

    })
})

