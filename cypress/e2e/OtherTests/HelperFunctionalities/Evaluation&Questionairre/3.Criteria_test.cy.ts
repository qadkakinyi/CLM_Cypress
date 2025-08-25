/**
 * @testSuite Criteria Management
 * @description Tests adding, editing, and deleting criteria in the settings section.
 * @priority Medium
 * @owner QA Team
 * @tags regression, criteria
 */

import {faker} from "@faker-js/faker";

describe('Criteria', ()=>{

    /**
     * @scenario Add Criteria
     * @steps Navigate to Criteria settings
     * @steps Click Add button
     * @steps Fill in name, risk points, mapping reference, and select required dropdowns
     * @steps Uncheck "Include in Evaluation"
     * @steps Save the criterion
     * @expectedResult Criterion is successfully added
     */
    it('Adds a Criteria', ()=>{
        cy.visit('/settings/criteria').wait(2000)
        cy.contains('sa-button', 'Add').click().wait(1000)

        cy.getByFormControlName('name').eq(0).type('Bankrupt DKA')
        cy.getByFormControlName('riskPoint').eq(0).type('1')
        cy.getByFormControlName('mappingReference').eq(0).type(faker.string.alphanumeric(13))

        // Regulation group
        cy.get('dx-drop-down-box').eq(0).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td')
            .eq(0).click({force:true}).wait(500)

        // Criteria category
        cy.get('dx-drop-down-box').eq(1).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td')
            .contains('DKA Test Category').click({force:true}).wait(500)

        // Client type
        cy.get('dx-drop-down-box').eq(2).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td')
            .contains('Corporate').click({force:true}).wait(500)

        // Criterion setup type
        cy.get('dx-drop-down-box').eq(3).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td')
            .contains('Custom').click({force:true}).wait(500)

        cy.getByFormControlName('includeInEvaluation').uncheck()

        cy.get('.custom-background-transparent > .row > .col > [icon="save"] > .sa-button')
            .click().wait(500)

        cy.contains('The criterion has been added').wait(1000)
    })

    /**
     * @scenario Edit Criteria
     * @steps Search for the existing criterion by name
     * @steps Open the criterion for editing
     * @steps Update the name and status to Disabled
     * @steps Save and close the form
     * @expectedResult Criterion is successfully updated
     */
    it('Edits a Criteria', () => {
        cy.visit('/settings/criteria')
        cy.waitUntilLoaderDisappears();
        cy.get('#gridCriteria tr .dx-first-cell .dx-texteditor-input')
            .type('Bankrupt DKA').wait(3000)
        cy.waitUntilLoaderDisappears();

        cy.get('#gridCriteria tr td').find('.fa-angle-double-right').eq(0)
            .click({force:true}).wait(3000)

        cy.getByFormControlName('name').clear().type('Bankrupt Criteria DKA').wait(500)

        // Status disable
        cy.get('dx-drop-down-box').eq(4).click().wait(500)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-rowsview .dx-datagrid-content tr td')
            .contains('Disabled').click({force:true}).wait(500)

        cy.getBySel('saveAndCloseButton').click().wait(1500)

        cy.contains(`The criterion has been updated.`).wait(1000)
    })

    /**
     * @scenario Delete Criteria
     * @steps Search for the criterion by name
     * @steps Open the criterion details
     * @steps Click delete and confirm
     * @expectedResult Criterion is successfully deleted
     */
    it('Deletes a Criteria', () => {
        cy.visit('/settings/criteria')
        cy.waitUntilLoaderDisappears()
        cy.get('#gridCriteria tr .dx-first-cell .dx-texteditor-input')
            .should('be.visible').type('Bankrupt Criteria DKA').wait(3000)
        cy.waitUntilLoaderDisappears()

        cy.get('#gridCriteria tr td').find('.fa-angle-double-right').eq(0)
            .click({force:true}).wait(2000)

        cy.get('[icon="trash"]').eq(0).click().wait(3000)
        cy.get('#bot2-Msg1').contains('Yes').click().wait(1000)

        cy.contains(`The criterion has been deleted.`).wait(1000)
    })

})

