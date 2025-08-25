import {faker} from '@faker-js/faker'
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

/**
 * @testSuite AddClientQuestionnaire - Corporate Questionnaire Flow
 * @description Full workflow for creating a questionnaire type, adding question categories, adding questions and answers, and assigning a questionnaire to a corporate client.
 * @priority High
 * @owner QA Team
 * @tags regression, corporate, questionnaire
 * @dependencies regulation-group-data, questionnaire-types, faker-js, UI-capacity-menu
 * @fileDescription Tests all steps required to create and assign a questionnaire to a corporate client.
 */

let location = '';

describe('Add a client questionnaire - Corporate', ()=>{

    /**
     * @scenario Questionnaire Setup
     * @description Adds questionnaire type, question category, and questions with answers via settings screens.
     * @testData Faker-generated values for names, references, and text
     * @steps Visit Questionnaire Type settings and create one
     * @steps Create Question Category and map to Questionnaire Type
     * @steps Create Question and attach to Regulation Group and Category
     * @steps Add answers to question
     * @expectedResult Questionnaire setup should be complete and visible in client questionnaire UI
     */
    before(()=>{
        //adding a questionnaire type
        cy.visit('/settings/questionnaire-types').wait(2000)
        cy.contains('sa-button','Add').click()
        cy.wait(1000)

        cy.getByDataCy('questionnaire-type-name').type('Open Ended')
        cy.getByDataCy('questionnaire-type-mapping-reference').type(faker.string.alphanumeric((15)))

        cy.getByDataCy('save-questionnaire-type-btn').click()
        cy.wait(1000)

        //add question category
        cy.visit('/settings/questions-categories')
        cy.contains('sa-button','Add').click()
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
        cy.contains('sa-button','Add').click()
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
        cy.getByFormControlName('order').type(`${faker.number.int({min:1, max:9})}`)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(12))
        cy.getByFormControlName('capacities').click().wait(500)
        cy.get('.item2 > li').eq(1).click().wait(500)
        cy.getByFormControlName('riskPoint').type('4')

        cy.getByDataCy('save-question').click()
        cy.wait(4000)

        //Adding answers
        cy.get('[icon="plus"] > .sa-button').scrollIntoView().click().wait(3000)
        cy.get('#addAnswerForm ').find('[formcontrolname="value"]').type('Yes')
        cy.get('#addAnswerForm [icon="save"]').click().wait(2000)
        cy.get('[icon="plus"] > .sa-button').scrollIntoView().click()
        cy.wait(3000)
        cy.get('#addAnswerForm ').find('[formcontrolname="value"]').type('No')
        cy.get('#addAnswerForm [icon="save"]').click().wait(2000)
    })

    /**
     * @scenario Assign Questionnaire to Corporate Client
     * @description Navigates to the client and assigns a newly created questionnaire
     * @prerequisites Questionnaire type and questions already set up in system
     * @testData Client name read from fixtures
     * @steps Navigate to Questionnaires section
     * @steps Initiate questionnaire assignment and complete all steps
     * @expectedResult Questionnaire should be successfully assigned to client
     */
    it('Adds questionnaire type, creates question categories, creates a question then adds a questionnaire', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })

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

