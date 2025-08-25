/**
 * @testSuite Individual Client Alternative Names
 * @description Validates adding and deleting of alternative names for an individual client
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, client-aliases, individual
 * @dependencies faker-js, navigateToNewestClientMenu
 * @fileDescription Performs CRUD operations on the 'Alternative Names' section of an individual client profile
 */

import {faker} from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let firstName = faker.person.firstName('male');
let client_id = '';
let location = '';

describe('Add and Delete Alternative Names', ()=>{

    /**
     * @scenario Add Alternative Name
     * @description Adds a new alias to the individual client using a faker-generated first name
     * @priority Medium
     * @testData Faker-generated firstName (duplicated to form "First First")
     * @steps Load individual client from fixture and navigate to their profile
     * @steps Navigate to Alternative Names section
     * @steps Click Add, fill in name, click Save
     * @expectedResult The alternative name is saved and confirmation message is shown
     */
    it('Adds Alternative Name', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
            clientName = data.individualClientName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Alternative Names').click();
        cy.wait(1000)

        cy.location('pathname').then((pathname)=>{
            const pathSections = pathname.split('/');
            location = pathname
        })

        cy.get('sa-button').contains('Add').click()
        cy.wait(1000)
        cy.getByFormControlName('alternativeName').type(firstName+' '+ firstName)
        cy.contains('#addClientAlternativeNameForm [icon="save"]','Save').click().wait(1500)
        cy.contains('The alternative name has been added').wait(1000)
    })

    /**
     * @scenario Delete Alternative Name
     * @description Deletes the previously added alias from the client profile
     * @priority Medium
     * @steps Visit the client profile's Alternative Names section
     * @steps Click delete icon and confirm
     * @expectedResult Alias is removed and deletion confirmation is shown
     */
    it('Deletes Alternative Names',()=>{
        cy.visit(location).wait(3500)
        cy.get('.dx-icon-trash').last().should('be.visible').click()
        cy.wait(2000)
        cy.contains('Yes').click().wait(1000)
        cy.contains('The alternative name has been deleted')
    })
})

