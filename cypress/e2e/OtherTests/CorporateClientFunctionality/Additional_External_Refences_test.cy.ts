import { faker } from "@faker-js/faker";
import { navigateToClientMenu, navigateToNewestClientMenu } from "../../../support/e2e";

let code = faker.string.numeric(16);
let location = '';

/**
 * @testSuite Additional External References - Corporate
 * @description Covers end-to-end operations for additional external references for a corporate client
 * @priority Medium
 * @owner QA Team
 * @tags client-profile, references, external
 * @dependencies faker-js, client_corporate.json
 */

describe('Add, Edit, Delete Additional External References - Corporate', () => {

    /**
     * @scenario Add Additional External Reference
     * @description Adds a new external reference URL to a corporate client
     * @expectedResult Reference is saved successfully and confirmation message appears
     */
    it('Add Client external reference', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
            clientName = data.companyName;
            navigateToNewestClientMenu(clientName);
        });

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
            .contains('span', 'Additional External References').click();
        cy.wait(1000);

        cy.location('pathname').then((pathname) => {
            location = pathname;
        });

        // Add new external reference
        cy.getBySel('addAdditionalExternalReference').click().wait(1000);

        cy.get('#addClientAdditionalExternalReferenceForm input[name="additionalExternalReference"]')
            .type(faker.internet.url());

        cy.getBySel('saveAdditionalExternalReference').click().wait(2000);
        cy.contains('The additional external reference has been added.');
    });

    /**
     * @scenario Edit Additional External Reference
     * @description Updates the URL value of an existing external reference
     * @expectedResult Reference is updated and success message is displayed
     */
    it('Edit Client external reference', () => {
        cy.visit(location).wait(3000);

        cy.get('#gridClientAdditionalExternalReferences table tbody tr td .dx-icon-edit')
            .eq(0).click({ force: true }).wait(3000);

        cy.get('#gridClientAdditionalExternalReferences table tbody tr td div .dx-texteditor-input')
            .wait(1000).eq(1).clear().type(faker.internet.url(), { force: true });

        cy.get('#gridClientAdditionalExternalReferences table tbody tr td .dx-icon-save')
            .eq(0).click({ force: true }).wait(1000);

        cy.contains('The additional external reference has been updated.');
    });

    /**
     * @scenario Delete Additional External Reference
     * @description Deletes a previously added external reference
     * @expectedResult Reference is removed and confirmation is shown
     */
    it('Delete Client external reference', () => {
        cy.visit(location).wait(4000);

        cy.get('#gridClientAdditionalExternalReferences table tbody tr td .dx-icon-trash')
            .eq(0).click({ force: true }).wait(1000);

        cy.get('.dx-overlay-content .dx-button-content').contains('Yes').click().wait(1000);
        cy.contains('The additional external reference has been deleted.');
    });

});

