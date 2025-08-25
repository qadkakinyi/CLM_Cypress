/**
 * @testSuite Tax Residency - Individual
 * @description Validates add, edit, and delete flows for a client's Tax Residency detail line.
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, tax-residency
 * @dependencies navigateToNewestClientMenu
 * @fileDescription Opens an existing individual client, adds a tax residency, modifies it, then deletes it.
 */

import {faker} from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let client_id = '';

describe('Adds, Edits and Deletes Tax Residency - Individual', ()=>{

    /**
     * @scenario Add Tax Residency
     * @description Creates a new tax residency entry for the client.
     * @steps Open client → Tax Residency → Add → select country, fill notes/explanation → Save
     * @expectedResult Confirmation toast “Tax residency has been added.”
     * @testData Country: Afghanistan; Notes/Explanation: faker-generated text
     */
    it('Adds Tax Residency', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
            clientName = data.individualClientName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Tax Residency').click();
        cy.wait(1000)

        cy.location('pathname').then((pathname)=>{
            const pathSections = pathname.split('/');
            client_id = pathSections[3]
        })

        cy.get('sa-button').contains('Add').click()
        cy.wait(1000)

        cy.getBySel('countriesList').click().wait(1000)
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-content').contains('Afghanistan').click()
        // cy.getBySel('reasonsForTinList').click()
        // cy.get('#dynamicSelectBoxDropdownGrid td').contains('Tin Test').click()
        cy.getByFormControlName('notes').type(faker.word.words(5))
        cy.getByFormControlName('explanation').type(faker.word.words(15))
        cy.get('#addTaxResidencyForm').contains('Save').click().wait(1000)
        cy.contains('Tax residency has been added.').wait(1500)
    })

    /**
     * @scenario Edit Tax Residency
     * @description Updates the existing tax residency country selection from grid inline edit.
     * @steps Navigate to Tax Residency → edit last row → change country to Algeria → Save
     * @expectedResult Confirmation toast “Tax residency has been updated.”
     */
    it('Edits a Tax Residency', ()=>{
        cy.visit(`/main/client-individual/${client_id}/1/tax-residencies`).wait(3000)
        cy.get('.dx-icon-edit').last().click({force:true}).wait(2000)
        cy.get('#gridClientTaxResidencies table .dx-row').first().wait(1000)
        cy.get('#gridClientTaxResidencies .dx-texteditor-input').eq(6).click()
        cy.get('.dx-scrollable').contains('Algeria').click({force: true}).wait(1000)
        cy.get('.dx-datagrid-content-fixed > .dx-datagrid-table > tbody > .dx-data-row > .dx-command-edit > .dx-link-save').click().wait(1000)
        cy.contains('Tax residency has been updated.').wait(1500)
    })

    /**
     * @scenario Delete Tax Residency
     * @description Deletes the last tax residency row for the client.
     * @steps Navigate to Tax Residency → click delete on last row → confirm Yes
     * @expectedResult Confirmation toast “Tax residency has been deleted.”
     */
    it('Deletes a Tax Residency', ()=>{
        cy.visit(`/main/client-individual/${client_id}/1/tax-residencies`).wait(3000)
        cy.get('.dx-icon-trash').last().click({force:true})
        cy.wait(2000)
        cy.contains('Yes').click({force:true}).wait(1000)
        cy.contains('Tax residency has been deleted.').wait(1000)
    })
})

