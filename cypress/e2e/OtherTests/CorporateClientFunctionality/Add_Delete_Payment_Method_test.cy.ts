import {faker} from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../../support/e2e";

/**
 * @testSuite ClientPaymentMethods - Corporate Client Payment Method Management
 * @description Suite for testing add and delete operations on payment methods linked to corporate clients
 * @priority Medium
 * @owner QA Team
 * @tags regression, client-payment, corporate, settings
 * @dependencies payment-method-settings, faker-js, navigation-utils
 * @fileDescription Ensures payment method functionality behaves correctly on both settings and client levels
 */

let location = '';

describe('Payment Method', () => {
    /**
     * @setup Adds a reusable payment method in settings
     * @description Creates a "PayPal Test" method under settings for use in later client-level tests
     * @steps Visit settings/payment-methods
     * @steps Click Add, enter name, mapping reference, history type, and time frame
     * @expectedResult Payment method is saved and available in client dropdowns
     */
    before(() => {
        cy.visit('/settings/payment-methods').wait(1000)
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
     * @description Adds a payment method to a corporate client from the UI using previously configured method
     * @steps Navigate to client record using fixture
     * @steps Open Payment Methods tab
     * @steps Select "PayPal Test" from dropdown and save
     * @expectedResult Payment method is added successfully
     */
    it('Adds a new Payment Method', () => {
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) => {
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Payment Methods').click();
        cy.wait(1000)

        cy.location('pathname').then((loc) => {
            location = loc
        })

        cy.getByDataCy('add-method').click().wait(2000)

        cy.getByFormControlName('paymentMethods').click()
        cy.get('#addClientPaymentMethodForm').contains('PayPal Test').click()
        cy.getByDataCy('save-payment-method').click().wait(2000)
        cy.contains('The payment method has been added.')
    })

    /**
     * @scenario Delete Client Payment Method
     * @description Deletes the client payment method that was previously added
     * @steps Visit stored client page
     * @steps Click trash icon, confirm deletion
     * @expectedResult Payment method and related volumes are removed successfully
     */
    it('Deletes Payment Method', () => {
        cy.visit(location).wait(2000)
        cy.get('.dx-command-edit > span > .dx-template-wrapper > .dx-link > .fa').first().click({ force: true }).wait(2000)
        cy.wait(500)
        cy.contains('Delete').click()
        cy.contains('Yes').click().wait(2000)
        cy.contains('The client payment method details(including the related volumes) have been deleted.')
    })
})

