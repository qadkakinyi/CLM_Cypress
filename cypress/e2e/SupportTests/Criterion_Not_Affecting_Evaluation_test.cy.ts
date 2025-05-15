import {faker} from "@faker-js/faker";
import {navigateToNewestClientMenu} from "../../support/e2e";
let location 

describe('Criterion with `Not Include in evaluation` not affect evaluation', ()=>{
    it('Creates a criterion with field `Not include in evaluation` unchecked', ()=>{

        // Add criteria category
        cy.visit('/settings/criteria-categories').wait(2000)
        cy.contains('sa-button', 'Add').click().wait(1000)
        cy.getByFormControlName('name').eq(0).type('DKA Test Category')
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13))

        cy.get('#addCriteriaCategoryForm [icon="save"]').click().wait(2000)
        
        // add criteria
        cy.visit('/settings/criteria').wait(2000)
        cy.contains('sa-button', 'Add').click().wait(1000)

        cy.getByFormControlName('name').eq(0).type('Bankrupt DKA SupportTest')
        cy.getByFormControlName('riskPoint').eq(0).type('1')
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13))
        // regulation group
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').eq(0).click({force:true}).wait(500)
        // criteria category
        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains('DKA Test Category').click({force:true}).wait(500)
        // client type
        cy.get('dx-drop-down-box').eq(2).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains('Individual').click({force:true}).wait(500)
        // criterion setup type
        cy.get('dx-drop-down-box').eq(3).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains('Custom').click({force:true}).wait(500)

        /**
         * THIS IS THE MOST IMPORTANT BIT 
         * Include in evaluation must be unchecked
         */
        cy.getByFormControlName('includeInEvaluation').scrollIntoView().uncheck({force:true}).wait(500)

        cy.get('.custom-background-transparent > .row > .col > [icon="save"] > .sa-button').click().wait(1000)
        cy.location('pathname').then(path=>{
            location = path
        })
        cy.contains('The criterion has been added').wait(1000)

        ///////THERE WAS A BUG WHEN CREATING A CRITERION AND YOU UNCHECK INCLUDE IN EVALUATION IT IS CREATED WITH INCLUDE IN EVALUATION CHECKED
        /**
         * THIS IS THE MOST IMPORTANT BIT
         * Include in evaluation must be unchecked
         */
        // cy.getByFormControlName('includeInEvaluation').uncheck().wait(3000)
        //
        // cy.contains('sa-button', 'Save').click().wait(1000)
        // cy.contains('The criterion has been updated').wait(1000)
        // cy.location('pathname').then(path=>{
        //     location = path
        // })
    })

    it('Adds a Criterion Answer', ()=>{
        cy.visit('/settings/criteria').wait(2000)
        // cy.visit(location).wait(12000)

        cy.get('.dx-first-cell .dx-texteditor-input').type('Bankrupt DKA SupportTest', ).wait(5000)
        // cy.get('#gridCriteria tr .dx-first-cell .dx-texteditor-input').type('Bankrupt DKA SupportTest', ).wait(10000)
        cy.get('#gridCriteria tr td').find('.fa-angle-double-right').eq(0).click({force:true}).wait(3000)

        cy.contains('sa-panel sa-button', 'Add').click().wait(1000)

        //add criterion answer
        cy.get('#addAnswerForm').getByFormControlName('value').eq(0).type('Test DKA').wait(500)
        cy.get('#addAnswerForm').getByFormControlName('evaluationGrade').select(1)
        cy.get('#addAnswerForm').getByFormControlName('isDefault').uncheck()

        cy.get('#addAnswerForm [icon="save"]').click().wait(1000)
    })

    it('Adds an evaluation', ()=> {

        navigateToNewestClientMenu('Individual')

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Evaluations').click().wait(2000);

        cy.location('pathname').then((loc) => {
            location = loc
        })

        cy.get('[primary-buttons=""] > sa-button.ng-star-inserted > .sa-button > .text').click().wait(1000);

        cy.wait(1000)
        cy.get('.modal-content').then((el) => {
            //step 1
            if (el.find('[data-cy="reasonForEvaluation"]').is(':visible')) {
                cy.wrap(el).type(faker.word.words(2))
                cy.wait(1000)
                cy.get('.col > [icon="arrow-right"] > .sa-button').click().wait(4000);
                cy.getByDataCy('criteria-dropdowns')
            }

            //step 2
            cy.wait(3000)
            cy.getByDataCy('criteria-dropdowns').then((el) => {
                if (el.is(':visible')) {

                    // look for the newly created criterion and check if when any value is selected it leaves the grade as `Not to affect client risk`
                    // Gets the paragraph with the text `Bankrupt DKA SUpportTest` and selects the second sibling the click to select a value
                    cy.contains('fieldset div > div> p','Bankrupt DKA SupportTest').scrollIntoView().siblings().click()
                    cy.get('app-evaluation-criterion').last().find('.dropdown-list .item2>li>[type="checkbox"]').eq(0).scrollIntoView().check({force:true}).wait(500)
                    
                    cy.contains('fieldset div > div> p','Bankrupt DKA SupportTest').parent().siblings().invoke('text').then(impactScore=>{
                        expect(impactScore).to.include('Not to affect the client risk')
                    })

                }
            })

        })
    })

    it('Deletes a Criteria', () => {
        cy.visit('/settings/criteria').wait(2000)
        cy.get('#gridCriteria tr .dx-first-cell .dx-texteditor-input').should('be.visible').type('Bankrupt DKA SupportTest', {force:true}).wait(5000)
        cy.get('#gridCriteria tr td').find('.fa-angle-double-right').eq(0).click({force:true}).wait(2000)

        //delete criterion answer
        cy.get('.dx-checkbox-icon').eq(0).click().wait(1000)
        cy.get('[icon="trash"]').eq(1).click().wait(3000)
        cy.contains('.MessageBoxButtonSection #bot2-Msg1', 'Yes').click().wait(2000)
        cy.contains('Criterion Answer has been deleted').wait(1500)

        //status disable
        cy.get('dx-drop-down-box').eq(4).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td').contains('Disabled').click({force:true}).wait(500)
        cy.get('app-save-and-close .dropdown-toggle').click().wait(1000)
        cy.get('.save-and-close-link').click().wait(2000)

        //final delete 
        cy.get('[icon="trash"]').eq(0).click().wait(3000)
        cy.get('#bot2-Msg1').contains('Yes').click().wait(1000)

        cy.contains(`The criterion has been deleted.`).wait(1000)
    })

    it('Deletes a Criteria Category', () => {
        cy.visit('/settings/criteria-categories').wait(2000)
        cy.get('#gridCriteriaCategories tr .dx-first-cell .dx-texteditor-input').type('DKA Test Category', {force:true}).wait(2000)
        cy.get('#gridCriteriaCategories tr td').find('.dx-icon-trash').eq(1).click({force: true}).wait(1000)
        cy.get('.dx-popup-normal').contains('Yes').click({force: true}).wait(1000);

        cy.contains(`The criteria category has been deleted.`).wait(1000)
    })
})