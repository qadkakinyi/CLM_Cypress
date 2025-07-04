import {faker} from "@faker-js/faker";
import { navigateToNewestClientMenu} from "../../support/e2e";

let companyName = faker.company.name();

let location = '';
describe('Add and Delete Alternative Names - Corporate', ()=>{
    it('Adds Alternative Name', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Alternative Names').click().wait(2000)

        cy.location('pathname').then((pathname)=>{
            location = pathname
        })
        
        cy.contains('sa-button','Add').click().wait(1500)
        cy.getByFormControlName('alternativeName').type(companyName)
        cy.contains('#addClientAlternativeNameForm [icon="save"]','Save').click().wait(1500)
        cy.contains('The alternative name has been added').wait(1000)
    })

    it('Deletes Alternative Names',()=>{
        cy.visit(location)
        cy.waitUntilLoaderDisappears()
        cy.get('.dx-datagrid-content-fixed .dx-command-edit > .dx-link').eq(0).click().wait(1000)
        // cy.get('.dx-icon-trash').eq(0).click().should('be.visible').wait(1500)
        cy.contains('.dx-button-text', 'Yes').click().wait(1000)
        cy.contains('The alternative name has been deleted').wait(1000)
    })
})