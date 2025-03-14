import {faker} from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../support/e2e";

describe('Add Client Evaluation', ()=>{
    it('Adds an evaluation', ()=>{

        navigateToNewestClientMenu('Individual')

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