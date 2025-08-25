/**
 * @testSuite Individual Client Questionnaire
 * @description Creates a questionnaire type and category, bulk-adds questions, then runs the client Questionnaire wizard (Individual)
 * @priority High
 * @owner QA Team
 * @tags regression, questionnaire, individual, settings-setup
 * @dependencies faker-js, navigateToNewestClientMenu, Cypress custom commands
 * @fileDescription End-to-end flow: configure questionnaire assets (types, categories, questions) and complete the questionnaire creation steps for an individual client
 */

import {faker} from '@faker-js/faker'
import { navigateToNewestClientMenu} from "../../../support/e2e";

/**
 * @utility addQuestions
 * @description Creates N questions under Settings → Questions, including default answers
 * @param {number} numberOfQuestions - How many questions to add (default 1)
 * @steps Visit Settings → Questions
 * @steps Click Add, fill metadata (name, regulation group, category, client type, setup type, etc.)
 * @steps Save question, then add a default answer
 * @expectedResult Question and its answer are created successfully
 */
function addQuestions(numberOfQuestions = 1){
    for (let i = 0; i < numberOfQuestions ; i++){
        //add questions for the questionnaire type
        cy.visit('/settings/questions').wait(2500)
        cy.contains('sa-button','Add').click()
        cy.wait(1000)

        cy.getByFormControlName('name').type('Where do you come from? '+ faker.string.alphanumeric(3))
        cy.getByDataCy('regulation-group-list').click()
        cy.get('#dynamicSelectBoxDropdownGrid').find('.dx-datagrid-rowsview').find('tr > td').first().click()
        cy.getByFormControlName('questionsCategoryId').click()
        // cy.get('.dx-popup-content .dx-scrollable-container').contains('Open Ended').click()
        cy.get('.dx-popup-content .dx-scrollable-container').contains('CCLM-3646').click()
        cy.getByDataCy('client-type').click()
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-content>table tr>td').contains('Individual').click()
        cy.getByDataCy('question-setup-type').click()
        cy.get('.dx-overlay-content .dx-datagrid-rowsview').contains('List of Answers').click()
        cy.wait(500)
        // cy.getByFormControlName('minNumOfAnswers').type('')
        // cy.getByFormControlName('maxNumOfAnswers').type('')
        cy.getByFormControlName('order').type(`${faker.number.int({min:1, max:9})}`)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(12))
        cy.getByFormControlName('capacities').click()
        cy.get('.dropdown-list ul').eq(1).find('li').eq(0).click()
        cy.getByFormControlName('riskPoint').type('4')

        cy.getByDataCy('save-question').click()
        cy.wait(2000)

        //  ADD question ANSWER
        cy.contains('[icon="plus"]', 'Add').click().wait(1000)
        cy.getByFormControlName('value').type('Test')
        cy.getByFormControlName('minimumValue').type('1')
        cy.getByFormControlName('maximumValue').type('4')
        cy.getByFormControlName('isDefault').check()
        cy.get('#addAnswerForm > .custom-backround-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(2000)
    }
}

/**
 * @suite Add a client questionnaire - Individual
 * @description Prepares questionnaire assets and runs the questionnaire creation wizard for an individual client
 * @prerequisites Individual client exists (fixture-driven)
 * @testData Faker-generated names, refs, orders, and counts
 */
describe('Add a client questionnaire - Individual', ()=>{

    /**
     * @scenario Setup Questionnaire Types, Categories, and Questions
     * @description Creates a questionnaire type (Open Ended), a category, and adds 1 questions with default answers
     * @priority High
     * @steps Open Settings → Questionnaire Types, add “Open Ended”, save
     * @steps Open Settings → Questions Categories, add “Leading Questions”, link to types, save
     * @steps Call addQuestions(1) to seed questions
     * @expectedResult Type, category, and questions are available for use in the wizard
     */
    before(()=>{
        //adding a questionnaire type
        cy.visit('/settings/questionnaire-types').wait(2500)
        cy.contains('sa-button','Add').click()
        cy.wait(1000)

        cy.getByDataCy('questionnaire-type-name').type('Open Ended')
        // cy.getByDataCy('questionnaire-type-name').type('CCLM-3646')
        cy.getByDataCy('questionnaire-type-mapping-reference').type(faker.string.alphanumeric((15)))

        cy.getByDataCy('save-questionnaire-type-btn').click()
        cy.wait(1000)

        //add question category
        cy.visit('/settings/questions-categories').wait(2500)
        cy.contains('sa-button','Add').click()
        cy.wait(1000)
        cy.getByDataCy('question-category-name').type('Leading Questions')
        cy.getByDataCy('question-category-mapping-reference').type(faker.string.alphanumeric(15))
        cy.getByDataCy('questionnaire-type-options').click()
        cy.get('.multiselect-item-checkbox').contains('Open Ended').click()
        cy.get('.multiselect-item-checkbox').contains('CCLM-3646').click()
        cy.wait(500)
        cy.getByDataCy('question-weight').type('5')
        cy.getByDataCy('save-question-category').click()
        cy.wait(500)

        addQuestions(1)

    })

    /**
     * @scenario Create Questionnaire (Wizard)
     * @description Navigates to client’s Questionnaire, selects type Open Ended, enters reason, and proceeds through steps
     * @priority High
     * @steps Load individual client from fixture and navigate
     * @steps Open Questionnaire, click Create
     * @steps Step 1: choose type “Open Ended”, set reason, Next
     * @steps Step 2: proceed to Step 3
     * @expectedResult Wizard progresses successfully (finalization currently commented out)
     */
    it('Adds questionnaire type, creates question categories, creates a question then adds a questionnaire', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
            clientName = data.individualClientName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Questionnaire').click();

        cy.wait(1000)

        cy.getByDataCy('create-questionnaire').click()

        cy.wait(1000)

        //step 1
        cy.getByDataCy('reasonForQuestionnaire').then(el=>{
            if(el.is(':visible')){
                cy.getByDataCy('questionnaire-type').click()
                cy.wait(1000)
                cy.get('#dynamicSelectBoxDropdownGrid td').contains('Open Ended').click({force:true})
                // cy.get('#dynamicSelectBoxDropdownGrid td').contains('CCLM-3646').click({force:true})
                cy.wait(1500)
                cy.getByDataCy('reason-for-questionnaire').type(`Questionnaire ${faker.number.int({min:1, max:5})}`)
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
        cy.wait(3000)
        cy.contains('Finalized').wait(1000)
    })

})

