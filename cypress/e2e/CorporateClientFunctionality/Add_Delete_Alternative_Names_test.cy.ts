import {faker} from "@faker-js/faker";
import {navigateToClientMenu} from "../../support/e2e";

let location = '';
describe('Add and Delete Alternative Names - Corporate', ()=>{
    it('Adds Alternative Name', ()=>{
        navigateToClientMenu('Corporate')
        cy.wait(2000)

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Alternative Names').click().wait(2000)

        cy.location('pathname').then((pathname)=>{
            location = pathname
        })
        
        cy.contains('sa-button','Add').click().wait(1500)
        cy.getByFormControlName('alternativeName').type(faker.word.noun())
        cy.contains('#addClientAlternativeNameForm [icon="save"]','Save').click().wait(1500)
        cy.contains('The alternative name has been added').wait(1000)
    })

    it('Deletes Alternative Names',()=>{
        cy.visit(location).wait(3000)
        cy.get('.dx-icon-trash').first().click({force:true}).wait(3000)
        cy.contains('Yes').click({force:true}).wait(1000)
        cy.contains('The alternative name has been deleted').wait(1000)
    })
})