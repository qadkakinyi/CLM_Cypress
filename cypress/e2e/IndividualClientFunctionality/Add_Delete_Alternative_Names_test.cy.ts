import {faker} from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../support/e2e";
let firstName = faker.person.firstName('male');
let client_id = '';
let location = '';
describe('Add and Delete Alternative Names', ()=>{
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

    it('Deletes Alternative Names',()=>{
        cy.visit(location).wait(3500)
        cy.get('.dx-icon-trash').last().should('be.visible').click()
        cy.wait(2000)
        cy.contains('Yes').click().wait(1000)
        cy.contains('The alternative name has been deleted')
    })
})