import {faker} from "@faker-js/faker";

describe('Questions', ()=>{
    
    it('Adds a Question', ()=>{
        cy.visit('/settings/questions').wait(2000)
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type('Are you An English Speaker?')
        cy.getByDataCy('regulation-group-list').click()
        cy.get('#dynamicSelectBoxDropdownGrid').find('.dx-datagrid-rowsview').find('tr > td').first().click()
        cy.getByFormControlName('questionsCategoryId').click()
        cy.get('.dx-popup-content .dx-scrollable-container').contains('Closed Ended Questions DKA Edited').click()
        cy.getByDataCy('client-type').click()
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-content>table tr>td').contains('Individual').click()
        cy.getByDataCy('question-setup-type').click()
        cy.get('.dx-overlay-content .dx-datagrid-rowsview').contains('List of Answers').click().wait(500)
        cy.getByFormControlName('order').type(`1`)
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(12))
        //--this causes an error when deleting due to the relationship created unless you first remove the relationship
        cy.getByFormControlName('capacities').click().wait(200)
        cy.get('.dropdown-list .item2 li').eq(0).click().wait(200)
        cy.getByFormControlName('riskPoint').type('4')

        cy.getByDataCy('save-question').click()
        cy.wait(2000)

        cy.contains('Question has been added').wait(1000)
    })

    it('Edits a Question', () => {
        cy.visit('/settings/questions').wait(2000)
        cy.get('#gridQuestions tr .dx-first-cell .dx-texteditor-input').type('Are you An English Speaker?', {force:true}).wait(2000)
        cy.get('#gridQuestions tr td').find('.fa-angle-double-right').eq(0).click({force:true}).wait(2000)

        cy.getByFormControlName('name').clear().type('Are you An English Native Speaker?').wait(500)
        //status disable
        cy.get('dx-drop-down-box').eq(3).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains('Disabled').click({force:true}).wait(500)
        
        //capacities unlink
        cy.getByFormControlName('capacities').eq(0).click().wait(200)
        cy.get('.dropdown-list .item2 li').eq(0).click().wait(200)

        cy.getBySel('saveAndCloseButton').click().wait(1500)

        cy.contains(`Question has been updated.`).wait(1000)
        
    })
    
    // TRICKLE DOWN DELETE ALL RELATED TO DELETE A QUESTIONNAIRE TYPE

    it('Deletes a Question', () => {
        cy.visit('/settings/questions').wait(2000)
        cy.get('#gridQuestions tr .dx-first-cell .dx-texteditor-input').type('Are you An English Native Speaker?', {force:true}).wait(3000)
        cy.get('#gridQuestions tr td').find('.fa-angle-double-right').eq(0).click({force:true}).wait(2000)

        cy.get('[icon="trash"]').eq(0).click().wait(1000)
        cy.get('#bot2-Msg1').contains('Yes').click().wait(1000)

        cy.contains(`Question has been deleted.`).wait(1000)
    })

    it('Deletes a Question Category', () => {
        cy.visit('/settings/questions-categories').wait(2000)
        cy.get('#gridQuestionsCategories tr .dx-first-cell .dx-texteditor-input').type('Closed Ended Questions DKA Edited', {force:true}).wait(2000)
        cy.get('#gridQuestionsCategories tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`Questions category has been deleted.`).wait(1000)
    })

    it('Deletes a Questionnaire Type', () => {
        cy.visit('/settings/questionnaire-types').wait(2000)
        cy.get('#gridQuestionnaireTypes tr .dx-first-cell .dx-texteditor-input').type('Type DKA Test Updated', {force:true}).wait(2000)
        cy.get('#gridQuestionnaireTypes tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The questionnaire type has been deleted.`).wait(1000)
    })
})