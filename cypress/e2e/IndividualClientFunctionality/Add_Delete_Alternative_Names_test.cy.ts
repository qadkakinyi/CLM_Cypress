import {faker} from "@faker-js/faker";
import {navigateToClientMenu} from "../../support/e2e";

let client_id = '';
let location = '';
describe('Add and Delete Alternative Names', ()=>{
    it('Adds Alternative Name', ()=>{
        navigateToClientMenu('Individual')

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Alternative Names').click();
        cy.wait(1000)

        cy.location('pathname').then((pathname)=>{
            const pathSections = pathname.split('/');
            location = pathname
        })
        
        cy.get('sa-button').contains('Add').click()
        cy.wait(1000)
        cy.getByFormControlName('alternativeName').type(faker.word.noun())
        cy.get('sa-button').contains('Save').click()
    })

    it('Deletes Alternative Names',()=>{
        cy.visit(location).wait(2500)
        cy.get('.dx-command-edit > .dx-link').last().click({force:true})
        cy.wait(2000)
        cy.contains('Yes').click().wait(1000)
        cy.contains('The alternative name has been deleted')
    })
})