import {faker} from "@faker-js/faker";
import {navigateToClientMenu} from "../../support/e2e";

let location = '';

let client_name = ''
describe('Add Corporate Client Evaluation', ()=>{
    
    it('Adds an evaluation', ()=>{

        navigateToClientMenu('Corporate')

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Evaluations').click().wait(2000);
        
        cy.location('pathname').then((loc)=>{
            location = loc
        })
        cy.get('[primary-buttons=""] > sa-button.ng-star-inserted > .sa-button > .text').click().wait(1000);
        
        cy.wait(1000)
        cy.getByDataCy('reasonForEvaluation').then((el)=>{
            //step 1
            if(el.is(':visible')){
                cy.wrap(el).type(faker.word.words(2))
                cy.wait(1000)
                cy.get('.col > [icon="arrow-right"] > .sa-button').click().wait(2000);
                cy.getByDataCy('criterion-dropdown')
            }

            //step 2
            cy.wait(7000)
            cy.getByDataCy('criterion-dropdown').then((el)=> {
                if(el.is(':visible')) {
                    //loops in every member instanceof TreeWalker structure
                    cy.get('app-create-evaluation-wizard sa-tree-view span').as('company-members')
                    
                    cy.get('app-create-evaluation-wizard sa-tree-view span').each((el, index) =>{
                        cy.get('@company-members').eq(index).click().then(el =>{
                            // loops on every criterion and selects a value in each
                            cy.getByDataCy('criterion-dropdown').each((el, index) => {

                                cy.getByDataCy('criterion-dropdown').eq(index).click().as('list')
                                cy.wait(500)

                                cy.get('@list').find('.dropdown-btn span').eq(0).then((el)=>{
                                    cy.get('@list').find('.dropdown-list .item2>li>[type="checkbox"]').eq(0).scrollIntoView().check({force:true})
                                    cy.getByDataCy('criterion-dropdown').eq(index).click({force: true}).wait(500)
                                })

                                cy.wait(1000)

                            })
                        })
                    })
                    
                }
            })
            //step 3
            cy.getByDataCy('evaluate-btn').click()
            cy.wait(10000)
            cy.get('sa-button').contains('Complete').scrollIntoView().click()
            
        })
        
    })

    it('Adds another evaluation', ()=>{

        cy.visit(location)

        cy.wait(2000)
        cy.get('[primary-buttons=""] > sa-button.ng-star-inserted > .sa-button > .text').click().wait(1000);
        cy.getByDataCy('reasonForEvaluation').then((el)=>{
            //step 1
            if(el.is(':visible')){
                cy.wrap(el).type(faker.word.words(2))
                cy.wait(1000)
                // cy.getByDataCy('next-eval-step')
                cy.get('[icon="arrow-right"] > .sa-button > .text').eq(1).click().wait(500);
                cy.getByDataCy('criterion-dropdown').wait(1000)
            }

            //step 2
            cy.getByDataCy('criterion-dropdown').then((el)=> {
                if(el.is(':visible')) {

                    cy.wait(1000)
                    
                }
            })
            //step 3
            cy.getByDataCy('evaluate-btn').click()
            cy.wait(5000)
            cy.get('sa-button').contains('Complete').scrollIntoView().click()

        })

    })

    it('Edits an Evaluation', ()=>{
        cy.visit(location).wait(3000)
        
        cy.get('#gridClientEvaluations .fa-angle-double-right').first().click({force:true}).wait(1000)
        cy.get('#editEvaluationForm')
        //get client name
        cy.get('.client-name>h2').then(el=>{
            client_name = el.text().toString()
            cy.log(client_name)
        })
        cy.getByFormControlName('complianceOfficerComment').type('Just a comment')
        cy.getBySel('saveAndCloseButton').click().wait(2000)
        cy.contains('Evaluation has been updated')
    })

    it('Deletes an Evaluation', ()=>{
        cy.visit(location).wait(3000)

        cy.get('#gridClientEvaluations .fa-angle-double-right').first().click({force:true}).wait(1000)
        cy.get('#editEvaluationForm')
        cy.get('sa-button').contains('Delete').click()
        cy.get('#bot2-Msg1').contains('Yes').click()
        cy.contains('Client evaluation has been deleted')
    })
    
    it('Ignores need re-evaluation', ()=>{
        //re-evaluation happens when there is a change in the criteria or after a certain time frame eg - 1 year
        cy.visit('/settings/criteria').wait(3000)
        cy.get('#gridCriteria .dx-group-row').contains('Client Type: Corporate')
        //cy.get('#gridCriteria [aria-rowindex="12"] [aria-colindex="3"] .dx-datagrid-group-closed').click()//opens the accordion - not a must
        //open the edit page
        cy.get('#gridCriteria [aria-rowindex="12"] > [aria-colindex="10"] .fa-angle-double-right').eq(1).click().wait(2000)
        //edit icon first item in table
        cy.get('table tr>td> .dx-icon-edit ').eq(0).click({force:true})
        cy.get('[aria-rowindex="1"] > [aria-colindex="4"] .dx-texteditor-buttons-container').click()
        cy.get('.dx-scrollview-content>.dx-list-item').contains('Medium').click().wait(500)
        cy.get('table tr>td> .dx-icon-save ').eq(0).click({force:true}).wait(1000)
        cy.contains('The criterion answer has been updated')
        cy.getBySel('saveAndCloseButton').click().wait(2000)
        
        //check the main dashboard to ensure client needs re-evaluation
        cy.visit('/main/dashboard').wait(2000)
        cy.get('app-dashboard-header-front-layer > .row > div').eq(4).find('sa-status-box').contains('Risk Assessment Overview').click().wait(2000)
        cy.get('.dx-first-cell .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input').type(client_name).wait(2000)
        cy.get('[aria-colindex="1"]').contains(client_name).wait(2000)
        cy.visit(location).wait(3000)
        cy.get('sa-button').contains('Ignore Need Re-Evaluation').click({force:true}).wait(3000)
        cy.get('#ignoreReEvaluationForm').find('sa-button').contains('Save').click().wait(1000)
        cy.contains('Client Evaluation Status Changed.').wait(1000)
        
        // change back from medium to low
        cy.visit('/settings/criteria').wait(3000)
        cy.get('#gridCriteria .dx-group-row').contains('Client Type: Corporate')
        //cy.get('#gridCriteria [aria-rowindex="12"] [aria-colindex="3"] .dx-datagrid-group-closed').click()//opens the accordion - not a must
        //open the edit page
        cy.get('#gridCriteria [aria-rowindex="12"] > [aria-colindex="10"] .fa-angle-double-right').eq(1).click().wait(2000)
        //edit icon first item in table
        cy.get('table tr>td> .dx-icon-edit ').eq(0).click({force:true})
        cy.get('[aria-rowindex="1"] > [aria-colindex="4"] .dx-texteditor-buttons-container').click()
        cy.get('.dx-scrollview-content>.dx-list-item').contains('Low').click().wait(500)
        cy.get('table tr>td> .dx-icon-save ').eq(0).click({force:true}).wait(1000)
    })
    
})