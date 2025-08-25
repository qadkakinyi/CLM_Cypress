import { navigateToClientMenu, navigateToNewestClientMenu } from "../../../support/e2e";
import { faker } from "@faker-js/faker";

let location = '';

/**
 * @testSuite Self-Declaration UBO
 * @description Manages the add/edit/delete operations for Ultimate Beneficial Owner declarations for corporate clients
 * @priority High
 * @owner QA Team
 * @tags ubo, compliance, regression
 * @dependencies client_corporate.json, faker-js
 */

describe('Self-Declaration UBO', () => {

    /**
     * @scenario Add UBO Declaration
     * @description Adds a new UBO record for the client using existing profile selection
     * @expectedResult UBO is successfully added and confirmation message is shown
     */
    it('Adds Self Declaration UBO', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })

        cy.wait(2000)
        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
            .contains('span', 'Self-Declaration UBO').click().wait(2000);

        cy.getByDataCy('Add-UBO').click().wait(1000)

        cy.location('pathname').then((loc) => {
            location = loc
        })

        cy.getByFormControlName('percentageOfShares')
            .type(faker.number.int({ min: 0, max: 20 }).toString())
        cy.getByDataCy('rate-weight')
            .clear().type(faker.number.int({ min: 50, max: 99 }).toString())
        cy.getByFormControlName('includeInEvaluation').click()
        cy.getByFormControlName('isControllingPerson').click()
        cy.getByFormControlName('appointmentDate')
            .type(faker.date.past().toISOString().slice(0, 10))
        cy.getByDataCy('controlling-person-type').click()
        cy.getBySel('dynamicSelectBoxDropdownGrid').find('[aria-rowindex="2"]').click()
        cy.getByFormControlName('resignationDate')
            .type(faker.date.recent().toISOString().slice(0, 10))
        cy.getByFormControlName('controllingPersonTypeOther')
            .type(faker.word.words(5))
        cy.getByDataCy('existing-profile').click()
        cy.get('#clientsFilteringDataGrid').find('[aria-rowindex="1"]').click().wait(2000)
        cy.get('#addUltimateBeneficialOwnerForm').contains('Save').click().wait(1000)
        cy.contains('The ultimate beneficial owner has been added.').wait(2000)
    })

    /**
     * @scenario Edit UBO Declaration
     * @description Updates the share percentage of an existing UBO entry
     * @expectedResult Updated data is saved and confirmation is displayed
     */
    it('Edits Self Declaration UBO', () => {
        cy.visit(location).wait(2000)
        cy.get('#gridClientUltimateBeneficialOwners .dx-icon-chevrondoubleright')
            .should('be.visible').eq(0).click({ force: true }).wait(2000)
        cy.get('#editClientUltimateBeneficialOwnerForm')
        cy.getByFormControlName('percentageOfShares')
            .clear().type(faker.number.int({ min: 0, max: 20 }).toString())
        cy.contains('div', 'Save & Close').click().wait(500)
        cy.contains('The Ultimate Beneficial Owner has been updated.').wait(2000)
    })

    /**
     * @scenario Delete UBO Declaration
     * @description Deletes the first listed UBO record
     * @expectedResult UBO is deleted and user confirmation is triggered
     */
    it('Deletes Self Declaration UBO', () => {
        cy.visit(location).wait(2000)
        cy.get('#gridClientUltimateBeneficialOwners .dx-icon-trash')
            .should('be.visible').eq(0).click({ force: true }).wait(1000)
        cy.contains('Yes').click().wait(500)
        // cy.contains('The beneficiary has been deleted.')
    })

})

