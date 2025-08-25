/**
 * @testSuite Corporate Client Alternative Names
 * @description Validates adding and deleting of alternative names for corporate clients
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, client-aliases
 * @dependencies faker-js, navigateToNewestClientMenu
 * @fileDescription Performs CRUD operations on the 'Alternative Names' section of a corporate client profile
 */

import { faker } from "@faker-js/faker";
import { navigateToNewestClientMenu } from "../../../support/e2e";

let companyName = faker.company.name();
let location = '';

describe('Add and Delete Alternative Names - Corporate', () => {
    /**
     * @scenario Add Alternative Name
     * @description Adds a new alias to the corporate client using a faker-generated company name
     * @priority Medium
     * @testData Faker-generated company alias
     * @steps Load corporate client from fixture
     * @steps Navigate to Alternative Names section
     * @steps Click Add, fill in name, click Save
     * @expectedResult The alternative name is saved and confirmation message is shown
     */
    it('Adds Alternative Name', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
            clientName = data.companyName;
            navigateToNewestClientMenu(clientName);
        });

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a')
            .contains('span', 'Alternative Names')
            .click().wait(2000);

        cy.location('pathname').then((pathname) => {
            location = pathname;
        });

        cy.contains('sa-button', 'Add').click().wait(1500);
        cy.getByFormControlName('alternativeName').type(companyName);
        cy.contains('#addClientAlternativeNameForm [icon="save"]', 'Save').click().wait(1500);
        cy.contains('The alternative name has been added').wait(1000);
    });

    /**
     * @scenario Delete Alternative Name
     * @description Deletes the previously added alias from the client profile
     * @priority Medium
     * @steps Visit the client profile's Alternative Names section
     * @steps Click delete icon and confirm
     * @expectedResult Alias is removed and deletion confirmation is shown
     */
    it('Deletes Alternative Names', () => {
        cy.visit(location);
        cy.get('.dx-datagrid-content-fixed .dx-command-edit > .dx-link').eq(0).click().wait(1000);
        cy.contains('.dx-button-text', 'Yes').click().wait(1000);
        cy.contains('The alternative name has been deleted').wait(1000);
    });
});

