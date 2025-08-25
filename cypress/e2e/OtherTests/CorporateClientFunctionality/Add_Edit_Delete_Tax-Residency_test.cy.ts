import { faker } from "@faker-js/faker";
import { navigateToClientMenu, navigateToNewestClientMenu } from "../../../support/e2e";

let location = '';

/**
 * @testSuite Tax Residency - Corporate
 * @description Covers creation, modification, and deletion of corporate tax residency records
 * @priority Medium
 * @owner QA Team
 * @tags corporate, compliance, tax
 * @dependencies client_corporate.json, faker-js
 */

describe('Adds, Edits and Deletes Tax Residency - Corporate', () => {

    /**
     * @scenario Add Tax Residency
     * @description Adds a new tax residency for a corporate client
     * @expectedResult Tax residency is added and success message appears
     */
    it('Adds Tax Residency', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
            clientName = data.companyName;
            navigateToNewestClientMenu(clientName);
        });

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
            .contains('span', 'Tax Residency').click();
        cy.wait(1000);

        cy.location('pathname').then((pathname) => {
            location = pathname;
        });

        cy.get('sa-button').contains('Add').click();
        cy.wait(1000);

        cy.getBySel('countriesList').click().wait(1000);
        cy.get('#dynamicSelectBoxDropdownGrid .dx-datagrid-content').contains('Afghanistan').click();

        // Optionally add TIN reason if needed
        // cy.getBySel('reasonsForTinList').click();
        // cy.get('#dynamicSelectBoxDropdownGrid td').contains('Tin Test').click();

        cy.getByFormControlName('notes').type(faker.word.words(5));
        cy.getByFormControlName('explanation').type(faker.word.words(15));
        cy.contains('[data-test="saveTaxResidency"]', 'Save').click().wait(500);
        cy.contains('Tax residency has been added.').wait(2000);
    });

    /**
     * @scenario Edit Tax Residency
     * @description Updates the country for the last tax residency entry
     * @expectedResult The record is updated with new country and confirmation message appears
     */
    it('Edits a Tax Residency', () => {
        cy.visit(location).wait(3000);
        cy.get('.dx-icon-edit').wait(2000).last().click({ force: true });
        cy.get('#gridClientTaxResidencies table .dx-row').first().wait(1500);
        cy.get('#gridClientTaxResidencies .dx-texteditor-input').eq(6).click().wait(500);
        cy.get('.dx-scrollable').contains('Algeria').click().wait(500);
        cy.get('.dx-datagrid-content-fixed > .dx-datagrid-table > tbody > .dx-data-row > .dx-command-edit > .dx-link-save')
            .click().wait(1000);
        cy.contains('Tax residency has been updated.').wait(1000);
    });

    /**
     * @scenario Delete Tax Residency
     * @description Deletes the most recently listed tax residency
     * @expectedResult The residency is removed and confirmation message is shown
     */
    it('Deletes a Tax Residency', () => {
        cy.visit(location).wait(3000);
        cy.get('.dx-icon-trash').last().click({ force: true });
        cy.wait(2000);
        cy.contains('Yes').click().wait(1000);
        cy.contains('Tax residency has been deleted.').wait(1000);
    });

});

