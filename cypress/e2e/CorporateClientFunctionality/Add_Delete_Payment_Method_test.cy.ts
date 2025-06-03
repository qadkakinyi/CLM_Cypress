import {faker} from "@faker-js/faker";
import {navigateToClientMenu, navigateToNewestClientMenu} from "../../support/e2e";

let location = '';
describe('Payment Method',()=>{
    before(()=>{
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
    
    it('Adds a new Payment Method', ()=>{
        // Click on Know your Clients navigation item
        let clientName;
        cy.readFile('cypress/fixtures/client_corporate.json').then((data) =>{
            clientName = data.companyName
            navigateToNewestClientMenu(clientName)
        })

        cy.get('.left-secondary-menu .left-menu-items.main-menu li>sa-menu-item>a').contains('span', 'Payment Methods').click();
        cy.wait(1000)

        cy.location('pathname').then((loc)=>{
            location = loc
        })
        
        cy.getByDataCy('add-method').click().wait(2000)
        
        cy.getByFormControlName('paymentMethods').click()
        cy.get('#addClientPaymentMethodForm').contains('PayPal Test').click()
        cy.getByDataCy('save-payment-method').click().wait(2000)
        cy.contains('The payment method has been added.')
        
    })
    
    it('Deletes Payment Method',()=>{
        cy.visit(location).wait(2000)
        cy.get('.dx-command-edit > span > .dx-template-wrapper > .dx-link > .fa').first().click({force:true}).wait(2000)
        cy.wait(500)
        cy.contains('Delete').click()
        cy.contains('Yes').click().wait(2000)
        cy.contains('The client payment method details(including the related volumes) have been deleted.')
    })
})