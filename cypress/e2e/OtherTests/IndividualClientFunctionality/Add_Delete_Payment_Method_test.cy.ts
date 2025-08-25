/**
 * @testSuite Individual Client Payment Methods
 * @description Validates adding a payment method in Settings, linking it to an individual client, and deleting it from the client profile
 * @priority Medium
 * @owner QA Team
 * @tags regression, smoke, payments, individual
 * @dependencies faker-js, navigateToNewestClientMenu
 * @fileDescription Covers end-to-end flow: create Payment Method in Settings → attach to client → delete from client
 */

import {faker} from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

let client_id = '';

describe('Add and Delete Payment Method',()=>{

    /**
     * @setup Create Payment Method (Settings)
     * @description Creates a reusable Payment Method in Settings to be referenced on the client
     * @steps Visit Settings → Payment Methods
     * @steps Click Add and populate name, mapping reference, history record type, and time frame
     * @steps Save the new method
     * @expectedResult New method (PayPal Test) exists and is selectable in client forms
     */
    before(()=>{
        cy.visit('/settings/payment-methods').wait(2000)
        cy.contains('sa-button','Add').click().wait(1000)
        cy.getByFormControlName('name').type('PayPal Test')
        cy.getByFormControlName('mappingReference').type(faker.string.alphanumeric(11))
        cy.getByDataCy('history-record-type').click()
        cy.contains('Backwards').click().wait(1000)
        cy.getByDataCy('time-frame').click()
        cy.contains('SixMonths').click()
        cy.getByDataCy('save-method').click().wait(1000)
    })

    /**
     * @scenario Add Client Payment Method
     * @description Links the pre-created “PayPal Test” method to the individual client
     * @priority Medium
     * @testData Payment Method: PayPal Test (from setup)
     * @steps Load individual client from fixture and navigate to profile
     * @steps Open Payment Methods section
     * @steps Click Add, choose “PayPal Test”, and Save
     * @expectedResult Payment method appears in the client list/grid
     */
    it('Adds a new Payment Method', ()=>{
        let clientName;
        cy.readFile('cypress/fixtures/client_individual.json').then((data) =>{
            clientName = data.individualClientName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Payment Methods').click();
        cy.wait(1000)

        cy.location('pathname').then((pathname)=>{
            const pathSections = pathname.split('/');
            client_id = pathSections[3]
        })

        cy.getByDataCy('add-method').click()
        cy.wait(1000)

        cy.getByFormControlName('paymentMethods').click()
        cy.get('#addClientPaymentMethodForm').contains('PayPal Test').click()
        cy.getByDataCy('save-payment-method').click()

    })

    /**
     * @scenario Delete Client Payment Method
     * @description Removes the previously attached payment method from the client profile
     * @priority Medium
     * @steps Visit the client’s Payment Methods page using captured client_id
     * @steps Open row actions, click Delete, and confirm
     * @expectedResult Payment method is removed from the client
     */
    it('Deletes Payment Method',()=>{
        cy.visit(`/main/client-individual/${client_id}/1/payment-methods`).wait(2000)
        cy.get('.dx-command-edit > span > .dx-template-wrapper > .dx-link > .fa').first().click({force:true})
        cy.wait(500)
        cy.contains('Delete').click()
        cy.contains('Yes').click()
    })
})

