import { faker } from "@faker-js/faker";
import {navigateToClientMenu} from "../../support/e2e";

let code = faker.string.numeric(16);

let location = '';

describe('Add, Edit, Delete Additional External References - Corporate', () => {

    it('Add Client external reference', () => {
        // Click on Know your Clients navigation item
        navigateToClientMenu('Corporate')

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Additional External References').click();
        cy.wait(1000)

        cy.location('pathname').then((pathname)=>{
            location = pathname
        })

        // Add new external reference
        cy.getBySel('addAdditionalExternalReference').click().wait(1000);

        cy.get('#addClientAdditionalExternalReferenceForm input[name="additionalExternalReference"]').type(faker.internet.url());

        cy.getBySel('saveAdditionalExternalReference').click().wait(2000);
        cy.contains('The additional external reference has been added.')
    });

    it('Edit Client external reference', () => {
        // Edit external reference
        cy.visit(location).wait(3000)
        cy.get('#gridClientAdditionalExternalReferences table tbody tr td .dx-icon-edit').eq(0).click({ force: true }).wait(3000);
        cy.get('#gridClientAdditionalExternalReferences table tbody tr td div .dx-texteditor-input').wait(1000).eq(1).clear().type(faker.internet.url(),{ force: true });
        cy.get('#gridClientAdditionalExternalReferences table tbody tr td .dx-icon-save').eq(0).click({ force: true }).wait(1000);
        cy.contains('The additional external reference has been updated.')
    })

    it('Delete Client external reference', () => {

        cy.visit(location).wait(4000)
        cy.get('#gridClientAdditionalExternalReferences table tbody tr td .dx-icon-trash').eq(0).click({ force: true }).wait(1000);
        // Delete external reference
        cy.get('.dx-overlay-content .dx-button-content').contains('Yes').click().wait(1000);
        cy.contains('The additional external reference has been deleted.')
    })
})
