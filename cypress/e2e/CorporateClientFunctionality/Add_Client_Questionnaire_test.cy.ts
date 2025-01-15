import {faker} from '@faker-js/faker'
import {navigateToClientMenu} from "../../support/e2e";

let location = '';
describe('Add a client questionnaire - Corporate', ()=>{
    
    before(()=>{
        //adding a questionnaire type
        cy.visit('/settings/questionnaire-types').wait(2000)
        cy.contains('Add').click()
        cy.wait(1000)
            
        cy.getByDataCy('questionnaire-type-name').type('Open Ended')
        cy.getByDataCy('questionnaire-type-mapping-reference').type(faker.string.alphanumeric((15)))
        
        cy.getByDataCy('save-questionnaire-type-btn').click()
        cy.wait(1000)
        
        //add question category
        cy.visit('/settings/questions-categories')
        cy.contains('Add').click()
        cy.wait(1000)
        cy.getByDataCy('question-category-name').type('Leading Questions')
        cy.getByDataCy('question-category-mapping-reference').type(faker.string.alphanumeric(15))
        cy.getByDataCy('questionnaire-type-options').click()
        cy.get('.multiselect-item-checkbox').contains('Open Ended').click().wait(500)
        cy.getByDataCy('question-weight').type('4')
        cy.getByDataCy('save-question-category').click()
        cy.wait(1500)
        
        //add questions for the questionnaire type
        cy.visit('/settings/questions').wait(3000)
        cy.contains('Add').click({force:true})
        cy.wait(2000)
        
        cy.getByFormControlName('name').type('Are there compliance companies in your country?'+ faker.string.alphanumeric(5), {force: true})
        cy.getByDataCy('regulation-group-list').click()
        cy.get('#dynamicSelectBoxDropdownGrid').find('.dx-datagrid-rowsview').find('tr > td').first().click()
        cy.getByFormControlName('questionsCategoryId').click()
        cy.get('.dx-popup-content .dx-scrollable-container').contains('Open Ended').click()
        cy.getByDataCy('client-type').click()
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-content>table tr>td').contains('Corporate').click()
        cy.getByDataCy('question-setup-type').click()
        cy.get('.dx-overlay-content .dx-datagrid-rowsview').contains('List of Answers').click()
        cy.wait(1500)
        // cy.getByFormControlName('minNumOfAnswers').type('')
        // cy.getByFormControlName('maxNumOfAnswers').type('')
        cy.getByFormControlName('order').type(`${faker.number.int({min:1, max:9})}`)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(12))
        cy.getByFormControlName('capacities').click()
        cy.contains('Authorised Person').click()
        cy.getByFormControlName('riskPoint').type('4')
        
        cy.getByDataCy('save-question').click()
        cy.wait(2000)
        
        //Adding an answer to the question above
        cy.contains('Add').click({force:true})
        cy.wait(2000)
        cy.get('#addAnswerForm ').find('[formcontrolname="value"]').type('Yes')
        cy.get('#addAnswerForm [icon="save"]').click().wait(2000)
        cy.contains('Add').click({force:true})
        cy.wait(2000)
        cy.get('#addAnswerForm ').find('[formcontrolname="value"]').type('No')
        cy.get('#addAnswerForm [icon="save"]').click().wait(2000)
    })

    it('Adds questionnaire type, creates question categories, creates a question then adds a questionnaire', ()=>{

        navigateToClientMenu('Corporate')

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Questionnaires').click().wait(1000);

        cy.location('pathname').then((loc)=>{
            location = loc
        })
        
        cy.getByDataCy('create-questionnaire').click()
        
        cy.wait(3000)
        
        //step 1
        cy.getByDataCy('reasonForQuestionnaire').then(el=>{
            if(el.is(':visible')){
                cy.getByDataCy('questionnaire-type').click()
                cy.wait(1000)
                cy.get('#dynamicSelectBoxDropdownGrid td').contains('Open Ended').click({force:true})
                cy.wait(500)
                cy.getByDataCy('reason-for-questionnaire').type(faker.word.verb())
                cy.getByDataCy("Questionnaire-next-step-btn").click().wait(3000)
            }
        })

        //step 2
        cy.getByDataCy('step2-complete-the-questions').then(el=>{
            if(el.is(':visible')) {
                cy.getByDataCy('proceed-to-step3').click().wait(3000)
            }
        })
        
        //step 3
        cy.getByDataCy('finish-questionnaire')
        cy.getByDataCy('finalize-btn').click()
        cy.wait(1000)
    })
    
})